package org.openhs.comm.wifiadmin;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class WifiAdmin {
	
	private Logger logger = LoggerFactory.getLogger(WifiAdmin.class);
	
	private Thread m_threadIncoming = null;
    private volatile boolean m_runningIncoming = true;
    private WifiAdminDiscovery m_discovery = null;
    
    WifiManager m_wifiManager = new WifiManager ();
    
    //Data
    List<String> iot = null; //list of IOT filtered WIFI devices
	
    private class WifiAdminDiscovery implements Runnable {
    	WifiAdminDiscovery() {
    		m_threadIncoming = new Thread(this);
    		m_threadIncoming.start();
    	}
	    @Override
    	public void run() {
		     try {
		       while (m_runningIncoming) {
		    	   
		    	 logger.info("\n<------ WIFI ADMIN ------------>");
        		 iot = m_wifiManager.GetIotWifiList("SWIM_");
        		 
        		 for (String line: iot) {
        			 logger.info(">>" + line);
        		 }
        		 
        		// logger.info("\n<------ Network interfaces ------------>");
        		// m_wifiManager.NetworkInterfaces();
        		 
        		// m_wifiManager.getListDevices();
        		 
        		 Thread.sleep(5000);
		       }
		     } catch (Exception e) { 
		    	 logger.debug("MessageLoopOutcoming: No message for 20 sec");
		     }
    	}
    	public void terminate() {
    		m_runningIncoming = false;
            try {
            	m_threadIncoming.join();
    		} catch (InterruptedException ex) {
    			ex.printStackTrace();
    		}
        }
    }	

    public void activate() {
		logger.info("org.openhs.comm.wifiadmin: activate");	      	

		m_discovery = new WifiAdminDiscovery();
    }

    public void deactivate() {
		logger.info("org.openhs.comm.wifiadmin: deactivate");
		
		m_discovery.terminate();
	}	
}
