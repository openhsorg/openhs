package org.openhs.apps.cobalt;

import java.util.Map;

import javax.servlet.ServletException;

import org.openhs.apps.cobalt.math.CobaltModel;
import org.osgi.service.component.ComponentContext;
import org.osgi.service.http.HttpService;
import org.osgi.service.http.NamespaceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Cobalt {
	
	private HttpService m_httpService = null;	
	private CobaltServlet m_cobaltServlet = null;
	private CobaltModel m_cobaltModel = null;
	
	private Map<String, Object> m_properties = null;
	
	//initialize logger
	private Logger logger = LoggerFactory.getLogger(Cobalt.class);	
	
	public void activate(ComponentContext componentContext, Map<String, Object> properties) {
        logger.info("org.openhs.apps.cobalt: activate()");
        
        
        
        m_cobaltModel = new CobaltModel();
        m_cobaltServlet = new CobaltServlet (m_cobaltModel);	
        
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
        
        //Properties
        updated(properties);
	}
	
	public void updated(Map<String, Object> properties) {
		m_properties = properties;

		String c1x = (String) m_properties.get("stl1");
		
		String openhsHome = (String) m_properties.get("openhsHome");

		//Put geometrical data into model
		
		for (int i = 1; i <= 6; i++) {
			String stlPath = openhsHome + (String) m_properties.get("stl" + i);
			this.m_cobaltModel.m_axes.get(i).loadGeometry(stlPath);
			//System.out.println("\n\n\n\n\n ********************** ------> " + stlPath);
		}
		
		
	//	System.out.println("\n\n\n\n\n ********************** ------> " + c1x + "***" + openhsHome);
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
