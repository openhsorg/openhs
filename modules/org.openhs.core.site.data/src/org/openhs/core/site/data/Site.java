package org.openhs.core.site.data;

import java.util.TreeMap;

public class Site {

	static String id;
	
	TreeMap<String, Room> site = 
            new TreeMap<String, Room>();	
	
	Site ()
	{
		Room room1 = new Room ();		
		site.put("room1", room1);
	}
	
	public int getNumberRooms ()
	{
		return site.size();
	}
	
}
