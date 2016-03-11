/**
* @name		MySiteServiceImpl.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Site Interface implementation.
* 
*/

package org.openhs.core.site.services.internal;

import java.util.TreeMap;
import java.util.*;
import java.io.*;
import org.openhs.core.site.data.ISiteService;
import org.openhs.core.site.data.Room;
import org.openhs.core.site.data.Sensor;
import org.openhs.core.site.data.Temperature;
import org.openhs.core.site.data.SiteException;

public class MySiteServiceImpl implements ISiteService{
	
	public int getNumberRooms ()
	{
		return ss.rooms.size();
	}	
	
	public TreeMap<String, Room> getRooms ()
	{
		return ss.rooms;
	}
	
	public TreeMap<String, Sensor> getSensors (String keyRoom)
	{
		TreeMap<String, Room> rooms = getRooms();
		
		Room room = rooms.get(keyRoom);
		
		return room.sensors;
	}	
	
	public int getNumberSensors (String roomKey)
	{				
		Room room = ss.rooms.get(roomKey);
		
		return room.sensors.size();
	}
	
	public String getId ()
	{
		return ss.getId();
	}	
	
	public boolean addRoom (String key)
	{
		ss.rooms.put(key, new Room());
		
		return true;
	}
	
	public boolean addSensor (String keyRoom, String keySensor)
	{
		Room room = ss.rooms.get(keyRoom);
	
		if (room == null) return false;
			
		room.sensors.put(keySensor, new Sensor ());		
		
		return true;
	}
	
	public Room getRoom (String keyRoom) throws SiteException
	{
		if (ss.rooms.size() <= 0)
		{			
			throw new SiteException("aaaaa");
		}
		else
		{				
			return ss.rooms.get(keyRoom);
		}
	}	
	
	public Sensor getSensor (String keyRoom, String keySensor) throws SiteException
	{		
		Room room;
		
		try
		{				
			room = getRoom (keyRoom);
		}
		catch (SiteException ex)
		{
			throw ex;
		}
		
		return room.sensors.get(keySensor);		
	}	
	
	public Temperature getSensorTemperature (String keyRoom, String keySensor) throws SiteException
	{
		Sensor sensor = null;
		
		try
		{
			sensor = getSensor (keyRoom, keySensor);		
		}
		catch (SiteException ex)
		{
			throw ex;
		}
			  	
		return sensor.getTemperature();
	}
	
	public boolean setSensorTemperature (String roomKey, String sensorKey, Temperature temp)
	{
		Sensor sensor = null;
		
		try
		{
			sensor = getSensor (roomKey, sensorKey);				
		}
		catch (SiteException ex)
		{			
			return false;
		}
					  	
		sensor.setTemperature(temp);
		
		return true;
	}
	
}
