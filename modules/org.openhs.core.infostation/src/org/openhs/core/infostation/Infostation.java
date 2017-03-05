package org.openhs.core.infostation;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.json.JSONObject;
import org.json.JSONArray;
import org.openhs.core.cfg.OpenhsProps;
import org.openhs.core.commons.TextOutput;
import org.openhs.core.commons.Weather;
import org.openhs.core.commons.Window;
import org.openhs.core.commons.ContactSensor;
import org.openhs.core.commons.Door;
import org.openhs.core.commons.Floor;
import org.openhs.core.commons.Room;
import org.openhs.core.commons.Site;
import org.openhs.core.commons.Thing;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Switch;
import org.openhs.core.commons.Temperature;
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
      
      public boolean setSwitch (String sitePath, boolean state) {
    	  
    	  logger.debug(" setSwitch : " + sitePath);
    	  try {
    		  Switch swt = (Switch) m_siteService.getThing(sitePath);
              swt.setState(state);
              
              return swt.getState();
    		  
    	  } catch (Exception ex) {
   	    	logger.warn(" Caught exception: " + ex.getMessage());
    	  }    	  	      	      	  
    	  
    	  return false;
      }      
      
      /*
      public List<Boolean> getSwitchState (String sitePath) throws SiteException {

    	  List<Boolean> list = new ArrayList<Boolean>();
    	  
   		  Switch swt = (Switch) m_siteService.getThing(sitePath);
   		  
   		  list.add(swt.getState());
   		  list.add(swt.getDeviceState());
   		  
   		  return list;       
      }   
      */
      /*
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
      */
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
    	  return this.m_siteService.getThingPathSet(Room.class);   		      		    	  
      }     
      
      public Set<String> getTempSensorsPaths () throws SiteException {    	      	  
    	  return this.m_siteService.getThingPathSet(TemperatureSensor.class);   		      		    	  
      }  
      
      public Set<String> getSwitchPaths () throws SiteException {    	      	  
    	  return this.m_siteService.getThingPathSet(Switch.class);   		      		    	  
      }  
      
      public Thing getThing (String thingPath) throws SiteException {    	      	  
    	  return this.m_siteService.getThing(thingPath);		      		    	  
      }        
      
      public Set<String> getThingPaths (Class<?> t) throws SiteException {    	      	  
    	  return this.m_siteService.getThingPathSet(t);   		      		    	  
      }  
      
      public boolean isClosed (Thing m_thing) throws SiteException {
    	  return this.m_siteService.isClosed (m_thing);
      }
      
      public boolean isLocked (Thing m_thing) throws SiteException {
    	  return this.m_siteService.isLocked (m_thing);
      } 
      
      public void setAllDoorsSwitch (boolean state) throws SiteException {
    	  
    	  Set<String> doorPaths = getThingPaths (Door.class);
    	  
    	  if (doorPaths != null) {
	    	  for (String path : doorPaths) {	    		  
	    		  Set <String> switchPaths = this.m_siteService.getThingChildrenPathSet(path, Switch.class);
	    		  
	    		  for (String swPath: switchPaths) {
	    			  
	    			  Switch sw = (Switch) this.m_siteService.getThing(swPath);
	    			  
	    			  sw.setState(state);	    			  
	    		  }	    		  	    		  
	    	  }    	  
    	  }    	      	  
      }
      
      
      public JSONObject JSON_Thing (String path) {
    	  
    	  JSONObject json = new JSONObject();
    	  
    	  Thing thing;
		  
		  try {
			  thing = this.getThing(path);
			  			  
			  
			  if (thing instanceof Floor) {
				  Floor floor = (Floor) thing;		
				  
				  json.put(path + "__validity", new Boolean(true));
				  json.put(path + "__name", floor.getName());
				  json.put(path + "__imagePath", floor.imagePath);
				  
			  } else if (thing instanceof Room) {
				  Room room = (Room) thing;		
				  
				  json.put(path + "__validity", new Boolean(true));
				  json.put(path + "__name", room.getName());
				  json.put(path + "__imagePath", room.imagePath);
				  
			  } else if (thing instanceof Door) {
				  Door door = (Door) thing;
				  
				  json.put(path + "__validity", new Boolean(true));
				  json.put(path + "__name", door.getName());
				  json.put(path + "__imagePath_open", door.imagePath_open);
				  json.put(path + "__imagePath_close", door.imagePath_close);
				  json.put(path + "__x", new Integer(door.x));
				  json.put(path + "__y", new Integer(door.y));
				  json.put(path + "__z", new Integer(door.z));	
				  json.put(path + "__open", new Boolean(this.isClosed(door)));
				  json.put(path + "__lock", new Boolean(this.isLocked(door)));				  
				  
			  } else if (thing instanceof Window) {
				  Window window = (Window) thing;
				  
				  json.put(path + "__validity", new Boolean(true));
				  json.put(path + "__name", window.getName());
				  json.put(path + "__imagePath_open", window.imagePath_open);
				  json.put(path + "__imagePath_close", window.imagePath_close);
				  json.put(path + "__x", new Integer(window.x));
				  json.put(path + "__y", new Integer(window.y));
				  json.put(path + "__z", new Integer(window.z));	
				  json.put(path + "__open", new Boolean(this.isClosed(window)));
				  json.put(path + "__lock", new Boolean(this.isLocked(window)));					  
				  
			  } else if (thing instanceof TemperatureSensor) {
				  TemperatureSensor sensor = (TemperatureSensor) thing;
				  Temperature temp = sensor.getTemperature();
				  
				  json.put(path + "__validity", new Boolean(true));
				  json.put(path + "__name", sensor.getName());
				  json.put(path + "__temperature", String.format("%.2f",  temp.getCelsius()));
				  json.put(path + "__x", new Integer(sensor.x));
				  json.put(path + "__y", new Integer(sensor.y));
				  json.put(path + "__z", new Integer(sensor.z));				  
				  
			  } else if (thing instanceof ContactSensor) {
				  ContactSensor contact = (ContactSensor) thing;
				  
				  json.put(path + "__validity", new Boolean(true));
				  json.put(path + "__name", contact.getName());
				  json.put(path + "__state_int", new Boolean(contact.getState()));
				  json.put(path + "__x", new Integer(contact.x));
				  json.put(path + "__y", new Integer(contact.y));
				  json.put(path + "__z", new Integer(contact.z));				  
				  
			  } else if (thing instanceof Switch) {
				  Switch swt = (Switch) thing;
				  				  
				  json.put(path + "__validity", new Boolean(true));
				  json.put(path + "__name", swt.getName());
				  json.put(path + "__state_int", new Integer(swt.getStateInt()));
				  json.put(path + "__x", new Integer(swt.x));
				  json.put(path + "__y", new Integer(swt.y));
				  json.put(path + "__z", new Integer(swt.z));
				  
				//  System.out.println("\n\npath:" + path);
				  
			  } else {
				  json.put(path + "__validity", new Boolean(false));
			  }


			  
		  } catch (SiteException e) {
			  e.printStackTrace();
			  json.put(path + "__validity", new Boolean(false));
		  }    	  
    	  
		  return json;
      }  
      
      public String JSON_ThingToString (String path) {
    	  return this.JSON_Thing(path).toString();
      }
      
      public JSONObject JSON_ThingArray (Class<?> t) {
    	  
    	  JSONObject json = new JSONObject();	
    	  
    	  Set<String> paths;
    	  try {
    		  paths = this.getThingPaths(t);
    		  json.put("Array_validity", new Boolean(true));
    		  
    	  } catch (SiteException e) {    		  
    		  json.put("Array_validity", new Boolean(false));
    		  e.printStackTrace();    		  
    		  return json;
    	  }				
    	  
    	  for (String path: paths) {
    		  JSONObject jsonItem = JSON_Thing (path);
    		  
    		  if (jsonItem.length() > 0){    			  
			      for(String key : JSONObject.getNames(jsonItem))
			      {
			    	  json.put(key, jsonItem.get(key));
			      }
    		 }	      		  
    	  }
    	  
    	  return json; 
      }           
         
      public String JSON_ThingArrayToString (Class<?> t) {
    	  return this.JSON_ThingArray(t).toString();
      }
}
