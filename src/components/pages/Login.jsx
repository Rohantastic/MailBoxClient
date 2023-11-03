import React, { useState } from 'react';
import "./Login.css";
import { NavLink, useNavigate } from 'react-router-dom';

const LoginPage = () => {
     
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    


    const navigateToHomePage = ()=>{
        navigate("/home");
    }
    const handleLogin = async () => {

        try {
            const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBizsNC1R0KwF40X3Pj38Q_YPwkcgRj1XE", {
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
                //const data = await response.json();
                localStorage.setItem("mailboxloggedinUser", email);
                alert("User has been successfully logged in !!");
                navigateToHomePage();
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
                    <h2>Login</h2>
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
                    <button onClick={handleLogin}>Login</button>
                    <br/>
                    <NavLink to="/">Don't have an account?</NavLink>
                    <br/>
                    <NavLink to="/forgotPassword">Forgot Password?</NavLink>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
