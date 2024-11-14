// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./components/Login/LoginPage";
import ChatPage from "./components/Chat/ChatPage";
import AdminPanel from "./components/Admin/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  return (
    <AuthProvider> {/* Ensure this wraps the Router */}
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/chat"
            element={<ProtectedRoute role="user" Component={ChatPage} />}
          />
          <Route
            path="/admin"
            element={<ProtectedRoute role="admin" Component={AdminPanel} />}
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
