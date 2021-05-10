import React, { useState } from 'react';
import { useAuth } from '../../contexts/auth';

import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { makeStyles } from '@material-ui/core/styles';
import logo from "../../assests/login.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${logo})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
    theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const Register: React.FC = () => {
  const classes = useStyles();
  const { OpenRegister } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [openDialog, setOpenDialog] = React.useState(false);
  const [messageDialog, setMessageDialog] = React.useState('');
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  async function handleLogin() {
    OpenRegister();
  }

  async function handleSave() {
    let regValidEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if(name.length < 3){
        setMessageDialog("Enter a valid name");
        setOpenDialog(true);
    } else if(!regValidEmail.test(email)){
        setEmail("");
        setMessageDialog("Invalid Email");
        setOpenDialog(true);
    } else if(password.length <= 5){
        setPassword("");
        setMessageDialog("Enter a password of 6 or more characters");
        setOpenDialog(true);
    } else {
        console.log("Tudo OK");
        const registerUrl = 'https://production-login-backend.herokuapp.com/api/register';

        const postBody = {"name": name, "email": email, "password": password};
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postBody)
        };
        
        fetch(registerUrl, requestMetadata).then(res => res.json()).then(response => {
            console.log(response._id);
            if(response._id){
                setMessageDialog("User successfully registered");
                setOpenDialog(true);
                setTimeout(() => {
                    OpenRegister();
                }, 2000);
            } else {
                setMessageDialog("Error when registering the user, contact the administrator");
                setOpenDialog(true);
            }
        });
    }
    
  }


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddIcon />
          </Avatar>

          <Typography component="h1" variant="h5"> Register to continue </Typography>

          <form className={classes.form} noValidate>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={e => setName(e.target.value)}
              value={name}
            />
            {name.length === 0 && <span>Name is required</span>}<br />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            {email.length === 0 && <span>Email Address is required</span>}<br />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            {password.length === 0 && <span>Password is required, Enter a password of 6 or more characters</span>}<br />
            
            <Fab onClick={handleLogin}
              variant="extended" color="primary" className={classes.fab}>
              <AddIcon className={classes.extendedIcon} />
              LOGIN
            </Fab>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSave}
              disabled={(email.length > 0 && password.length > 0 && name.length > 0)? false : true }
            >
              Register
                        </Button>

            <Box mt={5}></Box>
          </form>
        </div>
      </Grid>

      <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >

        <DialogTitle id="alert-dialog-title">{messageDialog}</DialogTitle>


        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary"> Ok </Button>
        </DialogActions>
        </Dialog>
    </Grid>

  );
};

export default Register;
