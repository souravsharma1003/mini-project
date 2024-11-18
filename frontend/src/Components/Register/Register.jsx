import React, { useState, useEffect } from 'react';
import './Register.css';
import '../../App.css';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import video from '../../Assets/video.mp4';
import logo from '../../Assets/logo.png';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { MdMarkEmailRead } from 'react-icons/md';

const Register = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [registerStatus, setRegisterStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate(); // Renamed for clarity

    const handleSignup = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Reset errors before starting a new request
        setErrors({});

        Axios.post('https://mini-project-api-six.vercel.app/auth/signup', {
            email: email,
            username: userName,
            password: password,
        })
            .then((response) => {
                setIsLoading(false);
                if (response.data.success) {
                    setRegisterStatus('Registration successful!');
                    setTimeout(() => {
                        navigate('/login'); // Navigate programmatically
                    }, 2000);
                } else {
                    setRegisterStatus(response.data.message || 'Signup failed.');
                    setEmail('');
                    setUserName('');
                    setPassword('');
                }
            })
            .catch((error) => {
                setIsLoading(false);
                if (error.response && error.response.data.errors) {
                    // Handle field-specific errors sent from the backend
                    setErrors(error.response.data.errors);
                } else {
                    setRegisterStatus(error.response ? error.response.data.message : 'An error occurred.');
                }
                // Clear form fields on failed attempt
                setEmail('');
                setUserName('');
                setPassword('');
            });
    };

    useEffect(() => {
        if (registerStatus) {
            const timer = setTimeout(() => setRegisterStatus(''), 2000);
            return () => clearTimeout(timer);
        }
    }, [registerStatus]);

    return (
        <div className="registerPage flex">
            <div className="container flex">
                <div className="videoDiv">
                    <video src={video} autoPlay muted loop></video>
                    <div className="textDiv">
                        <h2 className="title">Detect and Diagnose Bone Fractures with AI Precision</h2>
                        <p>AI-Powered Bone Fracture Detection!</p>
                    </div>
                    <div className="footerDiv flex">
                        <span className="text">Have an account?</span>
                        {/* Add navigation to the Login page using button */}
                        <button className="btn" onClick={() => navigate('/login')}>
                            Login
                        </button>
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img className="logo" src={logo} alt="Logo" />
                        <h3>Let Us Know You!</h3>
                    </div>

                    <form className="form grid" onSubmit={handleSignup}>
                        {/* Status message */}
                        <span
                            className={`statusMessage ${registerStatus ? 'showMessage' : ''} ${
                                registerStatus === 'Registration successful!' ? 'successMessage' : ''
                            }`}
                            aria-live="assertive"
                        >
                            {registerStatus}
                        </span>

                        <div className="inputDiv">
                            <label htmlFor="email">Email</label>
                            <div className="input flex">
                                <MdMarkEmailRead className="icon" aria-hidden="true" />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                            </div>
                            {errors.email && <small className="errorText">{errors.email.join(', ')}</small>}
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className="icon" aria-hidden="true" />
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Enter Username"
                                    onChange={(e) => setUserName(e.target.value)}
                                    value={userName}
                                    required
                                />
                            </div>
                            {errors.username && <small className="errorText">{errors.username.join(', ')}</small>}
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="password">Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className="icon" aria-hidden="true" />
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                            </div>
                            {errors.password && <small className="errorText">{errors.password.join(', ')}</small>}
                        </div>

                        <button type="submit" className="btn flex" disabled={isLoading}>
                            {isLoading ? (
                                <div className="spinner"></div>
                            ) : (
                                <>
                                    <span>Register</span>
                                    <AiOutlineSwapRight className="icon" aria-hidden="true" />
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
