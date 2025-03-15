import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { brown } from '@mui/material/colors';

const MyBookings = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [show, setShow] = useState(false);
  const [popupData, setPopupData] = useState({});
  const [email, setEmail] = useState('');

  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Update email state when searchParams change
    const emailParam = searchParams.get('email');
    setEmail(emailParam);
  }, [searchParams]);

  useEffect(() => {
    // Fetch data when email or refresh changes
    if (email) {
      fetchData(email);
    }
  }, [email, refresh]);

  const fetchData = async (email) => {
    try {
      console.log("email : " + email);
      const response = await axios.get(`http://localhost:3000/payment/history/${email}`);
      setData(response.data.reverse());
      console.log(response.data);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };
  

  const popup = (data) => {
    setPopupData(data);
    setShow(true);
  };

  const closePopup = () => {
    setShow(false);
  };

  const refreshHandler = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="change-messages">
      {show && <Popup {...popupData} close={closePopup} />}
      <div className="table">
        <div className="thead">
          <div className="tr">
            <div className="th">Date</div>
            <div className="th">Car Name</div>
            <div className="th">From</div>
            <div className="th">To</div>
            <div className="th">Amount</div>
          </div>
        </div>
        <div className="tbody">
          {data.map((element, index) => (
            <Booking
              key={element._id}
              booking={element}
              index={index}
              popup={popup}
              refresh={refreshHandler}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Booking = (props) => {
  const { booking, index, popup, refresh } = props;

  const del = async (e, bookingId) => {
    e.stopPropagation();
    try {
      console.log('del performed');
      console.log(bookingId);
      const response = await axios.post('http://localhost:3000/bookings/delete', { _id: bookingId });
      if (response.data.message) {
        refresh();
      }
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div
      className="change-messages-row"
      style={{ animationDelay: `${index * 0.02}s` }}
      onClick={() => popup(booking)}
    >
      <div className="td">{new Date(booking.date).toLocaleDateString()}</div>
      <div className="td">{booking.car_name}</div>
      <div className="td">{booking.fromValue}</div>
      <div className="td">{booking.toValue}</div>
      <div className="td">{booking.amount}
        <div className="del-icon" onClick={(e) => { del(e, booking._id) }}>
          <DeleteIcon sx={{ color: brown[200] }} />
        </div>
      </div>
    </div>
  );
};

const Popup = ({ razorpay_order_id, razorpay_payment_id, amount, car_name, fromValue, toValue, date, close }) => {
  return (
    <div className="show">
      <div className="show-container">
        <h2>Booking Details</h2>
        <p><strong>Date:</strong> {new Date(date).toLocaleDateString()}</p>
        <p><strong>Car Name:</strong> {car_name}</p>
        <p><strong>From:</strong> {fromValue}</p>
        <p><strong>To:</strong> {toValue}</p>
        <p><strong>Price:</strong> {amount}</p>
        <p><strong>Razorpay Order ID:</strong> {razorpay_order_id}</p>
        <p><strong>Razorpay Payment ID:</strong> {razorpay_payment_id}</p>
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};

export default MyBookings;
