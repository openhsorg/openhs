package org.openhs.tester;

import org.openhs.core.site.services.SiteServiceFactory;
import org.openhs.core.site.data.ISiteService;

public class Test {
	
	public SiteServiceFactory siteServiceFactory = null;
	
	double temp1 = 0;
	double temp2 = 0;
	
	void BuildHouse()
	{
		ISiteService service = siteServiceFactory.getInstance();
		
		service.addRoom("Room1");
		service.addRoom("Room2");
		service.addRoom("Room3");
		
		service.addSensor("Room1", "Sensor1");
		service.addSensor("Room2", "Sensor1");
		service.addSensor("Room3", "Sensor1");
		service.addSensor("Room3", "Sensor2");		
	}
	
	void SetTemperature ()
	{
		temp1 = temp1 + 0.5;
		temp2 = temp2 + 2;
		
		if (temp1 >= 80) temp1 = -6;
		if (temp2 >= 80) temp2 = -6;
		
		
		ISiteService service = siteServiceFactory.getInstance();
		
		service.setSensorTemperature("Room1", "Sensor1", temp1);
		service.setSensorTemperature("Room2", "Sensor1", temp2);
		
	}

}
