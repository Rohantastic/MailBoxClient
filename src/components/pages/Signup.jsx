import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./Signup.css";

const useSignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return {
    email,
    password,
    setEmail,
    setPassword,
  };
};

const SignupPage = () => {
  const { email, password, setEmail, setPassword } = useSignupForm();
  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate('/login');
  }

  const handleSignup = async () => {
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBizsNC1R0KwF40X3Pj38Q_YPwkcgRj1XE',
        {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        console.log(response);
        alert('User has been created !!');
        navigateToLogin();
      } else {
        alert('Problem in user creation');
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-form">
          <h2>SignUp</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button onClick={handleSignup}>Signup</button>
          <br/>
          <NavLink to="/login">Already have an account?</NavLink>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
