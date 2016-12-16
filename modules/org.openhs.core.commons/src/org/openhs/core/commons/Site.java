/**
* @name		Site.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Main class of data storage.
* 
*/

package org.openhs.core.commons;

import java.util.TreeMap;


public class Site {

	private static String id = "My First Crazy Site :):)";
	
	/*
	 * Floors
	 */
	public TreeMap<String, Floor> floors = 
            new TreeMap<String, Floor>();			

	/*
	 * Rooms.
	 */
	/*
	public TreeMap<String, Room> rooms = 
            new TreeMap<String, Room>();		
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
