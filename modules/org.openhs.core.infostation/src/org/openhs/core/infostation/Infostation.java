package org.openhs.core.infostation;

import java.util.ArrayList;

import org.openhs.core.commons.TextOutput;
import org.openhs.core.infostation.servlet.InfostationServlet;
import org.osgi.service.http.HttpService;


public class Infostation {
			
	TextOutput msg = new TextOutput ();
	
	InfostationServlet	m_servlet = null;
	
	private HttpService m_httpService = null;	
        
    public void activate() {
    	msg.println("org.openhs.core.infostation: activate"); 	  
    	
    	m_servlet = new InfostationServlet (this, m_httpService);
    	       	
    }

    public void deactivate() {
    	msg.println("org.openhs.core.infostation: deactivate");
    	
    	m_servlet.unregister();
    }	

    public void setService(HttpService ser) {
        m_httpService = ser;
    }

    public void unsetService(HttpService ser) {    	
        if (m_httpService == ser) {
            m_httpService = null;
        }
    }      
    
}
