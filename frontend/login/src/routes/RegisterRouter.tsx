import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Register from '../pages/Register';

const RegisterRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Register} />
    </BrowserRouter>
    
  );
};

export default RegisterRoutes;
