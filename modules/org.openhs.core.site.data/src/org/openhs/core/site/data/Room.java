/**
* @name		Room.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Room data
* 
*/

package org.openhs.core.site.data;

import java.util.TreeMap;

public class Room {
	
	/**
	 * Set of sensors in room
	 */
	public TreeMap<String, Sensor> sensors = 
            new TreeMap<String, Sensor>();		

}
