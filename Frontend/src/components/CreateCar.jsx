import React, { useEffect, useState } from "react";
import axios from "axios";

import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

import Warning from './Warning'
import Success from './Success'


const CreateCar = () => {

    const [access , setAccess] = useState(false)

    const [message,setMessage] = useState('')
    const [error,setError] =useState('')

    const [company, setCompany] = useState('');
    const [model, setModel] = useState('');
    const [mileage, setMileage] = useState(0);
    const [transmission, setTransmission] = useState('');
    const [seats, setSeats] = useState(0);
    const [luggage, setLuggage] = useState(0);
    const [fuel, setFuel] = useState('');
    const [description, setDescription] = useState('');

    const [image, setImage] = useState(null);

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
        console.log(price);
    }

    const onInputChange = (e) => {
        setImage(e.target.files[0]);
    }

    const handleFeatureChange = (event) => {
        const { name, checked } = event.target;
        setFeatures({
            ...features,
            [name]: checked
        });
        console.log(features);
    }

    const formData = new FormData();
        formData.append("image", image);
        formData.append("company", company);
        formData.append("model", model);
        formData.append("mileage", mileage);
        formData.append("transmission", transmission);
        formData.append("seats", seats);
        formData.append("luggage", luggage);
        formData.append("fuel", fuel);
        formData.append("description", description);
        formData.append("price", JSON.stringify(price)); // Convert price to JSON string
        formData.append("features", JSON.stringify(features)); // Convert features to JSON string

    const submitHandler = async () => {
        try{
            const response = await axios.post('http://localhost:3000/car/create', formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });

            setMessage(response.data.message)
            setError(response.data.error)

        }
        catch(error){
            setError(error.message)
        }
    }

    const closePopupHandler = ()=>{
        setMessage('')
        setError('')
    }

    useEffect(()=>{
        check()
    })

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
            {message && <Success message={message} close={closePopupHandler} page='createcar'/>}
            {error && <Warning message={error} close={closePopupHandler} page='createcar'/>}
            <div className="create-car-nav">
                <h3> Create Car Form </h3>
            </div>
            <div className="create-car-body">
                <div className="create-car-inputs">
                    <div>
                        <TextField id="outlined-basic" label="Company" variant="outlined" onChange={(e) => setCompany(e.target.value)} />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Model" variant="outlined" onChange={(e) => setModel(e.target.value)} />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Mileage" variant="outlined" onChange={(e) => setMileage(e.target.value)} />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Transmission" variant="outlined" onChange={(e) => setTransmission(e.target.value)} />
                    </div>
                </div>
                <div className="create-car-inputs">
                    <div>
                        <TextField id="outlined-basic" label="Seats" variant="outlined" onChange={(e) => setSeats(e.target.value)} />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Luggage" variant="outlined" onChange={(e) => setLuggage(e.target.value)} />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Fuel" variant="outlined" onChange={(e) => setFuel(e.target.value)} />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Description" variant="outlined" onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                </div>
                <div className="create-car-inputs">
                    <div>
                        <TextField id="outlined-basic" label="Price per Hour" variant="outlined" onChange={(e) => priceHandler("hour", e.target.value)} />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Price per Day" variant="outlined" onChange={(e) => priceHandler("day", e.target.value)} />
                    </div>
                    <div>
                        <TextField id="outlined-basic" label="Price per Month" variant="outlined" onChange={(e) => priceHandler("month", e.target.value)} />
                    </div>
                    <div>
                        <input type="file" accept="image/*" onChange={onInputChange} id="car-image-input" placeholder="Image"/>
                    </div>
                </div>
                <div className="create-car-features">
                    <div className="create-car-features-column">
                        <div>
                            <p>Air Conditioning </p>
                            <FormControlLabel control={<Checkbox name="airConditioning" checked={features.airConditioning} onChange={handleFeatureChange} />}  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
                        </div>
                        <div>
                            <p>Child Seat </p>
                            <FormControlLabel control={<Checkbox name="childSeat" checked={features.childSeat} onChange={handleFeatureChange} />}  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
                        </div>
                        <div>
                            <p>GPS </p>
                            <FormControlLabel control={<Checkbox name="gps" checked={features.gps} onChange={handleFeatureChange} />}  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
                        </div>
                        <div>
                            <p>Luggage </p>
                            <FormControlLabel control={<Checkbox name="luggage" checked={features.luggage} onChange={handleFeatureChange} />}  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
                        </div>
                        <div>
                            <p>Music </p>
                            <FormControlLabel control={<Checkbox name="music" checked={features.music} onChange={handleFeatureChange} />}  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
                        </div>
                    </div>
                    <div className="create-car-features-column">
                        <div>
                            <p>Seat Belt </p>
                            <FormControlLabel control={<Checkbox name="seatBelt" checked={features.seatBelt} onChange={handleFeatureChange} />}  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
                        </div>
                        <div>
                            <p>Sleeping Bed </p>
                            <FormControlLabel control={<Checkbox name="sleepingBed" checked={features.sleepingBed} onChange={handleFeatureChange} />}  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
                        </div>
                        <div>
                            <p>Water</p>
                            <FormControlLabel control={<Checkbox name="water" checked={features.water} onChange={handleFeatureChange} />}  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
                        </div>
                        <div>
                            <p>Bluetooth</p>
                            <FormControlLabel control={<Checkbox name="bluetooth" checked={features.bluetooth} onChange={handleFeatureChange} />}  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
                        </div>
                        <div>
                            <p>Onboard Computer</p>
                            <FormControlLabel control={<Checkbox name="onboardComputer" checked={features.onboardComputer} onChange={handleFeatureChange} />}  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
                        </div>
                    </div>
                    <div className="create-car-features-column">
                        <div>
                            <p>Audio Input</p>
                            <FormControlLabel control={<Checkbox name="audioInput" checked={features.audioInput} onChange={handleFeatureChange} />}  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
                        </div>
                        <div>
                            <p>Long Term Trips</p>
                            <FormControlLabel control={<Checkbox name="longTermTrips" checked={features.longTermTrips} onChange={handleFeatureChange} />}  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
                        </div>
                        <div>
                            <p>Car Kit</p>
                            <FormControlLabel control={<Checkbox name="carKit" checked={features.carKit} onChange={handleFeatureChange} />}  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
                        </div>
                        <div>
                            <p>Remote Central Locking</p>
                            <FormControlLabel control={<Checkbox name="remoteCentralLocking" checked={features.remoteCentralLocking} onChange={handleFeatureChange} />}  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
                        </div>
                        <div>
                            <p>Climate Control </p>
                            <FormControlLabel control={<Checkbox name="climateControl" checked={features.climateControl} onChange={handleFeatureChange} />}  sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="create-car-button">
                <Button variant="contained" color="success" size="large" onClick={submitHandler}>Submit</Button>
            </div>
        </div>
    )
}

export default CreateCar;
