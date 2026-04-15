#!/usr/bin/env python3
import ftplib
import os

# Configure estas credenciais
FTP_HOST = "ftp.simonefinzi.com.br"
FTP_USER = "bob@clinicahailife.com.br"
FTP_PASS = "*L*9j2Pyy7gz!&"
LOCAL_DIR = "/Users/nuggetclawstein/.openclaw/workspace/cody/web-hailife/.next"
REMOTE_BASE = "/public_html"

def is_binary_file(filepath):
    """Check if file is binary (not text)"""
    binary_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.pdf', '.zip', '.tar', '.gz', '.exe', '.dll', '.so'}
    ext = os.path.splitext(filepath)[1].lower()
    return ext in binary_extensions

def upload_to_ftp():
    print(f"Connecting to {FTP_HOST}...")
    session = ftplib.FTP(FTP_HOST)  # Use FTP (not FTP_TLS) for HostGator

    try:
        session.login(FTP_USER, FTP_PASS)
        print(f"Connected successfully!")
        print(f"Current directory: {session.pwd()}")
        
        # List directories to find public_html
        print("\nSearching for public_html...")
        
        # Try to find public_html in parent directory
        try:
            session.cwd("..")
            print(f"Moved to parent: {session.pwd()}")
            
            # List all directories
            dirs = []
            session.retrlines('LIST', lambda line: dirs.append(line))
            for d in dirs:
                if 'public_html' in d:
                    print(f"Found: {d}")
                    session.cwd("public_html")
                    print(f"Changed to public_html: {session.pwd()}")
                    break
        except Exception as e:
            print(f"Could not access public_html: {e}")
        
        # Create directory structure on remote
        for root, dirs, files in os.walk(LOCAL_DIR):
            rel_path = os.path.relpath(root, LOCAL_DIR)
            if rel_path == ".":
                rel_path = ""
            
            # Upload each file
            for file in files:
                local_path = os.path.join(root, file)
                rel_local = os.path.relpath(local_path, LOCAL_DIR)
                remote_path = f"{REMOTE_BASE}/{rel_local}" if rel_local else f"{REMOTE_BASE}/{file}"
                
                # Determine mode (binary or text)
                if is_binary_file(file):
                    mode = 'STOR'
                    print(f"Uploading (binary): {rel_local}")
                else:
                    mode = 'STOR'
                    print(f"Uploading: {rel_local}")
                
                with open(local_path, 'rb') as f:
                    try:
                        session.storbinary(f'{mode} {remote_path}', f)
                        print(f"  ✅ Success: {remote_path}")
                    except Exception as e:
                        print(f"  ❌ Failed: {remote_path} - {e}")
        
        print("\n✅ Upload completed!")
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        session.quit()

if __name__ == "__main__":
    upload_to_ftp()
