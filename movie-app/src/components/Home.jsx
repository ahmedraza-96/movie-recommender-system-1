import React, { useState, useEffect } from "react";
import requests from "../Requests";
import Hero from "./Hero/Hero";
import Slider from "./Slider/Slider";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [recommendation, setRecommendation] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [error, setError] = useState(null);

  // Get movie from localStorage or default to "Avatar"
  const movie = localStorage.getItem("movie") || "Avatar";
  const apiKey = process.env.REACT_APP_API_KEY || "8321fba1bd0a71fd23430a1b4d42bfd9";
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "https://movie-recommender-system2.onrender.com";

  // Function to fetch movie recommendations
  const getRecommendationMovie = async (movieTitle) => {
    try {
      const similarityResponse = await fetch(
        `${backendUrl}/api/similarity/${movieTitle}`
      );
      
      const data = await similarityResponse.json();
      
      if (data && data.movies && Array.isArray(data.movies)) {
        const promises = data.movies.map(async (movie) => {
          try {
            const response = await fetch(
              `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movie)}`
            );
            const movieData = await response.json();
            return movieData.results && movieData.results.length > 0 ? movieData.results[0] : null;
          } catch (err) {
            return null;
          }
        });
        
        const results = await Promise.all(promises);
        const filteredResults = results.filter(Boolean);
        setRecommendation(filteredResults);
      }
    } catch (err) {
      setError("Failed to load recommendations. Please try again later.");
    }
  };

  // Function to fetch popular movies
  const fetchPopularMovies = async () => {
    try {
      const response = await fetch(requests.requestPopular);
      const data = await response.json();
      setPopularMovies(data.results || []);
    } catch (err) {
      setError("Failed to load popular movies. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all movies for search functionality
        const moviesResponse = await fetch(`${backendUrl}/api/movies`);
        const moviesData = await moviesResponse.json();
        setMovies(moviesData.arr || []);

        // Always fetch popular movies
        await fetchPopularMovies();

        // If a movie is selected, fetch recommendations based on it
        if (movie) {
          await getRecommendationMovie(movie);
        }
      } catch (err) {
        setError("Failed to load data. Please try again later.");
      }
    };

    fetchData();
  }, [movie]);

  return (
    <main className="min-h-screen pt-16">
      <Hero movies={movies} />
      
      {error ? (
        <div className="container mx-auto px-4 py-12 text-center">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            {error}
          </div>
        </div>
      ) : (
        <>
          {/* Popular Movies section - always show this */}
          {popularMovies && popularMovies.length > 0 && (
            <Slider
              moviess={popularMovies}
              id={1}
              name="Popular"
            />
          )}
          
          {/* Recommendations based on selected movie */}
          {recommendation && recommendation.length > 0 && (
            <Slider
              moviess={recommendation}
              id={2}
              name={movie}
            />
          )}
        </>
      )}
    </main>
  );
};

export default Home;
