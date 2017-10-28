package org.openhs.apps.infostation;

import org.openhs.core.site.api.ISiteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Infostation {
	
	private Logger logger = LoggerFactory.getLogger(Infostation.class);
	
	public ISiteService m_siteService = null;   
	
	public void activate () {
		
	}
	
	public void deactivate () {
		
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

}
