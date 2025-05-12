import React from 'react';
import { FiGithub, FiTwitter, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-12" role="contentinfo" aria-label="Site footer">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <h2 className="font-display font-bold text-xl">MoviesFlix</h2>
            <p className="text-gray-300 text-sm">
              Discover your next favorite movie with our AI-powered recommendation system.
              Find similar movies based on content and collaborative filtering.
            </p>
          </div>
          
          {/* Quick Links */}
          <nav className="space-y-4" aria-label="Footer navigation">
            <h3 className="font-display font-medium text-lg">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a 
                  href="/" 
                  className="hover:text-secondary transition-colors focus:outline-none focus:text-secondary"
                  aria-label="Go to home page"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="/" 
                  className="hover:text-secondary transition-colors focus:outline-none focus:text-secondary"
                  aria-label="About MoviesFlix"
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="/" 
                  className="hover:text-secondary transition-colors focus:outline-none focus:text-secondary"
                  aria-label="View privacy policy"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="/" 
                  className="hover:text-secondary transition-colors focus:outline-none focus:text-secondary"
                  aria-label="Contact us"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          
          {/* Connect */}
          <div className="space-y-4">
            <h3 className="font-display font-medium text-lg">Connect</h3>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-secondary transition-colors focus:outline-none focus:text-secondary p-1"
                aria-label="Visit our GitHub"
              >
                <FiGithub size={20} aria-hidden="true" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-secondary transition-colors focus:outline-none focus:text-secondary p-1"
                aria-label="Visit our Twitter"
              >
                <FiTwitter size={20} aria-hidden="true" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-300 hover:text-secondary transition-colors focus:outline-none focus:text-secondary p-1"
                aria-label="Visit our LinkedIn"
              >
                <FiLinkedin size={20} aria-hidden="true" />
              </a>
              <a 
                href="mailto:contact@moviesflix.com" 
                className="text-gray-300 hover:text-secondary transition-colors focus:outline-none focus:text-secondary p-1"
                aria-label="Email us"
              >
                <FiMail size={20} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {currentYear} MoviesFlix. All rights reserved.</p>
          <p className="mt-1"></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;