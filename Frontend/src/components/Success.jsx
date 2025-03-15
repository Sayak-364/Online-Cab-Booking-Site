import React from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import { pink } from '@mui/material/colors';

import './SuccessWarning.css'

const Success = (props)=>{

    const handleClick = ()=>{
        redirect()
        props.close()
    }

    const redirect=()=>{
        if(props.page=='login' || props.page=='reset-password'){
            window.location.href = 'http://localhost:5173/';
        }
        else if(props.page=='contacts')
            window.location.href = 'http://localhost:5173/contacts';
        else{
            window.location.reload()
        }
    }

    return(
        <div className="success">
            <div className="success-main">
                <div className="icon">
                    <CheckCircleIcon sx={{ fontSize: 85 ,color: pink[50]  }}   />
                </div>
                <div className="success-bottom" >
                    <h2>Success!</h2>
                    <p>{props.message}</p>
                    <Button  variant="contained"  color="success" onClick={handleClick}>Continue</Button>
                </div>
            </div>

        </div>
    )
}

export default Success