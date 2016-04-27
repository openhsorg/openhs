/**
* @name		ISiteService.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Interface...
* 
*/

package org.openhs.core.site.data;

import java.util.TreeMap;

import org.openhs.core.commons.Temperature;
import org.openhs.core.commons.Humidity;
import org.openhs.core.commons.Sensor;
import org.openhs.core.commons.Site;
import org.openhs.core.commons.Room;
import org.openhs.core.commons.SiteException;

public interface ISiteService {		
	
	String getId ();
	
	int getNumberRooms ();
	
	int getNumberSensors (String roomKey);
	
	Temperature getSensorTemperature (String keyRoom, String keySensor)  throws SiteException;	
	
	boolean setSensorTemperature (String keyRoom, String keySensor, Temperature temp);		
	
	Humidity getSensorHumidity (String keyRoom, String keySensor)  throws SiteException;
	
	boolean setSensorHumidity (String keyRoom, String keySensor, Humidity hum);		
	
	boolean addRoom (String key);
	
	boolean addSensor (String keyRoom, String keySensor);
	
	Sensor getSensor (String keyRoom, String keySensor)  throws SiteException;
	
	TreeMap<String, Room> getRooms ();
	
	TreeMap<String, Sensor> getSensors (String keyRoom);
	
	boolean setSite (Site siteIn);
	
	Site getSite ();

}
