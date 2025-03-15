import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { brown } from '@mui/material/colors';

const ChangeUsers = () => {

  const [access , setAccess] = useState(false)

  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [refresh,setRefresh] = useState(false)

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user/get');
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };

  const refreshHandler = () =>{
    setRefresh(!refresh)
  }

  useEffect(()=>{
    check()
  },[])
  useEffect(() => {
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
  <h2></h2>
  :
  (
    <div className="change-messages">
      <div className="table">
        <div className="thead">
          <div className="tr">
            <div className="th">Name</div>
            <div className="th">Email id</div>
          </div>
        </div>
        <div className="tbody">
          {data && data.map((element, index) => (
            <User key={element._id} id={element._id} name={element.name} email={element.email} index={index} refresh={refreshHandler}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChangeUsers;

const User = ({ id, name, email, index ,refresh}) => {
  const del = async (id, event) => {
    event.stopPropagation();
    try {
      console.log("request id : " + id);
      const response = await axios.post(`http://localhost:3000/user/delete`, { id });
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
