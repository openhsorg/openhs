package org.openhs.comm.wifiadmin;
import java.util.List;

import org.openhs.core.site.api.ISiteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class WifiAdmin {
	
	private Logger logger = LoggerFactory.getLogger(WifiAdmin.class);
	
	private Thread m_threadIncoming = null;
    private volatile boolean m_runningIncoming = true;
    private WifiAdminDiscovery m_discovery = null;
    public ISiteService m_siteService = null; 
    
    WifiManager m_wifiManager;// = new WifiManager ();
    
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
        		 iot = m_wifiManager.GetIotWifiList("Homie");
        		 
        		 if (iot.size() <= 0) {
        			 logger.info(">> No IOT :(");
        		 }
        		 
        		 for (String line: iot) {
        			 logger.info(">>" + line);        			         			 
        		 }
        		 
        		 m_wifiManager.UpdateSiteData(iot);
        		 
        		// logger.info("\n<------ Network interfaces ------------>");
        		// m_wifiManager.NetworkInterfaces();
        		 
        		// m_wifiManager.getListDevices();
        		 
        		 Thread.sleep(5000);
		       }
		     } catch (Exception e) { 
		    	 System.out.println(e);
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
		
		this.m_wifiManager = new WifiManager(this.m_siteService);

		m_discovery = new WifiAdminDiscovery();
    }

    public void deactivate() {
		logger.info("org.openhs.comm.wifiadmin: deactivate");
		
		m_discovery.terminate();
	}	
    
    public void setService(ISiteService ser) {
  	  logger.info("**** setService(): ISiteService");
        m_siteService = ser;
    }

    public void unsetService(ISiteService ser) {
  	  logger.info("**** unsetService(): ISiteService");
        if (m_siteService == ser) {
            ser = null;
        }
    }      
}
