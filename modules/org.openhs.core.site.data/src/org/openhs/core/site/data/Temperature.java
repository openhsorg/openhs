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

public class Temperature extends Value
{
	/*
	 * Get temperature in Celsius degrees.
	 */	
	public double getCelsius()
	{
		return super.get();
	}
	
	/*
	 * Get temperature in Farenheit degrees.
	 */
	public double getFahrenheit()
	{
		return ((value - 32) * 5) / 9;
	}		
	
	/*
	 * (non-Javadoc)
	 * @see org.openhs.core.site.data.Value#get()
	 * This is disabled to make sure user uses getCelsius or getFarenheit methods only.
	 */
    @Override
    public double get(){
        throw new UnsupportedOperationException();
    }	
}
