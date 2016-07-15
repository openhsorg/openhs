# Communication module.

EXTERNAL BUNDLES:

---

1. **gnu.io.rxtx_<version>.jar** bundle. Please look into **https://github.com/openhsorg/openhs/modules/lib**. This library must be linked.

1.1. Library requires native java support. Please refer to **https://github.com/openhsorg/openhs_bins**
In Linux run: **$ sudo apt-get install librxtx-java**. And enable port: **$ sudo chmod a+rw /dev/ttyACM0**
In Windows you may need to copy **rxtxParallel.dll** and **rxtxSerial.dll** libraries to the Java runtime LIB folder.

1.2. Please note that on Ubuntu 11.04, the Arduino Uno and possibly others are recognised as /dev/ttyACMxx . The RXTX library only searches through /dev/ttySxx, so you need to make symlinks if your distro does the same, so for example **ln -s /dev/ttyACM0 /dev/ttyS33**.
Besides that, you need to close the serial port after starting, to prevent Linux from making new devices, like /dev/ttyACM2. Do not forget to remove the lock file from /var/lock if you forgot to close the port.

---

