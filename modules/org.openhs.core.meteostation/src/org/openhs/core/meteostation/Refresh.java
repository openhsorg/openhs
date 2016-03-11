package org.openhs.core.meteostation;

import java.util.Set;
import java.util.TreeMap;
import java.util.*;

import org.openhs.core.site.data.ISiteService;
import org.openhs.core.site.data.Room;
import org.openhs.core.site.data.Sensor;
import org.openhs.core.site.data.Temperature;
import org.openhs.core.site.data.SiteException;
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
		    	/*
		     try
		     {
		    	 station.setFrostIndicator();
		     }
		     catch (Exception ex)
		     {
		    	 
		     }
		      */
		      if (siteServiceFactory != null)
		      {	    	  
		    	  ISiteService service = siteServiceFactory.getInstance();	
/*
		    	  Sensor sensor = null; 
		    	  
		    	  try
		    	  {
		    		  sensor = service.getSensor ("Room1", "Sensor1");
		    	  }
		    	  catch (SiteException ex)
		    	  {
		    		  
		    	  }
		    	  */
		    	//  finally 
		    	//  {
		    	  
		    	 /* 
		    	  if (sensor != null)
		    	  {		    		  
		    		  station.setTempOut(sensor.getTemperature());
		    	  }
		    	  */
		    	 // }
		    	  
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
