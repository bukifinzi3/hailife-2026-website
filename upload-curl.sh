#!/bin/bash

# HostGator FTP Upload Script
# Using curl for robust FTP upload

FTP_HOST="ftp.simonefinzi.com.br"
FTP_USER="bob@clinicahailife.com.br"
FTP_PASS="*L*9j2Pyy7gz!&"
LOCAL_DIR="/Users/nuggetclawstein/.openclaw/workspace/cody/web-hailife/.next"
REMOTE_DIR="/public_html"

echo "Starting curl FTP upload..."

# Build curl command
CURL_CMD="curl -v --ftp-pasv --create-dirs -u ${FTP_USER}:${FTP_PASS}"

# Navigate to local directory
cd "$LOCAL_DIR"

# Find all files and upload
find . -type f -name "*" | while read -r file; do
    # Remove leading ./
    rel_path="${file#./}"
    remote_path="${REMOTE_DIR}/${rel_path}"
    
    echo "Uploading $rel_path to $remote_path..."
    
    # Upload file
    curl_params="-T \"$file\" -u $FTP_USER:$FTP_PASS --ftp-pasv ftp://$FTP_HOST/$remote_path"
    
    if eval "curl $curl_params"; then
        echo "✅ Success: $rel_path"
    else
        echo "❌ Failed: $rel_path"
    fi
done

echo "Upload completed!"
