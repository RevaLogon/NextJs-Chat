// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type ProtectedRouteProps = {
  role: string;
  Component: React.FC;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ role, Component }) => {
  const { auth } = useAuth(); // Correctly uses context

  if (auth.role === role) {
    return <Component />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
