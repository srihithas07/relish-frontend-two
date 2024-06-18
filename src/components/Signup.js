// Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { LuUser2,LuLock,LuMail } from "react-icons/lu";
import logo from './logo.jpg';
import './signup.css';

function Signup  ({ userType })  {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let handleSignup = (event) => {
    const obj = { name, email, password };
    const url = "https://relish-backend-dc29.onrender.com/userRoute/";
    axios
      .post(url, obj)
      .then((res) => {
        if (res.status === 200) {
          alert("Account created sucessfully");
        } else {
          Promise.reject();
        }
      })
      .catch((err) => {
        alert(err);
      });
    event.preventDefault();
  };

  return (
    <div className="wrapper">
      <div className="image">
        <img src={logo} alt="Logo" />
      </div>
      <div className="signup-form">
        <div className="title">Welcome</div>
        <div className="subtitle">Let's create your account!</div>
        <div className="ic1">
          <label>
            <LuUser2 />
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className="ic2">
          <label>
            <LuMail />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="ic2">
          <label>
            <LuLock />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <button type="button" onClick={handleSignup}>
          Signup
        </button>
        {/* "Have an account?" link included in the form */}
        <div>
          <p>
            Have an account!!
            <Link to="/login" className='btn'>Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
