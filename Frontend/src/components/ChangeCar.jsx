import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SearchIcon from '@mui/icons-material/Search';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme } from '@mui/material/styles';


import Warning from "./Warning";
import CarCards from "./CarCards"; // Fixed typo: should be CarCard, not CardCard

const ChangeCar = () => {

    const [access , setAccess] = useState(false)

    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState(''); // Added missing state for message
    const [searchTerm, setSearchTerm] = useState(''); // State for search input

    const popupHandler = () => {
        setError('');
    }

    const fetchCars = async () => {
        try {
            console.log("fetch data")
            const response = await axios.get('http://localhost:3000/car/getall');
            const carsData = response.data.reverse();
            console.log(carsData)
            setCars(carsData);
            setFilteredCars(carsData);
        } catch (error) {
            setError(error.response ? error.response.data.error : error.message);
        }
    }

    const createCar = () => {
        window.location.href = '/createcar'; // Updated to relative path for better compatibility
    }

    const cardHandler = (m, e) => {
        setMessage(m);
        setError(e);
    }

    useEffect(() => {
        check()
        console.log("check done")
        fetchCars();
    }, []);

    useEffect(() => {
        const filtered = cars.filter(car =>
            car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            car.company.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredCars(filtered);
    }, [searchTerm, cars]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const check = async () => {
        try{
            const response = await axios.get('http://localhost:3000/private/admin',{
                withCredentials:true,
            })
            if(response.data.access){
                setAccess(true)
            }
            else{
                console.log(response.data)
            }
        }
        catch(error){
            console.log(error.message)
        }
    }

    return !access?
    (<h2></h2>)
    :
    (
        <div className="changeCar">
            {error && <Warning close={popupHandler} page="changecar" />}
            {message && <Success message={message} close={popupHandler} page="changecar" />} {/* Display success message if available */}
            
            {/* navbar */}
            <div className="changeCar-dash">
                <div className="car-create">
                    <Button variant="contained" color="success" startIcon={<AddCircleOutlineIcon />} size="large" onClick={createCar}>
                        Create Car
                    </Button>
                </div>
                <div className="car-search">
                    <input 
                        placeholder="Search" 
                        value={searchTerm} 
                        onChange={handleSearchChange} // Handle search input change
                    />
                    
                </div>
            </div>
            {/* navbar */}
            <div className="changeCar-container">
                {filteredCars.length > 0
                    ? filteredCars.map((car, index) => (
                        <CarCards key={index} index={index} id={car._id} model={car.model} company={car.company} image={car.carImage} output={cardHandler} />
                    ))
                    : <p style={{color:"darkgrey",fontSize:'1.5rem'}}>No Cars Available</p>
                }
            </div>
        </div>
    );
}

export default ChangeCar;