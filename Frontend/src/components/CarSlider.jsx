import React, { useState, useEffect } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CarCard from './CarCard';
import Warning from "./Warning";

const CarSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');

  const popupHandler = () => {
    setError('');
  };

  const fetchCars = async () => {
    try {
      const response = await axios.get('http://localhost:3000/car/get');
      console.log(response.data);
      
      setCars(response.data.cars.reverse());
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <>
      <div className='max-w-2xscreen  container mx-auto md:px-20 px-4 pl-10'>
        <div className='text-center pt-6'>
          <span className='text-blue-500 font-semibold text-sm'>What We Offer</span>
          <h2 className='text-4xl pb-14 font-sans pt-6 font-bold'>Our Vehicles</h2>
        </div>

        <div>
          {error && <Warning close={popupHandler} page="changecar" />}
          <Slider {...settings}>
            {cars.length > 0 ? (
              cars.map((car, index) => (
                <CarCard car={car} key={car.id || index} />
              ))
            ) : (
              <p>No Cars Available</p>
            )}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default CarSlider;