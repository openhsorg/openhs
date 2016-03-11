/**
* @name		Switch.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Switch on/off
* 
*/

package org.openhs.core.site.data;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

public class Switch {
	
	UUID uuid = UUID.randomUUID();

	/*
	 * State we'd like to switch
	 */
	boolean newState = false;
	
	/*
	 * State
	 */
	double state = 0;
	
	/*
	 * Timestamp of last written value.
	 */
	Timestamp timestamp = new Timestamp(0);
	
	public double get()
	{
		return state;
	}
	
	public void set(boolean state)
	{
		newState = state;
		
		setTimestamp();
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
