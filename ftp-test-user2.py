#!/usr/bin/env python3
import ftplib
import os

FTP_HOST = "ftp.simonefinzi.com.br"
FTP_USER = "simone.finzi@yahoo.com"
FTP_PASS = "Hailife62@"
LOCAL_DIR = "/Users/nugGETclawstein/.openclaw/workspace/cody/web-hailife/.next"

print(f"Connecting to {FTP_HOST} with {FTP_USER}...")

# Create FTP connection
session = ftplib.FTP_TLS(FTP_HOST)

try:
    session.login(FTP_USER, FTP_PASS)
    print(f"Connected successfully!")
    print(f"Current directory: {session.pwd()}")
    
    # List all directories
    print("\nAll accessible directories:")
    session.retrlines('LIST', print)
    
    # Try to find public_html or similar
    common_dirs = ['public_html', 'www', 'htdocs', 'web', 'httpdocs', 'httpsdocs', '../public_html']
    
    for dir_path in common_dirs:
        try:
            session.cwd(dir_path)
            print(f"\nSUCCESS! Found {dir_path}")
            session.retrlines('LIST', print)
            print(f"\nYou can upload files to: {dir_path}")
            break
        except Exception as e:
            print(f"Directory {dir_path}: Not accessible")
    
except Exception as e:
    print(f"Error: {e}")
finally:
    session.quit()
