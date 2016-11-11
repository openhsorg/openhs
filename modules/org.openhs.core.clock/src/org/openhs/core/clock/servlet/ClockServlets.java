package org.openhs.core.clock.servlet;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import org.osgi.service.http.HttpService;
import org.osgi.service.http.NamespaceException;

public class ClockServlets{
	
	HttpService m_httpService = null;
	ClockRichServlet	m_clockrich = null;
	ClockSimpleServlet	m_clocksimple = null;
	ClockSimple2Servlet	m_clocksimple2 = null;
	
	public ClockServlets(HttpService m_httpService) {

		this.m_httpService = m_httpService;
		m_clockrich = new ClockRichServlet ();
		m_clocksimple = new ClockSimpleServlet ();
		m_clocksimple2 = new ClockSimple2Servlet ();
				
		/* Make adress references */
		m_clocksimple.addressNext = m_clocksimple2.address;
		m_clocksimple2.addressNext = m_clockrich.address;
		m_clockrich.addressNext = "/";
										
        try {
            m_httpService.registerServlet("/" + m_clockrich.address, m_clockrich, null, null);
            m_httpService.registerServlet("/" + m_clocksimple.address, m_clocksimple, null, null);
            m_httpService.registerServlet("/" + m_clocksimple2.address, m_clocksimple2, null, null); 
            m_httpService.registerResources("/org.openhs.core.clock.servlet.res", "/res", null);            
                        
        } catch (ServletException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (NamespaceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }  									
	}
	
	public void unregister() {
		this.m_httpService.unregister("/" + m_clockrich.address);
		this.m_httpService.unregister("/" + m_clocksimple.address);
		this.m_httpService.unregister("/" + m_clocksimple2.address);
	}	
}
