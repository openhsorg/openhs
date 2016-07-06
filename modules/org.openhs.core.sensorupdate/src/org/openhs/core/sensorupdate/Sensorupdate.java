package org.openhs.core.sensorupdate;

import org.openhs.core.comm.MainComm;

public class Sensorupdate {
	
	public MainComm comm = null;
	
	private Update update;
	
	boolean enable = false;

	public void activate () {
		System.out.println("org.openhs.core.sensorupdate: Activated...");
		
		if (enable){
		    update = new Update(comm);
		    update.start();  
		}
	}		
	public void deactivate () {
		System.out.println("org.openhs.core.sensorupdate: De-activated...");
		
		if (enable){
			update.stopThread();
		}

	}
	
    public void setService(MainComm com) {
    	System.out.println("org.openhs.core.sensorupdate: Set setServiceComm");
        comm = com;               
    }

    public void unsetService(MainComm com) {
    	System.out.println("org.openhs.core.sensorupdate: UnSet unsetServiceComm");
        if (comm == com) {
            comm = null;
        }
    }  
    
	
}
