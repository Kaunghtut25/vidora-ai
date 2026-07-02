#!/bin/bash
# Mg Claw Chat — Codespace launcher
echo "🦞 Starting Ollama + Chat..."

# Start ollama if not running
if ! pgrep ollama > /dev/null; then
  echo "Starting Ollama..."
  ollama serve &
  sleep 3
fi

# Pull a fast model if none exists
if ! curl -s http://localhost:11434/api/tags | grep -q "qwen\|gemma\|llama"; then
  echo "Pulling qwen2.5-coder:7b..."
  ollama pull qwen2.5-coder:7b
fi

# Start chat server
cd "$(dirname "$0")"
python3 chat-server.py &
echo ""
echo "✅ DONE — Open browser tab for port 8888"
