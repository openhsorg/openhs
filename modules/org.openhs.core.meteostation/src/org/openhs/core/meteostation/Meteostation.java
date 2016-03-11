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
import java.util.ArrayList;
import java.util.TimeZone;
import java.util.Date;

public class Meteostation {
	
	/*
	 * Basic data structure.
	 */
	ISiteService siteService;
	
	/*
	 * What sensors we deal with.
	 */
	String sensorInString = "Room1/Sensor1";
	String sensorOutString = "Outside/Sensor1";
	
	/*
	 * Indicators.
	 */
	ArrayList<Boolean> list = new ArrayList<Boolean>();
	/*
	 * [0]: Frost outside 
	 * [1]: Day/Night time
	 * [2]: Intruder outside
	 */
	
	/*
	 * Constructor
	 */
	Meteostation (ISiteService service)
	{
		siteService = service;
		
		list.add(false); //Frost indicator...
		list.add(false); //Daylight time indicator...
		list.add(false); //Movedetection outside...
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
	
	public ArrayList<Boolean> getIndicatorsList ()
	{
		try
		{
			setFrostIndicator ();
			
			setDaylightTimeIndicator ();
		}
		catch (Exception ex)
		{
			
		}
		
		return list;
	}
	
	/*
	 * Set Frost indicator based on outside temperature.
	 */
	void setFrostIndicator () throws SiteException
	{
		double tempOut;
		
		try
		{
			tempOut = getSensorOut().getTemperature().getCelsius();
		}
		catch (Exception ex)
		{
			throw ex;
		}
		
		//System.out.println("\nTemp: " + tempOut);
		
		list.set(0, (tempOut < 0.0));
	}
	
	/*
	 * Set daylight time based on global time.
	 */
	void setDaylightTimeIndicator ()
	{
		
		//list.set(1, true);
				
	}
	
	/*
	 * Set movedetection outside.
	 */
	void setIntruderOutsideIndicator () throws SiteException
	{		
		boolean intruder = false;
		
		try
		{
			intruder = getSensorOut().getMovedetection().getDetection();
		}
		catch (Exception ex)
		{
			throw ex;
		}
		
		list.set(2, intruder);				
	}	
	
}
