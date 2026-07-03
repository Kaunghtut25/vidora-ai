#!/usr/bin/env python3
"""
Mg Claw Chat Server
Single server — serves chat.html AND proxies Ollama API.
No CORS issues. Works on Mac + Codespace.
"""

import http.server
import urllib.request
import urllib.error
import json
import os
import sys
from pathlib import Path

OLLAMA = "http://localhost:11434"
PORT = 8888
HTML_FILE = Path(__file__).parent / "public" / "chat.html"

class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        # Proxy /api/* to Ollama
        if self.path.startswith("/api/"):
            self.proxy_ollama("GET")
        elif self.path == "/" or self.path == "/chat.html":
            self.serve_html()
        else:
            super().do_GET()
    
    def do_POST(self):
        # Proxy POST to Ollama
        if self.path.startswith("/api/") or self.path.startswith("/v1/"):
            self.proxy_ollama("POST")
        else:
            self.send_error(404)
    
    def do_OPTIONS(self):
        # CORS preflight
        self.send_response(200)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.end_headers()
    
    def proxy_ollama(self, method):
        """Forward request to Ollama"""
        try:
            body = None
            content_length = int(self.headers.get("Content-Length", 0))
            if content_length > 0:
                body = self.rfile.read(content_length)
            
            url = OLLAMA + self.path
            
            req = urllib.request.Request(
                url,
                data=body,
                method=method
            )
            req.add_header("Content-Type", "application/json")
            
            with urllib.request.urlopen(req, timeout=120) as resp:
                data = resp.read()
                self.send_response(resp.status)
                self.send_header("Content-Type", resp.headers.get("Content-Type", "application/json"))
                self.send_header("Access-Control-Allow-Origin", "*")
                self.send_header("Cache-Control", "no-cache")
                self.end_headers()
                self.wfile.write(data)
                
        except urllib.error.HTTPError as e:
            self.send_response(e.code)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(e.read() if e.fp else b"")
        except Exception as e:
            self.send_error(502, f"Ollama error: {e}")
    
    def serve_html(self):
        """Serve chat.html"""
        try:
            html = HTML_FILE.read_bytes()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Cache-Control", "no-cache")
            self.end_headers()
            self.wfile.write(html)
        except FileNotFoundError:
            self.send_error(404, "chat.html not found")
    
    def log_message(self, format, *args):
        # Quieter logs
        if "/api/" in str(args[0]) or "/v1/" in str(args[0]):
            return  # Skip API proxy logs
        sys.stderr.write("%s - %s\n" % (self.address_string(), format % args))

if __name__ == "__main__":
    print(f"🦞 Mg Claw Chat Server")
    print(f"   Ollama: {OLLAMA}")
    print(f"   Port:   {PORT}")
    print("")
    
    # Get local IP
    import subprocess
    try:
        ip = subprocess.check_output(["ipconfig", "getifaddr", "en0"], text=True).strip()
        print(f"💻 http://localhost:{PORT}")
        print(f"📱 http://{ip}:{PORT}")
    except:
        print(f"💻 http://localhost:{PORT}")
    
    print(f"\nPress Ctrl+C to stop\n")
    
    os.chdir(HTML_FILE.parent)
    server = http.server.HTTPServer(("0.0.0.0", PORT), ProxyHandler)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n👋 Bye!")
        server.shutdown()
