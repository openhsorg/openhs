/**
* @name		Temperature.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Temperature data
* 
*/

package org.openhs.core.commons;

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
	 * Get temperature in Celsius degrees in string form.
	 */	
	public String getCelsiusString()
	{
		if (this.valid()) {
			return (String) "" + getCelsius();			
		}
		else {
			return StringIdent.NOT_VALID.toString();
		}	
	}	
	
	/*
	 * Get temperature in Farenheit degrees.
	 */
	public double getFahrenheit()
	{
		return ((value - 32) * 5) / 9;
	}
	
	/*
	 * Get temperature in Farenheit degrees in string form.
	 */	
	public String getFahrenheitString()
	{
		if (this.valid()) {
			return (String) "" + getFahrenheit();
		}
		else {
			return StringIdent.NOT_VALID.toString();
		}	
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
