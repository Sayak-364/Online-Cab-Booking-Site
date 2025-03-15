import React, { useState } from 'react';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { grey } from '@mui/material/colors';
import { GoogleLogin } from '@react-oauth/google';
import Warning from './Warning';
import Success from './Success';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    


    const visibilityHandler = () => {
        setShowPassword(!showPassword);
    };

    const popupHandler = () => {
        setMessage('');
        setError('');
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            console.log(email);
            const response = await axios.post("http://localhost:3000/user/getbyemail", { email, password });
            console.log(response.data.message || response.data.error);
            setMessage(response.data.message);
            setError(response.data.error);
        } catch (error) {
            console.log(error.response?.data.message);
            setError(error.response?.data.error || 'An unexpected error occurred');
        }
    };

    const openUrl = () => {
        window.location.href = 'http://localhost:5173/register';
    };

    const handleGoogleLogin = async (credentialResponse) => {
        const idToken = credentialResponse.credential;
    
        try {
            const res = await axios.post('http://localhost:3000/user/auth/google/login', { token: idToken });
            console.log(res.data.message);
            setMessage(res.data.message);
            setError(res.data.error);
            // Redirect to the home page or other actions
            setTimeout(() => {
                navigate('/'); // Use navigate instead of window.location.href
            }, 2000);
        } catch (err) {
            console.error('Google Login failed:', err.response?.data?.error || err.message);
            setError(err.res?.data.error || 'An unexpected error occurred');
            setMessage('');
        }
    };
    
    
    
    const handleGoogleFailure = (error) => {
        console.log('Google Sign-In Error:', error); // Debugging
        if (error.error === 'popup_closed_by_user') {
            setError('Google Sign-In popup was closed before completing the sign-in process.');
        } else {
            setError('Google Sign-In failed');
        }
        setMessage(''); // Clear previous messages
    };

    return (
        <div className='login'>
            {message && <Success message={message} close={popupHandler} page="login" />}
            {error && <Warning message={error} close={popupHandler} page="login" />}

            <div className='login-main'>
                <form method='post' onSubmit={submitHandler}>
                    <h2>Sign In</h2>
                    <label>Email</label>
                    <input
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='example@gmail.com'
                        required
                    />
                    <label>Password</label>
                    <div className='input'>
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='*****'
                            required
                        />
                        <button
                            type='button'
                            onClick={visibilityHandler}
                            className='visibility'
                        >
                            {showPassword ? (
                                <VisibilityIcon sx={{ color: grey[900] }} />
                            ) : (
                                <VisibilityOffIcon sx={{ color: grey[900] }} />
                            )}
                        </button>
                    </div>
                    <button className='login-main-button' type='submit'>Login</button>
                    <div className='w-72 pt-2'>
                    <GoogleLogin
                        onSuccess={handleGoogleLogin}
                        onFailure={handleGoogleFailure}
                        buttonText="Sign In with Google"
                        
                    />
                </div>
                </form>
                <div className='login-left'>
                    <h2>Welcome to login</h2>
                    <p>Don't have an account?</p>
                    <button onClick={openUrl}>Sign up</button>
                </div>
                
            </div>
        </div>
    );
};

export default Login;
