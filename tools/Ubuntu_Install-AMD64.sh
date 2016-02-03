#!/bin/bash

# Ubuntu installation:
#sudo apt-get install dos2unix
# to convert a file:
# dos2unix myscript.sh

#ECLIPSE="http://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/mars/1/eclipse-jee-mars-1-linux-gtk-x86_64.tar.gz&r=1"
ECLIPSE="http://www.eclipse.org/downloads/download.php?file=/technology/epp/downloads/release/kepler/SR2/eclipse-rcp-kepler-SR2-linux-gtk-x86_64.tar.gz&r=1"

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

apt-get update && apt-get upgrade -y -q

# Java
apt-get install -y default-jre
apt-get install -y default-jdk
apt-cache search jdk

# Dosbox
apt-get -y update
apt-get -y install dosbox
copy_shortcut "dosbox.desktop"

# VLC
add-apt-repository -y ppa:videolan/stable-daily
apt-get -y update
apt-get -f -y install vlc

# unrar
apt-get -f -y install unrar-free

#Gthumb
apt-get -f -y install gthumb
copy_shortcut "gthumb.desktop"

#Filezilla
apt-get -y update
apt-get -f -y install filezilla
copy_shortcut "filezilla.desktop"

#Double commander
add-apt-repository -y ppa:alexx2000/doublecmd
apt-get -y update
apt-get -f -y install doublecmd-qt
copy_shortcut "doublecmd.desktop"

#MNT
cp -f data/mtn /usr/local/bin/mtn
chmod +x /usr/local/bin/mtn

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

#Kate editor
apt-get -y update
apt-get -y install kate

#Chrome
apt-get update
apt-get -y purge google-chrome-stable
apt-get -y autoremove
apt-get -y install libxss1 libappindicator1 libindicator7
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
dpkg -i ./google-chrome*.deb
apt-get -y install -f
rm -f google-chrome-stable_current_amd64.deb
rm -f google-chrome*.deb
copy_shortcut "google-chrome.desktop"

#Eclipse
apt-get -y update
rm -f -r eclipse
rm -f -r /opt/eclipse
rm -f -r /usr/bin/eclipse
rm -f -r $HOME/.local/share/applications/eclipse.desktop
wget "$ECLIPSE" -O eclipse.tar.gz
tar -xf eclipse.tar.gz
rm eclipse.tar.gz
mv -f eclipse /opt/eclipse
ln -s /opt/eclipse/eclipse /usr/bin/eclipse

#GIT
apt-get -y update
apt-get -f -y install git-core
apt-get -f -y install git-gui
git config --global user.name \"Michal Valny\"
git config --global user.email \"michal.valny@openhs.org\"
git config --list
add-apt-repository -y ppa:eugenesan/ppa
apt-get -y update
apt-get -y install smartgit
copy_shortcut "smartgit.desktop"

#Maven
apt-get -y update
apt-get -y install maven

#Gparted
apt-get -y update
apt-get -f -y install gparted

#Skype
add-apt-repository "deb http://archive.canonical.com/ $(lsb_release -sc) partner"
apt-get -y update
apt-get -y install skype

#JDownloader
wget http://installer.jdownloader.org/JD2Setup_x64.sh
chmod +x JD2Setup_x64.sh
./JD2Setup_x64.sh

#Settings
echo "********** ---------- Settings... ---------- **********"
gconftool -s /apps/nm-applet/disable-disconnected-notifications --type=bool true
gconftool -s /apps/nm-applet/disable-connected-notifications --type=bool true

path=$HOME"/.local/share/applications/mimeapps.list"

echo $path

echo "[Default Applications]" > $path
echo "text/html=google-chrome.desktop" >> $path
echo "x-scheme-handler/http=google-chrome.desktop" >> $path
echo "x-scheme-handler/https=google-chrome.desktop" >> $path
echo "x-scheme-handler/about=google-chrome.desktop" >> $path
echo "x-scheme-handler/unknown=google-chrome.desktop" >> $path
echo "video/x-msvideo=vlc.desktop" >> $path
echo "video/x-ms-wmv=vlc.desktop" >> $path
echo "video/mpeg=vlc.desktop" >> $path
echo "video/mp4=vlc.desktop" >> $path
echo "video/flv=vlc.desktop" >> $path
echo "video/mov=vlc.desktop" >> $path
echo "application/vnd.rn-realmedia=vlc.desktop" >> $path
echo "video/x-flv=vlc.desktop" >> $path
echo "video/avi=vlc.desktop" >> $path
echo "video/rm=vlc.desktop" >> $path
echo "video/divx=vlc.desktop" >> $path
echo "video/mpg=vlc.desktop" >> $path

# cd /opt/openhab
# sudo ./start.sh

