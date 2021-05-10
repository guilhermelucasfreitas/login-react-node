import React from 'react';
import { useAuth } from '../../contexts/auth';
import Button from '@material-ui/core/Button';

// import { Container } from './styles';

const Home: React.FC = () => {
  const { signed, Logout } = useAuth();

  console.log(signed);

  async function handleLogout() {
    Logout();
  }

  return (
    <div>
      <h1>Home</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogout}
      >
        Logout
                        </Button>
    </div>
  );
};

export default Home;
