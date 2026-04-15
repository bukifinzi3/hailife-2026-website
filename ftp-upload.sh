#!/bin/bash

FTP_HOST="ftp.simonefinzi.com.br"
FTP_USER="bob@clinicahailife.com.br"
FTP_PASS="*L*9j2Pyy7gz!&"

echo "Connecting to $FTP_HOST..."

lftp -u "$FTP_USER" "$FTP_PASS" "$FTP_HOST" <<'LFTP_CMDS'
set ftp:ssl-force false
set ftp:ssl-protect-data false
set ssl:verify-certificate false
ls -la
pwd
bye
LFTP_CMDS
