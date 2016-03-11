package org.openhs.tester;

import org.openhs.core.site.services.SiteServiceFactory;
import org.openhs.core.site.data.ISiteService;
import org.openhs.core.site.data.Temperature;;

public class Test {
	
	public SiteServiceFactory siteServiceFactory = null;
	
	//double temp1 = 0;
	//double temp2 = 0;
	
	Temperature temp1 = new Temperature ();
	Temperature temp2 = new Temperature ();
	
	void BuildHouse()
	{
		ISiteService service = siteServiceFactory.getInstance();
		
		service.addRoom("Room1");
		service.addRoom("Room2");
		service.addRoom("Room3");
		service.addRoom("Outside");
		
		service.addSensor("Room1", "Sensor1");
		service.addSensor("Room2", "Sensor1");
		service.addSensor("Room3", "Sensor1");
		service.addSensor("Room3", "Sensor2");
		service.addSensor("Outside", "Sensor1");
		
		temp1.set(-6);
		temp2.set(-6);		
	}
	
	void SetTemperature ()
	{
		temp1.set(temp1.getCelsius() + 0.5);
		temp2.set(temp2.getCelsius() + 2);
		/*
		temp1 = temp1 + 0.5;
		temp2 = temp2 + 2;
		*/
		if (temp1.getCelsius() >= 80) temp1.set(-6);
		if (temp2.getCelsius() >= 80) temp2.set(-6);		
		
		ISiteService service = siteServiceFactory.getInstance();
		
		service.setSensorTemperature("Room1", "Sensor1", temp1);
		service.setSensorTemperature("Outside", "Sensor1", temp2);
		
	}

}
