package org.openhs.apps.infostation.webservices;

import org.openhs.apps.infostation.Infostation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class InfostationWebService {
	
	private Logger logger = LoggerFactory.getLogger(InfostationWebService.class);
	
	public Infostation m_infostation = null;   
	
	public void activate () {
		
	}
	
	public void deactivate () {
		
	}
	
    public void setService(Infostation ser) {
    	  logger.info("**** setService(): ISiteService");
    	  m_infostation = ser;

          //logger.info("IDDDDDDDDDDDD: " + this.m_siteService.getId());
          
      }

      public void unsetService(Infostation ser) {
    	  logger.info("**** unsetService(): ISiteService");
          if (m_infostation == ser) {
              ser = null;
          }
      }  
      
}
