#!/bin/bash
# Michal Valny OK
# Ubuntu installation:
# sudo apt-get install dos2unix
# to convert a file:
# dos2unix myscript.sh

echo "********** Raspberry PI 2  -  OpenHS setup... **********"

read -p "Press any key for continue..."

sudo apt-get updatesudo apt-get upgrade

sudo rpi-update

# XRDP - remore desktop protocol

sudo apt-get update -q -y

sudo apt-get install -q -y xrdp

# iceweasel

sudo apt-get update -q -y

sudo apt-get install -q -y iceweasel

# OpenHAB

sudo apt-get update -q -y

sudo mkdir /opt/openhab

cd /opt/openhab

sudo wget https://github.com/openhab/openhab/releases/download/v1.5.1/distribution-1.5.1-runtime.zip

cd /opt/openhab

sudo unzip distribution-1.5.1-runtime.zip

sudo rm distribution-1.5.1-runtime.zip

cd addons/

sudo wget https://github.com/openhab/openhab/releases/download/v1.5.1/distribution-1.5.1-addons.zip

sudo unzip distribution-1.5.1-addons.zip

sudo rm distribution-1.5.1-addons.zip

cd ..

sudo cp configurations/openhab_default.cfg configurations/openhab.cfg

cd /opt/openhab

sudo wget https://github.com/openhab/openhab/releases/download/v1.5.1/distribution-1.5.1-demo-configuration.zip

cd /opt/openhab

sudo unzip distribution-1.5.1-demo-configuration.zip

sudo rm distribution-1.5.1-demo-configuration.zip 

sudo chmod +x start.sh

# cd /opt/openhab
# sudo ./start.sh

