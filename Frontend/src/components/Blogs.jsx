import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import bg2 from '../assets/bg_3.jpg';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Blogs = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch the blog data from the backend
  const getMessages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/blog/get');
      setData(response.data); // Reverse the data if you want latest first
    } catch (error) {
      console.log('Failed to fetch blogs: ' + error.message);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  // Calculate the current page data
  const startIndex = (page - 1) * itemsPerPage;
  const currentPageData = data.slice(startIndex, startIndex + itemsPerPage);

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  console.log(data);
  
  

  return (
    <>
      {/* <div className='relative h-[90vh]'>
        <img src={bg2} alt="Car background" className='absolute top-0 left-0 w-full h-full object-cover object-top' />
        <div className='absolute inset-0 bg-black bg-opacity-40' /> {/* Dark overlay */}
        {/* <div className=''>
          <p className='absolute bottom-20 left-6 font-sans font-semibold text-xs text-white opacity-40'>
            HOME <KeyboardArrowRightIcon /> Blogs
          </p>
          <h1 className='absolute bottom-6 left-6 font-sans font-semibold text-4xl text-white'>
            Our Blogs
          </h1>
        </div>
      </div>  */}

      <div className="blogs-container w-full min-h-screen flex flex-col items-center py-10 gap-6 mt-[10vh]">
        {/* Render blog cards */}
        <div className="w-full flex flex-wrap justify-center items-center gap-6">
          {currentPageData.map((element, index) => (
            <Element key={index} heading={element.heading} text={element.text} image={element.blogImage}/>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center m-20 pl-5">
          <Pagination
            count={Math.ceil(data.length / itemsPerPage)} // Total pages
            page={page} // Current page
            onChange={handlePageChange} // Page change handler
            color="primary"
          />
        </div>
      </div>
    </>
  );
};

// Card component
const Element = ({ heading, text, image }) => {
  // Format the date as "20 Oct, 2022"
  const formattedDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className='w-full min-h-screen flex justify-center items-center py-10'>
      <div className="blog-card w-[80%] bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="w-full h-[90vh] flex justify-center items-center rounded-lg">
          {image ? (
            <img src={image} alt="Blog" className="w-full h-full object-cover" />
          ) : (
            <p>No image available</p>
          )}
        </div>
        <div className="blog-text p-6 overflow-y-auto max-h-[400px] text-center">
          <h5 className='cursor-pointer text-blue-600 hover:text-gray-500 m-2 font-bold'>{formattedDate}</h5>
          <h2 className="text-2xl font-semibold m-6 hover:text-blue-600 cursor-pointer">{heading}</h2>
          <p className="mb-4 text-gray-500 text-opacity-80 text-lg">{text}</p>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
