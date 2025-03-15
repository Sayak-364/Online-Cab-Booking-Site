import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { grey } from '@mui/material/colors';
import { GoogleLogin } from '@react-oauth/google';
import Success from './Success';
import Warning from './Warning';
import OTP from './OTP';
import './Login.css';

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [otp, setOtp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const visibilityHandler = () => {
    setShowPassword(!showPassword);
  };

  const popupHandler = () => {
    setMessage('');
    setError('');
  };

  const setErrorHandler = (error) => {
    setError(error);
  };
  
  const setMessageHandler = (message) => {
    setMessage(message);
  };

  const setOtpHandler = () => {
    setOtp(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/user/verifyinputs", { name, email, password });
      setError(response.data.error);
      if (response.data.result) {
        createOTP(email);
        setOtp(true);
      }
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const createOTP = async (email) => {
    try {
      await axios.post('http://localhost:3000/otp/create', { email });
      console.log("createotp");
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  const handleGoogleRegister = async (credentialResponse) => {
    const idToken = credentialResponse.credential;

    try {
      const res = await axios.post('http://localhost:3000/user/auth/google/register', { token: idToken });
      const jwtToken = res.data.token;
      document.cookie = `token=${jwtToken}; path=/; Secure; HttpOnly`;
      setMessage(res.data.message);
      setError('');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Google Registration failed:', err.response?.data?.error || err.message);
      setError('Google Registration failed: ' + (err.response?.data?.error || err.message));
      setMessage('');
    }
  };

  const handleGoogleFailure = (error) => {
    console.log('Google Sign-In Error:', error);
    if (error.error === 'popup_closed_by_user') {
      setError('Google Sign-In popup was closed before completing the sign-in process.');
    } else {
      setError('Google Sign-In failed');
    }
    setMessage('');
  };

  const openUrl = () => {
    navigate('/login');
  };

  return (
    <div className='register'>
      {otp && <OTP name={name} email={email} password={password} close={setOtpHandler} message={setMessageHandler} error={setErrorHandler} />}
      {message && <Success message={message} close={popupHandler} page="register" />}
      {error && <Warning message={error} close={popupHandler} page="register" />}
      <div className='register-main'>
        <form onSubmit={submitHandler}>
          <h2>Sign Up</h2>
          <label>Name:</label>
          <input type='text' required value={name} onChange={(e) => setName(e.target.value)} placeholder='example'></input>
          <label>Email:</label>
          <input type='email' required value={email} onChange={(e) => setEmail(e.target.value)} placeholder='example@gmail.com'></input>
          <label>Password:</label>
          <div className='input'>
            <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder='*****' required />
            <button type='button' onClick={visibilityHandler} className='visibility'>
              {showPassword ? <VisibilityIcon sx={{ color: grey[900] }} /> : <VisibilityOffIcon sx={{ color: grey[900] }} />}
            </button>
          </div>
          <button className='register-main-button' type='submit'>Register</button>
          <div className='w-72 pt-2'>
            <GoogleLogin onSuccess={handleGoogleRegister} onFailure={handleGoogleFailure} buttonText="Sign Up with Google" />
          </div>
        </form>
        <div className='register-left'>
          <h2>Welcome to register</h2>
          <p>Already have an account?</p>
          <button onClick={openUrl}>Sign in</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
