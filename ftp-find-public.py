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
    
    # Try to access common directories in a try-except loop
    test_dirs = ['public_html', 'www', 'htdocs', 'web', 'httpdocs', 'httpsdocs']
    
    for dir_name in test_dirs:
        try:
            session.cwd(dir_name)
            print(f"SUCCESS: Directory /{dir_name} exists and is accessible!")
            session.retrlines('LIST', print)
            break
        except Exception as e:
            print(f"Directory /{dir_name} not accessible: {e}")
    
    print("\nAll accessible directories from root:")
    session.retrlines('LIST', print)
    
except Exception as e:
    print(f"Error: {e}")
finally:
    session.quit()
