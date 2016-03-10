/**
* @name		Site.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Sensor data
* 
*/

package org.openhs.core.site.data;

import java.util.TreeMap;

public class Site {

	private static String id = "My First Crazy Site :):)";
	
	public TreeMap<String, Room> rooms = 
            new TreeMap<String, Room>();	
	
	public String getId ()
	{
		return id;
	}

}
