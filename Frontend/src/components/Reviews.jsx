import React, { useEffect, useState } from 'react';
import StarRateIcon from '@mui/icons-material/StarRate';
import dp from '../assets/user.png';
import { Pagination } from "@mui/material";
import axios from "axios";

// Function to format time ago
const timeAgo = (date) => {
  const now = new Date();
  const diff = now - new Date(date); // difference in milliseconds

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;

  return 'Just now';
};

const Review = ({ carId }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalReviews, setTotalReviews] = useState(0); // State to store total reviews

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (comment.trim() && rating > 0) {
      try {
        await axios.post('http://localhost:3000/review/create', {
          carId,
          comment,
          rating,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setComment('');
        setRating(0);
        fetchReviews(carId);
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    } else {
      console.log('Please provide both a comment and a rating.');
    }
  };

  const fetchReviews = async (carId) => {
    try {
      const response = await axios.get('http://localhost:3000/review/get', {
        params: { carId, page, limit: 10 }
      });
      setReviews(response.data.reviews.reverse());
      setTotalPages(response.data.totalPages);
      setTotalReviews(response.data.totalReviews); // Update totalReviews
    } catch (error) {
      console.log('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    if (carId) {
      fetchReviews(carId);
    }
  }, [carId, page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="review-container p-6">
      <h2>Total Reviews: {totalReviews}</h2> {/* Display the total review count */}

      <form onSubmit={handleSubmit} className="mb-6">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          rows="4"
          className="w-full p-2 border rounded-lg mb-2"
        />
        <div className="flex items-center mb-4">
          <p className="mr-2">Rating:</p>
          {[1, 2, 3, 4, 5].map((value) => (
            <StarRateIcon
              key={value}
              color={rating >= value ? "primary" : "disabled"}
              sx={{ fontSize: 24, cursor: 'pointer' }}
              onClick={() => handleRatingChange(value)}
            />
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {reviews.map((review, index) => (
        <div key={index} className="review-section flex justify-normal mb-6">
          <div className="dp m-8 h-20 w-20">
            <img src={dp} alt="DP" className="h-full w-full object-cover rounded-full" />
          </div>
          <div className="comment-section space-y-2 m-8 w-[45%]">
            <h3>{review.name || "Anonymous"}</h3>
            <div className="star">
              {[1, 2, 3, 4, 5].map((value) => (
                <StarRateIcon
                  key={value}
                  color={review.rating >= value ? "primary" : "disabled"}
                  sx={{ fontSize: 20 }}
                />
              ))}
            </div>
            <div className="comment text-xs">
              <p className='text-gray-500 text-lg'>{review.comment}</p>
            </div>
            <div className="review-date text-gray-400 text-sm">
              {timeAgo(review.date)}
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-center m-20 pl-5">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>
    </div>
  );
};

export default Review;
