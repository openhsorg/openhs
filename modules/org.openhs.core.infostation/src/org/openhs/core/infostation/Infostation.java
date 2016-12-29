package org.openhs.core.infostation;

import java.util.ArrayList;
import java.util.List;

import org.openhs.core.cfg.OpenhsProps;
import org.openhs.core.commons.TextOutput;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Switch;
import org.openhs.core.infostation.servlet.InfostationServlet;
import org.openhs.core.meteostation.Meteostation;
import org.openhs.core.site.api.ISiteService;
import org.osgi.service.http.HttpService;


public class Infostation {
			
	TextOutput msg = new TextOutput ();
	
	InfostationServlet	m_servlet = null;
	
	public ISiteService m_siteService = null;  
	private Meteostation m_meteo = null;	
	private HttpService m_httpService = null;	
	public OpenhsProps m_openhsProps = null;
        
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
      
      public void setService(ISiteService ser) {
          m_siteService = ser;
      }

      public void unsetService(ISiteService ser) {
          if (m_siteService == ser) {
              ser = null;
          }
      }        
      
      public void setService(OpenhsProps ser) {
          m_openhsProps = ser;
      }

      public void unsetService(OpenhsProps ser) {
          if (m_openhsProps == ser) {
              ser = null;
          }
      }     
      
      public boolean setSwitch (String sitePath) {
    	  
    	  try {
    		  Switch swt = (Switch) m_siteService.getThing(sitePath);
              return swt.setState();      		      		  
    		  
    	  } catch (Exception ex) {
    		  
    	  }    	  	      	      	  
    	  
    	  return false;
      }
      
      public List getSwitchState (String sitePath) throws SiteException {

    	  List<Boolean> list = new ArrayList<Boolean>();
    	  
   		  Switch swt = (Switch) m_siteService.getThing(sitePath);
   		  
   		  list.add(swt.getState());
   		  list.add(swt.getDeviceState());
   		  
   		  return list;       
      }      
}
