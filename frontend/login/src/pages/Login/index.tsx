import React, { useState } from 'react';
import { useAuth } from '../../contexts/auth';



import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
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

const Login: React.FC = () => {
  const classes = useStyles();
  const { Login, OpenRegister } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attemptsLeft, setAttemptsLeft] = useState(function(){
    if(sessionStorage.getItem('attemptsLeft')){
      var x = '';
      x = sessionStorage.getItem('attemptsLeft') || '';
      var y: number = + x;
      return y
    } else {
      sessionStorage.setItem('attemptsLeft', '5');
      return 5
    }
  });
  const [openDialog, setOpenDialog] = React.useState(false);
  const [messageDialog, setMessageDialog] = React.useState('');
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  async function handleRegister() {
    OpenRegister();
  }

  async function handleLogin() {
    let regValidEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    if(attemptsLeft > 0){
      if(!regValidEmail.test(email) && password.length <= 5){
        setAttemptsLeft(attemptsLeft-1);
        sessionStorage.setItem('attemptsLeft', attemptsLeft.toString());
        setEmail("");
        setPassword("");
        setMessageDialog("Invalid email and Password");
        setOpenDialog(true);
      } else if(!regValidEmail.test(email)){
        setAttemptsLeft(attemptsLeft-1);
        sessionStorage.setItem('attemptsLeft', attemptsLeft.toString());
        setEmail("");
        setMessageDialog("Invalid Email");
        setOpenDialog(true);
      } else if(password.length <= 5){
        setAttemptsLeft(attemptsLeft-1);
        sessionStorage.setItem('attemptsLeft', attemptsLeft.toString());
        setPassword("");
        setMessageDialog("Invalid Password");
        setOpenDialog(true);
      } else {
        await Login({
          email: email,
          password: password,
        });
        console.log(sessionStorage.getItem("@App:user"));

        setTimeout(() => {
          if(sessionStorage.getItem("@App:user") === 'null'){
            setAttemptsLeft(attemptsLeft-1);
            sessionStorage.setItem('attemptsLeft', attemptsLeft.toString());
            setEmail("");
            setPassword("");
            setMessageDialog("Invalid email or Password");
            setOpenDialog(true);
          } else {
            sessionStorage.setItem('attemptsLeft', '5');
          }
        }, 1000);
      }
    }else {
      setMessageDialog("number of attempts exceeded");
      setOpenDialog(true);
    }
  }


  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5"> Sign in to continue </Typography>

          <form className={classes.form} noValidate>
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
            {password.length === 0 && <span>Password is required</span>}<br />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            
            <Fab onClick={handleRegister}
              variant="extended" color="primary" className={classes.fab}>
              <AddIcon className={classes.extendedIcon} />
              REGISTER
            </Fab>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
              disabled={(email.length > 0 && password.length > 0)? false : true }
            >
              Sign In
                        </Button>

            <Grid container>
              <Grid item xs>
                {`${attemptsLeft} attempts left`}
              </Grid>
            </Grid>

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

export default Login;
