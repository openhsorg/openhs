#!/bin/bash
# Michal Valny OK
# sudo apt-get install dos2unix
# to convert a file:
# dos2unix myscript.sh

# Variables
OPENHS="openhs_20160220"

# Die on any errors
set -e 

if [[ `whoami` != "root" ]]
then
  echo "Script must be run as root."
  exit 1
fi

echo "********** OpenHS setup of computer unit (Raspberry Pi )... **********"

read -p "Press any key for continue..."

# Update
apt-get -y update

#mkdir $HOME/openhs_product

cd $HOME

wget http://openhs.org/wordpress/wp-content/uploads/$OPENHS.tar

tar -xvf "$OPENHS.tar"

rm $OPENHS.tar

cd $HOME/$OPENHS

chmod +x start.sh

