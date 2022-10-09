import React, { useMemo, useState } from 'react';

const AuthContext = React.createContext({
  loggedIn: false,
  setLoggedIn: (value: boolean) => {
    console.log('setLoggedIn', value);
  },
});

type AuthContextProviderProps = { children: React.ReactNode };

function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [loggedIn, setLoggedIn] = useState(false);

  const value = useMemo(() => {
    return { loggedIn, setLoggedIn };
  }, [loggedIn]);

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>;
}

const useAuthContext = () => {
  const context = React.useContext(AuthContext);
  if (context) {
    return context;
  }

  throw new Error(`useStateContext must be used within a StateContextProvider`);
};

export { AuthContextProvider, useAuthContext };