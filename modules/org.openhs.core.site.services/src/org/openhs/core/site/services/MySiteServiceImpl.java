/**
* @name		MySiteServiceImpl.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Site Interface implementation.
*
*/

package org.openhs.core.site.services;

import java.util.Set;
import java.util.TreeMap;
import java.io.*;

import org.openhs.core.site.data.ISiteService;
import org.openhs.core.commons.Temperature;
import org.openhs.core.commons.Humidity;
import org.openhs.core.commons.TextOutput;
import org.openhs.core.commons.Sensor;
import org.openhs.core.commons.Site;
import org.openhs.core.commons.Room;
import org.openhs.core.commons.SiteException;

public class MySiteServiceImpl implements ISiteService {
	
	Site ss = new Site ();
	
	TextOutput msg = new TextOutput ();

    public void activate() {
    	msg.println("org.openhs.core.site.services: activate");
    }

    public void deactivate() {
    	msg.println("org.openhs.core.site.services: deactivate");
    }

    @Override
    public int getNumberRooms() {
        return ss.rooms.size();
    }

    @Override
    public TreeMap<String, Room> getRooms() {
        return ss.rooms;
    }

    @Override
    public TreeMap<String, Sensor> getSensors(String keyRoom) {
        TreeMap<String, Room> rooms = getRooms();
        
        Room room = rooms.get(keyRoom);
       /* 
        if (room == null) {
            throw new SiteException("Room Key doesn't exists...");
        } else {
            return room.sensors;
        }
        */
        
        return room.sensors;
    }

    @Override
    public int getNumberSensors(String roomKey) {
        Room room = ss.rooms.get(roomKey);

        return room.sensors.size();
    }

    @Override
    public String getId() {
        return ss.getId();
    }
    
    @Override
    public void setId(String newID) {
        ss.setId(newID);
    }    

    @Override
    public boolean addRoom(String key) {
        ss.rooms.put(key, new Room());

        return true;
    }

    @Override
    public boolean addSensor(String keyRoom, String keySensor) {
        Room room = ss.rooms.get(keyRoom);

        if (room == null) {
            return false;
        }

        room.sensors.put(keySensor, new Sensor());

        return true;
    }

    public Room getRoom(String keyRoom) throws SiteException {
        if (ss.rooms.size() <= 0) {
            throw new SiteException("aaaaa");
        } else {
            return ss.rooms.get(keyRoom);
        }
    }

    @Override
    public Sensor getSensor(String keyRoom, String keySensor) throws SiteException {
        Room room = null;
        TreeMap<String, Sensor> sensors;

        try {
            room = getRoom(keyRoom);
        } catch (SiteException ex) {
            throw ex;
        }    
        
        if (room == null){
        	throw new SiteException("Room does not exist!");
        }

        return room.sensors.get(keySensor);
    }

    @Override
    public Temperature getSensorTemperature(String keyRoom, String keySensor) throws SiteException {
        Sensor sensor = null;

        try {
            sensor = getSensor(keyRoom, keySensor);
        } catch (SiteException ex) {
            throw ex;
        }

        return sensor.getTemperature();
    }  

    @Override
    public boolean setSensorTemperature(String roomKey, String sensorKey, Temperature temp) throws SiteException{
        Sensor sensor = null;

        try {
            sensor = getSensor(roomKey, sensorKey);
        } catch (SiteException ex) {
            return false;
        }
        
        if (sensor == null) {
        	throw new SiteException("Sensor does not exist!");
        }

        sensor.setTemperature(temp);

        return true;
    }
    
    @Override
    public Humidity getSensorHumidity(String keyRoom, String keySensor) throws SiteException {
        Sensor sensor = null;

        try {
            sensor = getSensor(keyRoom, keySensor);
        } catch (SiteException ex) {
            throw ex;
        }

        return sensor.getHumidity();
    }

    @Override
    public boolean setSensorHumidity(String roomKey, String sensorKey, Humidity hum) {
        Sensor sensor = null;

        try {
            sensor = getSensor(roomKey, sensorKey);
        } catch (SiteException ex) {
            return false;
        }

        sensor.setHumidity(hum);

        return true;
    }    
    
    public Site getSite () {
        return ss;    	
    }
    
    public boolean setSite (Site siteIn)
    {   //Needs to be solved...
    	
    	ss = siteIn;
    	
    	return true;
    }
    
    public boolean setRoomKey (String oldKey, String newKey)
    {
    	TreeMap<String, Room> rooms = getRooms();
    	
    	Room room = rooms.remove(oldKey);
    	
    	rooms.put(newKey, room);
    	
    	return true;
    }
    
    public boolean setSensorKey (String oldKey, String newKey)
    {    	
    	//TODO    	    	 	    	    	
    	TreeMap<String, Room> rooms = getRooms();
    	
    	Set<String> roomKeys = rooms.keySet();
    	
    	for (String roomKey : roomKeys){
    		
    		TreeMap<String, Sensor> sensors = getSensors(roomKey);
    		
    		if(sensors.containsKey(oldKey)){
    			
    	    	Sensor sensor = sensors.remove(oldKey);
    	    	
    	    	sensors.put(newKey, sensor);    			
    		}    		
    	}
    	
    	return true;
    }    

}
