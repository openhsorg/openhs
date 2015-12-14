#!/bin/bash
# Michal Valny
# Ubuntu installation:
#
# Oct-25-2015: Michal Valny: Added complete installation
#

echo "********** OpenHS Development Tools for Ubuntu... **********"

read -p "Press any key for continue..."

echo "********** Install Arduino IDE ... **********"

sudo apt-get update

sudo apt-get install -y -q default-jre

sudo apt-get install -y -q default-jdk

sudo apt-get update && sudo apt-get install -y -q arduino

# Arduino is installed here: /usr/share/arduino/

read -p "Connect Arduino via USB and pres key..."

sudo chmod a+rw /dev/ttyACM0

echo "********** Done ... **********"

