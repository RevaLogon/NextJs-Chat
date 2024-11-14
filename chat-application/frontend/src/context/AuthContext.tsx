// src/context/AuthContext.tsx
import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
  auth: { username: string | null; role: string | null };
  setAuth: React.Dispatch<
    React.SetStateAction<{ username: string | null; role: string | null }>
  >;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<{ username: string | null; role: string | null }>({
    username: null,
    role: null,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
