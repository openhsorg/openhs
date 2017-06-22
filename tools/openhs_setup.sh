#!/bin/bash
# Michal Valny OK
# Ubuntu installation:
# sudo apt-get install dos2unix
# to convert a file:
# dos2unix myscript.sh

OPENHS="openhs"

echo "********** OpenHS setupsetup of computer unit (Raspberry Pi )... **********"

cd $HOME

wget https://github.com/openhsorg/openhs/releases/download/v1.0/$OPENHS.zip

if [ -d "openhs" ]; then
  rm openhs -r
fi

unzip $OPENHS.zip

rm $OPENHS.zip

cd $HOME/"openhs"

chmod +x start.sh

./start.sh

