package org.openhs.core.meteostation;

import java.util.Set;
import java.util.TreeMap;
import java.util.*;

import org.openhs.core.site.data.ISiteService;
import org.openhs.core.site.data.Room;
import org.openhs.core.site.data.Sensor;
import org.openhs.core.site.services.SiteServiceFactory;

public class Refresh extends Thread{

	private volatile boolean active = true;
	private SiteServiceFactory siteServiceFactory = null;
	private Meteostation station = null;
	
	Refresh (SiteServiceFactory site, Meteostation stat)
	{
		siteServiceFactory = site;
		station = stat;
	}
	
	  public void run() {
		    while (active) {
		      //System.out.println("\nThread adjustment...........");
		      
		      if (siteServiceFactory != null)
		      {	    	  
		    //	System.out.println("Site ID is: " + siteServiceFactory.getInstance().getId());	    	  
		     //   System.out.println("Number rooms is: " + siteServiceFactory.getInstance().getNumberRooms());	  		
		    	  
		    	 // test.SetTemperature();
		    	//System.out.println("Ahoj meteo !!!");
		    	  
		    	 // siteServiceFactory.
		    	  ISiteService service = siteServiceFactory.getInstance();	
		    	  
		    	  String ss = service.getId();
		    	  
		    	  Sensor sensor = service.getSensor ("Room1", "Sensor1");
		    	  
		    	  if (sensor != null)
		    	  {		    		  
		    		  station.setOutTemp((int) sensor.getTemperature().get());
		    	  }
		    	  
		      }
		      else
		      {
		    	System.out.println("Factory is null !!!");  
		      }

		      try {
		        Thread.sleep(3000);
		      } catch (Exception e) {
		        System.out.println("Thread interrupted " + e.getMessage());
		      }
		    }
		  }

		  public void stopThread() {
		    active = false;
		  }		
}
