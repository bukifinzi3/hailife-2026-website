#!/usr/bin/env python3
import ftplib
import os

FTP_HOST = "ftp.simonefinzi.com.br"
FTP_USER = "bob@clinicahailife.com.br"
FTP_PASS = "*L*9j2Pyy7gz!&"
LOCAL_DIR = "/Users/nuggetclawstein/.openclaw/workspace/cody/web-hailife/.next"

print(f"Connecting to {FTP_HOST}...")
session = ftplib.FTP_TLS(FTP_HOST)

try:
    session.login(FTP_USER, FTP_PASS)
    print(f"Connected successfully!")
    print(f"Current directory: {session.pwd()}")
    
    # List directories
    session.retrlines('LIST', print)
    
    # Try common directories
    dirs_to_try = ['/public_html', '/home/simonefinzi/public_html', '.', '/htdocs']
    for dir_path in dirs_to_try:
        try:
            session.cwd(dir_path)
            print(f"Successfully changed to {dir_path}")
            session.retrlines('LIST', print)
            break
        except Exception as e:
            print(f"Cannot access {dir_path}: {e}")
    
    print("Upload completed!")
    
except Exception as e:
    print(f"Error: {e}")
finally:
    session.quit()
