#!/usr/bin/env python3
import ftplib
import os

FTP_HOST = "ftp.simonefinzi.com.br"
FTP_USER = "bob@clinicahailife.com.br"
FTP_PASS = "*L*9j2Pyy7gz!&"
LOCAL_DIR = "/Users/nuggetclawstein/.openclaw/workspace/cody/web-hailife/.next"
REMOTE_DIR = "/public_html/hailife-teste"

print(f"Connecting to {FTP_HOST}...")
session = ftplib.FTP_TLS(FTP_HOST)

try:
    session.login(FTP_USER, FTP_PASS)
    print(f"Connected successfully!")
    print(f"Current directory: {session.pwd()}")
    
    # Create remote directory if not exists
    try:
        session.mkd(REMOTE_DIR)
    except:
        print(f"Directory {REMOTE_DIR} already exists")
    
    session.cwd(REMOTE_DIR)
    print(f"Changed to {REMOTE_DIR}")
    
    # Upload files
    for root, dirs, files in os.walk(LOCAL_DIR):
        rel_path = os.path.relpath(root, LOCAL_DIR)
        if rel_path == ".":
            rel_path = ""
        
        for file in files:
            local_path = os.path.join(root, file)
            remote_path = os.path.join(rel_path, file) if rel_path else file
            
            with open(local_path, 'rb') as f:
                print(f"Uploading {remote_path}...")
                session.storbinary(f'STOR {remote_path}', f)
    
    print("Upload completed!")
    
except Exception as e:
    print(f"Error: {e}")
finally:
    session.quit()
