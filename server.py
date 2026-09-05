#!/usr/bin/env python3
"""
Simple HTTP server with clean URL support
Automatically adds .html extension to URLs
"""

import http.server
import socketserver
import os
import urllib.parse
from pathlib import Path

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL path
        parsed_path = urllib.parse.urlparse(self.path)
        path = parsed_path.path
        
        # Remove leading slash
        if path.startswith('/'):
            path = path[1:]
        
        # Handle root path
        if path == '' or path == '/':
            path = 'index.html'
        
        # Check if the path exists as-is
        if os.path.exists(path):
            # Serve the file directly
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        
        # Check if path + .html exists
        html_path = path + '.html'
        if os.path.exists(html_path):
            # Rewrite the path to include .html
            self.path = '/' + html_path
            return http.server.SimpleHTTPRequestHandler.do_GET(self)
        
        # If neither exists, serve the original path (will result in 404)
        return http.server.SimpleHTTPRequestHandler.do_GET(self)

def run_server(port=8000):
    """Run the server on the specified port"""
    with socketserver.TCPServer(("", port), CleanURLHandler) as httpd:
        print(f"🚀 Server running at http://localhost:{port}")
        print(f"📁 Serving files from: {os.getcwd()}")
        print("\n🌐 Clean URLs available:")
        print("   • http://localhost:8000/ (Home)")
        print("   • http://localhost:8000/about")
        print("   • http://localhost:8000/recruitment")
        print("   • http://localhost:8000/professional-development")
        print("   • http://localhost:8000/brothers")
        print("   • http://localhost:8000/ktp-in-action")
        print("   • http://localhost:8000/nationals")
        print("   • http://localhost:8000/contact")
        print("\n⏹️  Press Ctrl+C to stop the server")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped")

if __name__ == "__main__":
    run_server()
