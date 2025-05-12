from flask import jsonify
import pandas as pd
from joblib import load
import os
from flask_cors import cross_origin

# Get the absolute path to the joblib files
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
movies_dict_path = os.path.join(base_dir, 'movies_dict.joblib')
similarity_path = os.path.join(base_dir, 'similarity.joblib')

# Load the models
movies_dict = load(open(movies_dict_path, 'rb'))
similarity = load(open(similarity_path, 'rb'))
movies = pd.DataFrame(movies_dict)

def get_all_movies():
    """Returns all the movies in the dataset"""
    data = pd.DataFrame(movies_dict)
    return list(data['movie_title'].str.capitalize())

def recommend_movies(movie: str):
    """Recommends movies based on similarity"""
    movie = movie.lower()

    if movie not in movies['movie_title'].unique():
        return 'Sorry! The movie you requested is not present in our database'
    else:
        movie_idx = movies[movies['movie_title'] == movie].index[0]
        distances = similarity[movie_idx]
        movies_list = sorted(list(enumerate(distances)),
                             reverse=True, key=lambda x: x[1])[1:30]

        recommended_movies = []
        for i in movies_list:
            recommended_movies.append(movies.iloc[i[0]].movie_title)

        return recommended_movies

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