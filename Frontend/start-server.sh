#!/bin/bash

echo "Starting Studia Frontend Server..."

# Python 버전 확인
python3 --version

# 서버 파일 확인
if [ ! -f "server.py" ]; then
    echo "Error: server.py not found. Make sure you're in the Frontend directory."
    exit 1
fi

# 서버 시작
echo "Starting Python HTTP server on port 3000..."
python3 server.py

# 오류 발생 시
if [ $? -ne 0 ]; then
    echo "Server failed to start. Check if port 3000 is already in use."
    echo "You can check with: lsof -i :3000"
    exit 1
fi
