// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./components/LoginPage";
import PrivateRoute from "./routes/PrivateRoute";
import Logo from "./components/Logo";

const MainPage = () => <div>Main</div>;

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Logo /> 
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;