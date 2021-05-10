import React, { createContext, useState, useEffect, useContext } from 'react';


interface AuthContextData {
  register: boolean;
  signed: boolean;
  user: object | null;
  Login(user: object): Promise<void>;
  Logout(): void;
  OpenRegister(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<object | null>(null);
  const [isRegister, setRegister] = useState<boolean>(false);

  useEffect(() => {
    const storagedUser = sessionStorage.getItem('@App:user');
    const storagedToken = sessionStorage.getItem('@App:token');

    if (storagedToken && storagedUser) {
      setUser(JSON.parse(storagedUser));
    }
  }, []);

  async function Login(userData: object) {
    const loginUrl = 'https://production-login-backend.herokuapp.com/api/login';
    const postBody = userData;
    const requestMetadata = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postBody)
    };

    fetch(loginUrl, requestMetadata).then(res => res.json()).then(response => {
      if (response.message === 'success') {
        setUser(response.user);

        sessionStorage.setItem('@App:user', JSON.stringify(response.user));
        sessionStorage.setItem('@App:token', response.token);
        return response.user
      } else {
        sessionStorage.setItem('@App:user', 'null');
        setUser(null);
        return null
      }
    });
  }

  function OpenRegister() {
    setRegister(!isRegister);
  }

  function Logout() {
    sessionStorage.removeItem('@App:user');
    sessionStorage.removeItem('@App:token');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ register:isRegister, signed: Boolean(user), user, Login, Logout, OpenRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
}
