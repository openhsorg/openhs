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
import org.openhs.core.commons.Floor;
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
    public void buildHouse(int rooms) {
        
    	try {
    	for (int i = 0; i <= rooms; i++) {
    	
    		addThing("Room" + i);    		
    		addThing("Room" + i + "/" + "Room" + i + "_Sensor1");
    	}    
    	} catch (Exception ex) {
    		System.out.println("\n\n EX:" + ex);   
    	}
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

    public Object getThing (String keyPath) throws SiteException {
    	if (keyPath.equals("")) {
    		throw new SiteException("Bad keyPath");
    	}
    	
    	String delim ="[/]+";    	
    	String [] parts = keyPath.split(delim);
    	
    //	System.out.println("\n\n------+++>: " + parts[0] + " : " + parts.length);
    	    	
    	Room room = null;
    	Sensor sensor = null;
    	
    	int i = 0;
    	
    	for (String str : parts) {
    		if (str.equals("")) {
    			throw new SiteException("keyPath contaims empty strings...");
    		}
    		
    		if (i == 0) { //room...
    			room = ss.rooms.get(parts[0]);
    			
    			if (room == null) {
    				throw new SiteException("Wrong Room...");
    			}
    		}
    		
    		if (i == 1) { //Sensor...
    			sensor = room.sensors.get(parts[1]);
    			
    			if (sensor == null) {
    				throw new SiteException("Wrong Sensor...");
    			}
    		}    		
    		
    		i ++;
    	}
    	
    	if (sensor != null) return sensor;
    	else if (room  != null) return room;
    	else return null;
    }
           
    
    public Object addThing (String keyPath) throws SiteException {
    	//keyPath:  Room/Sensor
    	
    	System.out.println("\n\n addThing...");   
    	
    	if (keyPath.equals("")) {
    		System.out.println("\n\n eeeee");   
    		throw new SiteException("Bad keyPath");
    	}
    	
    	String delim ="[/]+";    	
    	String [] parts = keyPath.split(delim);
    	
    	//Check for empty parts...
    	for (String str : parts) {
    		if (str.equals("")) {
    			System.out.println("\n\n eeeee");   
    			throw new SiteException("keyPath contaims empty strings...");    			 
    		}
    	}
    	
    	System.out.println("\n\n------+++>: " + parts[0] + " : " + parts.length);    	    	    	
    	    	
    	Room room = null;
    	Sensor sensor = null;
    	
    	int i = 0;
    	
    	for (String str : parts) {
    		if (str.equals("")) {
    			throw new SiteException("keyPath contaims empty strings...");
    		}
    		
    		if (i == 0) { //room...
    			room = ss.rooms.get(parts[0]);
    			
    			if (room == null) {    				
    				room = new Room ();
    				ss.rooms.put(parts[0], room);
    			}   			
    		}
    		
    		if (i == 1) { //Sensor...
    			sensor = room.sensors.get(parts[1]);
    			
    			if (sensor == null) {
    				sensor = new Sensor();
    				room.sensors.put(parts[1], sensor);
    			}    			
    		}    		
    		
    		i ++;
    	}
    	
    	if (sensor != null) return sensor;
    	else if (room  != null) return room;
    	else return null;
    }           
    
    public boolean setThingKey (String keyPathOld, String keyNew) throws SiteException { 
    	
    	Object thing = getThing(keyPathOld);
    	if (thing == null) return false;
    	
    	if (thing instanceof Room) {
    		Room room = ss.rooms.remove(keyPathOld);
    		ss.rooms.put(keyNew, room);    		
    		return true;
    	}
    	
    	String keyPartParent = keyPathOld.substring(0, keyPathOld.lastIndexOf("/") - 1);
    	String keyOld = keyPathOld.substring(keyPathOld.lastIndexOf("/") + 1, keyPathOld.length() - 1);
    	
    	Object thingParent = getThing(keyPartParent);
    	if (thingParent == null) return false;  
    	
    	if (thingParent instanceof Room) {
    		Room room = (Room) thingParent;
    		Sensor sensor = room.sensors.remove(keyOld);
    		room.sensors.put(keyNew, sensor);  
    	}
 
    	return true;
    }
    
    @Override
    public Temperature getSensorTemperature(String keyPath) throws SiteException {
        Sensor sensor = null;
             //  keyPath = "rrr";
        try {
            Object obj = getThing(keyPath);
            
            if (obj == null) throw new SiteException("Cannot get thing!");
            
            if (!(obj instanceof Sensor)) {
            	throw new SiteException("Sensor path required!");
            } else {            
            	sensor = (Sensor) obj;
            }
            
        } catch (SiteException ex) {        	
        	
            throw ex;
        }

        return sensor.getTemperature();
    }  

    @Override
    public boolean setSensorTemperature(String keyPath, Temperature temp) throws SiteException{
        Sensor sensor = null;

        try {

            Object obj = getThing(keyPath);
            
            if (obj == null) throw new SiteException("Cannot get thing!");
            
            if (!(obj instanceof Sensor)) {
            	throw new SiteException("Sensor path required!");
            } else {            
            	sensor = (Sensor) obj;
            }
        	
        } catch (SiteException ex) {
            return false;
        }

        sensor.setTemperature(temp);

        return true;
    }
    
    @Override
    public Humidity getSensorHumidity(String keyPath) throws SiteException {
        Sensor sensor = null;

        try {
            Object obj = getThing(keyPath);
            
            if (obj == null) throw new SiteException("Cannot get thing!");
            
            if (!(obj instanceof Sensor)) {
            	throw new SiteException("Sensor path required!");
            } else {            
            	sensor = (Sensor) obj;
            }
        } catch (SiteException ex) {
            throw ex;
        }

        return sensor.getHumidity();
    }

    @Override
    public boolean setSensorHumidity(String keyPath, Humidity hum) {
        Sensor sensor = null;

        try {
            Object obj = getThing(keyPath);
            
            if (obj == null) throw new SiteException("Cannot get thing!");
            
            if (!(obj instanceof Sensor)) {
            	throw new SiteException("Sensor path required!");
            } else {            
            	sensor = (Sensor) obj;
            }
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
    	Room room = ss.rooms.remove(oldKey);
    	
    	ss.rooms.put(newKey, room);
    	
    	return true;
    }
    
    public boolean setSensorKey (String oldKey, String newKey)
    {    	    	    	 	    	    	   	
    	Set<String> roomKeys = ss.rooms.keySet();
    	
    	for (String roomKey : roomKeys){

    		try {
	    		//Room room = getRoom(roomKey);
	    		Room room = ss.rooms.get(roomKey);
	    		
	    		if(room.sensors.containsKey(oldKey)){
	    			
	    	    	Sensor sensor = room.sensors.remove(oldKey);
	    	    	
	    	    	room.sensors.put(newKey, sensor);    			
	    		}
    		} catch (Exception ex) {
    			
    		}
    	}
    	
    	return true;
    }    

}
