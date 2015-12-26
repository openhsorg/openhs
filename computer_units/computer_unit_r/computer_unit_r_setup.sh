#!/bin/bash
# Michal Valny OK
# Ubuntu installation:
# sudo apt-get install dos2unix
# to convert a file:
# dos2unix myscript.sh

# Die on any errors
set -e 

if [[ `whoami` != "root" ]]
then
  echo "Script must be run as root."
  exit 1
fi

echo "********** OpenHS setup of computer unit (Raspberry Pi )... **********"

read -p "Press any key for continue..."

# Variables for the rest of the script
echo -n "Choose a hostname: "
read NEW_HOSTNAME
echo -n "User: "
read NEW_USER
echo -n "Password for user (leave blank for disabled): "
read PASS_PROMPT
echo -n "Paste public key (leave blank for disabled): "
read PUBLIC_KEY

# Update Raspbian...
apt-get -y update
apt-get -y upgrade

rpi-update

# Install some base packages
apt-get install -y --force-yes dnsutils g++ gcc ipython \
make ntp python python-pip vim vlc

# XRDP - remore desktop protocol
apt-get update -q -y
apt-get install -q -y xrdp

# Update hostname
echo "$NEW_HOSTNAME" > /etc/hostname
sed -i 's/pi/$NEW_HOSTNAME/' /etc/hosts

# Set VIM as the default editor
#update-alternatives --set editor /usr/bin/vim.basic

# Add user and authorized_keys
if [[ "$PASS_PROMPT" = "" ]]
then
  useradd -b /home --create-home -s /bin/bash -G sudo $NEW_USER
else
  useradd -b /home --create-home -s /bin/bash -G sudo $NEW_USER -p `echo "$PASS_PROMPT" | openssl passwd -1 -stdin` 
fi

adduser $NEW_USER sudo 
adduser $NEW_USER adm

echo "$NEW_USER ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

#Automatic logon to new user
sed -i "s/.*autologin-user=.*/autologin-user=$NEW_USER/" /etc/lightdm/lightdm.conf

if [[ "$PUBLIC_KEY" != "" ]]
then
  mkdir -p /home/$NEW_USER/.ssh/
  echo "$PUBLIC_KEY" > /home/$NEW_USER/.ssh/authorized_keys
fi
chown -R $NEW_USER:$NEW_USER /home/$NEW_USER

# Allow users in the sudo group to sudo without password
sed -i 's/%sudo.*/%sudo   ALL=NOPASSWD: ALL/g' /etc/sudoers

# Turn off password authentication 
sed -i 's/#   PasswordAuthentication yes/    PasswordAuthentication no/g' /etc/ssh/ssh_config

# iceweasel
apt-get update -q -y
apt-get install -q -y iceweasel

# OpenHAB
apt-get update -q -y

mkdir /opt/openhab

cd /opt/openhab

wget https://github.com/openhab/openhab/releases/download/v1.5.1/distribution-1.5.1-runtime.zip

cd /opt/openhab

unzip distribution-1.5.1-runtime.zip

rm distribution-1.5.1-runtime.zip

cd addons/

wget https://github.com/openhab/openhab/releases/download/v1.5.1/distribution-1.5.1-addons.zip

unzip distribution-1.5.1-addons.zip

rm distribution-1.5.1-addons.zip

cd ..

cp configurations/openhab_default.cfg configurations/openhab.cfg

cd /opt/openhab

wget https://github.com/openhab/openhab/releases/download/v1.5.1/distribution-1.5.1-demo-configuration.zip

cd /opt/openhab

unzip distribution-1.5.1-demo-configuration.zip

rm distribution-1.5.1-demo-configuration.zip 

chmod +x start.sh

# cd /opt/openhab
# sudo ./start.sh
