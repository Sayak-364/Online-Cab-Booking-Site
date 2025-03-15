import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import Warning from './Warning';
import Success from './Success';

const UpdateCar = () => {
    const { id } = useParams();
    console.log(id)

    const [access , setAccess] = useState(false)

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [company, setCompany] = useState('');
    const [model, setModel] = useState('');
    const [carId, setCarId] = useState(id);
    const [mileage, setMileage] = useState(0);
    const [transmission, setTransmission] = useState('');
    const [seats, setSeats] = useState(0);
    const [luggage, setLuggage] = useState(0);
    const [fuel, setFuel] = useState('');
    const [description, setDescription] = useState('');
    const [features, setFeatures] = useState({
        airConditioning: false,
        childSeat: false,
        gps: false,
        luggage: false,
        music: false,
        seatBelt: false,
        sleepingBed: false,
        water: false,
        bluetooth: false,
        onboardComputer: false,
        audioInput: false,
        longTermTrips: false,
        carKit: false,
        remoteCentralLocking: false,
        climateControl: false
    });
    const [price, setPrice] = useState({
        hour: 0,
        day: 0,
        month: 0
    });

    const priceHandler = (period, value) => {
        setPrice({
            ...price,
            [period]: Number(value)
        });
    };

    const handleFeatureChange = (event) => {
        const { name, checked } = event.target;
        setFeatures({
            ...features,
            [name]: checked
        });
    };

    const submitHandler = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/car/update/${encodeURIComponent(carId)}`, {
                company,
                model,
                mileage,
                transmission,
                seats,
                luggage,
                fuel,
                features,
                description,
                price
            });

            if (response.data.message) {
                setMessage(response.data.message);
            } else if (response.data.error) {
                setError(response.data.error);
            }
        } catch (error) {
            console.error('Error updating car:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : error.message);
        }
    };

    const getData = async () => {
        try {
            const res = await axios.post(`http://localhost:3000/car/getbyid/${encodeURIComponent(carId)}`);
            const data = res.data;

            setCompany(data.company || '');
            setModel(data.model || '');
            setMileage(data.mileage || 0);
            setTransmission(data.transmission || '');
            setSeats(data.seats || 0);
            setLuggage(data.luggage || 0);
            setFuel(data.fuel || '');
            setDescription(data.description || '');
            setPrice({
                hour: data.price?.hour || 0,
                day: data.price?.day || 0,
                month: data.price?.month || 0
            });
            setFeatures({
                airConditioning: data.features?.airConditioning || false,
                childSeat: data.features?.childSeat || false,
                gps: data.features?.gps || false,
                luggage: data.features?.luggage || false,
                music: data.features?.music || false,
                seatBelt: data.features?.seatBelt || false,
                sleepingBed: data.features?.sleepingBed || false,
                water: data.features?.water || false,
                bluetooth: data.features?.bluetooth || false,
                onboardComputer: data.features?.onboardComputer || false,
                audioInput: data.features?.audioInput || false,
                longTermTrips: data.features?.longTermTrips || false,
                carKit: data.features?.carKit || false,
                remoteCentralLocking: data.features?.remoteCentralLocking || false,
                climateControl: data.features?.climateControl || false
            });
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        check()
        getData();
    }, []);

    const closePopupHandler = () => {
        setMessage('');
        setError('');
    };

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
    <h2></h2>
    :
    (
        <div className="create-car">
            {message && <Success message={message} close={closePopupHandler} page={`updatecar/${carId}`} />}
            {error && <Warning message={error} close={closePopupHandler} page={`updatecar/${carId}`} />}
            <div className="create-car-nav">
                <h3> Update Car Form </h3>
            </div>
            <div className="create-car-body">
                <div className="create-car-inputs">
                    <div>
                        <TextField 
                            id="company" 
                            label="Company" 
                            variant="outlined" 
                            value={company} 
                            onChange={(e) => setCompany(e.target.value)} 
                        />
                    </div>
                    <div>
                        <TextField 
                            id="model" 
                            label="Model" 
                            variant="outlined" 
                            value={model} 
                            onChange={(e) => setModel(e.target.value)} 
                        />
                    </div>
                    <div>
                        <TextField 
                            id="mileage" 
                            label="Mileage" 
                            variant="outlined" 
                            type="number"
                            value={mileage} 
                            onChange={(e) => setMileage(Number(e.target.value))} 
                        />
                    </div>
                    <div>
                        <TextField 
                            id="transmission" 
                            label="Transmission" 
                            variant="outlined" 
                            value={transmission} 
                            onChange={(e) => setTransmission(e.target.value)} 
                        />
                    </div>
                </div>
                <div className="create-car-inputs">
                    <div>
                        <TextField 
                            id="seats" 
                            label="Seats" 
                            variant="outlined" 
                            type="number"
                            value={seats} 
                            onChange={(e) => setSeats(Number(e.target.value))} 
                        />
                    </div>
                    <div>
                        <TextField 
                            id="luggage" 
                            label="Luggage" 
                            variant="outlined" 
                            type="number"
                            value={luggage} 
                            onChange={(e) => setLuggage(Number(e.target.value))} 
                        />
                    </div>
                    <div>
                        <TextField 
                            id="fuel" 
                            label="Fuel" 
                            variant="outlined" 
                            value={fuel} 
                            onChange={(e) => setFuel(e.target.value)} 
                        />
                    </div>
                    <div>
                        <TextField 
                            id="description" 
                            label="Description" 
                            variant="outlined" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                        />
                    </div>
                </div>
                <div className="create-car-inputs">
                    <div>
                        <TextField 
                            id="price-hour" 
                            label="Price per Hour" 
                            variant="outlined" 
                            type="number"
                            value={price.hour} 
                            onChange={(e) => priceHandler("hour", e.target.value)} 
                        />
                    </div>
                    <div>
                        <TextField 
                            id="price-day" 
                            label="Price per Day" 
                            variant="outlined" 
                            type="number"
                            value={price.day} 
                            onChange={(e) => priceHandler("day", e.target.value)} 
                        />
                    </div>
                    <div>
                        <TextField 
                            id="price-month" 
                            label="Price per Month" 
                            variant="outlined" 
                            type="number"
                            value={price.month} 
                            onChange={(e) => priceHandler("month", e.target.value)} 
                        />
                    </div>
                </div>
                <div className="create-car-features">
                    <div className="create-car-features-column">
                        <div>
                            <p>Air Conditioning </p>
                            <FormControlLabel 
                                control={<Checkbox name="airConditioning" checked={features.airConditioning} onChange={handleFeatureChange} />} 
                                 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} 
                            />
                        </div>
                        <div>
                            <p>Child Seat </p>
                            <FormControlLabel 
                                control={<Checkbox name="childSeat" checked={features.childSeat} onChange={handleFeatureChange} />} 
                                 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} 
                            />
                        </div>
                        <div>
                            <p>GPS </p>
                            <FormControlLabel 
                                control={<Checkbox name="gps" checked={features.gps} onChange={handleFeatureChange} />} 
                                 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} 
                            />
                        </div>
                        <div>
                            <p>Luggage </p>
                            <FormControlLabel 
                                control={<Checkbox name="luggage" checked={features.luggage} onChange={handleFeatureChange} />} 
                                 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} 
                            />
                        </div>
                        <div>
                            <p>Music </p>
                            <FormControlLabel 
                                control={<Checkbox name="music" checked={features.music} onChange={handleFeatureChange} />} 
                                 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} 
                            />
                        </div>
                    </div>
                    <div className="create-car-features-column">
                        <div>
                            <p>Seat Belt </p>
                            <FormControlLabel 
                                control={<Checkbox name="seatBelt" checked={features.seatBelt} onChange={handleFeatureChange} />} 
                                 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} 
                            />
                        </div>
                        <div>
                            <p>Sleeping Bed </p>
                            <FormControlLabel 
                                control={<Checkbox name="sleepingBed" checked={features.sleepingBed} onChange={handleFeatureChange} />} 
                                 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} 
                            />
                        </div>
                        <div>
                            <p>Water</p>
                            <FormControlLabel 
                                control={<Checkbox name="water" checked={features.water} onChange={handleFeatureChange} />} 
                                 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} 
                            />
                        </div>
                        <div>
                            <p>Bluetooth</p>
                            <FormControlLabel 
                                control={<Checkbox name="bluetooth" checked={features.bluetooth} onChange={handleFeatureChange} />} 
                                 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} 
                            />
                        </div>
                        <div>
                            <p>Onboard Computer</p>
                            <FormControlLabel 
                                control={<Checkbox name="onboardComputer" checked={features.onboardComputer} onChange={handleFeatureChange} />} 
                                 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} 
                            />
                        </div>
                    </div>
                    <div className="create-car-features-column">
                        <div>
                            <p>Audio Input</p>
                            <FormControlLabel 
                                control={<Checkbox name="audioInput" checked={features.audioInput} onChange={handleFeatureChange} />} 
                                 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} 
                            />
                        </div>
                        <div>
                            <p>Long Term Trips</p>
                            <FormControlLabel 
                                control={<Checkbox name="longTermTrips" checked={features.longTermTrips} onChange={handleFeatureChange} />} 
                                 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} 
                            />
                        </div>
                        <div>
                            <p>Car Kit</p>
                            <FormControlLabel 
                                control={<Checkbox name="carKit" checked={features.carKit} onChange={handleFeatureChange} />} 
                                 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} 
                            />
                        </div>
                        <div>
                            <p>Remote Central Locking</p>
                            <FormControlLabel 
                                control={<Checkbox name="remoteCentralLocking" checked={features.remoteCentralLocking} onChange={handleFeatureChange} />} 
                                 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} 
                            />
                        </div>
                        <div>
                            <p>Climate Control </p>
                            <FormControlLabel 
                                control={<Checkbox name="climateControl" checked={features.climateControl} onChange={handleFeatureChange} />} 
                                 
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} 
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="create-car-button">
                <Button variant="contained" color="success" size="large" onClick={submitHandler}>Submit</Button>
            </div>
        </div>
    );
}

export default UpdateCar;