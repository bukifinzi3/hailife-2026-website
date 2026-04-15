#!/usr/bin/env python3
import ftplib
import os

# Novas credenciais
FTP_HOST = "ftp.simonefinzi.com.br"
FTP_USER = "ftpsimonefinzi@simonefinzi.com.br"
FTP_PASS = "d*r2gJb3*ztjYh"
LOCAL_DIR = "/Users/nuggetclawstein/.openclaw/workspace/cody/web-hailife/.next"

print(f"Connecting to {FTP_HOST}...")
session = ftplib.FTP(FTP_HOST)

try:
    session.login(FTP_USER, FTP_PASS)
    print(f"Connected successfully!")
    print(f"Current directory: {session.pwd()}")
    
    # Try to access public_html
    try:
        session.cwd("/public_html")
        print("✅ SUCCESS! Can access /public_html")
        session.retrlines('LIST', print)
        
        # Now upload
        print("\nUploading .next files to /public_html...")
        
        for root, dirs, files in os.walk(LOCAL_DIR):
            rel_path = os.path.relpath(root, LOCAL_DIR)
            if rel_path == ".":
                rel_path = ""
            
            for file in files:
                local_path = os.path.join(root, file)
                rel_local = os.path.relpath(local_path, LOCAL_DIR)
                remote_path = f"{rel_local}" if rel_local else file
                
                with open(local_path, 'rb') as f:
                    try:
                        session.storbinary(f'STOR {remote_path}', f)
                        print(f"✅ {remote_path}")
                    except Exception as e:
                        print(f"❌ {remote_path}: {e}")
        
        print("\n✅ Upload to /public_html completed!")
        
    except Exception as e:
        print(f"Cannot access /public_html: {e}")
        
except Exception as e:
    print(f"Login failed: {e}")
finally:
    session.quit()
