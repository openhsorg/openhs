package org.openhs.core.commons;

public class HumiditySensor extends Thing {
	
	Humidity 	humidity = new Humidity ();
	
	public Humidity getHumidity ()
	{
		return humidity;
	}
	
	public void setHumidity (Humidity hum)
	{
		humidity = hum;
	}

}
