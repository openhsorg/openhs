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

import java.lang.reflect.InvocationTargetException;
import java.util.Set;

import org.json.JSONObject;
import org.openhs.core.commons.Humidity;
import org.openhs.core.commons.Site;
import org.openhs.core.commons.SiteException;

public interface ISiteService {		
	
	String getId ();
	
	void setId (String newID);
	
	Site getSite ();	

	public boolean addThing (String sitePath, Thing thing);
	
	public boolean addThing (String sitePath, String devicePath, Thing thing);
	
	public boolean addNextThing (Class<?>  t) throws SiteException, NoSuchMethodException, SecurityException, ClassNotFoundException, InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
	
	public boolean removeThing(String sitePath);
	
	public boolean setNumberThings (int number, Class<?>  t) throws SiteException, NoSuchMethodException, SecurityException, ClassNotFoundException, InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException;
	
	public Thing getThing (String sitePath) throws SiteException;
	
	public Thing getThingDevice (String devicePath) throws SiteException;
	
	public boolean setThingDevice (String devicePath, Thing device) throws SiteException;
	
	public Set<String> getChildren (String sitePath) throws SiteException;  
	
	public int getNumberThings (String sitePath) throws SiteException;
	
	public String getDevicePath (String sitePath);

	boolean setSite (Site siteIn);
	
	public void buildHouse();
	
	void SaveXML (String path);
	
	public Set<String> getThingPathSet (Class<?>  t) throws SiteException;
	
	public Set<Thing> getThingSet (Class<?>  t) throws SiteException;
	
	public Set<String> getThingChildrenPathSet (String parentPath, Class<?>  t) throws SiteException;
	
	public boolean isClosed (Thing m_thing) throws SiteException;
	
	public boolean isLocked (Thing m_thing) throws SiteException;
	
	//public JSONObject getThingJSON (String path);

	//public JSONObject getThingArrayJSON (Class<?> t);
	
	//public JSONObject getTimeDateJSON();

}
