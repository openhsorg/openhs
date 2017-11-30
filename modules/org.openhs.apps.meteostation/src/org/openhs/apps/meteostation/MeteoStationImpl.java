package org.openhs.apps.meteostation;

import java.util.Map;

import org.openhs.core.commons.MeteoStationData;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Temperature;
import org.openhs.core.commons.TemperatureSensor;
import org.openhs.core.commons.Thing;
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
    	  // Name from file
    	  
    	  String name = (String) this.m_properties.get("station_name");    	  
    	  data.id = name;    	     	     	  
    	  
    	  String tmpPathIn = (String) this.m_properties.get("tempPathInside");
    	  String tmpPathOut = (String) this.m_properties.get("tempPathOutside");
    	  
    	  try {    		  
    		  TemperatureSensor tmpIn = (TemperatureSensor) this.m_siteService.getThing(tmpPathIn);
    		  TemperatureSensor tmpOut = (TemperatureSensor) this.m_siteService.getThing(tmpPathOut);
    		  
    		  Temperature tempIn = tmpIn.getTemperature();
    		  Temperature tempOut = tmpOut.getTemperature();
    		  
    		  data.tmpIn = tempIn.getCelsius();
    		  data.tmpOut = tempOut.getCelsius();
    		  
    		  data.validity = true;
    		  
    	  } catch (SiteException e) {
    		  // TODO Auto-generated catch block
    		  e.printStackTrace();
    	  }
    	  
    	  return data;    	  
      }

}
