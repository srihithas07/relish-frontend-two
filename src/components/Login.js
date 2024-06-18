import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';

function Login ({ userType, onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = (event) => {
    event.preventDefault();
    const obj = { email, password };
    const url = "http://localhost:5000/userRoute/login";
    
    axios
      .post(url, obj)
      .then((res) => {
        // Handle successful response
        alert(res.data.message || 'Login successful');
        navigate('/create-reservation');
      })
      .catch((err) => {
        // Log the entire error response for debugging
        console.error(err);

        // Check if the error response has specific details
        if (err.response) {
          if (err.response.status === 401) {
            setError('Unauthorized: Incorrect email or password.');
          } else {
            setError(err.response.data.message || 'An error occurred.');
          }
        } else {
          setError('An error occurred. Please try again later.');
        }
      });
  };

  return (
    <div className='lgn'>
      <div className="form">
        <h2>Login</h2>
        <div className="title">Welcome Back</div>
        <div className="ic1">
          <label>Email:</label>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="ic1">
          <label>
            Password:
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <br />
        {error && <p className="error-message">{error}</p>}
        <button className='btn' type="button" onClick={handleLogin}>
          Login
        </button>
        <div>
          <p>
            <Link to="/Signup">Don't have an account?</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;