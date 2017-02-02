package org.openhs.core.infostation;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.openhs.core.cfg.OpenhsProps;
import org.openhs.core.commons.TextOutput;
import org.openhs.core.commons.Weather;
import org.openhs.core.commons.Floor;
import org.openhs.core.commons.Room;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Switch;
import org.openhs.core.commons.TemperatureSensor;
import org.openhs.core.meteostation.Meteostation;
import org.openhs.core.site.api.ISiteService;
import org.openhs.core.commons.api.IInfostation;
import org.openhs.core.commons.api.IMeteostation;
import org.osgi.service.http.HttpService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class Infostation implements IInfostation {

	private Logger logger = LoggerFactory.getLogger(Infostation.class);
			
	TextOutput msg = new TextOutput ();
	
	public ISiteService m_siteService = null;  
	private IMeteostation m_meteo = null;	
	private HttpService m_httpService = null;	
	public OpenhsProps m_openhsProps = null;
        
    public void activate() {
		logger.info("**** activate()");
		msg.println("org.openhs.core.infostation: activate"); 	      	       	
    }

    public void deactivate() {
    	msg.println("org.openhs.core.infostation: deactivate");
		logger.info("**** deactivate()");
	}	

    public void setService(HttpService ser) {
    	logger.info( "**** setService(): HttpService");
        m_httpService = ser;
    }

    public void unsetService(HttpService ser) {    	
        if (m_httpService == ser) {
            m_httpService = null;
        }
    	logger.info( "**** unsetService(): HttpService");
    }      
    
    public void setService(Meteostation ser) {
    	  logger.info("**** setService(): Meteostation");
          m_meteo = ser;          
      }

      public void unsetService(Meteostation ser) {
    	  logger.info("**** unsetService(): Meteostation");
          if (m_meteo == ser) {
              m_meteo = null;
          }
      }	    

      public void setService(ISiteService ser) {
    	  logger.info("**** setService(): ISiteService");
          m_siteService = ser;
      }

      public void unsetService(ISiteService ser) {
    	  logger.info("**** unsetService(): ISiteService");
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
    	  
    	  logger.debug(" setSwitch : " + sitePath);
    	  try {
    		  Switch swt = (Switch) m_siteService.getThing(sitePath);
              return swt.setState();      		      		  
    		  
    	  } catch (Exception ex) {
   	    	logger.warn(" Caught exception: " + ex.getMessage());
    	  }    	  	      	      	  
    	  
    	  return false;
      }
      
      public List<Boolean> getSwitchState (String sitePath) throws SiteException {

    	  List<Boolean> list = new ArrayList<Boolean>();
    	  
   		  Switch swt = (Switch) m_siteService.getThing(sitePath);
   		  
   		  list.add(swt.getState());
   		  list.add(swt.getDeviceState());
   		  
   		  return list;       
      }   
      
      public int getSwitchIntState (String sitePath) throws SiteException {

    	  	int stateInt = 0;
    	  
			List<Boolean> list = getSwitchState(sitePath);
			
			boolean state = list.get(0);
			boolean stateDevice = list.get(1);
			
			if (stateDevice) { //device on
				if (state) {
					stateInt = 3; //request is on
				} else {
					stateInt = 4; //request is off
				}
			} else { //device off
				if (state) { //request is on
					stateInt = 2;
				} else { // request is off
					stateInt = 1;
				}	    					
			}	
			
   		  return stateInt;       
      }       
      
      public float getTempIn() {
    	  return this.m_meteo.getTempIn();
      }
      
      public float getTempOut() {
    	  return this.m_meteo.getTempOut();
      }
      
      public Weather getForecastWeather6() {    	    	    
      	return this.m_meteo.getForecastWeather6();
      }    
      
      public float getCloudsForecast() {      	
    	  return this.m_meteo.getCloudsForecast();
      }    
      
      public float getTempForecast() {
    	  return this.m_meteo.getTempForecast();
      }    
      
      public boolean isFrost() {
    	  return this.m_meteo.isFrost();
      }   
      
      public ArrayList<Weather> getForecasts() {    	    	    
    	  return this.m_meteo.getForecasts();
      }  

      public int getNumberFloors() {
    	  try {
    		  Set<String> floorPaths = this.getFloorsPaths();
    		  
    		  return floorPaths.size();    		  
    	  } catch (Exception ex){    		  
    		  return 0;
    	  }
      }            
      
      public Set<Floor> getFloors () {
    	  Set<Floor> floors = new HashSet <Floor> ();
    	  
    	  try {
    		  Set<String> floorPaths = this.m_siteService.getChildren("floors");    		      		  
    		  
    		  for (String path: floorPaths) {
    			  floors.add((Floor)this.m_siteService.getThing(path));
    		  }
    		  
    		  return floors;
    		      		  
    	  } catch (Exception ex) {
    		  return floors;
    	  }
      }
      
      public Set<String> getFloorsPaths () throws SiteException {
    	  return this.m_siteService.getChildren("floors");    		      		      		    	  
      }     
      
      public Set<String> getRoomsPaths () throws SiteException {    	      	  
    	  return this.m_siteService.getAllThingsPath(Room.class);   		      		    	  
      }     
      
      public Set<String> getTempSensorsPaths () throws SiteException {    	      	  
    	  return this.m_siteService.getAllThingsPath(TemperatureSensor.class);   		      		    	  
      }  
      
      public Set<String> getSwitchPaths () throws SiteException {    	      	  
    	  return this.m_siteService.getAllThingsPath(Switch.class);   		      		    	  
      }            
      
}
