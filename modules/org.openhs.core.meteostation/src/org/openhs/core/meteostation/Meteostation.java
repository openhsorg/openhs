/**
* @name		Meteostation.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	It keeps meteostation data.
* 
*/

package org.openhs.core.meteostation;

import org.openhs.core.site.data.ISiteService;
import org.openhs.core.site.data.Temperature;
import org.openhs.core.site.data.Sensor;
import org.openhs.core.site.data.SiteException;

public class Meteostation {
	
	/*
	 * Basic data structure.
	 */
	ISiteService siteService;
	
	/*
	 * What sensors we deal with.
	 */
	String sensorInString = "Room1/Sensor1";
	String sensorOutString = "Room2/Sensor1";
	
	Meteostation (ISiteService service)
	{
		siteService = service;
	}
	
	public Sensor getSensorIn () throws SiteException
	{
		return getSensor(sensorInString);
	}
	
	public Sensor getSensorOut () throws SiteException
	{
		return getSensor(sensorOutString);
	}	
	
	public Sensor getSensor (String key) throws SiteException
	{
		Sensor sensor;
		
		try
		{
			String delims = "[/]";
			String[] tokens = key.split(delims);
			
			sensor = siteService.getSensor(tokens[0], tokens[1]);
		}
		catch (Exception ex)
		{
			throw ex;
		}
		
		return sensor;
	}
}
