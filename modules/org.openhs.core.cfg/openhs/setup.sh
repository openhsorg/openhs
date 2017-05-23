#!/bin/bash
# OpenHS setupp script
<<"COMMENT"
if [[ `whoami` != "root" ]]
then
  echo "Script must be run as root."
  exit 1
fi
COMMENT

openh_dir=`pwd`
plugins_dir=$openh_dir"/plugins"
config_dir=$plugins_dir"/cfg"
config_file=$config_dir"/FILE.cfg"

#echo "OpenHS directory is $openh_dir"
#echo "Plugins directory is: $plugins_dir"

echo "---------- Setup OpenHS ----------"

#Get list of files...
cd $plugins_dir
yourfilenames=`ls $plugins_dir/*.jar`

num_files=0

for eachfile in $yourfilenames
do
  #echo $eachfile
  #echo `basename "$eachfile"`
  #echo $(basename $eachfile)
  ((num_files++))

  if [[ $eachfile == *"org.eclipse.osgi_"* ]]
  then
     #echo "It's there!"$eachfile
    # osgi_file = "$eachfile"

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
    #echo "File doesn't exist. Creating now"
    mkdir $config_dir
    #echo "File created"
#else
    #echo "File exists"
fi

#Create config file
echo "eclipse.ignoreApp=true" > $config_file
echo "eclipse.exitOnError=false" >> $config_file
echo "osgi.noShutdown=true" >> $config_file
echo "org.osgi.service.http.port=7070" >> $config_file
echo "osgi.bundles.defaultStartLevel=4" >> $config_file
#echo "osgi.bundles="

first=0

for eachfile in $yourfilenames
do
  ((first++))

  if [ $first -eq 1 ]
  then
    echo "osgi.bundles=./$(basename $eachfile)@start,\\" >> $config_file
  elif [ $first -eq $num_files ]
  then
    echo "./$(basename $eachfile)@start" >> $config_file
  else
    echo "./$(basename $eachfile)@start,\\" >> $config_file
  fi
done

echo "OpenHS config file created..."


service_file="/lib/systemd/system/openhs.service"
echo "Platform is $(uname -s)"
_JAVAC_LOCATION=`type java | cut -f3 -d' '`
echo "Setup OpenHS service.."


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
echo "ExecStart=$_JAVA_LOCATION -jar $osgi_file -console -Declipse.ignoreApp=true -Dosgi.noShutdown=true -Dorg.osgi.service.http.port=7070 -Dorg.eclipse.equinox.http.jetty.context.sessioninactiveinterval=0 -Xmx700m" >> $service_file
echo "StandardOutput=syslog" >> $service_file
echo "StandardError=syslog" >> $service_file
echo "RestartSec=5" >> $service_file
echo "Restart=always" >> $service_file
echo "" >> $service_file
echo "[Install]" >> $service_file
echo "WantedBy=multi-user.target" >> $service_file

#MQTT mosquitto install..
if ! [ -x "$(command -v mosquitto)" ]; then
  echo 'MQTT Mosquitto is NOT installed, continue with this..' >&2
  apt-get update -y -qq
  apt-get install -y -qq mosquitto mosquitto-clients
#sudo /etc/init.d/mosquitto start
  sudo /etc/init.d/mosquitto stop

  echo "Setup mosquitto.conf file.."

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
  sudo /etc/init.d/mosquitto start
fi

#IQRF daemon install..
platform=$(uname -m)

<<"COMMENT"
case "$platform" in
   "arm"*)
   echo "This is ARM, in"
   ;;
   "i68"*)
    echo "i686 so not continue.."
   ;;
   "kiwi") echo "New Zealand is famous for kiwi."
   ;;
esac
COMMENT

if [[ $platform == *"arm"* ]]
then
  echo "This is ARM, check IQRF daemon.."
elif [[ $platform == *"i68"* ]]
then
  echo "This is not ARM but $platform, exit.."
fi

echo "---------- Setup OpenHS done, enjoy! ----------"
