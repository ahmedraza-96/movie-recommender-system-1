import React, { useState } from "react";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FiStar, FiInfo, FiCalendar } from "react-icons/fi";

const Movie = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  // const [like, setLike] = useState(false);
  // const [saved, setSaved] = useState(false);

  // console.log(item);

  const navigate = useNavigate();
  
  // Default image if poster is not available
  const fallbackImage = "https://via.placeholder.com/300x450?text=No+Poster+Available";

  const handleNavigate = () => {
    if (item?.original_title || item?.title) {
      navigate(`/movie/${item?.original_title || item?.title}`);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (!item) return null;

  const movieTitle = item?.title || item?.original_title || "Untitled Movie";
  const releaseYear = item?.release_date ? new Date(item.release_date).getFullYear() : "";
  const rating = item?.vote_average ? item.vote_average.toFixed(1) : null;

  return (
    <div 
      className="movie-card w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative overflow-hidden rounded-lg shadow-card hover:shadow-hover transition-all duration-300 h-full"
        role="article"
        aria-label={`${movieTitle}${releaseYear ? ` (${releaseYear})` : ""}`}
      >
        {/* Poster Image */}
        <div className="aspect-[2/3] overflow-hidden relative">
          <img
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            src={!imageError && item?.poster_path 
              ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` 
              : fallbackImage}
            alt={`${movieTitle} poster`}
            onError={handleImageError}
          />
          
          {/* Rating Badge */}
          {rating && (
            <div 
              className="absolute top-2 left-2 bg-dark/80 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center"
              aria-label={`Rating: ${rating} out of 10`}
            >
              <FiStar className="text-yellow-400 mr-1" aria-hidden="true" /> 
              {rating}
            </div>
          )}
          
          {/* Release Year Badge */}
          {releaseYear && (
            <div className="absolute top-2 right-2 bg-primary/80 text-white text-xs font-medium px-2 py-1 rounded-full flex items-center">
              <FiCalendar className="mr-1" aria-hidden="true" /> 
              {releaseYear}
            </div>
          )}
        </div>
        
        {/* Movie Info */}
        <div className="p-3 bg-white">
          <h3 className="font-medium text-sm md:text-base line-clamp-1 mb-1">
            {movieTitle}
          </h3>
          
          <button 
            onClick={handleNavigate}
            className="w-full mt-2 bg-primary hover:bg-primary-light text-white text-xs md:text-sm py-2 px-4 rounded-md flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2"
            aria-label={`View details for ${movieTitle}`}
          >
            <FiInfo className="mr-1" aria-hidden="true" /> View Details
          </button>
        </div>
        
        {/* Hover Overlay */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-dark/50 flex flex-col justify-center items-center p-4 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={!isHovered}
        >
          <h3 className="text-white font-bold text-center text-sm md:text-base mb-2">
            {movieTitle}
          </h3>
          
          {releaseYear && (
            <p className="text-gray-300 text-xs mb-3 flex items-center">
              <FiCalendar className="mr-1" aria-hidden="true" /> {releaseYear}
            </p>
          )}
          
          {rating && (
            <p className="text-yellow-400 text-sm mb-4 flex items-center">
              <FiStar className="mr-1" aria-hidden="true" /> {rating}/10
            </p>
          )}
          
          <button 
            onClick={handleNavigate}
            className="bg-secondary hover:bg-secondary-light text-white text-xs md:text-sm py-2 px-6 rounded-full flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-secondary-light focus:ring-offset-2 focus:ring-offset-dark"
            aria-label={`View details for ${movieTitle}`}
          >
            <FiInfo className="mr-1" aria-hidden="true" /> Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Movie;
