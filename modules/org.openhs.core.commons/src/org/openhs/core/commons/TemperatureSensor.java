/**
* @name		TemperatureSensor.java 03/01/2017
* @author	Michal Valny
* @version	1.0
* @description 	Temperature Sensor Data
* 
*/

package org.openhs.core.commons;

public class TemperatureSensor extends Thing {
	
	//Coordinates in house 
	public float x = 0.0f;
	public float y = 0.0f;
	public float z = 0.0f;
	
	Temperature temperature = new Temperature ();
	
	public Temperature getTemperature () {	
		return temperature;
	}
	
	public void setTemperature (Temperature temp) {	
		temperature = temp;
	}	

}
