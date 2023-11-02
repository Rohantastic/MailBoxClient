import React, { useState } from 'react';
import "./Signup.css";
import { NavLink, useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const navigateToLogin = ()=>{
        navigate("/login");
    }

    const handleLogin = async () => {

        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBizsNC1R0KwF40X3Pj38Q_YPwkcgRj1XE", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                console.log(response);
                alert("User has been created !!");
                navigateToLogin();
            } else {
                alert("Problem is user Creation")
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
                    <button onClick={handleLogin}>Signup</button>
                    <br/>
                    <NavLink to="/login">Already have an account?</NavLink>
                </div>
            </div>
            
        </>
    );
};

export default LoginPage;
