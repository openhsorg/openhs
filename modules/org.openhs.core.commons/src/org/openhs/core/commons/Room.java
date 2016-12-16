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

}
