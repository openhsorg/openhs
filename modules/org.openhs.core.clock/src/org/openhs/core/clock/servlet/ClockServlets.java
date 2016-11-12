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
	ClockStationServlet	m_clockstation = null;
	ClockSegmentServlet m_clocksegment = null;
	Clock1Servlet		m_clock1 = null;
	
	public ClockServlets(HttpService m_httpService) {

		this.m_httpService = m_httpService;
		m_clockrich = new ClockRichServlet ();
		m_clocksimple = new ClockSimpleServlet ();
		m_clocksimple2 = new ClockSimple2Servlet ();
		m_clockstation = new ClockStationServlet ();
		m_clocksegment = new ClockSegmentServlet ();
		m_clock1 = new Clock1Servlet (); 
				
		/* Make adress references */
		m_clocksimple.addressNext = m_clockstation.address;
		m_clockstation.addressNext = m_clockrich.address;
		m_clockrich.addressNext = m_clocksimple2.address;		
		m_clocksimple2.addressNext = m_clocksegment.address;
		m_clocksegment.addressNext = m_clock1.address;		
		m_clock1.addressNext = "/";
		
										
        try {
            m_httpService.registerServlet("/" + m_clockrich.address, m_clockrich, null, null);
            m_httpService.registerServlet("/" + m_clocksimple.address, m_clocksimple, null, null);
            m_httpService.registerServlet("/" + m_clocksimple2.address, m_clocksimple2, null, null);            
            m_httpService.registerServlet("/" + m_clockstation.address, m_clockstation, null, null);
            m_httpService.registerServlet("/" + m_clocksegment.address, m_clocksegment, null, null);
            m_httpService.registerServlet("/" + m_clock1.address, m_clock1, null, null);
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
		this.m_httpService.unregister("/" + m_clockstation.address);
		this.m_httpService.unregister("/" + m_clocksegment.address);
		this.m_httpService.unregister("/" + m_clock1.address);
	}	
}
