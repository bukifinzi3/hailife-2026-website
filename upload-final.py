#!/usr/bin/env python3
import ftplib
import os

# Configure estas credenciais
FTP_HOST = "ftp.simonefinzi.com.br"
FTP_USER = "SEU_USUARIO_FTP_AQUI"
FTP_PASS = "SUA_SENHA_AQUI"
LOCAL_DIR = "/Users/nuggetclawstein/.openclaw/workspace/cody/web-hailife/.next"
REMOTE_DIR = "/public_html"

def upload_ftp():
    print(f"Connecting to {FTP_HOST}...")
    session = ftplib.FTP_TLS(FTP_HOST)

    try:
        session.login(FTP_USER, FTP_PASS)
        print(f"Connected successfully!")
        print(f"Current directory: {session.pwd()}")
        
        # Change to public_html
        session.cwd(REMOTE_DIR)
        print(f"Changed to {REMOTE_DIR}")
        
        # Upload all files from .next directory
        for root, dirs, files in os.walk(LOCAL_DIR):
            rel_path = os.path.relpath(root, LOCAL_DIR)
            if rel_path == ".":
                rel_path = ""
            
            # Create directory structure on remote
            if rel_path:
                try:
                    session.cwd(rel_path)
                except:
                    try:
                        session.mkd(rel_path)
                        session.cwd(rel_path)
                    except Exception as e:
                        print(f"Cannot create {rel_path}: {e}")
            
            for file in files:
                local_path = os.path.join(root, file)
                remote_path = os.path.join(rel_path, file) if rel_path else file
                
                with open(local_path, 'rb') as f:
                    print(f"Uploading {remote_path} ({os.path.getsize(local_path)} bytes)...")
                    session.storbinary(f'STOR {remote_path}', f)
        
        print("\n✅ Upload completed!")
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        session.quit()

if __name__ == "__main__":
    upload_ftp()
