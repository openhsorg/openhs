package org.openhs.core.sensorupdate;

import org.openhs.core.comm.MainComm;
import org.openhs.core.comm.Message;
import org.openhs.core.comm.TopicsID;
import org.openhs.core.commons.TextOutput;

public class Update extends Thread {
	
	TextOutput txt = new TextOutput ();

	 private volatile boolean active = true;

	    public MainComm comm = null;
	    
	    int i = 0; 

	    Update(MainComm cm) {	        	        
	        comm = cm;
	    }

	    @Override
	    public void run() {
	        while (active) {        	       	

	            if (comm != null) {

	            	int num = comm.messages.size();	            	
	            	txt.println("org.openhs.core.sensorupdate> Sensor......: " + num);
	            	
	            	if (num > 0) {
	            			            		
	            		Message msg = comm.messages.getOldest();
	            		if (msg.topic.equals(TopicsID.OPENHS.toString()) && msg.message.contains("temp")) {
	            			
	            			txt.println("org.openhs.core.sensorupdate> Sensor message......: " + msg.message);         			
	            		}	            		
	            	}	         
	            	
	            	comm.messages.removeOldest();
	                
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