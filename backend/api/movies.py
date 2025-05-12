from flask import jsonify
import pandas as pd
import os
from flask_cors import cross_origin

# Instead of loading large model files, we'll create a simplified in-memory dataset
# with a subset of movies and a simple similarity mechanism

# Sample movie data
SAMPLE_MOVIES = [
    "Avatar",
    "Titanic",
    "Star Wars: The Force Awakens",
    "Avengers: Endgame",
    "Jurassic World",
    "The Lion King",
    "The Avengers",
    "Furious 7",
    "Frozen II",
    "Avengers: Infinity War",
    "Black Panther",
    "Harry Potter and the Deathly Hallows: Part 2",
    "The Dark Knight",
    "Joker",
    "Toy Story 4",
    "Toy Story 3",
    "Pirates of the Caribbean: Dead Man's Chest",
    "The Dark Knight Rises",
    "Wonder Woman",
    "Frozen",
    "Iron Man 3",
    "Captain Marvel",
    "The Hunger Games: Catching Fire",
    "Spider-Man: Far from Home",
    "Aladdin",
    "Guardians of the Galaxy Vol. 2",
    "Beauty and the Beast",
    "Batman v Superman: Dawn of Justice",
    "Finding Dory",
    "The Fate of the Furious"
]

# Simple movie matcher that finds related movies by partial matching
def find_similar_movies(movie_name, movie_list=SAMPLE_MOVIES, max_results=10):
    """Find similar movies based on simple string matching"""
    if not movie_name:
        return []
    
    movie_name = movie_name.lower()
    
    # First look for exact match
    matching_movies = []
    
    # Find all movies that match
    for m in movie_list:
        if m.lower() == movie_name:
            # Found exact match - just return similar movies by genre/word similarity
            if "toy story" in m.lower():
                return [x for x in movie_list if "toy" in x.lower() or "animation" in x.lower()]
            elif "avengers" in m.lower() or "iron man" in m.lower() or "captain" in m.lower():
                return [x for x in movie_list if "avengers" in x.lower() or "marvel" in x.lower() 
                        or "iron" in x.lower() or "captain" in x.lower() or "spider" in x.lower()]
            elif "star wars" in m.lower():
                return [x for x in movie_list if "star" in x.lower() or "galaxy" in x.lower()]
            elif "harry potter" in m.lower():
                return [x for x in movie_list if "harry" in x.lower() or "fantastic" in x.lower()]
            else:
                # Just return random sampling for any other movie
                import random
                return random.sample(movie_list, min(max_results, len(movie_list)))
    
    # No exact match, so find partial matches
    for m in movie_list:
        if movie_name in m.lower() or any(word in m.lower() for word in movie_name.split()):
            matching_movies.append(m)
    
    # Return only the top results
    return matching_movies[:max_results] if matching_movies else []

def get_all_movies():
    """Returns all the movies in the dataset"""
    return [movie.capitalize() if movie[0].islower() else movie for movie in SAMPLE_MOVIES]

def recommend_movies(movie: str):
    """Recommends movies based on similarity"""
    movie = movie.lower()

    if movie not in [m.lower() for m in SAMPLE_MOVIES]:
        return 'Sorry! The movie you requested is not present in our database'
    else:
        # Find similar movies
        return find_similar_movies(movie)

@cross_origin()
def movies_endpoint():
    """API endpoint to get all movies"""
    movies = get_all_movies()
    result = {'arr': movies}
    return result

@cross_origin()
def similarity_endpoint(name: str):
    """API endpoint to get movie recommendations"""
    recommendation = recommend_movies(name)
    
    if isinstance(recommendation, str):
        resultArray = recommendation.split('---')
        apiResult = {'movies': resultArray}
        return jsonify(apiResult)
    else:
        movieString = '---'.join(recommendation)
        resultArray = movieString.split('---')
        apiResult = {'movies': resultArray}
        return jsonify(apiResult) 