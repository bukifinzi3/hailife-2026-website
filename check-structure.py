#!/usr/bin/env python3
import ftplib

FTP_HOST = "ftp.simonefinzi.com.br"
FTP_USER = "bob@clinicahailife.com.br"
FTP_PASS = "*L*9j2Pyy7gz!&"

session = ftplib.FTP(FTP_HOST)
session.login(FTP_USER, FTP_PASS)

# Check structure of /hailife-test
session.cwd("/hailife-test")
print("Contents of /hailife-test:")
session.retrlines('LIST', print)

# Check images directories
dirs_to_check = ["images", "images/slider", "images/medicas", "images/unidades"]
for d in dirs_to_check:
    try:
        session.cwd(d)
        print(f"\nContents of {d}:")
        session.retrlines('LIST', print)
        session.cwd("..")
    except Exception as e:
        print(f"\n{d} not accessible: {e}")

session.quit()
