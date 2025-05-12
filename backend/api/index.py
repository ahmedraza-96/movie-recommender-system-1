from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
import sys
import os

# Add the parent directory to the path to be able to import from the app
parent_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, parent_dir)

# Import the Flask app
from app import app as flask_app

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL
        parsed_url = urlparse(self.path)
        path = parsed_url.path
        query_params = parse_qs(parsed_url.query)
        
        # Create a WSGI environment
        environ = {
            'wsgi.input': self.rfile,
            'wsgi.errors': sys.stderr,
            'wsgi.version': (1, 0),
            'wsgi.multithread': False,
            'wsgi.multiprocess': False,
            'wsgi.run_once': False,
            'REQUEST_METHOD': self.command,
            'PATH_INFO': path,
            'QUERY_STRING': parsed_url.query,
            'SERVER_NAME': self.server.server_name,
            'SERVER_PORT': str(self.server.server_port),
        }
        
        # Process the request with Flask
        result = []
        def start_response(status, headers):
            self.send_response(int(status.split(' ')[0]))
            for name, value in headers:
                self.send_header(name, value)
            self.end_headers()
            return self.wfile.write
        
        response = flask_app(environ, start_response)
        self.wfile.write(response) 