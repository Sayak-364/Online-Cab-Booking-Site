import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Warning from "./Warning";
import bg2 from '../assets/bg_3.jpg';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Pagination } from "@mui/material";
import { Link , useNavigate  } from 'react-router-dom';

const Car = () => {
    const [cars, setCars] = useState([]);
    const [error, setError] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 9; // Number of cars per page

    const navigate = useNavigate();

    const popupHandler = () => {
        setError('');
    }

    const fetchCars = async (page) => {
        try {
            const response = await axios.get('http://localhost:3000/car/get', {
                params: { page, limit }
            });
            setCars(response.data.cars.reverse());
            setTotalPages(response.data.totalPages);
        } catch (error) {
            setError(error.response?.data?.error || 'An error occurred');
        }
    }
    const check =async  ()=>{
        const res = await axios.get('http://localhost:3000/private/protected',{
          withCredentials:true,
        })
        if(res.data.access){
          navigate('/cab-book');
        }
        else{
          navigate('/login')
        }
       }

    useEffect(() => {
        fetchCars(currentPage);
    }, [currentPage]);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    }

    return (
        <>
            <div className="bg-pagination">
            <div className='relative h-[90vh] mb-12'>
  {/* Ensure the image loads correctly */}
  <img 
    src={bg2} 
    alt="Car background" 
    className='absolute top-0 left-0 w-full h-full object-cover object-top' 
  />
  <div className='absolute inset-0 bg-black bg-opacity-40' /> {/* Dark overlay */}
  <p className='absolute bottom-20 left-20 font-sans font-semibold text-xs text-white opacity-40 p-4'>
    HOME<KeyboardArrowRightIcon />CARS
  </p>
  <h1 className='absolute bottom-10 left-20 font-sans font-semibold text-4xl text-white p-4'>
    Choose Your Car
  </h1>
</div>

                <div className="changeCar">
                    {error && <Warning close={popupHandler} page="changecar" />}
                    <div className="changeCar-container">
                        {cars.length > 0 ? (
                            cars.map((car, index) => (
                                <div key={index} className="car-card">
                                    <div className="car-pic">
                                        {/* Display the car image */}
                                        {car.carImage ? (
                                            <img src={car.carImage} alt={car.model} className="car-image rounded-t-lg" />
                                        ) : (
                                            <p>No Image Available</p>
                                        )}
                                    </div>
                                    <div className="car-info">
                                        <h3 className="car-model">{car.model}</h3>
                                        <div className="car-rent">
                                            <h4 className="car-company">{car.company}</h4>
                                            <h4 className="car-company"><span>{car.price.day}</span>/day</h4>
                                        </div>
                                    </div>
                                    <div className="car-buttons">
                                        <div className="car-button1"><Button onClick={check} variant="contained" size="medium">Book Now</Button></div>
                                        <div className="car-button2">
                                            <Link to={`/details?id=${car._id}`}>
                                                <Button variant="contained" color="success" size="medium">Details</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No Cars Available</p>
                        )}
                    </div>
                    <div className="flex justify-center m-20 bg-pagination pl-5">
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Car;
