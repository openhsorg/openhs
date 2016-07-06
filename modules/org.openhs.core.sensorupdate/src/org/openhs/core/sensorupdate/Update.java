package org.openhs.core.sensorupdate;

import org.openhs.core.comm.MainComm;

public class Update extends Thread {

	 private volatile boolean active = true;

	    public MainComm comm = null;
	    
	    int i = 0; 

	    Update(MainComm cm) {	        	        
	        comm = cm;
	    }

	    @Override
	    public void run() {
	        while (active) {
	            // System.out.println("\nThread adjustment...........");
	        	       	

	            if (comm != null) {
	                 //System.out.println("Site ID is: " + m_siteService.getId());
	                // System.out.println("Number rooms is: " + siteServiceFactory.getInstance().getNumberRooms());

	            	int num = comm.messages.size();
	            	
	            	System.out.println("Sensor......: " + num);
	            	
	               
	                
	            } else {
	                System.out.println("MainComm is null !!!");
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