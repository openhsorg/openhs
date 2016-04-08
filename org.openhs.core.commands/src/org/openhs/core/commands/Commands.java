package org.openhs.core.commands;

import org.openhs.core.commons.Configuration;
import org.openhs.core.commons.Message;
import org.openhs.core.site.data.ISiteService;

public class Commands implements ICommands {

	  /*
     * Basic data structure.
     */
    ISiteService m_siteService = null;	
    
    /*
     * Messages.
     */
	Message msg = new Message ();

	/*
	 * Methods
	 */
    void activate() {
    	msg.println("org.openhs.core.commands: activate");    	    	
    }

    void deactivate() {
    	msg.println("org.openhs.core.commands: deactivate");
    }

    void setService(ISiteService ser) {
    	msg.println("org.openhs.core.commands: Set ISiteService");
        m_siteService = ser;             
    }	
    
    public boolean setCommand (String commandIn) {
    	
    	
    	return true;
    }
}
