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

<<"COMMENT"

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
done

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
COMMENT

service_file="/lib/systemd/system/openhs.service"
echo "Platform is $(uname -s)"
_JAVAC_LOCATION=`type java | cut -f3 -d' '`
#echo "Java is: $_JAVA_LOCATION"
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
echo "ExecStart=$_JAVA_LOCATION -jar $plugins_dir/org.eclipse.osgi_3.11.3.v20170209-1843.jar -console -Declipse.ignoreApp=true -Dosgi.noShutdown=true -Dorg.osgi.service.http.port=7070 -Dorg.eclipse.equinox.http.jetty.context.sessioninactiveinterval=0 -Xmx700m" >> $service_file
echo "StandardOutput=syslog" >> $service_file
echo "StandardError=syslog" >> $service_file
echo "RestartSec=5" >> $service_file
echo "Restart=always" >> $service_file
echo "" >> $service_file
echo "[Install]" >> $service_file
echo "WantedBy=multi-user.target" >> $service_file


echo "---------- Setup OpenHS Done, enjoy! ----------"
