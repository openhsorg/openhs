package org.openhs.core.configuration;

import org.openhs.core.commons.Message;
import org.openhs.core.commons.Temperature;
import org.openhs.core.commons.Configuration;
import org.openhs.core.site.data.ISiteService;

public class Config implements IConfiguration {
	
    /*
     * Basic data structure.
     */
    ISiteService m_siteService = null;	
    
    /*
     * Messages.
     */
	Message msg = new Message ();
	
	/*
	 * Configuration.
	 */
	Configuration config = new Configuration ();	 

    void activate() {
    	msg.println("org.openhs.core.configuration: activate");
    	
    	initialize();
    }

    void deactivate() {
    	msg.println("org.openhs.core.configuration: deactivate");
    }

    void setService(ISiteService ser) {
    	msg.println("org.openhs.core.configuration: Set ISiteService");
        m_siteService = ser;
    }

    void unsetService(ISiteService ser) {
    	msg.println("org.openhs.core.configuration: UnSet ISiteService");
        if (m_siteService == ser) {
            ser = null;
        }
    }	
    
    /*
     * Initialize configuration...
     */
    void initialize ()
    {
     
        m_siteService.addRoom("Room1");
        m_siteService.addRoom("Outside");

        m_siteService.addSensor("Room1", "Sensor1");
        m_siteService.addSensor("Outside", "Sensor1");	
    	    	
    }
            
    public boolean setConfiguration (Configuration configIn)
    {
    	config = configIn;
    	
    	return true;
    }
    
    public Configuration getConfiguration ()
    {
    	return config;
    }        
 
}
