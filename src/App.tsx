import React from 'react';
import './App.css';
import { Login } from 'pages/Login';
import { SignUp } from 'pages/SignUp';
import { Route, Routes } from 'react-router-dom';
import { Dashboard } from 'pages/Dashboard';
import { PrivateRoutes } from 'components/PrivateRoutes';

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;
