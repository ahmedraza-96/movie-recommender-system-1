import React, { useEffect, useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Movie from "../Movie";

const Slider = ({ moviess, id, name }) => {
  const [movies, setMovies] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (Array.isArray(moviess)) {
      setMovies(moviess.filter(Boolean)); // Filter out null/undefined items
    } else {
      setMovies([]);
    }
  }, [moviess]);

  const slideLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = sliderRef.current.scrollLeft - 400;
    }
  };

  const slideRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = sliderRef.current.scrollLeft + 400;
    }
  };

  // Get title based on id
  const getTitle = () => {
    if (id === 2) {
      return `Because you watched "${name.split(':')[0]}"`;
    } else if (id === 1) {
      return "Popular Movies";
    } else if (id === 3) {
      return "Similar Movies";
    } else {
      return "Your Recommendations";
    }
  };

  const sectionTitle = getTitle();

  // Get background color based on id
  const getSectionStyle = () => {
    if (id === 1) {
      return "bg-gradient-to-r from-primary/5 to-primary/10"; // Blue gradient for Popular Movies
    } else if (id === 2) {
      return "bg-gradient-to-r from-secondary/5 to-secondary/10"; // Pink gradient for "Because you watched"
    } else if (id === 3) {
      return "bg-gradient-to-r from-accent/5 to-accent/10"; // Green gradient for Similar Movies
    } else {
      return "bg-gradient-to-r from-dark/5 to-light-dark/10"; // Default gradient
    }
  };

  return (
    <section className={`py-8 px-4 md:px-8 lg:px-12 ${getSectionStyle()} my-4 rounded-lg`} aria-labelledby={`slider-heading-${id}`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 
            id={`slider-heading-${id}`} 
            className="font-display font-bold text-xl md:text-2xl text-dark border-l-4 border-primary pl-3"
          >
            {sectionTitle}
          </h2>
          
          <div className="flex space-x-2" role="group" aria-label={`${sectionTitle} navigation controls`}>
            <button 
              onClick={slideLeft}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Scroll left"
            >
              <FiChevronLeft size={20} aria-hidden="true" />
            </button>
            <button 
              onClick={slideRight}
              className="p-2 rounded-full bg-primary/10 hover:bg-primary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label="Scroll right"
            >
              <FiChevronRight size={20} aria-hidden="true" />
            </button>
          </div>
        </div>
        
        <div className="relative">
          <div
            ref={sliderRef}
            className="flex overflow-x-scroll gap-6 pb-8 scrollbar-hide scroll-smooth"
            role="region"
            aria-label={`${sectionTitle} movie carousel`}
          >
            {movies?.length > 0 ? (
              movies.map((item, index) => (
                <div key={`${id}-movie-${index}`} className="min-w-[160px] md:min-w-[200px] lg:min-w-[220px]">
                  <Movie item={item} />
                </div>
              ))
            ) : (
              <div className="w-full text-center py-12 text-gray-500 bg-white/40 rounded-lg shadow-sm">
                No movies found. Try another search.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
