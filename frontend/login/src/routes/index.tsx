import React from 'react';
import { useAuth } from '../contexts/auth';

import SignRoutes from './SignRoutes';
import OtherRoutes from './OtherRoutes';
import RegisterRoutes from './RegisterRouter';

const Routes: React.FC = () => {
  const { signed, register } = useAuth();

  if(register){
    return <RegisterRoutes />
  } else {
    return signed ? <OtherRoutes /> : <SignRoutes />;
  }
};

export default Routes;
