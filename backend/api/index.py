from http.server import BaseHTTPRequestHandler
import json
import urllib.parse

# Hardcoded sample data
SAMPLE_MOVIES = [
    "Avatar", "Titanic", "Star Wars: The Force Awakens", "Avengers: Endgame", 
    "Jurassic World", "The Lion King", "The Avengers", "Furious 7", 
    "Frozen II", "Avengers: Infinity War", "Black Panther", 
    "Harry Potter and the Deathly Hallows: Part 2", "The Dark Knight", 
    "Joker", "Toy Story 4", "Toy Story 3", "Wonder Woman", "Frozen", 
    "Iron Man 3", "Captain Marvel", "Spider-Man: Far from Home"
]

# Simple recommendation function
def get_recommendations(movie_name):
    movie_name = movie_name.lower()
    
    # Find similar movies (very basic approach)
    if "avengers" in movie_name or "iron man" in movie_name:
        similar = ["The Avengers", "Avengers: Infinity War", "Iron Man 3", "Captain Marvel"]
    elif "star wars" in movie_name:
        similar = ["Star Wars: The Force Awakens"]
    elif "toy story" in movie_name:
        similar = ["Toy Story 3", "Toy Story 4"]
    elif "harry potter" in movie_name:
        similar = ["Harry Potter and the Deathly Hallows: Part 2"]
    else:
        # Return a default subset
        similar = SAMPLE_MOVIES[:5]
        
    return similar

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            # Add CORS headers
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Access-Control-Allow-Methods', 'GET')
            self.send_header('Access-Control-Allow-Headers', 'Content-Type')
            self.end_headers()
            
            path = self.path
            
            # Handle /api/movies endpoint
            if path == '/api/movies':
                response = {'arr': SAMPLE_MOVIES}
                self.wfile.write(json.dumps(response).encode())
                
            # Handle /api/similarity/{movie_name} endpoint
            elif path.startswith('/api/similarity/'):
                # Extract movie name from URL
                movie_name = path.replace('/api/similarity/', '')
                movie_name = urllib.parse.unquote(movie_name)  # URL decode
                
                # Get recommendations
                recommendations = get_recommendations(movie_name)
                response = {'movies': recommendations}
                self.wfile.write(json.dumps(response).encode())
                
            else:
                # Default response
                self.wfile.write(json.dumps({'status': 'API is running'}).encode())
                
        except Exception as e:
            # Log and return the error
            error_response = {
                'error': str(e),
                'path': self.path
            }
            self.wfile.write(json.dumps(error_response).encode())
            
    def do_OPTIONS(self):
        # Handle preflight requests
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        self.wfile.write(b'') 