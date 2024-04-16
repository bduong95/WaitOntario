import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/SignUp.css';
import logo from '../assets/logo.png';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3300/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstname: firstName,
          lastname: lastName,
          email: email,
          username: username,
          password: password,
          confirmPassword: confirmPassword,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful');
        // Redirect to SignIn component upon successful registration
        navigate('/signin');
      } else {
        console.error('Registration failed:', data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="signup-wrapper">
      <Header />
      <main>
        <div className="signup-container">
          <img src={logo} className="logo" alt="Logo" />
          <form className="signup-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <div className="name-inputs">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Sign up</button>
            <div className="signin-link">
              Already have an account? <a href="/signin">Sign in</a>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;