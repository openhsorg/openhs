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

echo "OpenHS directory is $openh_dir"
echo "Plugins directory is: $plugins_dir"

<<"COMMENT"
for entry in "$plugins_dir"/*
do
  if [ -f "$entry" ];then
    echo "$entry"
  fi
done
COMMENT

#Get list of files...
cd $plugins_dir
yourfilenames=`ls $plugins_dir/*.jar`

for eachfile in $yourfilenames
do
  #echo $eachfile
  #echo `basename "$eachfile"`
  echo $(basename $eachfile)
done

###Write config file
#Delete config dir...
if [ -d "$config_dir" ]; then
  rm "$config_dir" -r
fi

if [ ! -d "$config_dir" ]
then
    echo "File doesn't exist. Creating now"
    mkdir $config_dir
    echo "File created"
else
    echo "File exists"
fi

cat > $config_dir/"FILE.txt" <<EOF

info code info
info code info
info code info
plugins dir: $plugins_dir

EOF
