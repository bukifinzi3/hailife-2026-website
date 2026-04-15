#!/usr/bin/env python3
import ftplib
import os

# Credenciais com diretório home corrigido
FTP_HOST = "ftp.simonefinzi.com.br"
FTP_USER = "bob@clinicahailife.com.br"
FTP_PASS = "*L*9j2Pyy7gz!&"
LOCAL_DIR = "/Users/nuggetclawstein/.openclaw/workspace/cody/web-hailife/.next"
REMOTE_DIR = "/public_html"

def is_binary_file(filepath):
    binary_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.pdf', '.zip', '.tar', '.gz', '.exe', '.dll', '.so', '.ico', '.svg'}
    ext = os.path.splitext(filepath)[1].lower()
    return ext in binary_extensions

def upload():
    print(f"Connecting to {FTP_HOST}...")
    session = ftplib.FTP(FTP_HOST)

    try:
        session.login(FTP_USER, FTP_PASS)
        print(f"Connected! Current dir: {session.pwd()}")
        
        # Try to access public_html
        try:
            session.cwd(REMOTE_DIR)
            print(f"✅ SUCCESS! Can access {REMOTE_DIR}")
            session.retrlines('LIST', print)
            
            # Upload .next files
            print(f"\nUploading .next files to {REMOTE_DIR}...")
            
            # First, upload static files (public folder) directly
            public_dir = os.path.join(LOCAL_DIR.replace('.next', ''), 'public')
            if os.path.exists(public_dir):
                for root, dirs, files in os.walk(public_dir):
                    rel_path = os.path.relpath(root, public_dir)
                    if rel_path == ".":
                        rel_path = ""
                    
                    for file in files:
                        local_path = os.path.join(root, file)
                        rel_local = os.path.relpath(local_path, public_dir)
                        remote_path = f"public/{rel_local}" if rel_local else "public"
                        
                        with open(local_path, 'rb') as f:
                            try:
                                session.storbinary(f'STOR {remote_path}/{file}', f)
                                print(f"  ✅ {remote_path}/{file}")
                            except Exception as e:
                                print(f"  ❌ {remote_path}/{file}: {e}")
            
            # Upload .next build files
            for root, dirs, files in os.walk(LOCAL_DIR):
                rel_path = os.path.relpath(root, LOCAL_DIR)
                if rel_path == ".":
                    rel_path = ""
                
                for file in files:
                    # Skip node_modules and other build artifacts
                    if 'node_modules' in root or 'cache' in root:
                        continue
                    
                    local_path = os.path.join(root, file)
                    rel_local = os.path.relpath(local_path, LOCAL_DIR)
                    remote_path = f"{rel_local}" if rel_local else file
                    
                    # Skip type definition files
                    if 'types' in root or file.endswith('.ts') or file.endswith('.tsx'):
                        continue
                    
                    # Skip Next.js internal files
                    skip_files = ['trace', 'BUILD_ID', 'next.*', 'RequiredServerFiles*', 'export.*', 'routes-manifest.json', 'build-manifest.json', 'react-loadable-manifest.json', 'prerender-manifest.json', 'app-build-manifest.json', 'app-path-routes-manifest.json', 'next-server.js.nft.json', 'next-minimal-server.js.nft.json']
                    skip = False
                    for sf in skip_files:
                        if sf.replace('*', '') in file or sf.replace('*', '') in rel_local:
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
            
            print(f"\n✅ Upload completed to {REMOTE_DIR}!")
            
        except Exception as e:
            print(f"Cannot access {REMOTE_DIR}: {e}")
            
    except Exception as e:
        print(f"Login failed: {e}")
        import traceback
        traceback.print_exc()
    finally:
        session.quit()

if __name__ == "__main__":
    upload()
