package org.openhs.comm.wifiadmin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class WifiAdmin {
	
	private Logger logger = LoggerFactory.getLogger(WifiAdmin.class);
	
	WifiAdminDiscovery  discovery = new WifiAdminDiscovery ();

    public void activate() {
		logger.info("org.openhs.comm.wifiadmin: activate");	      	
		
		discovery.start();   
		//ns.run();
    }

    public void deactivate() {
		logger.info("org.openhs.comm.wifiadmin: deactivate");
		
		discovery.stopThread();
	}	
}
