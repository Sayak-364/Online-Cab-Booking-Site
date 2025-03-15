import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { brown } from '@mui/material/colors';
import Button from '@mui/material/Button';

import Warning from './Warning'
import Success from './Success'


const ChangeAdmin = () =>{

    const [access , setAccess] = useState(false)

    const [data, setData] = useState([]);
    const [refresh,setRefresh] = useState(false)
    const [popup , setPopup] = useState(false)

    const [message, setMessage] = useState('')
    const [error , setError] = useState('')
    
    const submitHandler = async (name,email,password) => {
      try{
        console.log(name,email,password)
        const response = await axios.post('http://localhost:3000/admin/create',{name,email,password})
        close(false)
        setMessage(response.data.message)
        setError(response.data.error)
      }
      catch(error){
        setError(error.response.data.error)
      }
    }


     const fetchData = async () => {
        try {
          const response = await axios('http://localhost:3000/admin/getadmin');
          setMessage(response.data.message)
          setError(response.data.error)
          setData(response.data.reverse());
          console.log(response.data);
        } catch (error) {
          setError(error.response.data.error)
        }
    };

    
    const popupHandler = (value) => {
      setPopup(value)
      setError('')
    }

    const refreshHandler = () =>{
        setRefresh(!refresh)
    }
    
    useEffect(() => {
        check()
        fetchData();
    }, [refresh]);
      
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
   
    <div className="change-messages">
      {message && <Success />}
      {error && <Warning close={popupHandler} message={error}/>}
       { popup && <Popup  submitHandler={submitHandler}/>}
      <div className="table">
        <div className="thead">
          <div className="tr">
            <div className="th">Name</div>
            <div className="th">Email id <Button variant="contained" color="primary" size="normal" onClick={()=>popupHandler(true)} >Add Admin</Button></div>
            
          </div>
        </div>
        <div className="tbody">
          {data && data.map((element, index) => (
            <Admin key={element._id} id={element._id} name={element.name} email={element.email} index={index} refresh={refreshHandler}/>
          ))}
        </div>
      </div>
    </div>
)
}

export default ChangeAdmin



const Admin = ({ id, name, email, index ,refresh}) => {
    const del = async (id, event) => {
      event.stopPropagation();
      try {
        console.log("request id : " + id);
        const response = await axios.post(`http://localhost:3000/admin/delete`, { id });
        if (response.data) {
          console.log("response  " + response);
          refresh()
          // window.location.reload()
        } else {
          console.log("response  " + response);
        }
      } catch (error) {
        console.log("response  " + error.message);
      }
    };
  
    return (
      <div
        className="change-messages-row"
        style={{ animationDelay: `${index * 0.02}s` }}
      >
        <div className="td">{name}</div>
        <div className="td">{email}</div>
        
        <div 
          className='change-messages-row-img'
          onClick={(e) => del(id, e)}
        >
          <DeleteIcon sx={{ color: brown[200] }} />
        </div>
      </div>
    );
  };



  const Popup = ({submitHandler}) =>{

    const [name , setName] = useState('')
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')


    const nameHandler = (e) =>{
      setName(e.target.value)
    }
    const emailHandler = (e) =>{
      setEmail(e.target.value)
    }
    const passwordHandler = (e) =>{
      setPassword(e.target.value)
    }
    
    return(
      <div className="create-admin">
      <div className="create-admin-container">
        {/* <h2>{subject}</h2>
        <p>{name}</p>
        <a href="#" onClick={(e) => openGmail(e)}><h4>{email}</h4></a>
        <p id='show-container-message'>{message}</p>*/}
        <label className="create-admin-label">Name</label>
        <div className="create-admin-label">
          <input type="text" value={name}  onChange={nameHandler}></input>
        </div>
        <label className="create-admin-label">Email</label>
        <div className="create-admin-label">
          <input type="text" value={email}  onChange={emailHandler}></input>
        </div>
        <label className="create-admin-label">Password</label>
        <div className="create-admin-label">
          <input type="text" value={password}  onChange={passwordHandler}></input>
        </div>

        <button onClick={(e)=>submitHandler(name,email,password)}>Submit</button> 
      </div>
    </div>
    )
  }
  