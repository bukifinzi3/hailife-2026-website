#!/bin/bash

# HostGator Upload Script
# Upload files to /hailife-test using curl

FTP_HOST="ftp.simonefinzi.com.br"
FTP_USER="bob@clinicahailife.com.br"
FTP_PASS="*L*9j2Pyy7gz!&"
REMOTE_BASE="/hailife-test"

# Find all files in out directory
cd "/Users/nuggetclawstein/.openclaw/workspace/cody/web-hailife/out"

for file in $(find . -type f); do
    # Remove leading ./
    rel_path="${file#./}"
    
    # Skip htaccess (HostGator doesn't allow custom .htaccess)
    if [[ "$rel_path" == ".htaccess" ]]; then
        continue
    fi
    
    # Skip Next.js internal files (next-*, trace, etc.)
    if [[ "$rel_path" == next-* ]] || [[ "$rel_path" == trace ]] || [[ "$rel_path" == server/* ]] || [[ "$rel_path" == static/* ]]; then
        continue
    fi
    
    # Upload file
    echo "Uploading $rel_path..."
    curl -v --ftp-pasv -u "${FTP_USER}:${FTP_PASS}" -T "$file" "ftp://${FTP_HOST}${REMOTE_BASE}/${rel_path}" 2>&1 | grep -E "(226|550|error)"
done

echo "Upload completed!"
