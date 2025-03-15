import React, { useEffect, useState } from 'react';
import img from '../assets/bg_3.jpg';
import axios from 'axios'; // Ensure axios is imported
import { Pagination } from "@mui/material";

const Price = () => {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 10;

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:3000/car/get');
      setCars(response.data.cars.reverse()); // Assuming `response.data.cars` is the array of cars
    } catch (error) {
      alert(error.response?.data?.error || 'An error occurred');
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Get current cars for pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div className="price-container h-maxcontent w-[90%] p-10 z-0 mt-[7vh] ml-[5vw] mr-[5vw]">
        {/* Headings for Rates */}
        <div className="headings w-full h-20 flex justify-end items-center font-sans text-lg font-bold text-white ">
          <div className="hour w-[20%] h-full flex items-center justify-center bg-blue-500">Per Hour Rate</div>
          <div className="day w-[20%] h-full flex items-center justify-center bg-slate-500">Per Day Rate</div>
          <div className="month w-[20%] h-full flex items-center justify-center bg-slate-900">Leasing</div>
        </div>

        {/* Car Container */}
        <div className="car-container mt-10 flex flex-wrap justify-center gap-8">
          {currentCars.map((car) => (
            <PriceCard key={car._id} car={car} />
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination-container mt-10 flex justify-center">
          <Pagination
            count={Math.ceil(cars.length / carsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </div>
      </div>
    </>
  );
};

export default Price;

const PriceCard = ({ car }) => {
  return (
    <div className="carcard w-full h-60 border border-gray-400 rounded-lg shadow-lg p-5 bg-white flex justify-between space-x-2 relative">
      {/* Car Image */}
      <div className="car-img border border-gray-400 rounded-md w-[20%] h-full">
        <img src={car.carImage || img} alt={car.name} className="w-full h-full object-cover rounded-md" />
      </div>

      {/* Car Name */}
      <div className="car-book w-[20%] text-black text-center flex items-center justify-center rounded-lg font-semibold text-2xl">
        {car.model}
      </div>

      {/* Per Hour */}
      <div className="perhour bg-slate-100 text-center flex items-center justify-center p-2 font-semibold text-2xl rounded-lg w-[20%] relative group">
        Hourly: ${car.price.hour}
        {/* <button className="hidden group-hover:block absolute top-0 left-0 w-full h-full bg-blue-400 text-white font-bold text-lg rounded-lg flex items-center justify-center">
          Book Now
        </button> */}
      </div>

      {/* Per Day */}
      <div className="perday bg-slate-100 text-center flex items-center justify-center p-2 font-semibold text-2xl rounded-lg w-[20%] relative group">
        Daily: ${car.price.day}
        {/* <button className="hidden group-hover:block absolute top-0 left-0 w-full h-full bg-blue-400 text-white font-bold text-lg rounded-lg flex items-center justify-center">
          Book Now
        </button> */}
      </div>

      {/* Per Month */}
      <div className="permonth bg-slate-100 text-center flex items-center justify-center p-2 font-semibold text-2xl rounded-lg w-[20%] relative group">
        Monthly: ${car.price.month}
        {/* <button className="hidden group-hover:block absolute top-0 left-0 w-full h-full bg-blue-400 text-white font-bold text-lg rounded-lg flex items-center justify-center">
          Book Now
        </button> */}
      </div>
    </div>
  );
};
