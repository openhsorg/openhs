/**
* @name		Temperature.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Temperature data
* 
*/

package org.openhs.core.site.data;

import java.sql.Timestamp;
import java.util.Date;

public class Temperature {
	
	boolean valid = false;
	
	double value = 0;
	
	Timestamp timestamp = new Timestamp(0);
	
	public boolean valid()
	{
		return valid;
	}
	
	public void valid (boolean val)
	{
		valid = val;
	}
	
	public double get()
	{
		return value;
	}
	
	public void set(double val)
	{
		value = val;
		
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
