import React, { useState, useEffect } from "react";
import axios from "axios";

import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';

import Warning from './Warning';
import Success from './Success';

const ChangeContacts = () => {

    const [access , setAccess] = useState(false)

    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const [message, setMessage] = useState('');
    const [data, setData] = useState(null);

    const [m, setM] = useState('');
    const [e, setE] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/contact/get');
            setData(response.data);
        } catch (error) {
            // You can't render JSX directly in catch block; use a state to manage errors
            setE(error.message);
        }
    }

    const sendData = async (finalAddress, finalPhone, finalEmail) => {
        try {
            const res = await axios.post('http://localhost:3000/contact/update', { address: finalAddress, phone: finalPhone, email: finalEmail });
            setM(res.data.message);
            setE(res.data.error);
        } catch (error) {
            setE(error.message);
        }
    }

    const checkInputs = () => {
        const finalAddress = address.trim() ? address : data.address;
        const finalPhone = phone.trim() ? phone : data.phone;
        const finalEmail = email.trim() ? email : data.email;
        
        sendData(finalAddress, finalPhone, finalEmail);
    }

    const popupHandler = () => {
        setM('');
        setE('');
    }

    useEffect(() => {
        check()
        fetchData();
    }, []);



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


    return !access?(<h2></h2>)
    
    :
    (
        <div className="change-contacts">
            {m && <Success message={m} close={popupHandler} page="changecontacts" />}
            {e && <Warning message={e} close={popupHandler} page="changecontacts" />}
            <div className="change-contacts-left">
                <h3>Current  Details :</h3>
                <div className="change-contacts-left-items">
                    <HomeIcon color="primary" />
                    <div>
                        <h3>Address:</h3>
                        {data && <p>{data.address}</p>}
                    </div>
                </div>
                <div className="change-contacts-left-items">
                    <PhoneAndroidIcon color="primary" />
                    <div>
                        <h3>Phone:</h3>
                        {data && <p>{data.phone}</p>}
                    </div>
                </div>
                <div className="change-contacts-left-items">
                    <EmailIcon color="primary" />
                    <div>
                        <h3>Email:</h3>
                        {data && <p>{data.email}</p>}
                    </div>
                </div>
            </div>
            <div className="change-contacts-right">
                <h3>Update form</h3>
                <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)}></input>
                <input type="text" placeholder="Phone" onChange={(e) => setPhone(e.target.value)}></input>
                <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                <div>
                    <Button onClick={checkInputs} variant="contained" color="primary" size="large">Send</Button>
                </div>
            </div>
        </div>
    );
}

export default ChangeContacts;
