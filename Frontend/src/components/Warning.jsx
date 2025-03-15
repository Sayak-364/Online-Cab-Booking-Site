import React,{useState} from "react";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import Button from '@mui/material/Button';

import Stack from '@mui/material/Stack';
import { pink } from '@mui/material/colors';
import SvgIcon from '@mui/material/SvgIcon';

import './SuccessWarning.css'

const Warning = (props) =>{

    const handleClick = ()=>{
        props.close()
    }

    

    return(
        <div className="warning">
            <div className="warning-main">
                <div className="icon">
                    <WarningAmberIcon sx={{ fontSize: 85 ,color: pink[50]  }}   />
                </div>
                <div className="warning-bottom" >
                    <h2>Warning!</h2>
                    <p>{props.message}</p>
                    <Button  variant="contained"  color="error" onClick={handleClick}>Close</Button>
                </div>
            </div>

        </div>
    )

}

export default Warning