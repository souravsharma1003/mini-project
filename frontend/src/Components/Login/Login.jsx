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
    const [loginStatus, setLoginStatus] = useState('');
    const [statusHolder, setStatusHolder] = useState('message');
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);  // Added loading state
    const navigateTo = useNavigate();

    const loginUser = (e) => {
        e.preventDefault();
        setErrors({}); // Reset errors before each new request
        setLoginStatus('');  // Clear previous status messages
        setIsLoading(true);   // Start loading state

        // Make API request to login
        Axios.post('https://mini-project-api-six.vercel.app/auth/login', {
            username: loginUserName,
            password: loginPassword
        })
        .then((response) => {
            setIsLoading(false);  // Stop loading state
            if (!response.data.success) {
                setLoginStatus(response.data.message || 'Login failed.');
                setStatusHolder('showMessage');
                navigateTo('/'); // Redirect to the home page if login fails
            } else {
                setLoginStatus("Login successful!"); // Success message
                setStatusHolder('showMessage');
                navigateTo('/dashboard'); // Redirect to the dashboard on success
            }
        })
        .catch((error) => {
            setIsLoading(false);  // Stop loading state
            if (error.response && error.response.data.errors) {
                // Handle backend validation errors
                setErrors(error.response.data.errors);
            } else {
                setLoginStatus(error.response ? error.response.data.message : 'An error occurred.');
            }
            setStatusHolder('showMessage');  // Show message in case of error
        });
    };

    useEffect(() => {
        if (loginStatus) {
            setStatusHolder('showMessage'); // Show the status message
            const timer = setTimeout(() => {
                setStatusHolder('message'); // Hide the status message after 2 seconds
            }, 2000);
            return () => clearTimeout(timer); // Clean up the timer
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
                        {/* Status message */}
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
                                    value={loginUserName}
                                />
                            </div>
                            {/* Display error if exists for username */}
                            {errors.username && <small className="errorText">{errors.username.join(', ')}</small>}
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
                                    value={loginPassword}
                                />
                            </div>
                            {/* Display error if exists for password */}
                            {errors.password && <small className="errorText">{errors.password.join(', ')}</small>}
                        </div>

                        <button
                            type="submit"
                            className="btn flex"
                            disabled={isLoading} // Disable the button while loading
                        >
                            {isLoading ? (
                                <span>Loading...</span>  // Show loading text when waiting
                            ) : (
                                <>
                                    <span>Login</span>
                                    <AiOutlineSwapRight className="icon" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
