package org.openhs.apps.infostation;

import java.util.Map;

import org.openhs.core.commons.InfoStationData;
import org.openhs.core.site.api.ISiteService;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Infostation {
	
	private Logger logger = LoggerFactory.getLogger(Infostation.class);
	
	public ISiteService m_siteService = null;   
	
	private Map<String, Object> m_properties = null;
	
	public void activate (ComponentContext componentContext, Map<String, Object> properties) {
		
		updated(properties);
		
	}
	
	public void deactivate () {
		
	}
	
	public void updated(Map<String, Object> properties) {
		m_properties = properties;
		
	//	String loadXml = (String) m_properties.get("xmlLoadEnable");
	//	String xmlFileName = (String) m_properties.get("xmlFileName");		


	}		
	
    public void setService(ISiteService ser) {
    	  logger.info("**** setService(): ISiteService");
          m_siteService = ser;

          //logger.info("IDDDDDDDDDDDD: " + this.m_siteService.getId());
          
      }

      public void unsetService(ISiteService ser) {
    	  logger.info("**** unsetService(): ISiteService");
          if (m_siteService == ser) {
              ser = null;
          }
      }  	
      
      public InfoStationData getData () {
    	  
    	  InfoStationData data = new InfoStationData ();    	  
    	  // Name from file    	     	  
    	  
    	  data.validity = true;
    	  data.tmpInPath = (String) this.m_properties.get("tempIn_SitePath");
    	  data.tmpOutPath = (String) this.m_properties.get("tempOut_SitePath");
    	  
    	  return data;    	  
      }      

}
