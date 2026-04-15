#!/usr/bin/env python3
import ftplib

FTP_HOST = "ftp.simonefinzi.com.br"
FTP_USER = "bob@clinicahailife.com.br"
FTP_PASS = "*L*9j2Pyy7gz!&"

session = ftplib.FTP(FTP_HOST)
session.login(FTP_USER, FTP_PASS)

# Check structure
print("Contents of /hailife-test:")
session.cwd("/hailife-test")
session.retrlines('LIST', print)

# Check /bob structure
print("\nChecking /bob:")
try:
    session.cwd("/bob")
    print("📂 /bob exists!")
    session.retrlines('LIST', print)
    
    print("\nChecking /bob/images:")
    session.cwd("images")
    session.retrlines('LIST', print)
except Exception as e:
    print(f"❌ Cannot access /bob: {e}")

session.quit()
