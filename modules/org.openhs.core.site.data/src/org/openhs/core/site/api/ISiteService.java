/**
* @name		ISiteService.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Interface...
* 
*/

package org.openhs.core.site.api;
import org.openhs.core.commons.Temperature;
import org.openhs.core.commons.Thing;

import java.util.Set;

import org.openhs.core.commons.Humidity;
import org.openhs.core.commons.Site;
import org.openhs.core.commons.SiteException;

public interface ISiteService {		
	
	String getId ();
	
	void setId (String newID);
	
	Site getSite ();	
	/*
	public Object getThing (String keyPath) throws SiteException;
	
	public Object addThing (String keyPath) throws SiteException;
	
	public int getNumberThings (String keyPath) throws SiteException;
	*/
	//----------
	public boolean addThing (String sitePath, Thing thing);
	
	public boolean addThing (String sitePath, String devicePath, Thing thing);
	
	public Object getThing (String sitePath) throws SiteException;
	
	public Object getThingDevice (String devicePath) throws SiteException;
	
	public boolean setThingDevice (String devicePath, Thing device) throws SiteException;
	
	public Set<String> getChildren (String sitePath) throws SiteException;  
	
	public int getNumberThings (String sitePath) throws SiteException;
	
	//----------
	/*
	Temperature getSensorTemperature (String keyPath)  throws SiteException;
	
	Humidity getSensorHumidity (String keyPath)  throws SiteException;
	
	boolean setSensorTemperature (String keyPath, Temperature temp) throws SiteException;			
		
	boolean setSensorHumidity (String keyPath, Humidity hum);		
	*/
	boolean setSite (Site siteIn);
	
//	public boolean setThingKey (String keyPathOld, String keyNew) throws SiteException;	
	
//	boolean setRoomKey (String oldKey, String newKey);
	
//	boolean setSensorKey (String oldKey, String newKey);	
	
	public void buildHouse(int rooms);
	
	//public void LoadXML (String path);
	
	void SaveXML (String path);

}
