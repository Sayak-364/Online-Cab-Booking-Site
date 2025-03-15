import React from "react";
import { Link, NavLink,useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import { useState, useEffect } from "react";
import { MdClose, MdMenu } from "react-icons/md";

import axios from "axios";

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const Header = ({page}) => {

    const [isLoggedIn ,setIsLoggedIn] = useState(false) 
    const [refresh , setRefresh] = useState(false)
    const [data,setData] = useState({})

    //For toggle menu
    const [menuOpend, setmenuOpend] = useState(false);
    const toggleMenu = () => setmenuOpend(!menuOpend);

    const navigate = useNavigate()

    
    const [scrollY, setScrollY] = useState(null);

    const handleScroll = (val) => {
      if (val) {
        setScrollY(val);
      } else {
        setScrollY(window.scrollY);
      }
    };
    
    useEffect(() => {

      check();
    
      if (page) {
        window.addEventListener('scroll', () => handleScroll(0));
        return () => window.removeEventListener('scroll', () => handleScroll(0));
      } else {
        handleScroll(500);
      }
    }, [refresh, page]); 


    const check = async () => {
        try{
            const response = await axios.get('http://localhost:3000/private/get', {
                withCredentials: true,
            })
            if(response.data){
                setData(response.data)
                setIsLoggedIn(true)
                console.log(response.data)
            }
        }
        catch(error){
            console.log(error.response?.data?.error || error.message)
        }
    }

    const logout = async () => {
        try{
            console.log("logout is performed")
            const response = await axios.post('http://localhost:3000/private/remove',{withCredentials:true})
            if(response.data.status){
                setIsLoggedIn(false)
                setRefresh(!refresh)
            }
        }
        catch(error){
            console.log(error.message)
        }
    }

    const sendEmail = async ()=>{
        try{
            const response = await axios.post('http://localhost:3000/email/send',{withCredentials:true})
            setRefresh(!refresh)
            alert(response.data.message)
            
        }
        catch(error){
            alert(error.message)
        }
    }

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <header className={`${scrollY >= 200 ? "fixed top-0 left-0 w-full h-[10%] bg-customBlack backdrop-blur-sm ring-1 ring-slate-900/5 z-10" : "fixed top-0 left-0 w-full bg-transparent ring-1 ring-slate-900/5 z-10"}`}>
            <div className="px-4 py-3 max-xs:px-2 flexBetween ">
                {/*name*/}
                <div className="ml-10 mt-1">
                    <Link className="text-white text-xl font-extrabold">CAB<span className="text-primaryGreen">BOOKING</span></Link>
                </div>
                {/* Navbar Desktop */}
                <Navbar containerStyles={"hidden md:flex gap-x-5 xl:gap-x-10 navbar_font text-white "} />
                {/* Navber Mobile */}
                <Navbar containerStyles={`${menuOpend ? " md:hidden navbar_font flex items-start flex-col gap-y-12 fixed top-20 right-8 p-12 text-white bg-customBlack backdrop-blur-sm rounded-3xl shadow-md w-64  transition-all duration-300" : "md:hidden navbar_font flex item-start flex-col gap-y-12 fixed top-20 p-12 text-white bg-customBlack backdrop-blur-sm rounded-3xl shadow-md w-64  transition-all duration-300 -right-[100%] "}`} navBtnClick={toggleMenu} /> {/*passing props called navBtnCick*/}
                {/* Buttons  */}
                <div className="sm:gap-x-2 bold-16 flexBetween">
                    <div>
                        {menuOpend ? (<MdClose className="md:hidden cursor-pointer text-white hover:text-primaryGreen mr-2 p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full ring-white hover:ring-primaryGreen" onClick={toggleMenu} />) : (<MdMenu className="md:hidden cursor-pointer text-white hover:text-primaryGreen mr-2 p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full ring-white hover:ring-primaryGreen" onClick={toggleMenu} />)}
                    </div>
                    <div className="mx-5">
                        {isLoggedIn? 
                        (
                            <div className="flex flex-row justify-between">
                                
                                <Tooltip title="Account settings">
                                    <IconButton
                                        onClick={handleClick}
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Avatar sx={{ width: 32, height: 32 }}>{data.name.slice(0,1).toUpperCase()}</Avatar>
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                    mt: 1.5,
                                    '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                    },
                                    '&::before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                    },
                                },
                                }}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                            >
                                <MenuItem onClick={(e)=>{
                                    navigate(`/mybookings?email=${encodeURIComponent(data.email)}`)
                                }}>
                                 My Bookings
                                </MenuItem>
                                <MenuItem onClick={()=>{sendEmail();handleClose()}}>
                                 Change Password
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={logout}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon  >
                                Logout
                                </MenuItem>
                            </Menu>
                            <div className="flex flex-row justify-between items-center ml-[10%]" >
                                    <h3 className="text-white text-[1.3rem] whitespace-nowrap" >{data.name}</h3>
                                </div>
  
                                {/* <button onClick={logout} className="gap-x-2 navbar_font text-white hover:text-primaryGreen">Logout</button> */}
                            </div>
                        )
                        : 
                        (<NavLink to={"/login"} className={"gap-x-2 navbar_font text-white hover:text-primaryGreen"}>Login</NavLink>)}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header