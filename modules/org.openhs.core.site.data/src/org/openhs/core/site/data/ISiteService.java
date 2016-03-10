/**
* @name		ISiteService.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Interface...
* 
*/

package org.openhs.core.site.data;

import java.util.TreeMap;

public interface ISiteService

{	
	Site ss = new Site ();
	
	int getNumberRooms ();
	
	int getNumberSensors (String roomKey);
	
	Temperature getSensorTemperature (String keyRoom, String keySensor);
	
	boolean setSensorTemperature (String keyRoom, String keySensor, Temperature temp);
	
	String getId ();
	
	boolean addRoom (String key);
	
	boolean addSensor (String keyRoom, String keySensor);
	
	Sensor getSensor (String keyRoom, String keySensor);	
	
	TreeMap<String, Room> getRooms ();
	
	TreeMap<String, Sensor> getSensors (String keyRoom);

}
