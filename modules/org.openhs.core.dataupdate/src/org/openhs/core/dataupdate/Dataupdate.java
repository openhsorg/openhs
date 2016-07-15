package org.openhs.core.dataupdate;

import org.openhs.core.comm.MainComm;
import org.openhs.core.commons.TextOutput;

public class Dataupdate {
TextOutput msg = new TextOutput ();
	
	public MainComm comm = null;
	
	private Update update;
	
	boolean enable = true;

	public void activate () {
		System.out.println("org.openhs.core.dataupdate: Activated...");
		
		if (enable){
		    update = new Update(comm);
		    update.start();  
		}
	}		
	public void deactivate () {
		System.out.println("org.openhs.core.dataupdate: De-activated...");
		
		if (enable){
			update.stopThread();
		}
	}
	
    public void setService(MainComm com) {
    	System.out.println("org.openhs.core.dataupdate: Set setServiceComm");
        comm = com;               
    }

    public void unsetService(MainComm com) {
    	System.out.println("org.openhs.core.dataupdate: UnSet unsetServiceComm");
        if (comm == com) {
            comm = null;
        }
    }  
}
