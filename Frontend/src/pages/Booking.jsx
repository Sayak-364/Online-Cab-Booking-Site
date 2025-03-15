import React from 'react';
import SearchAndBook from '../components/SearchingAndBooking/SearchAndBook';
import MapComponent from '../components/Map/MapComponent';

const Booking = () => {
  return (
    <div className='mt-[11vh]'>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-4'>
        <div className='col-span-2'><SearchAndBook /></div>
        <div className='col-span-3 order-first md:order-last'><MapComponent /></div>
      </div>
    </div>
  );
};

export default Booking;
