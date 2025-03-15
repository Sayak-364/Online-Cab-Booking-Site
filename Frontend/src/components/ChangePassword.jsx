import React,{useState,useEffect} from "react";
import {useSearchParams} from 'react-router-dom';
import axios from "axios";

import TextField from '@mui/material/TextField';

import Success from './Success';
import Warning from './Warning';

const ChangePassword = () =>{

    const [password,setPassword] = useState('')
    const [rePassword,setRePassword] = useState('')
    const [message,setMessage] = useState('')
    const [error,setError] = useState('')
    
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');

    console.log(email)
    const passwordHandler = (e) =>{
        setPassword(e.target.value)
    }
    const rePasswordHandler = (e) =>{
        setRePassword(e.target.value)
    }

    
    const compare = () => {
        console.log(password,rePassword)
        if(password.length >5){
            if(password === rePassword){
                submit()
            }
            else{
                setError("Not Matched")
            }
        }
        else{
            setError("Min length 6 needed")
        }
    }
    const submit = async () =>{
        try{
            const response = await axios.put(`http://localhost:3000/user/update`,{email,password})
            console.log("update successfull")
            setMessage(response.data.message)
            setError(response.data.error)
        }
        catch(error){
            console.log(error.message)
            setError(error.message)
        }
    }

    const popupHandler=()=>{
        setMessage('')
        setError('')
        
    }

    return(
        <div className="changepassord">
            {message && <Success message={message}  close={popupHandler} page="reset-password" />}
            {error && <Warning message={error}  close={popupHandler} page="reset-password" />}
            <div className="changepassword-container">
                <h2>Change Password</h2>
                <TextField onChange={passwordHandler} id="outlined-basic" label="Enter New Passord" variant="outlined" sx={{width: 500, maxWidth: '100%'}}/>
                <TextField onChange={rePasswordHandler} id="outlined-basic" label="Re-Enter Password" variant="outlined" sx={{width: 500, maxWidth: '100%'}}/>
                <button onClick={compare}>Submit</button>
            </div>
        </div>
    )
}

export default ChangePassword