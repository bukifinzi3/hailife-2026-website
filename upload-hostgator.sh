#!/bin/bash

# HostGator FTP Credentials
FTP_HOST="ftp.clinicahailife.com.br"
FTP_USER="simone.finzi@yahoo.com"
FTP_PASS="Hailife62@"
FTP_DIR="/public_html/hailife-teste"

# Local files to upload
LOCAL_DIR="/Users/nuggetclawstein/.openclaw/workspace/cody/web-hailife/.next"

# Use the correct FTP host (based on the actual server)
# You can find this in your HostGator dashboard under "FTP Accounts"

# Try multiple hosts
for FTP_HOST in "ftp.clinicahailife.com.br" "ftp.hospedagemdesites.com" "ftp.hostgator.com"; do
  echo "Trying FTP host: $FTP_HOST"
  
  # Create lftp script without SSL verification
  cat > /tmp/upload-ftp.lftp <<EOF2
set ftp:ssl-force false
set ftp:ssl-protect-data false
set ssl:verify-certificate false
open $FTP_HOST
user $FTP_USER $FTP_PASS
cd $FTP_DIR
mput -O $LOCAL_DIR/* $LOCAL_DIR
bye
EOF2

  # Run lftp
  lftp -f /tmp/upload-ftp.lftp 2>&1
  
  # Check if upload succeeded
  if [ \$? -eq 0 ]; then
    echo "Upload to $FTP_HOST succeeded!"
    break
  else
    echo "Upload to $FTP_HOST failed, trying next host..."
  fi
done

echo "Upload attempt completed!"