import React,{useState,useEffect} from "react";
import { pink } from '@mui/material/colors';


import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import axios from "axios";

const Admin = ()=>{

    const [access , setAccess] = useState(false)

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

    useEffect(()=>{
        check()
    })

    return access? 
    (<div className="admin">
        <div className="admin-nav">
            
            <a href="/changeadmin"><p>Admin</p></a>
            <a href="/changeusers"><p>Users</p></a>
            <a href="/changemesseges"><p>Messages</p></a>
            <a href="/bookings"><p>Bookings</p></a>
            
        </div>
        <div className="admin-options">
            <a href='/changecar'>
                <DirectionsCarIcon sx={{fontSize: 50 ,color: pink[50]  }}/>
                <p >Change car</p>
            </a>
            {/* <div>
                <UpdateIcon sx={{fontSize: 50 ,color: pink[50]  }}/>
                <a>Update car</a>
            </div>
            <div >
                <DeleteIcon sx={{fontSize: 50 ,color: pink[50] }}/>
                <a>Delete car</a>
            </div> */}
            <a href='/changeblog'>
                <DriveFileRenameOutlineIcon sx={{fontSize: 50 ,color: pink[50] }}/>
                <p>Change blog</p>
            </a>
            {/* <div >
                <EditNoteIcon sx={{fontSize: 50 ,color: pink[50] }}/>
                <a>Update blog</a>
            </div>
            <div >
                <DeleteSweepIcon sx={{fontSize: 50 }}/>
                <a>Delete blog</a>
            </div> */}
            <a href='/changecontacts'>
                <ManageAccountsIcon sx={{fontSize: 50,color: pink[50]  }}/>
                <p>Change Contacts</p>
            </a>
        </div>
        
        
    </div>)
    :
    (<h2 style={{color:"black"}}>Restricted</h2>)
}

export default Admin