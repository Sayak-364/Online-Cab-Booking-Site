import React,{useState,useEffect} from "react";
import axios from "axios";

import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';

import Warning from './Warning'
import Success from './Success'

const Contacts = () =>{

    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [subject,setSubject] = useState('')
    const [message,setMessage] = useState('')
    const [send,setSend] = useState(false)
    const [data,setData] = useState(null)

    const [m,setM] = useState('')
    const [e,setE] = useState('')

    const fetchData = async() =>{
        try{
            const response = await axios.get('http://localhost:3000/contact/get')       
            setData(response.data)     
        }
        catch(error){
            <Warning message={error.message}  close={popupHandler} page="contacts" />
        }
    }
    const sendData = async () =>{
        try{
            const res = await axios.post('http://localhost:3000/message/create',{name,email,subject,message})
            setM(res.data.message)
            setE(res.data.error)
            console.log(res.data)
        }
        catch(error){
            <Warning message={error.message}  close={popupHandler} page="contacts" />
        }
    }

    const popupHandler=()=>{
        setM('')
        setE('')
    }
    

    useEffect(()=>{
        fetchData()
    },[])

    
    
    return(
        <div className="change-contacts">
            {m && <Success message={m}  close={popupHandler} page="contacts" />}
            {e && <Warning message={e}  close={popupHandler} page="contacts" />}
            <div className="change-contacts-left">
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
                <input placeholder="Your Name" onChange={(e)=>setName(e.target.value)}></input>
                <input placeholder="Your Email" onChange={(e)=>setEmail(e.target.value)}></input>
                <input placeholder="Subject" onChange={(e)=>setSubject(e.target.value)}></input>
                <textarea placeholder="Message" id="change-contacts-input-4" onChange={(e)=>setMessage(e.target.value)}></textarea>
                <div >
                    <Button onClick={sendData} variant="contained" color="primary"   size="large" >Send</Button>
                </div>
            </div>
        </div>
    )
}

export default Contacts