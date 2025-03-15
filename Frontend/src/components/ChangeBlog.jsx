import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { brown } from '@mui/material/colors';

import Button from '@mui/material/Button';

import Warning from './Warning'
import Success from './Success'

const ChangeBlog = () => {

    const [data,setData] = useState([])
    const [refresh,setRefresh] = useState(false)
    const [popup,setPopup] = useState('')

    const navigate = useNavigate()
 
    const fetchData = async () => {
        try{
            const response = await axios.get('http://localhost:3000/blog/get')
            console.log(response.data)
            setData(response.data)
        }
        catch(error){
            alert(error.message)
        }
    }

    const refreshHandler = () => {
      setRefresh(!refresh)
    }
    const popUpHandler = (data) => {
      setPopup(data)
    }
    const closePopup = () => {
      setPopup('')
    }

    useEffect(()=>{
        fetchData()
    },[refresh])

    return(
        <div className="change-messages">
      {popup && <Popup blog={popup} close={closePopup}/>}
      <div className="table">
        <div className="thead">
          <div className="tr">
            <div className="th">Date</div>
            <div className="th">Heading</div>
            <div className="th">Text
              <Button variant="contained" color="primary" size="normal" onClick={(e)=>{navigate('/blog')}}  >Add Blog</Button>
            </div>
          </div>
        </div>
        <div className="tbody">
          {data && data.map((element, index) => (
            <Blog
              key={element._id}
              blog={element}
              index={index}
              refresh={refreshHandler}
              popup={popUpHandler}
            
            />
          ))}
        </div>
      </div>
    </div>
    )
}

export default ChangeBlog



const Blog = ({blog,index,refresh,popup}) => {

  const del = async (e,id) => {
    e.stopPropagation();
    try{
      console.log('del performed')
      const response = await axios.post('http://localhost:3000/blog/delete',{id})
      if(response.data.message){
        refresh()
      }
      console.log(response.data)
    }
    catch(error){
      console.log(error.message)
    }
  }

  return(
    <div
    className="change-messages-row"
    style={{ animationDelay: `${index * 0.02}s` }}
    onClick={(e)=>{popup(blog)}}
    >
      <div className="td">{new Date(blog.date).toLocaleDateString()}</div>
      <div className="td">{blog.heading}</div>
      <div className="td" id="blog-text">{blog.text}
        <div className="del-icon" onClick={(e)=>{del(e,blog._id)}}>
          <DeleteIcon sx={{ color: brown[200] }} />
        </div>
      </div>
    </div>
  )
}

const Popup = ({blog,close}) => {
  
  return(    
    <div className="blog-show">
      <div className="blog-show-container">
        <div className="blogPopupLeft">
          <img src={blog.blogImage} />
        </div>
          <div className="blogPopupRight">
            <h2>{blog.heading}</h2>
            <h4>{new Date(blog.date).toLocaleDateString()}</h4>
            <p id='blog-show-container-message'>{blog.text}</p>
            <button onClick={close}>Close</button>
          </div>
      </div>
    </div>
  )
} 