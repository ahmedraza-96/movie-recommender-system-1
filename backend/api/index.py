from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
import json
import sys
import os

# Add the parent directory to the path to be able to import from the app
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, parent_dir)

# Import the functions directly to avoid Flask dependency issues
from api.movies import movies_endpoint, similarity_endpoint

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        self.end_headers()
        
        # Parse the URL
        parsed_url = urlparse(self.path)
        path = parsed_url.path
        
        # Route the request to the appropriate endpoint
        response = {"error": "Route not found"}
        
        if path == '/api/movies':
            response = movies_endpoint()
        elif path.startswith('/api/similarity/'):
            # Extract movie name from URL
            movie_name = path.replace('/api/similarity/', '')
            response = similarity_endpoint(movie_name)
        
        # Convert response to JSON string
        if isinstance(response, dict):
            response_json = json.dumps(response)
        else:
            # If it's already a flask.Response with JSON data
            response_json = json.dumps(response.json)
            
        self.wfile.write(response_json.encode('utf-8')) 