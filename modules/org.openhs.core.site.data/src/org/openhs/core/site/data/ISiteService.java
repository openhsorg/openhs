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
import org.openhs.core.commons.Floor;
import org.openhs.core.commons.SiteException;

public interface ISiteService {		
	
	String getId ();
	
	void setId (String newID);
	
	int getNumberRooms ();
	
	int getNumberSensors (String roomKey);
	
	Site getSite ();	
	
	public Object getThing (String keyPath) throws SiteException;
	
	public Object addThing (String keyPath) throws SiteException;
	
	public Object addThing (String keyPath, Object obj) throws SiteException;
	
	public Object getParentThing (String keyPath) throws SiteException;
	
	public boolean setThingKey (String keyPathOld, String keyPathNew) throws SiteException;
	
	//public Floor getFloor(String keyPath) throws SiteException; 
	
	//public Room getRoom(String keyPath) throws SiteException; 
	
	//public Sensor getSensor (String keyPath)  throws SiteException;	
	
	Temperature getSensorTemperature (String keyPath)  throws SiteException;
	
	Humidity getSensorHumidity (String keyPath)  throws SiteException;
	
	boolean setSensorTemperature (String keyPath, Temperature temp) throws SiteException;			
		
	boolean setSensorHumidity (String keyPath, Humidity hum);		
	
	//public Room addRoom (String keyPath);
	
	//boolean addSensor (String keyRoom, String keySensor);
	
	boolean setSite (Site siteIn);
	
	boolean setRoomKey (String oldKey, String newKey);
	
	boolean setSensorKey (String oldKey, String newKey);	
	
	public void buildHouse(int rooms);

}
