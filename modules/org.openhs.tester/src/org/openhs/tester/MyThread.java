package org.openhs.tester;

import org.openhs.core.site.services.SiteServiceFactory;
import org.openhs.core.site.data.ISiteService;

public class MyThread extends Thread {
	  private volatile boolean active = true;
	  
	  public SiteServiceFactory siteServiceFactory = null;	  
	  public Test test = null;

	  public void run() {
	    while (active) {
	      //System.out.println("\nThread adjustment...........");
	      
	      if (siteServiceFactory != null)
	      {	    	  
	    //	System.out.println("Site ID is: " + siteServiceFactory.getInstance().getId());	    	  
	     //   System.out.println("Number rooms is: " + siteServiceFactory.getInstance().getNumberRooms());	  		
	    	  
	    	  test.SetTemperature();
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