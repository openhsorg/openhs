package org.openhs.core.infostation.servlet;

import java.util.Properties;

import javax.servlet.ServletException;

import org.openhs.core.infostation.Infostation;
import org.openhs.core.meteostation.Meteostation;
import org.osgi.service.http.HttpService;
import org.osgi.service.http.NamespaceException;

public class InfostationServlet {
	
	Infostation	m_infostation = null;
	HttpService m_httpService = null;
	KitchenServlet	m_kitchen = null;
	
	private String m_openhsDir = null;
	private String m_fileSep = null;	
	private String m_imagesDir = null;
	private final String OHS_DIR = "openhs";
	private final String IMAGES_DIR = "images";
	
	public InfostationServlet(Infostation m_infostation, HttpService m_httpService) {
		
		this.m_infostation = m_infostation;
		this.m_httpService = m_httpService;
			
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
         //   m_httpService.registerResources("/infores2", "../", null); 
                        
        } catch (ServletException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (NamespaceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }  									
	}
	
	public void unregister() {
		this.m_httpService.unregister("/" + m_kitchen.address);
	}
	

}
