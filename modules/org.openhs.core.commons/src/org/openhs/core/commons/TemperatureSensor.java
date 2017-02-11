package org.openhs.core.commons;

public class TemperatureSensor extends Thing {
	
	//Coordinates in house 
	public int x = 0;
	public int y = 0;
	public int z = 0;
	
	Temperature temperature = new Temperature ();
	
	public Temperature getTemperature ()
	{
		return temperature;
	}
	
	public void setTemperature (Temperature temp)
	{
		temperature = temp;
	}	

}
