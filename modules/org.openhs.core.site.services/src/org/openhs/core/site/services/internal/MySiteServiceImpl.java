package org.openhs.core.site.services.internal;

import org.openhs.core.site.data.ISiteService;

public class MySiteServiceImpl implements ISiteService{
	
	//Site ss = new Site ();

	public int getNumberRooms ()
	{
		return ss.rooms.size();
	}	
	
	public String tellMe ()
	{
		return "Ahoj Service...";
	}	
}
