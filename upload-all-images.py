#!/usr/bin/env python3
import ftplib
import os

FTP_HOST = "ftp.simonefinzi.com.br"
FTP_USER = "bob@clinicahailife.com.br"
FTP_PASS = "*L*9j2Pyy7gz!&"
LOCAL_IMAGES = "/Users/nuggetclawstein/.openclaw/workspace/cody/web-hailife/public/images"
REMOTE_BASE = "/hailife-test"

def upload_images():
    print(f"Connecting to {FTP_HOST}...")
    session = ftplib.FTP(FTP_HOST)

    try:
        session.login(FTP_USER, FTP_PASS)
        print(f"Connected! Current dir: {session.pwd()}")
        
        # Change to remote base
        session.cwd(REMOTE_BASE)
        print(f"Changed to {REMOTE_BASE}")
        
        # Create images directory
        try:
            session.cwd("images")
            print(f"Images dir exists")
        except:
            session.mkd("images")
            session.cwd("images")
            print(f"Created images dir")
        
        # Create subdirectories
        for subdir in ["slider", "medicas", "unidades"]:
            try:
                session.cwd(subdir)
                print(f"Directory {subdir} exists")
            except Exception as e:
                session.mkd(subdir)
                session.cwd(subdir)
                print(f"Created directory: {subdir}")
            session.cwd("..")
        
        # Upload images
        print(f"\nUploading images to {REMOTE_BASE}/images...")
        
        for subdir in ["slider", "medicas", "unidades"]:
            local_subdir = os.path.join(LOCAL_IMAGES, subdir)
            if os.path.exists(local_subdir):
                session.cwd(f"{REMOTE_BASE}/images/{subdir}")
                print(f"\nUploading {subdir}...")
                
                for file in os.listdir(local_subdir):
                    local_path = os.path.join(local_subdir, file)
                    remote_path = file
                    
                    with open(local_path, 'rb') as f:
                        try:
                            session.storbinary(f'STOR {remote_path}', f)
                            print(f"  ✅ {remote_path}")
                        except Exception as e:
                            print(f"  ❌ {remote_path}: {e}")
        
        print(f"\n✅ Images upload completed!")
        
        # List uploaded files
        print(f"\nFiles in {REMOTE_BASE}/images:")
        session.cwd(f"{REMOTE_BASE}/images")
        session.retrlines('LIST', print)
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        session.quit()

if __name__ == "__main__":
    upload_images()
