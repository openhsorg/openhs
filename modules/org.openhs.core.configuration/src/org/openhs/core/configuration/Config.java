package org.openhs.core.configuration;

import org.openhs.core.commons.Message;
import org.openhs.core.commons.Configuration;
import org.openhs.core.site.data.ISiteService;

public class Config {
	
    /*
     * Basic data structure.
     */
    private ISiteService m_siteService = null;	
	
	Message msg = new Message ();
	
	Configuration config = new Configuration ();

    public void activate() {
    	msg.println("org.openhs.core.configuration: activate");
    }

    public void deactivate() {
    	msg.println("org.openhs.core.configuration: deactivate");
    }

    public void setService(ISiteService ser) {
    	msg.println("org.openhs.core.configuration: Set ISiteService");
        m_siteService = ser;
    }

    public void unsetService(ISiteService ser) {
    	msg.println("org.openhs.core.configuration: UnSet ISiteService");
        if (m_siteService == ser) {
            ser = null;
        }
    }	

}
