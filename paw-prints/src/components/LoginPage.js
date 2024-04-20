// LoginPage.js

import React, { useState } from 'react';
import '../App.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // Handle successful login
        const data = await response.json();
        console.log('Login successful:', data);
        // Redirect to the desired page or perform additional actions
      } else {
        // Handle login error
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error occurred during login:', error);
    }
  };

  return (
    <div className="adoption-modal">
      <div className="adoption-modal-content">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <button type="button" className="cancel-button">
            X
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;







/**import React from 'react';
import '../App.css';

const LoginPage = () => {
  return (
    <div className="adoption-modal">
      <div className="adoption-modal-content">
        <h1>Login</h1>
        <form>
          <div>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          <button type="button" className="cancel-button" >X</button> 
        </form>
      </div>
    </div>
  );
};

export default LoginPage;*/