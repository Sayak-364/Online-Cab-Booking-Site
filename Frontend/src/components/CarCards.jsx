import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";

const CarCards = (props) => {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const updateHandler = () => {
        navigate(`/updatecar/${props.id}`);
    };

    const deleteHandler = async () => {
        try {
            console.log(props.model)
            const response = await axios.delete('http://localhost:3000/car/deletebymodel',  {
                params: { model: props.model }
            });
            console.log("res " +response.data.message)
            setMessage(response.data.message);
            setError(response.data.error);
        } catch (error) {
            setError(error.message);
            
        }
        props.output(message, error);
    }

    return (
        <div key={props.index} className="car-card" style={{ animationDelay: `${props.index * 0.05}s` }}>
            <div className="car-pic">
            {props.image && <img src={props.image} alt="Car" />}
            
            </div>
            <div className="car-info">
                <h3 className="car-model">{props.model}</h3>
                <h4 className="car-company">{props.company}</h4>
            </div>
            <div className="car-buttons">
                <div className="car-button1">
                    <Button 
                        onClick={updateHandler} 
                        variant="contained" 
                        color="success" 
                        startIcon={<UpdateIcon />} 
                        size="medium" 
                    >
                        Update
                    </Button>
                </div>
                <div className="car-button2">
                    <Button 
                        onClick={deleteHandler} 
                        variant="contained" 
                        color="error" 
                        startIcon={<DeleteIcon />} 
                        size="medium" 
                    >
                        Delete
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default CarCards;
