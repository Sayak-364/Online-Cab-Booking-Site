import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OTP = ({ name, email, password, close, message, error }) => {
  const [otp, setOTP] = useState(new Array(6).fill(null));
  const [otpState, setOtpState] = useState(false);
  const [isResend, setIsResend] = useState(false);
  const [minString, setMinString] = useState(null);
  const [secString, setSecString] = useState(null);

  const navigate = useNavigate();

  function moveToNext(current, nextFieldId) {
    if (current.target.value.length === 1 && nextFieldId !== "otp7") {
      document.getElementById(nextFieldId).focus();
    }
  }

  const otpHandler = (e, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = Number(e.target.value); // Convert to number

    setOTP(updatedOtp);

    const filledCount = updatedOtp.filter((element) => element !== null).length;
    console.log("count: " + filledCount, updatedOtp);

    if (filledCount > 5) {
      console.log("input otp ");
      console.log(updatedOtp);
      verify(updatedOtp);
    }

    moveToNext(e, `otp${index + 2}`);
  };

  const countDown = (initialMinutes, initialSeconds) => {
    console.log(initialMinutes + " " + initialSeconds);

    let min = initialMinutes;
    let sec = initialSeconds;

    const interval = setInterval(() => {
      if (min === 0 && sec === 0) {
        clearInterval(interval);
        deleteOTP(); // Stop the countdown
        setIsResend(true);
        console.log("Countdown finished!");
        return;
      }

      if (sec === 0) {
        if (min > 0) {
          min--;
          sec = 59; // Reset seconds to 59
        }
      } else {
        sec--;
      }
      setMinString(min);
      setSecString(sec);
    }, 1000);
  };

  const createOTP = async () => {
    try {
      setOtpState(false);
      const response = await axios.post("http://localhost:3000/otp/create", {
        email: email,
      });
      console.log("createotp");
    } catch (error) {
      console.log(error.response.data.error || '');
    }
  };

  const deleteOTP = async () => {
    try {
      const response = await axios.post("http://localhost:3000/otp/delete", {
        email: email,
      });
      console.log("delete otp");
    } catch (error) {
      console.log(error.response.data.error || '');
    } 
  };

  const createUser = async () => {
    try {
      const response = await axios.post("http://localhost:3000/user/create", {
        name,
        email,
        password,
      });
      message(response.data.message || '');
      error && error(response.data.error || '');  // Check if error is a function
    } catch (error) {
      error && error(error.response.data.error || '');  // Check if error is a function
    } finally {
      close();
    }
  };
  
  const verify = async (otpArray) => {
    try {
      console.log("submit");
      const response = await axios.post("http://localhost:3000/otp/verify", {
        name: name,
        email: email,
        password: password,
        otp: otpArray.join(""),
      });
      if (response.data.result) {
        setOtpState(false);
        setIsResend(false);
        createUser();
      } else {
        message(response.data.message || '');
        error && error(response.data.error || '');  // Check if error is a function
      }
    } catch (error) {
      error && error(error.response.data.error || '');  // Check if error is a function
    }
  };
  


  const resend = () => {
    if (isResend) {
      alert("OTP is sent to your email");
      setOtpState(true);
      createOTP();
      countDown(3, 0);
    } else {
      alert("wait for cooldown");
    }
  };

  useEffect(() => {
    countDown(3, 0);
  }, []);

  return (
    <div className="otp">
      <div className="otp-container">
        <h2>Verify</h2>
        <h4>OTP has been sent to you via email</h4>
        <div className="otp-container-inputs">
          {[...Array(6)].map((_, i) => (
            <input
              key={i}
              type="number"
              maxLength="1"
              id={`otp${i + 1}`}
              onInput={(e) => otpHandler(e, i)}
            />
          ))}
        </div>
        <div className="lower">
          <h3 className="count-down">
            {minString != null
              ? minString.toString().padStart(2, "0")
              : "03"}
            :
            {secString != null
              ? secString.toString().padStart(2, "0")
              : "00"}
          </h3>
          <button onClick={resend}>Resend</button>
        </div>
      </div>
    </div>
  );
};

export default OTP;
