# Serial I/O
This bundle reads any serial port and string sends to **org.openhs.core.commands** bundle

1. Requires **gnu.io.rxtx_<version>.jar** bundle. Please look into **https://github.com/openhsorg/openhs_bins** repository for this. Then copy JAR to the **/eclipse/dropins/** folder and restart Eclipse.

2. Please note that on Ubuntu 11.04, the Arduino Uno and possibly others are recognised as /dev/ttyACMxx . The RXTX library only searches through /dev/ttySxx, so you need to make symlinks if your distro does the same, so for example **ln -s /dev/ttyACM0 /dev/ttyS33** .
>>>>>>> refs/remotes/origin/michalv
Besides that, you need to close the serial port after starting, to prevent Linux from making new devices, like /dev/ttyACM2. Do not forget to remove the lock file from /var/lock if you forgot to close the port.

3. In Windows you may need to copy **rxtxParallel.dll** and **rxtxSerial.dll** libraries to the Java runtime LIB folder.