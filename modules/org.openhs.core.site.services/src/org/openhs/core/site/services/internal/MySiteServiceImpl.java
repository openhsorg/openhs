package org.openhs.core.site.services.internal;

import java.util.TreeMap;

import org.openhs.core.site.data.ISiteService;
import org.openhs.core.site.data.Room;
import org.openhs.core.site.data.Sensor;

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
	
	public Room getRoom (String keyRoom)
	{
		return ss.rooms.get(keyRoom);
	}	
	
	public Sensor getSensor (String keyRoom, String keySensor)
	{
		Room room = getRoom (keyRoom);
		
		return room.sensors.get(keySensor);		
	}
	
	public double getSensorTemperature (String keyRoom, String keySensor)
	{
		Sensor sensor = getSensor (keyRoom, keySensor);
	  	
		return sensor.temperature;
	}
	
	public boolean setSensorTemperature (String roomKey, String sensorKey, double temp)
	{
		Sensor sensor = getSensor (roomKey, sensorKey);
	  	
		sensor.temperature = temp;
		
		return true;
	}
	
}
