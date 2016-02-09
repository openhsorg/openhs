package org.openhs.core.site.data;

import java.util.TreeMap;

public class Site {

	private static String id = "My First Crazy Site :):)";
	
	public TreeMap<String, Room> rooms = 
            new TreeMap<String, Room>();	
	
	Site ()
	{		
		Room room1 = new Room ();		
		rooms.put("Room1", room1);
		
		Room room2 = new Room ();
		rooms.put("Room2", room2);
	}
	
	public String getId ()
	{
		return id;
	}

}
