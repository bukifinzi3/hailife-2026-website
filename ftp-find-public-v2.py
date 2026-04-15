#!/usr/bin/env python3
import ftplib
import os

FTP_HOST = "ftp.simonefinzi.com.br"
FTP_USER = "bob@clinicahailife.com.br"
FTP_PASS = "*L*9j2Pyy7gz!&"

print(f"Connecting to {FTP_HOST}...")
session = ftplib.FTP_TLS(FTP_HOST)

try:
    session.login(FTP_USER, FTP_PASS)
    print(f"Connected successfully!")
    print(f"Current directory: {session.pwd()}")
    
    # Try to find the public_html or www directory via relative path
    print("\nTrying to find public_html via relative path...")
    try:
        session.cwd('../public_html')
        print("SUCCESS! Found public_html at ../public_html")
        session.retrlines('LIST', print)
    except Exception as e:
        print(f"../public_html not accessible: {e}")
    
    try:
        session.cwd('..')
        session.cwd('./public_html')
        print("SUCCESS! Found public_html at ./public_html")
        session.retrlines('LIST', print)
    except Exception as e:
        print(f"./public_html not accessible: {e}")
    
    print("\nAll accessible directories:")
    session.retrlines('LIST', print)
    
except Exception as e:
    print(f"Error: {e}")
finally:
    session.quit()
