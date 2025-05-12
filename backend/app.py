from flask import Flask, send_from_directory
from flask_cors import CORS, cross_origin
import os

# Import API endpoints
from api.movies import movies_endpoint, similarity_endpoint

# Create Flask app
app = Flask(__name__)
CORS(app)

# API Routes
@app.route('/api/movies', methods=['GET'])
@cross_origin()
def get_movies():
    return movies_endpoint()

@app.route('/api/similarity/<name>', methods=['GET'])
@cross_origin()
def get_similarity(name):
    return similarity_endpoint(name)

# Home route
@app.route('/', methods=['GET'])
@cross_origin()
def home():
    return "Movie Recommendation System API"

# Handle 404 errors
@app.errorhandler(404)
def not_found(e):
    return "Route not found", 404

# For local development
if __name__ == '__main__':
    app.run(debug=True)
