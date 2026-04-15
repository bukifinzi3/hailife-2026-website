#!/usr/bin/env python3
import ftplib
import os

FTP_HOST = "ftp.simonefinzi.com.br"
FTP_USER = "bob@clinicahailife.com.br"
FTP_PASS = "*L*9j2Pyy7gz!&"

print(f"Connecting to {FTP_HOST}...")
session = ftplib.FTP(FTP_HOST)

try:
    session.login(FTP_USER, FTP_PASS)
    print(f"Connected! Current dir: {session.pwd()}")
    
    # List all accessible directories
    print("\nAccessible directories:")
    session.retrlines('LIST', print)
    
    # Try to access public_html via parent
    try:
        session.cwd("..")
        print(f"\nChanged to parent: {session.pwd()}")
        session.retrlines('LIST', print)
    except Exception as e:
        print(f"Cannot access parent: {e}")
    
    # Try to find public_html
    try:
        session.cwd("public_html")
        print(f"\n✅ SUCCESS! Found public_html at {session.pwd()}")
    except Exception as e:
        print(f"\n❌ Cannot access public_html: {e}")
    
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
finally:
    session.quit()
