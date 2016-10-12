#!/bin/bash
# Michal Valny OK
# Ubuntu installation:
# sudo apt-get install dos2unix
# to convert a file:
# dos2unix myscript.sh

OPENHS="openhs_20160916"

echo "********** OpenHS setupsetup of computer unit (Raspberry Pi )... **********"

wget http://openhs.org/wordpress/wp-content/uploads/$OPENHS.zip

if [ -d "openhs" ]; then
  rm openhs -r
fi

unzip $OPENHS.zip

rm $OPENHS.zip

cd $HOME/"openhs"

chmod +x start.sh

./start.sh

