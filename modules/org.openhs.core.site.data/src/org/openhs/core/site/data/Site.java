package org.openhs.core.site.data;

import java.util.TreeMap;

public class Site {

	static String id;
	
	public TreeMap<String, Room> rooms = 
            new TreeMap<String, Room>();	
	
	Site ()
	{
		Room room1 = new Room ();		
		rooms.put("room1", room1);
	}
	/*
	public int getNumberRooms ()
	{
		return site.size();
	}
	*/
}
