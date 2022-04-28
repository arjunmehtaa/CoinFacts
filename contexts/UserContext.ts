import React from "react";

interface AuthProps {
  signIn: (email, password) => void;
  signUp: (email, password) => void;
  signOut: () => void;
  continueWithoutLogging: () => void;
  returnToLogin: () => void;
}

const authDefault = {
  signIn: (email, password) => {},
  signUp: (email, password) => {},
  signOut: () => {},
  continueWithoutLogging: () => {},
  returnToLogin: () => {},
};

export const AuthContext = React.createContext<AuthProps>(authDefault);
