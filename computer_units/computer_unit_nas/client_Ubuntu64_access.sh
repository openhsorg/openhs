#!/bin/bash
# Purpose: This is for any Ubuntu_x64 client in need of access to NAS unit.
# Ubuntu installation:
#sudo apt-get install dos2unix
# to convert a file:
# dos2unix myscript.sh

# Die on any errors
set -e 

if [[ `whoami` != "root" ]]
then
  echo "Script must be run as root."
  exit 1
fi

echo "********** OpenHS setup access to NAS unit... **********"

echo -n "Access Login Name: "
read LOGIN
echo -n "Access Password: "
read PASSWORD

#Disc
mkdir /mnt/OHS_HDD1
chmod 775 /mnt/OHS_HDD1

mkdir /mnt/OHS_HDD2
chmod 775 /mnt/OHS_HDD2

mkdir /mnt/OHS_HDD3
chmod 775 /mnt/OHS_HDD3

mkdir /mnt/OHS_HDD4
chmod 775 /mnt/OHS_HDD4

path="/etc/fstab"

echo "" >> $path
echo "//192.168.1.232/WD1 /mnt/OHS_HDD1 cifs username=$LOGIN,password=$PASSWORD,uid=65534,gid=65534,file_mode=0777,dir_mode=0777,iocharset=utf8, 0 0" >> $path
echo "//192.168.1.232/WD2 /mnt/OHS_HDD2 cifs username=$LOGIN,password=$PASSWORD,uid=65534,gid=65534,file_mode=0777,dir_mode=0777,iocharset=utf8, 0 0" >> $path
echo "//192.168.1.232/Porche /mnt/OHS_HDD3 cifs username=$LOGIN,password=$PASSWORD,uid=65534,gid=65534,file_mode=0777,dir_mode=0777,iocharset=utf8, 0 0" >> $path
echo "//192.168.1.232/Old /mnt/OHS_HDD4 cifs username=$LOGIN,password=$PASSWORD,uid=65534,gid=65534,file_mode=0777,dir_mode=0777,iocharset=utf8, 0 0" >> $path

mount -a

# cd /opt/openhab
# sudo ./start.sh

