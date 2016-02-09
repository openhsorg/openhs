package org.openhs.core.site.services.internal;

import org.openhs.core.site.data.ISiteService;

public class MySiteServiceImpl implements ISiteService{
	
	public int getNumberRooms ()
	{
		return ss.rooms.size();
	}	
	
	public String getId ()
	{
		return ss.getId();
	}	
}
