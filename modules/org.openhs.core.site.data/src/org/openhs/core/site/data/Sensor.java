/**
* @name		Sensor.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Sensor data
* 
*/

package org.openhs.core.site.data;

public class Sensor 
{
	Temperature temperature = new Temperature ();
	
	Humidity 	humidity = new Humidity ();
	
	public Temperature getTemperature ()
	{
		return temperature;
	}
	
	public void setTemperature (Temperature temp)
	{
		temperature = temp;
	}	
	
	public Humidity getHumidity ()
	{
		return humidity;
	}
	
	public void setHumidity (Humidity hum)
	{
		humidity = hum;
	}		
}
