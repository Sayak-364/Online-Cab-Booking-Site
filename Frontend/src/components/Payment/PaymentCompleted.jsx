import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PaymentCompleted = () => {
  const [showContent, setShowContent] = useState(false);
  const [showTick, setShowTick] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 10000); // Delay to show the content

    const tickTimer = setTimeout(() => {
      setShowTick(true);
    }, 11000); // Adjust this timing to be slightly after the content appears

    return () => {
      clearTimeout(timer);
      clearTimeout(tickTimer);
    };
  }, []);

  return (
    <section className="relative flex items-center justify-center h-screen bg-white overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <video
          src="./src/assets/Successful_Video.mp4"
          type="video/mp4"
          autoPlay
          muted
          className="w-full h-full md:w-[80%] md:h-[80%] object-cover"
        />
      </div>
      <div
        className={`relative z-10 text-center p-5 max-w-xs sm:max-w-md bg-transparent rounded-lg transform transition-transform duration-500 ${showContent ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}
      >
        <div className="flex flex-col items-center justify-center">
          {showTick && (
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-500 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-12 sm:w-12 text-white" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 12l5 5l10 -10" />
                </svg>
              </div>
            </div>
          )}
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-black">Payment Successful!</h1>
          <p className="text-md sm:text-lg mb-8 text-black">
            Your cab is booked! Thank you for choosing our service. We look forward to getting you to your destination safely and comfortably.
          </p>
          <Link
            to="/"
            className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-green-500 text-white text-md sm:text-lg font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
          >
            Go to HOME
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PaymentCompleted;
