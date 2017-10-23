/**
* @name		MeteoStationData.java 10/23/2017
* @author	Michal Valny
* @version	1.0
* @description 	Meteo station data...
* 
*/

package org.openhs.core.commons;

public class MeteoStationData {
	
	public boolean validity = false;
	public String id = "none";
	
	public float tmpIn = 0;	
	public float tmpOut = 0;
	
	public boolean frost = false;
	
	public String toString() {
		
		String out = id;
		
		out = out + "\n validity: " + validity;
		out = out + "\n tmpIn: " + tmpIn;
		out = out + "\n tmpOut: " + tmpOut;
		out = out + "\n frost: " + frost;
				
		return out;
	}

}
