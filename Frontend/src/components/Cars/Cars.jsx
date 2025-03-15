import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { MapContext } from '../../context/MapContext';

const Cars = () => {
  const { distance, selectedCar, setSelectedCar } = useContext(MapContext);
  const [carData, setCarData] = useState([]); // Initialize as an empty array

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/car/get');
        setCarData(response.data.cars); // Assuming the car data is in `response.data.cars`
      } catch (error) {
        console.error('Error fetching car data', error);
      }
    };

    fetchCarData();
  }, []);

  const handleCarSelect = (car) => {
    setSelectedCar(car);
    console.log(car);  // Log the selected car
  };

  return (
    <div className='mt-3'>
      <h2 className='font-semibold mb-2'>Select Car</h2>
      <div className='car-list-container'>
        {carData.length > 0 ? (
          carData.map((item) => (
            <div
              key={item._id} // Assuming `_id` is the unique identifier for the car
              className={`mb-3 pl-5 pb-2 pt-2 border-[2px] hover:border-primaryBlue rounded-md cursor-pointer flex justify-around items-center group ${
                selectedCar?.id === item._id ? 'border-primaryBlue' : ''
              }`}
              onClick={() => handleCarSelect(item)}
            >
              <div className='flex rounded-md'>
                <img className='object-contain pr-2 ' src={item.carImage} width={150} height={180} alt={item.model} /> {/* Use item for accessing properties */}
                <div>
                  <p className='text-[15px] text-primaryGray'>{item.model}</p>
                  <p>Cost: ₹{item.price.hour} / km</p>
                  <p>Total Distance: {distance} km</p>
                  <p>Total Cost: ₹{Math.round(distance * item.price.hour)}.00</p>
                </div>
              </div>

              <div className=''>
                <div className='h-5 w-5 bg-white border-2 border-gray-400 group-hover:border-primaryBlue rounded-full flex justify-center items-center'>
                  {selectedCar?.id === item._id && (
                    <div className='h-3 w-3 bg-primaryBlue rounded-full'></div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading cars...</p>
        )}
      </div>
    </div>
  );
};

export default Cars;
