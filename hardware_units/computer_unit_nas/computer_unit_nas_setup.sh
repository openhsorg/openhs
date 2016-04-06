#!/bin/bash
# Michal Valny OK
# Ubuntu installation:
# sudo apt-get install dos2unix
# to convert a file:
# dos2unix myscript.sh

echo "********** Raspberry PI 2  -  OpenHS setup os HANS computer unit **********"

read -p "Press any key for continue..."

sudo apt-get updatesudo apt-get upgrade

sudo rpi-update

# XRDP - remore desktop protocol

sudo apt-get update -q -y

sudo apt-get install -q -y xrdp

# iceweasel

sudo apt-get update -q -y

sudo apt-get install -q -y iceweasel

echo "********** DONE **********"


