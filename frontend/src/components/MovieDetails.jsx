import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiPlay, FiX, FiStar, FiCalendar, FiClock, FiFilm, FiUsers } from "react-icons/fi";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Slider from "./Slider/Slider";
import ReactPlayer from "react-player";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);
  const [playTrailer, setPlayTrailer] = useState(false);
  const [recommendation, setRecommendation] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = "8321fba1bd0a71fd23430a1b4d42bfd9";

  // Function to find trailer or video
  const gotVideo = (data) => {
    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer" || vid.type === "Trailer"
      );
      setVideo(trailer || (data.videos.results.length > 0 ? data.videos.results[0] : null));
    }
  };

  // Function to fetch movie recommendations from our AI system
  const getAIRecommendations = async (movieTitle) => {
    try {
      const response = await fetch(
        `/api/similarity/${movieTitle}`
      );
      
      const data = await response.json();
      
      if (data && data.movies && Array.isArray(data.movies)) {
        const promises = data.movies.map(async (movie) => {
          try {
            const searchResponse = await fetch(
              `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(movie)}`
            );
            const searchData = await searchResponse.json();
            return searchData.results && searchData.results.length > 0 ? searchData.results[0] : null;
          } catch (err) {
            return null;
          }
        });
        
        const results = await Promise.all(promises);
        setRecommendation(results.filter(Boolean));
      }
    } catch (err) {
      setError("Failed to load AI recommendations");
    }
  };

  // Function to fetch similar movies from TMDB
  const fetchSimilarMovies = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&language=en-US&page=1`
      );
      const data = await response.json();
      
      if (data && data.results) {
        setSimilarMovies(data.results.slice(0, 10));
      }
    } catch (err) {
      // Silent fail
    }
  };

  // Function to fetch cast and crew
  const fetchCastAndCrew = async (movieId) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
      );
      const data = await response.json();
      
      // Get top cast members
      setCast(data.cast.slice(0, 5));
      
      // Find director
      const director = data.crew.find(person => person.job === "Director");
      setDirector(director);
    } catch (err) {
      // Silent fail
    }
  };

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        // Search for the movie by name
        const searchResponse = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(id)}`
        );
        
        const searchData = await searchResponse.json();
        
        if (searchData.results && searchData.results.length > 0) {
          const movieId = searchData.results[0].id;
          
          // Get detailed movie info with videos
          const detailsResponse = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`
          );
          const movieDetails = await detailsResponse.json();
          
          setMovie(movieDetails);
          gotVideo(movieDetails);
          
          // Fetch cast and crew
          await fetchCastAndCrew(movieId);
          
          // Fetch similar movies from TMDB
          await fetchSimilarMovies(movieId);
          
          // Get AI recommendations
          await getAIRecommendations(id);
          
          // Store the movie in localStorage for "Because you watched" section
          localStorage.setItem("movie", id);
        } else {
          setError("Movie not found");
        }
      } catch (err) {
        setError("Failed to load movie details");
      }
    };

    fetchMovieData();
  }, [id]);

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="bg-light-dark p-6 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-2">Loading movie details...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-lg max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Calculate user score percentage
  const userScore = Math.round(movie.vote_average * 10);

  return (
    <div className="pt-16">
      {/* Movie Hero Section */}
      <section className="relative">
        {/* Backdrop Image */}
        <div className="w-full h-[30vh] md:h-[70vh] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent z-10"></div>
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Movie Details Overlay */}
        <div className="container mx-auto px-4 md:px-8">
          <div className="relative md:absolute md:bottom-0 md:left-0 md:right-0 z-20 md:px-8 transform md:-translate-y-24">
            <div className="flex flex-col md:flex-row md:items-end gap-8">
              {/* Movie Poster */}
              <div className="md:w-64 w-48 mx-auto md:mx-0 -mt-20 md:mt-0 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Movie Info */}
              <div className="flex-1 text-white">
                <h1 className="text-2xl md:text-4xl font-display font-bold mb-2">
                  {movie.title} <span className="text-gray-300 font-normal">({movie.release_date.substring(0, 4)})</span>
                </h1>
                
                {movie.tagline && (
                  <p className="text-gray-300 italic mb-4">{movie.tagline}</p>
                )}

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
                  {/* User Score */}
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12">
                      <CircularProgressbar
                        value={userScore}
                        text={`${userScore}%`}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                          backgroundColor: "#111827",
                          textColor: "#fff",
                          pathColor: userScore >= 70 ? "#10B981" : userScore >= 50 ? "#FBBF24" : "#EF4444",
                          trailColor: "transparent",
                          textSize: '28px'
                        })}
                      />
                    </div>
                    <span className="text-sm">User Score</span>
                  </div>

                  {/* Release Date */}
                  <div className="flex items-center gap-2">
                    <FiCalendar />
                    <span>{new Date(movie.release_date).toLocaleDateString()}</span>
                  </div>

                  {/* Runtime */}
                  {movie.runtime > 0 && (
                    <div className="flex items-center gap-2">
                      <FiClock />
                      <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                    </div>
                  )}
                </div>

                {/* Genres */}
                <div className="mb-6">
                  <h3 className="text-gray-400 text-sm mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {movie.genres.map(genre => (
                      <span 
                        key={genre.id}
                        className="bg-primary/20 text-primary-light text-xs px-3 py-1 rounded-full"
                      >
                        {genre.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Watch Trailer Button */}
                {video && (
                  <button
                    onClick={() => setPlayTrailer(true)}
                    className="flex items-center gap-2 bg-primary hover:bg-primary-dark transition-colors px-6 py-3 rounded-lg text-white font-medium"
                  >
                    <FiPlay /> Watch Trailer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Movie Content Section */}
      <section className="container mx-auto px-4 md:px-8 py-0 md:py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-xl font-display font-bold mb-4">Overview</h2>
              <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
            </div>

            {/* Cast */}
            {cast.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                  <FiUsers /> Top Cast
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {cast.map(person => (
                    <div key={person.id} className="text-center">
                      <div className="w-full aspect-square rounded-full overflow-hidden mb-2">
                        <img
                          src={person.profile_path 
                            ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                            : `https://via.placeholder.com/185x185?text=${person.name.charAt(0)}`
                          }
                          alt={person.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium text-sm">{person.name}</h3>
                      <p className="text-gray-500 text-xs">{person.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trailer Modal */}
            {playTrailer && video && (
              <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                <div className="relative w-full max-w-4xl">
                  <button
                    onClick={() => setPlayTrailer(false)}
                    className="absolute -top-12 right-0 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors"
                  >
                    <FiX size={24} />
                  </button>
                  <div className="aspect-video">
                    <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${video.key}`}
                      width="100%"
                      height="100%"
                      playing={true}
                      controls={true}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-light-dark p-6 rounded-lg shadow-sm">
              {/* Status */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <h3 className="text-sm font-bold text-gray-500 mb-1">Status</h3>
                <p>{movie.status}</p>
              </div>

              {/* Original Language */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <h3 className="text-sm font-bold text-gray-500 mb-1">Original Language</h3>
                <p>{movie.original_language === 'en' ? 'English' : movie.original_language}</p>
              </div>

              {/* Budget */}
              {movie.budget > 0 && (
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <h3 className="text-sm font-bold text-gray-500 mb-1">Budget</h3>
                  <p>${movie.budget.toLocaleString()}</p>
                </div>
              )}

              {/* Revenue */}
              {movie.revenue > 0 && (
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <h3 className="text-sm font-bold text-gray-500 mb-1">Revenue</h3>
                  <p>${movie.revenue.toLocaleString()}</p>
                </div>
              )}

              {/* Director */}
              {director && (
                <div className="mb-4">
                  <h3 className="text-sm font-bold text-gray-500 mb-1">Director</h3>
                  <p>{director.name}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* AI Recommendations Section */}
      {recommendation && recommendation.length > 0 && (
        <Slider
          moviess={recommendation}
          id={2}
          name={movie.title}
        />
      )}

      {/* Similar Movies from TMDB */}
      {similarMovies && similarMovies.length > 0 && (
        <Slider
          moviess={similarMovies}
          id={3}
          name="Similar Movies"
        />
      )}
    </div>
  );
};

export default MovieDetails;
