import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';
import { pink } from '@mui/material/colors';

const Features = (props) => {
  // console.log(props.features.child-seat);
  // const features = props.features;
  // console.log(features['']);
  
  
  return (
  <>
  <div className='flex justify-evenly text-gray-500 text-opacity-80 text-sm '>
  <div className='space-y-3'>
  <p>{props.features.airConditioning? <DoneIcon color="success" sx={{ fontSize: 15 }} /> : <CloseIcon sx={{ color: pink[500],fontsize:15 }}  />} Aircondition</p>
  <p>{props.features.childSeat ? <DoneIcon color="success" sx={{ fontSize: 15 }}  /> : <CloseIcon sx={{ color: pink[500],fontsize:15 }} />} Child Seat</p>
  <p>{props.features.gps ? <DoneIcon color="success" sx={{ fontSize: 15 }}  /> : <CloseIcon sx={{ color: pink[500],fontsize:15 }} />} Gps</p>
  <p>{props.features.luggage ? <DoneIcon color="success" sx={{ fontSize: 15 }}  /> : <CloseIcon sx={{ color: pink[500],fontsize:15 }} />} Luggage</p>
  <p>{props.features.music ? <DoneIcon color="success" sx={{ fontSize: 15 }}  /> : <CloseIcon sx={{ color: pink[500],fontsize:15 }} />} Music</p>
  </div>
  <div  className='space-y-3'>
  <p>{props.features.seatBelt ? <DoneIcon color="success" sx={{ fontSize: 15 }}  /> : <CloseIcon sx={{ color: pink[500],fontsize:15 }} />} Seat Belt</p>
  <p>{props.features.sleepingBed ? <DoneIcon color="success" sx={{ fontSize: 15 }}  /> : <CloseIcon sx={{ color: pink[500],fontsize:15 }} />} Sleeping Bed</p>
  <p>{props.features.water ? <DoneIcon color="success" sx={{ fontSize: 15 }}  /> : <CloseIcon sx={{ color: pink[500],fontsize:15 }} />} Water</p>
  <p>{props.features.bluetooth ? <DoneIcon color="success" sx={{ fontSize: 15 }}  /> : <CloseIcon sx={{ color: pink[500],fontsize:15 }} />} Bluetooth</p>
  <p>{props.features.onboardComputer ? <DoneIcon color="success" sx={{ fontSize: 15 }}  /> : <CloseIcon sx={{ color: pink[500],fontsize:15 }} />} On Board Computer</p>
  </div>
  <div  className='space-y-3'>
  <p>{props.features.audioInput ? <DoneIcon color="success" sx={{ fontSize: 15 }}  /> : <CloseIcon sx={{ color: pink[500],fontsize:15 }} />} Audio Input</p>
  <p>{props.features.longTermTrips ? <DoneIcon color="success" sx={{ fontSize: 15 }}  /> : <CloseIcon sx={{ color: pink[500],fontsize:15 }} />} Long Term Trips</p>
  <p>{props.features.carKit ? <DoneIcon color="success" sx={{ fontSize: 15 }}  /> : <CloseIcon sx={{ color: pink[500],fontsize:15 }} />} Car Kit</p>
  <p>{props.features.remoteCentralLocking ? <DoneIcon color="success" sx={{ fontSize: 15 }}  /> : <CloseIcon sx={{ color: pink[500],fontsize:15 }} />} Remote Central Locking</p>
  <p>{props.features.climateControl ? <DoneIcon color="success" sx={{ fontSize: 15 }}  /> : <CloseIcon sx={{ color: pink[500],fontsize:15 }} />} Climate Control</p>
  </div>
  </div>
  </>
  )
}

export default Features