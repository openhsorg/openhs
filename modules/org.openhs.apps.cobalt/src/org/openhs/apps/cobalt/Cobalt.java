package org.openhs.apps.cobalt;

import javax.servlet.ServletException;

import org.osgi.service.http.HttpService;
import org.osgi.service.http.NamespaceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Cobalt {
	
	private HttpService m_httpService = null;	
	private CobaltServlet m_cobaltServlet = null;
	
	//initialize logger
	private Logger logger = LoggerFactory.getLogger(Cobalt.class);	
	
	public void activate() {
        logger.info("org.openhs.apps.cobalt: activate()");
        
        m_cobaltServlet = new CobaltServlet ();	
        
		/* Make adress references */										
        try {
            m_httpService.registerServlet("/robot", m_cobaltServlet, null, null);  
            m_httpService.registerResources("/robotres", "/res", null);
            
        } catch (ServletException e) {
            // TODO Auto-generated catch block
        	System.out.println("\n\n--->*************************");
            e.printStackTrace();
        } catch (NamespaceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }          
	}
	
	public void deactivate() {
        logger.info("org.openhs.apps.cobalt: deactivate()");
        
        this.m_httpService.unregister("/robot");
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
