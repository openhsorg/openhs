package org.openhs.core.clock;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.openhs.core.commons.Clock;
import org.osgi.service.http.HttpService;
import org.openhs.core.clock.servlet.*;
import org.openhs.core.clock.servlet.ClockRichServlet;

/*
 * This modules logs and provides sensor data...
 */
public class OhsClock {
	
	ClockServlets	m_servlets = null;
	private HttpService m_httpService = null;	
	
	Clock clock = new Clock();
	
	//initialize logger
	private Logger logger = LoggerFactory.getLogger(OhsClock.class);	
	
	public void activate() {
        logger.info("org.openhs.core.clock: activate()");
        
        m_servlets = new ClockServlets (m_httpService);
	}
	
	public void deactivate() {
        logger.info("org.openhs.core.clock: deactivate()");
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
