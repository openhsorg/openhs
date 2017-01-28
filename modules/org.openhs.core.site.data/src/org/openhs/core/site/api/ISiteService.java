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

	public boolean addThing (String sitePath, Thing thing);
	
	public boolean addThing (String sitePath, String devicePath, Thing thing);
	
	public Thing getThing (String sitePath) throws SiteException;
	
	public Thing getThingDevice (String devicePath) throws SiteException;
	
	public boolean setThingDevice (String devicePath, Thing device) throws SiteException;
	
	public Set<String> getChildren (String sitePath) throws SiteException;  
	
	public int getNumberThings (String sitePath) throws SiteException;

	boolean setSite (Site siteIn);
	
	public void buildHouse(int rooms);
	
	void SaveXML (String path);
	
	public Set<String> getAllThingsPath (Class<?>  t) throws SiteException;

}
