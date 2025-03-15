import React, { useContext, useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import AutoCompleteAddress from '../AddreshAutoCompite/AutoCompleteAddress';
import Cars from '../Cars/Cars';
// import PaymentMethods from '../Payment/PaymentMethods';
import { MapContext } from '../../context/MapContext';
import { PaymentContext } from '../../context/PaymentContext';
// import axios from 'axios';

const SearchAndBook = () => {
    const { distance, selectedCar } = useContext(MapContext);
    const {setAmount, handlePayment } = useContext(PaymentContext);
    const [isBookingEnabled, setIsBookingEnabled] = useState(false);

    useEffect(() => {
        console.log("Distance:", distance);
        console.log("Selected Car:", selectedCar);
        if (distance && selectedCar) {
            setAmount(Math.round(distance * selectedCar.price.hour));
            setIsBookingEnabled(true);
        } else {
            setIsBookingEnabled(false);
        }
    }, [distance, selectedCar]);

    

    return (
        <div className='p-5 pt-3'>
            <h2 className='text-[18px] font-semibold mb-2'>Booking</h2>
            <div className='p-4 pt-0 rounded-md h-[92vh]'>
                <AutoCompleteAddress />
                <Cars />
                {/* <PaymentMethods /> */}
                <button
                    className={`w-full p-1 h-10 rounded-md mt-4 text-white font-medium flex items-center justify-center ${
                        isBookingEnabled ? 'bg-primaryGreen' : 'bg-gray-400 cursor-not-allowed'
                    }`}
                    onClick={handlePayment}
                    disabled={!isBookingEnabled}
                >
                    Book
                </button>
            </div>
            <Toaster />
        </div>
    );
};

export default SearchAndBook;
