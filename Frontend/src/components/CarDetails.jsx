import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import bg from '../assets/bg_1.jpg';
import bg2 from '../assets/bg_3.jpg';
import SpeedIcon from '@mui/icons-material/Speed';
import ConstructionIcon from '@mui/icons-material/Construction';
import AirlineSeatReclineNormalIcon from '@mui/icons-material/AirlineSeatReclineNormal';
import LuggageIcon from '@mui/icons-material/Luggage';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import Features from './Features'; // Import Features component
import Description from './Description'; // Import Description component
import Reviews from './Reviews'; // Import Reviews component
import Header from '../pages/Header';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';


const CarDetails = () => {
  // const { carId } = useParams(); 
  const [carData, setCarData] = useState(null);
  const [activeSection, setActiveSection] = useState('features'); // Default active section
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id'); // Extract the car ID from query parameters

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        // Send the ID in the URL parameters
        const response = await axios.post(`http://localhost:3000/car/getbyid/${id}`);
        setCarData(response.data);
      } catch (error) {
        console.error('Error fetching car data', error);
      }
    };

    fetchCarData();
  }, [id]);

  return (
    <>
      <Header />
      {/* <div className='relative h-[90vh]'>
         <img src={bg2} alt="Car background" className='absolute top-0 left-0 w-full h-full object-cover object-top' />
        <div className='absolute inset-0 bg-black bg-opacity-40' /> 
        <p className='absolute bottom-10 left-0 font-sans font-semibold text-xs text-white opacity-40 p-4'>HOME<KeyboardArrowRightIcon />CAR DETAILS</p>
        <h1 className='absolute bottom-0 left-0 font-sans font-semibold text-4xl text-white p-4'>
          Car Details
        </h1>
      </div> */}
      <div className="details-container mt-[12vh]">
        <div className="car-image mt-14">
        <img src={carData?.carImage || bg} alt="car" /> {/* Use carData image if available */}
        </div>
        <div className="car-model">
          {carData ? (
            <div className='text-center mt-9 mr-14'>
              <p className='text-gray-500 text-opacity-80 text-sm'>{carData.company}</p>
              <h2 className="text-2xl font-sans">{carData.model}</h2>

              <div className='car-details flex flex-wrap justify-center mt-5'>
                {[
                  { Icon: SpeedIcon, label: 'Mileage', value: carData.mileage },
                  { Icon: ConstructionIcon, label: 'Transmission', value: carData.transmission },
                  { Icon: AirlineSeatReclineNormalIcon, label: 'Seats', value: carData.seats },
                  { Icon: LuggageIcon, label: 'Luggage', value: carData.luggage },
                  { Icon: LocalGasStationIcon, label: 'Fuel', value: carData.fuel }
                ].map(({ Icon, label, value }) => (
                  <div key={label} className='flex m-5 items-center'>
                    <div className='m-3 border border-gray-200 rounded-full flex items-center justify-center w-16 h-16 '>
                      <Icon sx={{ fontSize: 40 }} color="primary" />
                    </div>
                    <div className='flex-col ml-3'>
                      <p className='text-gray-500 text-opacity-80 text-xs'>{label}</p>
                      <p className='text-xs font-semibold'>{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}

          <div className='flex justify-center items-center space-x-8 mt-8'>
            <ul className='flex flex-col items-center'>
              <li className='cursor-pointer'>
                <button onClick={() => setActiveSection('features')} className={`text-sm ${activeSection === 'features' ? 'text-blue-500' : 'text-gray-500'}`}>
                  Features
                </button>
              </li>
            </ul>
            <ul className='flex flex-col items-center'>
              <li className='cursor-pointer'>
                <button onClick={() => setActiveSection('description')} className={`text-sm ${activeSection === 'description' ? 'text-blue-500' : 'text-gray-500'}`}>
                  Description
                </button>
              </li>
            </ul>
            <ul className='flex flex-col items-center'>
              <li className='cursor-pointer'>
                <button onClick={() => setActiveSection('reviews')} className={`text-sm ${activeSection === 'reviews' ? 'text-blue-500' : 'text-gray-500'}`}>
                  Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Conditionally render the sections */}
          <div className='pl-20 pr-20'>
            <div className='mt-8 border-t border-t-gray-200 p-8'>
              {carData && activeSection === 'features' && <Features features={carData.features} />}
              {carData && activeSection === 'description' && <Description description={carData.description} />}
              {carData && activeSection === 'reviews' && <Reviews reviews={carData.reviews}  carId={id}/>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetails;
