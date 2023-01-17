import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Login } from 'pages/Login';
import { SignUp } from 'pages/SignUp';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signUp" element={<SignUp />} />
    </Routes>
  );
}

export default App;
