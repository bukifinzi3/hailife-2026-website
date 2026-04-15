#!/usr/bin/env python3
import ftplib
import os

FTP_HOST = "ftp.simonefinzi.com.br"
FTP_USER = "bob@clinicahailife.com.br"
FTP_PASS = "*L*9j2Pyy7gz!&"
LOCAL_DIR = "/Users/nuggetclawstein/.openclaw/workspace/cody/web-hailife"
REMOTE_DIR = "/public_html"  # Direct path to public_html

def upload():
    print(f"Connecting to {FTP_HOST}...")
    session = ftplib.FTP(FTP_HOST)

    try:
        session.login(FTP_USER, FTP_PASS)
        print(f"Connected!")
        print(f"Current dir: {session.pwd()}")
        
        # Create a test directory in home
        test_dir = "/hailife-test"
        try:
            session.mkd(test_dir)
            print(f"Created test dir: {test_dir}")
            session.cwd(test_dir)
        except Exception as e:
            print(f"Cannot create {test_dir}: {e}")
            return
        
        # Upload .next files to test directory
        next_dir = os.path.join(LOCAL_DIR, ".next")
        
        for root, dirs, files in os.walk(next_dir):
            rel_path = os.path.relpath(root, next_dir)
            if rel_path == ".":
                rel_path = ""
            
            for file in files:
                local_path = os.path.join(root, file)
                remote_path = f"{rel_path}/{file}" if rel_path else file
                
                with open(local_path, 'rb') as f:
                    try:
                        session.storbinary(f'STOR {remote_path}', f)
                        print(f"Uploaded: {remote_path}")
                    except Exception as e:
                        print(f"Failed: {remote_path} - {e}")
        
        print(f"\nUploaded to {test_dir}")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        session.quit()

if __name__ == "__main__":
    upload()
