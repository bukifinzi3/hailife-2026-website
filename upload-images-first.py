#!/usr/bin/env python3
import ftplib
import os

FTP_HOST = "ftp.simonefinzi.com.br"
FTP_USER = "bob@clinicahailife.com.br"
FTP_PASS = "*L*9j2Pyy7gz!&"
LOCAL_DIR = "/Users/nuggetclawstein/.openclaw/workspace/cody/web-hailife"
REMOTE_BASE = "/hailife-test"

def upload():
    print(f"Connecting to {FTP_HOST}...")
    session = ftplib.FTP(FTP_HOST)

    try:
        session.login(FTP_USER, FTP_PASS)
        print(f"Connected! Current dir: {session.pwd()}")
        
        # Change to remote base directory
        session.cwd(REMOTE_BASE)
        print(f" Changed to {REMOTE_BASE}")
        
        # Create directory structure on remote
        dirs_to_create = [
            "images/slider",
            "images/medicas", 
            "images/unidades"
        ]
        
        for dir_path in dirs_to_create:
            try:
                session.cwd("/")
                for part in dir_path.split("/"):
                    try:
                        session.cwd(part)
                    except:
                        session.mkd(part)
                        session.cwd(part)
                print(f" Created: {dir_path}")
            except Exception as e:
                print(f" Directory {dir_path}: {e}")
        
        # Upload images from public/images
        public_images = os.path.join(LOCAL_DIR, "public", "images")
        if os.path.exists(public_images):
            for root, dirs, files in os.walk(public_images):
                rel_path = os.path.relpath(root, public_images)
                remote_root = f"/{REMOTE_BASE.lstrip('/')}/images"
                
                if rel_path != ".":
                    remote_root = f"{remote_root}/{rel_path}"
                
                print(f"\nUploading files to {remote_root}...")
                
                for file in files:
                    local_path = os.path.join(root, file)
                    remote_path = f"{remote_root}/{file}"
                    
                    with open(local_path, 'rb') as f:
                        try:
                            session.storbinary(f'STOR {remote_path}', f)
                            print(f"  ✅ {remote_path}")
                        except Exception as e:
                            print(f"  ❌ {remote_path}: {e}")
        
        print(f"\n✅ Images upload completed!")
        
        # List uploaded files
        print(f"\nUploaded files in {REMOTE_BASE}:")
        session.cwd(REMOTE_BASE)
        session.retrlines('LIST', print)
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        session.quit()

if __name__ == "__main__":
    upload()
