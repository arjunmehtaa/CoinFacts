import React from "react";

interface AuthProps {
  signIn: (email, password) => void;
  signUp: (email, password) => void;
  signOut: () => void;
}

const authDefault = {
  signIn: (email, password) => {},
  signUp: (email, password) => {},
  signOut: () => {},
};

export const AuthContext = React.createContext<AuthProps>(authDefault);
