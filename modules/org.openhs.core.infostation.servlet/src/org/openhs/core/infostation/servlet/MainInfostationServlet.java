package org.openhs.core.infostation.servlet;

import javax.servlet.ServletException;

import org.openhs.core.commons.TextOutput;
import org.openhs.core.commons.api.IInfostation;
import org.osgi.service.http.HttpService;
import org.osgi.service.http.NamespaceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.openhs.core.infostation.Infostation;

public class MainInfostationServlet {
	
	private Logger logger = LoggerFactory.getLogger(MainInfostationServlet.class);

	IInfostation	m_infostation = null;
	HttpService m_httpService = null;
	KitchenServlet	m_kitchen = null;
	
	private String m_openhsDir = null;
	private String m_fileSep = null;	
	private String m_imagesDir = null;
	private final String OHS_DIR = "openhs";
	private final String IMAGES_DIR = "images";

    public void activate() {
			
		m_kitchen = new KitchenServlet (m_infostation);		
		
		String currentUsersHomeDir = System.getProperty("user.home");
        m_fileSep = System.getProperty( "file.separator"); 
        m_openhsDir = currentUsersHomeDir + m_fileSep + OHS_DIR;
        m_imagesDir = m_openhsDir + m_fileSep + IMAGES_DIR;	
        
       // System.out.println("\n\n--->Pathx:  " + m_imagesDir);
				
		/* Make adress references */										
        try {
            m_httpService.registerServlet("/" + m_kitchen.address, m_kitchen, null, null);  
            m_httpService.registerResources("/infores", "/res", null);                        
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
    	this.m_httpService.unregister("/" + m_kitchen.address);
    }

    public void setService(Infostation ser) {
    	logger.info("org.openhs.core.remote.access: Set ISiteService");
    	m_infostation = ser;
    }

    public void unsetService(Infostation ser) {
    	logger.info("org.openhs.core.remote.access: UnSet ISiteService");
        if (m_infostation == ser) {
        	m_infostation = null;
        	//ser = null;
        }
    }
    
    public void setService(HttpService ser) {
    	logger.info("org.openhs.core.remote.access: Set HttpService");
        m_httpService = ser;
    }

    public void unsetService(HttpService ser) {
    	logger.info("org.openhs.core.remote.access: UnSet HttpService");
        if (m_httpService == ser) {
            m_httpService = null;
        }
    }

}
