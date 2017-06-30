#!/bin/bash

# Ubuntu installation:
#sudo apt-get install dos2unix
# to convert a file:
# dos2unix myscript.sh

ECLIPSE="http://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/mars/1/eclipse-jee-mars-1-linux-gtk-x86_64.tar.gz&r=1"
#ECLIPSE="http://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/kepler/SR2/eclipse-rcp-kepler-SR2-linux-gtk-x86_64.tar.gz&r=1"

# Die on any errors
set -e 

if [[ `whoami` != "root" ]]
then
  echo "Script must be run as root."
  exit 1
fi

function copy_shortcut () 
{
	home=$HOME
	from="/usr/share/applications/"$1
	to=$home"/Desktop/"$1;

	cp -f $from $to

	chmod 7 $to 
	chmod +r $to
	chmod +w $to
	chmod +x $to	
}


echo "********** ---------- Install start ... ---------- **********"

read -p "Press any key for continue..."

echo "********** ---------- Update Ubuntu ... ---------- **********"

apt-get -y update && apt-get upgrade -y -q

# Java
apt-get update
apt-get -y install default-jre
apt-get -y install default-jdk

#Atom
add-apt-repository ppa:webupd8team/atom
sudo apt-get -y update
sudo apt-get -y install atom

#Chromium
apt-get -y install chromium-browser

# unrar
apt-get -f -y install unrar-free

# rar
sudo apt-get update
sudo apt-get -f -y install rar unrar

#Gthumb
apt-get -f -y install gthumb
copy_shortcut "gthumb.desktop"

#Double commander
add-apt-repository -y ppa:alexx2000/doublecmd
apt-get -y update
apt-get -f -y install doublecmd-qt
copy_shortcut "doublecmd.desktop"

#MNT
# cp -f data/mtn /usr/local/bin/mtn
# chmod +x /usr/local/bin/mtn

#Samba
apt-get -y update
apt-get -f -y install samba samba-common-bin
apt-get -f -y install system-config-samba

#TOR
apt-get -y update
apt-get -y install tor

add-apt-repository -y ppa:webupd8team/tor-browser
apt-get -y update
apt-get -y install tor-browser

#GIT
apt-get -y update
apt-get -f -y install git-core
apt-get -f -y install git-gui
git config --global user.name \"Michal Valny\"
git config --global user.email \"michal.valny@openhs.org\"
git config --list
#add-apt-repository -y ppa:eugenesan/ppa
#apt-get -y update
#apt-get -y install smartgit
#copy_shortcut "smartgit.desktop"

#Gparted
apt-get -y update
apt-get -f -y install gparted

#Skype
add-apt-repository "deb http://archive.canonical.com/ $(lsb_release -sc) partner"
apt-get -y update
apt-get -y install skype

#Cryptsetup
sudo apt-get -y update
sudo apt-get -y install cryptsetup

#Settings


# cd /opt/openhab
# sudo ./start.sh

