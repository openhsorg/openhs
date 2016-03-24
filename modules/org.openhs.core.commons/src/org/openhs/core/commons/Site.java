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
	 * Rooms.
	 */
	public TreeMap<String, Room> rooms = 
            new TreeMap<String, Room>();		
	
	//TimeProfile timeprofile = new TimeProfile ();
	
	public String getId ()
	{
		return id;
	}

}
