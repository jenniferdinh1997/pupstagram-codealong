import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import userService from '../../utils/userService';

function App() {
  const [user, setUser] = useState(userService.getUser())

  function handleSignUpOrLogin() {
    setUser(userService.getUser())
  }

  return (
      <Routes>
          <Route path='/' element={<h1>Home Page</h1>} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />} />
      </Routes>
  );
}

export default App;
