/**
* @name		ISiteService.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Interface...
* 
*/

package org.openhs.core.site.data;
import org.openhs.core.commons.Temperature;
import org.openhs.core.commons.Humidity;
import org.openhs.core.commons.Site;
import org.openhs.core.commons.SiteException;

public interface ISiteService {		
	
	String getId ();
	
	void setId (String newID);
	
	int getNumberRooms ();
	
	int getNumberSensors (String roomKey);
	
	Site getSite ();	
	
	public Object getThing (String keyPath) throws SiteException;
	
	public Object addThing (String keyPath) throws SiteException;
	
	public boolean addThing (String keyPath, String key, Object obj) throws SiteException;
	
	public Object getParentThing (String keyPath) throws SiteException;
	
	public boolean setThingKey (String keyPathOld, String keyPathNew) throws SiteException;
	
	Temperature getSensorTemperature (String keyPath)  throws SiteException;
	
	Humidity getSensorHumidity (String keyPath)  throws SiteException;
	
	boolean setSensorTemperature (String keyPath, Temperature temp) throws SiteException;			
		
	boolean setSensorHumidity (String keyPath, Humidity hum);		
	
	boolean setSite (Site siteIn);
	
	boolean setRoomKey (String oldKey, String newKey);
	
	boolean setSensorKey (String oldKey, String newKey);	
	
	public void buildHouse(int rooms);

}
