/**
* @name		Site.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Main class of data storage.
* 
*/

package org.openhs.core.commons;

import java.util.ArrayList;
import java.util.TreeMap;


public class Site {

	private static String id = "My First Crazy Site :):)";
	
	/*
	 * Floors
	 */
//	public TreeMap<String, Floor> floors = 
//            new TreeMap<String, Floor>();	
	
	/*
	 * Rooms
	 */
//	public TreeMap<String, Room> rooms = 
//            new TreeMap<String, Room>();	
	
	/*
	 * String:  sitePath, Object: any thing...
	 */
	public TreeMap<String, Thing> things = 
            new TreeMap<String, Thing>();
	
	/*
	 * String: devicePath, String: sitePath
	 */
	public TreeMap<String, String> devPaths = 
            new TreeMap<String, String>();	
	
	/*
	 * Filtered floors...  TODO
	 * String: sitePaths to only Rooms...
	 */
	//public ArrayList<String> floorPaths = 
          //  new ArrayList<String>();		
	
	
	/*
	 * Filtered rooms... TODO
	 * String: sitePaths to only Rooms...
	 */
	//public ArrayList<String> roomPaths = 
    //        new ArrayList<String>();		
	
	/*
	Site () {
		devicesOhs.put("cc", new TemperatureSensor());
	}
	*/
	
	public String getId ()
	{
		return id;
	}
	
	public void setId (String newID)
	{
		id = newID;
	}		
}
