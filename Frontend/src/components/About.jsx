import React from 'react';
import about_img from '../assets/Background-home.png';


const About = () => {
    return (
        <section className="flex h-screen overflow-hidden mt-[10vh]">
            {/* Image Section */}
            <div className="relative w-1/2 h-full">
                <img
                    src={about_img}
                    alt="About Us Background"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-40"></div>
            </div>

            {/* Text Section */}
            <div className="w-1/2 flex flex-col justify-center bg-primaryGreen p-8 md:p-16 lg:p-24 text-center md:text-left">
                <span className="text-white text-sm font-semibold tracking-wide uppercase mb-4 block">ABOUT US</span>
                <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                    Welcome to CarBook
                </h2>
                <p className="text-white text-base md:text-lg lg:text-xl mb-4 leading-relaxed">
                    Welcome to CabBooking, your reliable and trusted partner for seamless travel experiences! We are committed to making your journeys safe, convenient, and hassle-free, whether you're commuting daily or embarking on a long-distance trip. With our easy-to-use booking platform, you can access a fleet of well-maintained cabs driven by professional, courteous drivers.
                </p>
                <p className="text-white text-base md:text-lg lg:text-xl mb-10 leading-relaxed">
                    At CabBooking, customer satisfaction is at the heart of what we do. Our mission is to offer comfortable and punctual rides, ensuring that you reach your destination with ease. We pride ourselves on our transparent pricing, on-time arrivals, and 24/7 availability, making us your go-to choice for all your travel needs.
                </p>
            </div>
        </section>
    );
}

export default About;
