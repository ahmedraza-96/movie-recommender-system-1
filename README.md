# Movie Recommender System

A full-stack movie recommendation application that uses content-based filtering and clustering techniques to provide personalized movie recommendations.

## Project Structure

- **movie-app/**: React frontend application
- **server/**: Flask backend API with recommendation models

## Deployment Guide

### Backend Deployment (Render)

The backend is currently deployed on Render at: `https://movie-recommender-system2.onrender.com`

If you need to redeploy the backend:

1. Sign up or log in to [Render](https://render.com)
2. Create a new Web Service and connect your GitHub repository
3. Use the following settings:
   - Environment: Python
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn app:app`
4. Add the following environment variables:
   - `PYTHON_VERSION`: 3.9.0

### Frontend Deployment (Vercel)

1. **Prerequisites**
   - GitHub account
   - Vercel account (sign up at https://vercel.com)
   - Git installed on your local machine

2. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/movie-recommender-system.git
   git push -u origin main
   ```

3. **Deploy to Vercel**
   
   - Log in to your Vercel account
   - Click on "Import Project"
   - Select "Import Git Repository"
   - Enter your GitHub repository URL
   - Configure the project:
     - Root Directory: movie-app
     - Framework Preset: Create React App
     - Build Command: npm run build
     - Output Directory: build
   - Click "Deploy"

4. **Environment Variables**
   
   Set the following environment variables in the Vercel dashboard:
   - `REACT_APP_API_KEY`: Your TMDB API key
   - `REACT_APP_BACKEND_URL`: Your backend API URL (e.g., `https://movie-recommender-system2.onrender.com`)

## Local Development

### Backend Setup

1. Navigate to the server directory
   ```bash
   cd server
   ```

2. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```

3. Run the Flask application
   ```bash
   python app.py
   ```

### Frontend Setup

1. Navigate to the movie-app directory
   ```bash
   cd movie-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a .env file with the following variables:
   ```
   REACT_APP_API_KEY=your_tmdb_api_key
   REACT_APP_BACKEND_URL=http://localhost:5000
   ```

4. Start the development server
   ```bash
   npm start
   ```

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Flask, scikit-learn
- **APIs**: TMDB API
- **ML Techniques**: Content-based filtering, K-means clustering 