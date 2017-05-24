#!/bin/bash
# OpenHS setupp script
if [[ `whoami` != "root" ]]
then
  echo "Script must be run as root."
  exit 1
fi

openh_dir=`pwd`
plugins_dir=$openh_dir"/plugins"
config_dir=$plugins_dir"/configuration"
config_file=$config_dir"/config.ini"
start_file=$openh_dir"/start.sh"
THE_USER=${SUDO_USER:-${USERNAME:-unknown}}
platform=$(uname -m)

#echo "USER is $THE_USER"
#echo "OpenHS directory is $openh_dir"
#echo "Plugins directory is: $plugins_dir"

echo "---------- Setup OpenHS [platform $platform]----------"
#echo "Platform $platform"

#Get list of files...
cd $plugins_dir
yourfilenames=`ls $plugins_dir/*.jar`

num_files=0

for eachfile in $yourfilenames
do

  ((num_files++))

  if [[ $eachfile == *"org.eclipse.osgi_"* ]]
  then
     osgi_file=" ${eachfile}${osgi_file}"
  fi
done

 #echo "It's there!"$osgi_file

###Write config file
#Delete config dir...
if [ -d "$config_dir" ]; then
  rm "$config_dir" -r
fi

#Create config dir
if [ ! -d "$config_dir" ]
then
    sudo -u $THE_USER mkdir $config_dir
fi

#Create config file
sudo -u $THE_USER echo "eclipse.ignoreApp=true" > $config_file
sudo -u $THE_USER echo "eclipse.exitOnError=false" >> $config_file
sudo -u $THE_USER echo "osgi.noShutdown=true" >> $config_file
sudo -u $THE_USER echo "org.osgi.service.http.port=7070" >> $config_file
sudo -u $THE_USER echo "osgi.bundles.defaultStartLevel=4" >> $config_file
#echo "osgi.bundles="

first=0

for eachfile in $yourfilenames
do
  ((first++))

  if [ $first -eq 1 ]
  then
    sudo -u $THE_USER echo "osgi.bundles=./$(basename $eachfile)@start,\\" >> $config_file
  elif [ $first -eq $num_files ]
  then
    sudo -u $THE_USER echo "./$(basename $eachfile)@start" >> $config_file
  else
    sudo -u $THE_USER echo "./$(basename $eachfile)@start,\\" >> $config_file
  fi
done

echo "OpenHS config file.."

# Create service
service_file="/lib/systemd/system/openhs.service"
#echo "Platform is $(uname -s)"
_JAVAC_LOCATION=`type java | cut -f3 -d' '`
echo "OpenHS service.."

if [ -f "$service_file" ]; then
  rm "$service_file" -r
fi

echo "[Unit]" > $service_file
echo "Description=OpenHS service" >> $service_file
echo "After=network.target" >> $service_file
echo "" >> $service_file
echo "[Service]" >> $service_file
echo "Type=simple" >> $service_file
echo "User=root" >> $service_file
echo "Group=root" >> $service_file
echo "WorkingDirectory=$openh_dir" >> $service_file
echo "ExecStart=$_JAVAC_LOCATION -jar $osgi_file -console -Declipse.ignoreApp=true -Dosgi.noShutdown=true -Dorg.osgi.service.http.port=7070 -Dorg.eclipse.equinox.http.jetty.context.sessioninactiveinterval=0 -Xmx700m" >> $service_file
echo "StandardOutput=syslog" >> $service_file
echo "StandardError=syslog" >> $service_file
echo "RestartSec=5" >> $service_file
echo "Restart=always" >> $service_file
echo "" >> $service_file
echo "[Install]" >> $service_file
echo "WantedBy=multi-user.target" >> $service_file

if [[ $platform == *"arm"* ]]
then
  chmod 644 $service_file
  systemctl daemon-reloa
  systemctl enable $service_file
  systemctl status openhs.service
fi

#Create start.sh script
echo "Created startup script $start_file.."
echo "$_JAVAC_LOCATION -jar $osgi_file -console -Declipse.ignoreApp=true -Dosgi.noShutdown=true -Dorg.osgi.service.http.port=7070 -Dorg.eclipse.equinox.http.jetty.context.sessioninactiveinterval=0 -Xmx700m" >> $start_file
chmod +x $start_file

#MQTT mosquitto install..
if ! [ -x "$(command -v mosquitto)" ]; then
  echo 'MQTT Mosquitto is NOT installed, continue with this..' >&2
  apt-get update -y -qq
  apt-get install -y -qq mosquitto mosquitto-clients
  sudo /etc/init.d/mosquitto start
  sudo /etc/init.d/mosquitto stop

  #echo "Setup mosquitto.conf file.."

  mosquito_conf="/etc/mosquitto/mosquitto.conf"

  if [ -f "$mosquito_conf" ]; then
    rm "$mosquito_conf" -r
  fi

  echo "# Mosquitto config..." > $mosquito_conf
  echo "pid_file /var/run/mosquitto.pid" >> $mosquito_conf
  echo "" >> $mosquito_conf
  echo "persistence true" >> $mosquito_conf
  echo "persistence_location /var/lib/mosquitto/" >> $mosquito_conf
  echo "" >> $mosquito_conf
  echo "log_dest topic" >> $mosquito_conf
  echo "" >> $mosquito_conf
  echo "log_type error" >> $mosquito_conf
  echo "log_type warning" >> $mosquito_conf
  echo "log_type notice" >> $mosquito_conf
  echo "log_type information" >> $mosquito_conf
  echo "" >> $mosquito_conf
  echo "connection_messages true" >> $mosquito_conf
  echo "log_timestamp true" >> $mosquito_conf
  echo "" >> $mosquito_conf
  echo "include_dir /etc/mosquitto/conf.d" >> $mosquito_conf

  sudo /etc/init.d/mosquitto start

else
  echo 'MQTT Mosquitto is installed.' >&2
  #sudo /etc/init.d/mosquitto start
fi

#IQRF daemon install..
install_iqrf=0
service_file_iqrf="/lib/systemd/system/iqrf-daemon.service"

if [[ $platform == *"arm"* ]]
then
  echo "This is ARM, check IQRF daemon.."

  if [ -f "$service_file_iqrf" ]; then
    echo "IQRF daemon exists.."
  else
    echo "IQRF daemon DOES NOT EXISTS!.."
    install_iqrf=1
  fi
fi

if [ $install_iqrf -eq 1 ]; then
  echo "IQRF daemon INSTALL GO!.."

  if [[ $platform == *"arm"* ]]
  then
    echo "deb http://repos.iqrfsdk.org/raspbian jessie testing" | sudo tee -a /etc/apt/sources.list
    apt-get -q -y update
    apt-get install -q -y iqrf-daemon
    systemctl status iqrf-daemon.service
  fi
fi


echo "---------- Setup OpenHS done, enjoy! ----------"
