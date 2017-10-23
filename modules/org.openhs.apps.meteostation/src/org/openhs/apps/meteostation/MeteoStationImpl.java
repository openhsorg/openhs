package org.openhs.apps.meteostation;

import java.util.Map;

import org.openhs.core.commons.MeteoStationData;
import org.openhs.core.site.api.ISiteService;
import org.openhs.core.weather.OpenhsWeather;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MeteoStationImpl implements IMeteoStation{
	
	private Logger logger = LoggerFactory.getLogger(MeteoStationImpl.class);
	
	private Map<String, Object> m_properties = null;
		
    /*
     * Basic data structure.
     */
    public ISiteService m_siteService = null;    
    
    public OpenhsWeather m_weather = null;	
    
	public void activate (ComponentContext componentContext, Map<String, Object> properties) {
		System.out.println("Component MeteoStationImpl activated!");
		
		updated(properties);
		
	//	this.m_meteo = new MeteoStationWebServiceImpl ();
	//	this.m_meteo.setProperties(properties);
		/*
		logger.info("\n\n\n XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
		
		String loadXml = (String) properties.get("xmlLoadEnable");
		String xmlFileName = (String) properties.get("xmlFileName");	
		
		System.out.println("\n" + xmlFileName);
		*/
		//logger.info("IDDDDDDDDDDDD: " + this.m_siteService.getId());
		

	}

	public void deactivate() {
		System.out.println("Component MeteoStationImpl de-activated!");
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
        
    public void setService(OpenhsWeather ser) {
    	  logger.info("**** setService(): ISiteService");
    	  m_weather = ser;
      }

      public void unsetService(OpenhsWeather ser) {
    	  logger.info("**** unsetService(): ISiteService");
          if (m_weather == ser) {
              ser = null;
          }
      }          
            
      public MeteoStationData getData () {
    	  
    	  MeteoStationData data = new MeteoStationData ();
    	  
    	  data.id = "MeteoStation 1";
    	  
    	  
    	  
    	  
    	  return data;    	  
      }

}
