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
	
	void setId (String newID);
	
	int getNumberRooms ();
	
	int getNumberSensors (String roomKey);
	
	Site getSite ();	
	
	public Room getRoom(String keyRoom) throws SiteException; 
	
	public Sensor getSensor (String keyRoom, String keySensor)  throws SiteException;	
	
	Temperature getSensorTemperature (String keyRoom, String keySensor)  throws SiteException;
	
	Humidity getSensorHumidity (String keyRoom, String keySensor)  throws SiteException;
	
	boolean setSensorTemperature (String keyRoom, String keySensor, Temperature temp) throws SiteException;			
		
	boolean setSensorHumidity (String keyRoom, String keySensor, Humidity hum);		
	
	public Room addRoom (String key);
	
	boolean addSensor (String keyRoom, String keySensor);
	
	boolean setSite (Site siteIn);
	
	boolean setRoomKey (String oldKey, String newKey);
	
	boolean setSensorKey (String oldKey, String newKey);	
	
	public void buildHouse(int rooms);

}
