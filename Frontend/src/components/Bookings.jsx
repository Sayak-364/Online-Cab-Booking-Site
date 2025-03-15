import React, { useState, useEffect } from "react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { brown } from '@mui/material/colors';

const Bookings = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [show, setShow] = useState(false);
  const [popupData, setPopupData] = useState({});

  // Fetch payment history instead of bookings
  const fetchData = async () => {
    try {
      const response = await axios('http://localhost:3000/payment/history'); // Updated route
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

  useEffect(() => {
    fetchData();
  }, [refresh]);

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
          {data && data.map((element, index) => (
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

export default Bookings;

const Booking = (props) => {
  const { booking, index, popup, refresh } = props;

  const del = async (e, booking) => {
    e.stopPropagation();
    try {
      console.log('del performed');
      const response = await axios.post('http://localhost:3000/bookings/delete', { _id: booking });
      if (response.data.message) {
        refresh();
      }
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
        <div className="del-icon" onClick={(e) => { del(e, booking._id); }}>
          <DeleteIcon sx={{ color: brown[200] }} />
        </div>
      </div>
    </div>
  );
};

const Popup = ({ razorpay_order_id, razorpay_payment_id, amount, car_name, fromValue, toValue, name, email, date, close }) => {
  return (
    <div className="show">
      <div className="show-container">
        <h2>Payment Details</h2>
        <p><strong>Date:  </strong> {new Date(date).toLocaleString()}</p>
        <p><strong>Car Name:  </strong> {car_name}</p>
        <p id="from-to">
          <h3><strong>From:  </strong> {fromValue} </h3>
          <h3><strong>To:  </strong> {toValue}</h3>
        </p>
        <p><strong>Amount:  </strong> {amount}</p>
        <p id="name-email">
          <h3><strong>Name:  </strong>{name}</h3>
          <h3><strong>Email:  </strong>{email}</h3>
        </p>
        <p><strong>Razorpay Order ID:  </strong> {razorpay_order_id}</p>
        <p><strong>Razorpay Payment ID:  </strong> {razorpay_payment_id}</p>
        
        <button onClick={close}>Close</button>
      </div>
    </div>
  );
};
