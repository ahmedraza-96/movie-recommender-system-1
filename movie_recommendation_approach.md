# Movie Recommendation System Approach

## Overview
This project implements a content-based movie recommendation system using the TMDB 5000 Movie dataset. The system recommends movies based on similarity to a user-selected movie, using a combination of movie features including director, actors, and genres.

## Data Used
The system uses a dataset with the following key features:
- Director name
- Actor names (3 main actors)
- Movie genres
- Movie title

## Recommendation Algorithm

### 1. Feature Combination
The system combines multiple features to create a comprehensive representation of each movie:
- Director name
- Actor names (all three main actors)
- Genres

These features are combined into a single text field called 'comb' for each movie.

### 2. Text Vectorization
The system uses CountVectorizer from scikit-learn to convert the combined text features into numerical vectors:
- Each movie's combined features are converted into a bag-of-words representation
- This creates a matrix where each row represents a movie and each column represents a word from the combined features

### 3. Similarity Calculation
The system uses Cosine Similarity to measure the similarity between movies:
- Cosine similarity measures the cosine of the angle between two vectors
- Values range from -1 to 1, where:
  - 1 means the movies are very similar
  - 0 means the movies are completely different
  - -1 means the movies are opposite

### 4. Recommendation Process
When a user selects a movie, the system:
1. Finds the index of the selected movie in the dataset
2. Retrieves the similarity scores for that movie with all other movies
3. Sorts the movies by similarity score in descending order
4. Returns the top 30 most similar movies (excluding the selected movie itself)

## Implementation Details

### Preprocessing
- The similarity matrix is pre-computed and stored in a joblib file ('similarity.joblib')
- The movie data is stored in a joblib file ('movies_dict.joblib')
- This allows for fast recommendations without recalculating similarities

### API Endpoints
The system provides two main API endpoints:
1. `/api/movies` - Returns a list of all available movies
2. `/api/similarity/<name>` - Returns movie recommendations based on the input movie name

## Advantages of This Approach
1. **Content-Based**: Recommendations are based on movie features rather than user behavior
2. **No Cold Start Problem**: Can recommend movies even for new users
3. **Transparent**: Recommendations are based on clear features (director, actors, genres)
4. **Fast**: Pre-computed similarity matrix allows for quick recommendations

## Limitations
1. **Limited Features**: Only uses director, actors, and genres
2. **No Personalization**: Doesn't consider user preferences or viewing history
3. **Static Recommendations**: Same recommendations for all users who select the same movie

## Future Improvements
1. Add more features like plot summary, release year, and user ratings
2. Implement collaborative filtering to consider user preferences
3. Add weights to different features based on their importance
4. Include movie posters and additional metadata in recommendations 