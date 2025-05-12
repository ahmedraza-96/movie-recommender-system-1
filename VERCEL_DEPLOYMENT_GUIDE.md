# Vercel Deployment Guide: Movie Recommender System

## Project Overview

This project consists of:
- **Frontend**: React application for the movie recommendation interface
- **Backend**: Flask API providing movie recommendation functionality

## Project Structure

```
project-root/
├── frontend/                 # React app (Movie App)
│   ├── src/
│   └── package.json
│
├── backend/                  # Flask server (APIs)
│   ├── app.py                # Main Flask app
│   ├── api/                  # API routes
│   │   ├── __init__.py       # Makes the directory a Python package
│   │   ├── index.py          # Serverless function handler
│   │   ├── movies.py         # Movie API endpoints
│   ├── model.joblib          # (if applicable) Joblib model file
│   └── requirements.txt      # Flask dependencies
│
└── vercel.json               # Vercel configuration
```

## Deployment Steps

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd movie-recommender-system
```

### 2. Install Vercel CLI

```bash
npm install -g vercel
```

### 3. Login to Vercel

```bash
vercel login
```

### 4. Deploy the Project

```bash
vercel
```

During deployment, Vercel will:
1. Install backend dependencies listed in `backend/requirements.txt`
2. Build the frontend using `npm run build` in the frontend directory
3. Set up serverless functions for the Flask API
4. Configure routing based on `vercel.json`

### 5. Environment Variables

Set these environment variables in the Vercel dashboard:
- `REACT_APP_API_KEY`: Your TMDB API key

### 6. Troubleshooting

If you encounter any issues:

1. **API Connection Issues**:
   - Check the network requests in browser DevTools
   - Ensure the API routes in `vercel.json` are correct

2. **Build Failures**:
   - Check Vercel logs for error messages
   - Verify Python dependencies in `requirements.txt`
   - Make sure all necessary files are included in the repository

3. **Loading Time Issues**:
   - The initial request might be slower due to cold starts with serverless functions
   - Subsequent requests should be faster

## API Endpoints

- `GET /api/movies` - Get a list of all available movies
- `GET /api/similarity/{movie_name}` - Get movie recommendations based on a movie name

## Local Development

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Flask on Vercel](https://vercel.com/guides/using-flask-with-vercel) 