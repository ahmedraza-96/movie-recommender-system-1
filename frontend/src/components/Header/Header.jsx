import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiUser, FiHome, FiFilm } from "react-icons/fi";

const Header = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`${
        scrolled 
          ? "bg-dark shadow-lg" 
          : "bg-dark/90"
      } text-white h-16 z-50 flex items-center fixed top-0 w-full transition-all duration-300`}
      role="banner"
      aria-label="Site header"
    >
      <div className="container mx-auto flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2">
          <FiFilm className="text-secondary text-2xl" aria-hidden="true" />
          <button
            className="font-display font-bold tracking-wide text-lg hover:cursor-pointer hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-dark"
            onClick={() => navigate("/")}
            aria-label="Go to home page"
          >
            MoviesFlix
          </button>
        </div>

        <nav className="hidden md:block" aria-label="Main navigation">
          <ul className="flex items-center space-x-8">
            <li>
              <button 
                onClick={() => navigate("/")}
                className="flex items-center gap-2 hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-dark py-1 px-2 rounded"
                aria-label="Home"
              >
                <FiHome aria-hidden="true" /> Home
              </button>
            </li>
            <li>
              <button 
                className="flex items-center gap-2 hover:text-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-dark py-1 px-2 rounded"
                aria-label="Discover movies"
              >
                <FiSearch aria-hidden="true" /> Discover
              </button>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            className="hidden md:flex items-center gap-2 bg-secondary hover:bg-secondary-dark transition-colors px-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-secondary-light focus:ring-offset-2 focus:ring-offset-dark"
            aria-label="Sign in"
          >
            <FiUser aria-hidden="true" /> Sign In
          </button>
          <button 
            className="md:hidden text-2xl focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-dark p-1 rounded"
            aria-label="Menu"
          >
            <FiUser aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
