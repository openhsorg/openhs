/**
* @name		Value.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Any data.
* 
*/

package org.openhs.core.site.data;

import java.sql.Timestamp;
import java.util.Date;

public class Value {
	
	/**
	 * Measured value is valid. 
	 */
	boolean valid = false;
	
	/**
	 * Measured value
	 */
	double value = 0;
	
	/**
	 * Timestamp of last written value.
	 */
	Timestamp timestamp = new Timestamp(0);
	
	public boolean valid()
	{
		return valid;
	}
	
	public double get()
	{
		return value;
	}
	
	public void set(double val)
	{
		value = val;
		
		valid = true;
		
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
