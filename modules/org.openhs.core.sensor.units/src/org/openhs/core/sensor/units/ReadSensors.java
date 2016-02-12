package org.openhs.core.sensor.units;

import org.openhs.core.site.services.SiteServiceFactory;
import org.openhs.core.site.data.ISiteService;

public class ReadSensors extends Thread {
	  private volatile boolean active = true;
	  
	  int i = 0;
	  
	  public SiteServiceFactory siteServiceFactory = null;	  

	  public void run() {
	    while (active) {
	      System.out.println("\nThread run...........");
	      
	      if (siteServiceFactory != null)
	      {	   
	    	i++;  
	    	//System.out.println("ReadSensors: " + i);	
	    	
	    	if (i >= 150) i = 0;
	    	  
	      }
	      else
	      {
	    	System.out.println("Factory is null !!!");  
	      }

	      try {
	        Thread.sleep(5000);
	      } catch (Exception e) {
	        System.out.println("Thread interrupted " + e.getMessage());
	      }
	    }
	  }

	  public void stopThread() {
	    active = false;
	  }
	} 