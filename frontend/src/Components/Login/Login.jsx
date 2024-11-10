import React, { useEffect, useState } from 'react';
import './Login.css';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import video from '../../Assets/video.mp4';
import logo from '../../Assets/logo.png';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';

const Login = () => {
    const [loginUserName, setLoginUserName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const navigateTo = useNavigate();
    const [loginStatus, setLoginStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');

    const loginUser = (e) => {
        e.preventDefault();
        Axios.post('http://localhost:8080/auth/login', {
            username: loginUserName,
            password: loginPassword
        })
        .then((response) => {
            if (!response.data.success) {
                navigateTo('/');
                setLoginStatus(response.data.message || 'Login failed.');
            } else {
                navigateTo('/dashboard');
            }
        })
        .catch((error) => {
            setLoginStatus(error.response ? error.response.data.message : 'An error occurred.');
            console.log(error);
        });
    };

    useEffect(() => {
        if (loginStatus) {
            setStatusHolder('showMessage');
            setTimeout(() => {
                setStatusHolder('message');
            }, 2000);
        }
    }, [loginStatus]);

    return (
        <div className="loginPage flex">
            <div className="container flex">
                <div className="videoDiv">
                    <video src={video} autoPlay muted loop></video>
                    <div className="textDiv">
                        <h2 className="title">Detect and Diagnose Bone Fractures with AI Precision</h2>
                        <p>AI-Powered Bone Fracture Detection!</p>
                    </div>
                    <div className="footerDiv flex">
                        <span className="text">Don't have an account?</span>
                        <Link to={'/signup'}>
                            <button className="btn">Sign Up</button>
                        </Link>
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img src={logo} alt="Logo Image" />
                        <h3>Welcome Back!</h3>
                    </div>

                    <form className="form grid" onSubmit={loginUser}>
                        <span className={statusHolder}>{loginStatus}</span>

                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className="icon" />
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Enter Username"
                                    onChange={(event) => setLoginUserName(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className="icon" />
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter Password"
                                    onChange={(event) => setLoginPassword(event.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn flex"
                        >
                            <span>Login</span>
                            <AiOutlineSwapRight className="icon" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
