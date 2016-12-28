package org.openhs.core.commons;

public class TemperatureSensor extends Thing {
	
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
