import React, { useState, useEffect } from 'react'; 
import DeleteIcon from '@mui/icons-material/Delete';
import { brown } from '@mui/material/colors';
import axios from 'axios';
import Success from './Success';
import Warning from './Warning';

import 'simplebar/dist/simplebar.min.css';
import SimpleBar from 'simplebar-react';

const ChangeMessages = () => {

  const [access , setAccess] = useState(false)

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [elementData, setElementData] = useState({});
  const [refresh, setRefresh] = useState(false);

  const getMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/message/get');
      setData(response.data.reverse());
      console.log(response.data);
    } catch (error) {
      setError('Failed: ' + error.message);
    }
  };

  const refreshHandler = () => {
    setRefresh(!refresh);
  };

  useEffect(()=>{
    check()
  },[])

  useEffect(() => {
    getMessages();
  }, [refresh]);

  const showMessage = (element) => {
    setElementData(element);
    setShow(true);
  };

  const errorHandler = (error) => {
    setError(error);
  };

  const close = () => {
    setShow(false);
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
    <div className="change-messages">
      {message && <Success />}
      {error && <Warning />}
      {show && <Show {...elementData} close={close} />}
      <div className="table">
        <div className="thead">
          <div className="tr">
            <div className="th">Name</div>
            <div className="th">Email id</div>
            <div className="th">Subject</div>
          </div>
        </div>
        <div className="tbody">
          {data && data.map((element, index) => (
            
            <Element 
              key={index}
              {...element}
              index={index}
              showMessage={showMessage}
              refreshHandler={refreshHandler}
              errorHandler={errorHandler}
            ></Element>
          ))}
        </div>
      </div>
    </div>
  );
};

const Element = ({ _id ,name, email, subject, message, index, showMessage, refreshHandler, errorHandler }) => {

  const del = async (id, event) => {
    event.stopPropagation();
    try {
      console.log("request id : "+id)
      const response = await axios.post(`http://localhost:3000/message/delete`,{id});
      if (response.data) {
        refreshHandler();
      } else {
        errorHandler("No Messages Found");
      }
    } catch (error) {
      errorHandler(error.response.data.error);
    }
  };

  return (
    <div
      className="change-messages-row"
      style={{ animationDelay: `${index * 0.02}s` }}
      onClick={() => showMessage({ name, email, subject, message })}
    >
      <div className="td">{name}</div>
      <div className="td">{email}</div>
      <div className="td">{subject}</div>
      <div 
        className='change-messages-row-img'
        onClick={(event) => del(_id, event)}
      >
        <DeleteIcon sx={{ color: brown[200] }} />
      </div>
    </div>
  );
};

const Show = ({ name, email, subject, message, close }) => {

  const openGmail = (event) => {
    event.preventDefault();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
    window.open(gmailUrl, '_blank');
  };

  return (
    <div className="show">
      <div className="show-container">
        <h2>{subject}</h2>
        <p>{name}</p>
        <a href="#" onClick={(e) => openGmail(e)}><h4>{email}</h4></a>
        <p id='show-container-message'>{message}</p>
        
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default ChangeMessages;
