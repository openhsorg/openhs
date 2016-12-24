package org.openhs.core.remote.access;

import org.openhs.core.site.api.ISiteService;

public class MyThread extends Thread {
	  private volatile boolean active = true;
    
	    int i = 0; 

	    @Override
	    public void run() {
	        while (active) {
	            // System.out.println("\nThread adjustment...........");
	        	       	
	        	i++;

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
