package org.openhs.core.meteostation.servlet;

import javax.servlet.ServletException;
import org.openhs.core.meteostation.Meteostation;
import org.openhs.core.meteostation.servlet.ServletGauge;
import org.osgi.service.http.HttpService;
import org.osgi.service.http.NamespaceException;

public class MeteostationServlet {
	
	private HttpService m_httpService = null;	
	public Meteostation m_meteo = null;	
	public ServletGauge m_servletGauge = null;
	public ServletDigital m_servletDigital = null;
	
			
	//public String address = "org.openhs.core.meteostation";	
	
	public void activate() {
		
		m_servletGauge = new ServletGauge (this);
		m_servletDigital = new ServletDigital (this);
		
		/* Make adress references */
		m_servletGauge.addressNext = m_servletDigital.address;
		m_servletDigital.addressNext = m_servletGauge.address;
								
        try {
            m_httpService.registerServlet("/" + m_servletGauge.address, m_servletGauge, null, null);
            m_httpService.registerServlet("/" +  m_servletDigital.address, m_servletDigital, null, null); 
            m_httpService.registerResources("/res", "/res", null);            
                        
        } catch (ServletException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (NamespaceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }  		
				
	}
	
	public void deactivate() {
		m_httpService.unregister("/" + m_servletGauge.address);
		m_httpService.unregister("/" + m_servletDigital.address);		
	}
	
    public void setService(Meteostation ser) {
      //  msg.println("org.openhs.core.remote.access: Set Meteostation");
        m_meteo = ser;
    }

    public void unsetService(Meteostation ser) {
    	//msg.println("org.openhs.core.remote.access: UnSet Meteostation");
        if (m_meteo == ser) {
            m_meteo = null;
        }
    }	

    public void setService(HttpService ser) {
    	//msg.println("org.openhs.core.meteostation: Set HttpService");
        m_httpService = ser;
    }

    public void unsetService(HttpService ser) {
    	//msg.println("org.openhs.core.meteostation: UnSet HttpService");
        if (m_httpService == ser) {
            m_httpService = null;
        }
    }   	
    
 
}
