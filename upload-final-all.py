#!/usr/bin/env python3
import ftplib
import os

FTP_HOST = "ftp.simonefinzi.com.br"
FTP_USER = "bob@clinicahailife.com.br"
FTP_PASS = "*L*9j2Pyy7gz!&"
LOCAL_DIR = "/Users/nuggetclawstein/.openclaw/workspace/cody/web-hailife/.next"
REMOTE_BASE = "/hailife-test"

def upload():
    print(f"Connecting to {FTP_HOST}...")
    session = ftplib.FTP(FTP_HOST)

    try:
        session.login(FTP_USER, FTP_PASS)
        print(f"Connected! Current dir: {session.pwd()}")
        
        # Change to remote base
        session.cwd(REMOTE_BASE)
        print(f"Changed to {REMOTE_BASE}")
        
        # Upload static files directly to root
        public_dir = os.path.join(os.path.dirname(LOCAL_DIR), 'public')
        if os.path.exists(public_dir):
            for root, dirs, files in os.walk(public_dir):
                rel_path = os.path.relpath(root, public_dir)
                if rel_path == ".":
                    rel_path = ""
                
                for file in files:
                    local_path = os.path.join(root, file)
                    rel_local = os.path.relpath(local_path, public_dir)
                    remote_path = f"{rel_local}" if rel_local else file
                    
                    with open(local_path, 'rb') as f:
                        try:
                            session.storbinary(f'STOR {remote_path}', f)
                            print(f"  ✅ {remote_path}")
                        except Exception as e:
                            print(f"  ❌ {remote_path}: {e}")
        
        # Upload .next build files
        print(f"\nUploading .next files to {REMOTE_BASE}...")
        
        for root, dirs, files in os.walk(LOCAL_DIR):
            rel_path = os.path.relpath(root, LOCAL_DIR)
            if rel_path == ".":
                rel_path = ""
            
            for file in files:
                # Skip node_modules and cache
                if 'node_modules' in root or 'cache' in root:
                    continue
                
                local_path = os.path.join(root, file)
                rel_local = os.path.relpath(local_path, LOCAL_DIR)
                remote_path = f"{rel_local}" if rel_local else file
                
                # Skip Next.js internal files
                skip_patterns = ['types/', 'trace', 'BUILD_ID', 'next-', 'export-', 'routes-manifest', 'build-manifest', 'react-loadable', 'prerender-manifest', 'app-build-manifest', 'app-path-routes-manifest', 'nft.json']
                skip = False
                for pattern in skip_patterns:
                    if pattern in rel_local or pattern in file:
                        skip = True
                        break
                
                if skip:
                    continue
                
                with open(local_path, 'rb') as f:
                    try:
                        session.storbinary(f'STOR {remote_path}', f)
                        print(f"  ✅ {remote_path}")
                    except Exception as e:
                        print(f"  ❌ {remote_path}: {e}")
        
        print(f"\n✅ Upload completed to {REMOTE_BASE}!")
        
        # List uploaded files
        print(f"\nFiles in {REMOTE_BASE}:")
        session.retrlines('LIST', print)
        
    except Exception as e:
        print(f"Error: {e}")
        import traceback
        traceback.print_exc()
    finally:
        session.quit()

if __name__ == "__main__":
    upload()
