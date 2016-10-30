package org.openhs.core.infostation.servlet;

import javax.servlet.ServletException;

import org.openhs.core.infostation.Infostation;
import org.osgi.service.http.HttpService;
import org.osgi.service.http.NamespaceException;

public class InfostationServlet {
	
	Infostation	m_infostation = null;
	HttpService m_httpService = null;
	ServletWhite	m_white = null;
	
	public InfostationServlet(Infostation m_infostation, HttpService m_httpService) {
		
		this.m_infostation = m_infostation;
		this.m_httpService = m_httpService;
			
		m_white = new ServletWhite (m_infostation);
				
		/* Make adress references */
										
        try {
            m_httpService.registerServlet("/" + m_white.address, m_white, null, null);            
            m_httpService.registerResources("/infores", "/res", null);            
                        
        } catch (ServletException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (NamespaceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }  									
	}
	
	public void unregister() {
		this.m_httpService.unregister("/" + m_white.address);
	}

}
