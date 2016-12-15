/**
* @name		Room.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Room data
* 
*/

package org.openhs.core.commons;

import java.util.TreeMap;

import org.openhs.core.commons.Sensor;

public class Room{
	
	/*
	 * Set of sensors in room
	 */
	public TreeMap<String, Sensor> sensors = 
            new TreeMap<String, Sensor>();	
	
	public Object getThing (String key) {		
		if(key.equals("")) return null;
		
		return sensors.get(key);
	}
	
	public boolean addThing (String key, Object object) {		
		if(key.equals("")) return false;
		
		if (object instanceof Sensor) {
			sensors.put(key, (Sensor) object);
			
			return true;
		}
		
		return false;
	}	

}
