import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Typewriter from 'typewriter-effect';
import { FiSearch, FiX } from "react-icons/fi";

const Hero = ({ movies }) => {
  const [name, setName] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [filteredMovie, setFilteredMovie] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Get a random popular movie backdrop for the hero
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=8321fba1bd0a71fd23430a1b4d42bfd9&language=en-US&page=1")
      .then(response => response.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * 10);
        setBackgroundImage(`https://image.tmdb.org/t/p/original${data.results[randomIndex].backdrop_path}`);
      })
      .catch(error => {
        // Silent fail
      });
  }, []);

  const handleOnchange = (e) => {
    setNotFound(false);
    const wordEntered = e.target.value.trim();
    setName(wordEntered);
   
    const filter = movies.filter((value) => {
      return value.toLowerCase().includes(wordEntered.toLowerCase());
    });
    
    setFilteredMovie([]);
  
    if (filter.length > 0) {
      setFilteredMovie(filter);
    }

    if (wordEntered.length === 0) {
      setFilteredMovie([]);
    }
  };

  const handleClearSearch = () => {
    setName("");
    setFilteredMovie([]);
  };

  const handleMovieSelect = (movie) => {
    navigate(`/movie/${movie}`);
    setFilteredMovie([]);
    setName("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (name.trim() && filteredMovie.length > 0) {
      handleMovieSelect(filteredMovie[0]);
    } else if (name.trim()) {
      setNotFound(true);
    }
  };

  return (
    <section className="w-full h-[70vh] relative flex items-center justify-center" aria-label="Hero section">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-light/70 via-dark/80 to-dark"></div>
        <img
          src={backgroundImage || "https://image.tmdb.org/t/p/original/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg"}
          alt=""
          className="object-cover w-full h-full"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-8 z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-white font-display font-bold text-3xl md:text-5xl mb-4 text-shadow">
            Discover Your Next Favorite Movie
          </h1>
          
          <div className="text-white text-lg md:text-xl mb-8 text-shadow h-8">
            <Typewriter 
              options={{
                autoStart: true,
                loop: true,
                delay: 40,
                strings: [
                  "Get AI-powered movie recommendations tailored for you",
                  "Find similar movies to your favorites",
                  "Explore new genres and hidden gems"
                ]
              }}
            />
          </div>

          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="flex items-center bg-white/90 backdrop-blur rounded-full shadow-lg overflow-hidden">
              <div className="flex-grow flex items-center">
                <FiSearch className="ml-5 text-gray-400 text-xl" aria-hidden="true" />
                <label htmlFor="movie-search" className="sr-only">Search for a movie</label>
                <input
                  id="movie-search"
                  type="text"
                  value={name}
                  className="block w-full px-5 py-4 text-dark bg-transparent focus:outline-none"
                  placeholder="Search for a movie..."
                  onChange={handleOnchange}
                  autoComplete="off"
                />
              </div>
              {name && (
                <button 
                  type="button"
                  onClick={handleClearSearch}
                  className="px-4 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  <FiX className="text-xl" aria-hidden="true" />
                </button>
              )}
              <button
                type="submit"
                className="px-8 py-4 bg-primary hover:bg-primary-dark text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-offset-2 focus:ring-offset-white/10"
                aria-label="Search for movies"
              >
                Search
              </button>
            </form>

            {/* Search Results */}
            {filteredMovie.length > 0 && (
              <div 
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-50 max-h-96 overflow-y-auto"
                role="listbox"
                aria-label="Search results"
              >
                {filteredMovie.slice(0, 10).map((movie, index) => (
                  <button
                    key={index}
                    className="w-full text-left px-5 py-3 hover:bg-light-dark border-b border-gray-100 transition-colors flex items-center focus:outline-none focus:bg-light-dark"
                    onClick={() => handleMovieSelect(movie)}
                    role="option"
                    aria-selected={false}
                  >
                    <span className="text-primary mr-2 font-medium">{index + 1}.</span>
                    {movie}
                  </button>
                ))}
              </div>
            )}

            {notFound && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-red-50 text-red-500 rounded-lg p-4 text-center" role="alert">
                Sorry! The movie you searched for is not in our database.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
