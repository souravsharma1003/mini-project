import React, { useState, useEffect } from 'react';
import './Register.css';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
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
    const [statusHolder, setStatusHolder] = useState('message');
    const navigateTo = useNavigate();

    const handleSignup = (e) => {
        e.preventDefault();

        // Send the registration data to the backend in JSON format
        Axios.post('https://mini-project-api-six.vercel.app/auth/signup', {
            email: email,
            username: userName,
            password: password
        })
            .then((response) => {
                if (response.data.success) {
                    setRegisterStatus('Registration successful!');
                    setTimeout(() => {
                        navigateTo('/login');
                    }, 2000); // Redirect to login after 2 seconds
                } else {
                    setRegisterStatus(response.data.message || 'Signup failed.');
                }
            })
            .catch((error) => {
                setRegisterStatus(error.response ? error.response.data.message : 'An error occurred.');
                console.log(error);
            });

        // Clear input fields after submission
        setEmail('');
        setUserName('');
        setPassword('');
    };

    useEffect(() => {
        if (registerStatus) {
            setStatusHolder('showMessage');
            setTimeout(() => {
                setStatusHolder('message');
            }, 2000);
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
                        <Link to={'/login'}>
                            <button className="btn">Login</button>
                        </Link>
                    </div>
                </div>

                <div className="formDiv flex">
                    <div className="headerDiv">
                        <img className="logo" src={logo} alt="Logo Image" />
                        <h3>Let Us Know You!</h3>
                    </div>

                    <form className="form grid" onSubmit={handleSignup}>
                        {/* Display registration status */}
                        <span className={statusHolder}>{registerStatus}</span>

                        <div className="inputDiv">
                            <label htmlFor="email">Email</label>
                            <div className="input flex">
                                <MdMarkEmailRead className="icon" />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter Email"
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="inputDiv">
                            <label htmlFor="username">Username</label>
                            <div className="input flex">
                                <FaUserShield className="icon" />
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Enter Username"
                                    onChange={(event) => setUserName(event.target.value)}
                                    required
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
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn flex">
                            <span>Register</span>
                            <AiOutlineSwapRight className="icon" />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default Register;
