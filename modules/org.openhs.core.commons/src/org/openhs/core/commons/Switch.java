/**
* @name		Switch.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Switch on/off
* 
*/

package org.openhs.core.commons;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;
import org.openhs.core.commons.TimeProfile;

public class Switch extends Thing {
	
	UUID uuid = UUID.randomUUID();

	/*
	 * State we'd like to switch
	 */
	boolean state = false;
	
	/*
	 * State of device
	 */
	boolean deviceState = false;
	
	/*
	 * Time profiler
	 */
	TimeProfile timeProfile;
	
	/*
	 * Timestamp of last written value.
	 */
	Timestamp timestamp = new Timestamp(0);
	
	/*
	 *Coordinates in house  
	 */
	public int x = 0;
	public int y = 0;
	public int z = 0;	
	
		
	public void setState(boolean state) throws SiteException
	{
		this.state = state;
		setTimestamp();
		updateOutcoming();
	}
	
	public boolean getState()
	{
		return state;
	}	
	
	public boolean getDeviceState()
	{
		return deviceState;
	}	
	
	public void setDeviceState(boolean state)
	{
		deviceState = state;
	}	
	
	public boolean setState() throws SiteException {
		if(state) state = false;
		else state = true;
		updateOutcoming();
		
		return state;
	}
	
	void setTimestamp()
	{
		Date date= new Date();
		
		timestamp.setTime(date.getTime());			
	}
	
	public Timestamp getTimestamp ()
	{
		return timestamp;
	}
	
}

