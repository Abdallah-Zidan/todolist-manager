import React from 'react';
import { LoginResponseData } from './api/interfaces';

type State = {
  authUser: LoginResponseData | null;
};

type Action = {
  type: string;
  payload: LoginResponseData | null;
};

type Dispatch = (action: Action) => void;

const initialState: State = {
  authUser: null,
};

type AuthContextProviderProps = { children: React.ReactNode };

const AuthContext = React.createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

const authReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_USER': {
      return {
        ...state,
        authUser: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  const value = { state, dispatch };
  return (<AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>);
};

const useAuthContext = () => {
  const context = React.useContext(AuthContext);

  if (context) {
    return context;
  }

  throw new Error(`useStateContext must be used within a StateContextProvider`);
};

export { AuthContextProvider, useAuthContext };
