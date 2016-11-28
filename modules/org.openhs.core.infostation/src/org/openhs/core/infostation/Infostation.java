package org.openhs.core.infostation;

import java.util.ArrayList;

import org.openhs.core.commons.TextOutput;
import org.openhs.core.infostation.servlet.InfostationServlet;
import org.openhs.core.meteostation.Meteostation;
import org.osgi.service.http.HttpService;


public class Infostation {
			
	TextOutput msg = new TextOutput ();
	
	InfostationServlet	m_servlet = null;
	
	private Meteostation m_meteo = null;	
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
      
      public Meteostation getMeteostation() {
    	  return m_meteo;
      }
}
