package org.openhs.tester;

import org.openhs.core.site.services.SiteServiceFactory;
import org.openhs.core.site.data.ISiteService;

public class MyThread extends Thread {
	  private volatile boolean active = true;
	  
	  public SiteServiceFactory siteServiceFactory = null;
	  public HttpServiceTracker serviceTracker = null;

	  public void run() {
	    while (active) {
	      System.out.println("\nThread run...........");
	      
	      if (siteServiceFactory != null)
	      {	    	  
	    	System.out.println("Site ID is: " + siteServiceFactory.getInstance().getId());	    	  
	        System.out.println("Number rooms is: " + siteServiceFactory.getInstance().getNumberRooms());	  		
	    	  
	      }
	      else
	      {
	    	System.out.println("Factory is null !!!");  
	      }

	      try {
	        Thread.sleep(10000);
	      } catch (Exception e) {
	        System.out.println("Thread interrupted " + e.getMessage());
	      }
	    }
	  }

	  public void stopThread() {
	    active = false;
	  }
	} 