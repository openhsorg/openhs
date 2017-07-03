package org.openhs.core.site.webservices;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;
import org.openhs.core.commons.ContactSensor;
import org.openhs.core.commons.Door;
import org.openhs.core.commons.Floor;
import org.openhs.core.commons.Room;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Switch;
import org.openhs.core.commons.Temperature;
import org.openhs.core.commons.TemperatureSensor;
import org.openhs.core.commons.Thing;
import org.openhs.core.commons.Window;
import org.openhs.core.site.api.ISiteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JsonSiteMapping {
	
	// initialize logger
	private Logger logger = LoggerFactory.getLogger(JsonSiteMapping.class);	
	
	public ISiteService m_siteService = null;
	
	JsonSiteMapping (ISiteService ser) {
		m_siteService = ser;
	}
	
	protected void getSiteDataToJSON(JSONObject json) {	   			
	    	
		Date curDate = new Date();
	    SimpleDateFormat format = new SimpleDateFormat("HH:mm");
	    String time = format.format(curDate); 	 		  
	    
	    SimpleDateFormat format2 = new SimpleDateFormat("MMM dd yyyy");
	    String date = format2.format(curDate); 	  	    	  		    		    	
		
		//JSONObject json = new JSONObject();	
		
		json.put("time", "--");
		json.put("date", "--");			
		
		// Floors
		try {
	
			Set<String> floorPaths = m_siteService.getThingPathSet(Floor.class);						
	
			json.put("number_floors", String.format("%d", floorPaths.size()));
			
			int i = 0;
			for (String item: floorPaths) {
	
				String id = "floorPath_" + i;					
				json.put(id, item);
				
				i ++;
			}
			
		} catch (SiteException e) {
			json.put("number_floors", String.format("0"));								
			e.printStackTrace();
		}	
		
		// Rooms			
		try {
	
			Set<String> roomsPaths = m_siteService.getThingPathSet(Room.class);						
	
			json.put("number_rooms", String.format("%d", roomsPaths.size()));
			
			int i = 0;
			for (String item: roomsPaths) {	
				String id = "roomPath_" + i;					
				json.put(id, item);
				
				i++;
			}
			
		} catch (SiteException e) {
			json.put("number_rooms", String.format("0"));								
			e.printStackTrace();
		}		
		
		// TemperatureSensors			
		try {
	
			Set<String> tempSensorsPaths = m_siteService.getThingPathSet(TemperatureSensor.class);						
	
			json.put("number_tempsensors", String.format("%d", tempSensorsPaths.size()));
	
			int i = 0;
			for (String item: tempSensorsPaths) {													
				json.put("tempSensorPath_" + i, item);
	
				i ++;
				//System.out.println("\n\n\n\n ------> CLOUD  <-----------------: " + i);					
			}				
		} catch (SiteException e) {
			json.put("number_tempsensors", String.format("0"));								
			e.printStackTrace();
		}		
					
		// Switch			
		try {
			Set<String> switchPaths = m_siteService.getThingPathSet(Switch.class);						
			json.put("number_switches", String.format("%d", switchPaths.size()));				
							
			int i = 0;
			for (String item: switchPaths) {
												
				json.put("switchPath_" + i, item);
	
				i ++;
				//System.out.println("\n\n\n\n ------> CLOUD  <-----------------: " + i);
				
			}
			
		} catch (SiteException e) {
			json.put("number_switches", String.format("0"));								
			e.printStackTrace();
		}
		
		// ContactSensor			
		try {
			Set<String> contactSensorPaths = m_siteService.getThingPathSet(ContactSensor.class);						
			json.put("number_contactSensors", String.format("%d", contactSensorPaths.size()));				
							
			int i = 0;
			for (String item: contactSensorPaths) {
												
				json.put("contactSensorPath_" + i, item);
	
				i ++;
				//System.out.println("\n\n\n\n ------> CLOUD  <-----------------: " + i);
				
			}
			
		} catch (SiteException e) {
			json.put("number_contactSensors", String.format("0"));								
			e.printStackTrace();
		}
	
		// Doors			
		try {
			Set<String> doorsPaths = m_siteService.getThingPathSet(Door.class);						
			json.put("number_doors", String.format("%d", doorsPaths.size()));
			
			int i = 0;
			for (String item: doorsPaths) {	
				String id = "doorPath_" + i;					
				json.put(id, item);
				
				i++;
			}
			
		} catch (SiteException e) {
			json.put("number_doors", String.format("0"));								
			e.printStackTrace();
		}	
		
		// Windows			
		try {
			Set<String> windowsPaths = m_siteService.getThingPathSet(Window.class);						
			json.put("number_windows", String.format("%d", windowsPaths.size()));
			
			int i = 0;
			for (String item: windowsPaths) {	
				String id = "windowPath_" + i;					
				json.put(id, item);
				
				i++;
			}
			
		} catch (SiteException e) {
			json.put("number_windows", String.format("0"));								
			e.printStackTrace();
		}				
		
		//System.out.println("\nCLOUD: " + wth.getWeatherSymbol() + " cloudPerc: " + m_meteo.getCloudsForecast());
		
				
		
	//	return json;
	}	
	
	public JSONObject getThingJSON (String path) {
	  	  
	  	  JSONObject json = new JSONObject();
	  	  
	  	  Thing thing;
			  
			  try {
				  thing = m_siteService.getThing(path);			  			  
				  
				  if (thing instanceof Floor) {
					  Floor floor = (Floor) thing;		
					  
					  json.put(path + "__validity", new Boolean(true));
					  json.put(path + "__name", floor.getName());
					  json.put(path + "__imagePath", floor.imagePath);
					  json.put(path + "__dim_x", String.format("%.3f",  floor.dim_x));
					  json.put(path + "__dim_y", String.format("%.3f",  floor.dim_y));				  				
					  
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
					  json.put(path + "__x", String.format("%.3f", door.x));
					  json.put(path + "__y", String.format("%.3f", door.y));
					  json.put(path + "__z", String.format("%.3f", door.z));	
					  json.put(path + "__open", new Boolean(m_siteService.isClosed(door)));
					  json.put(path + "__lock", new Boolean(m_siteService.isLocked(door)));
					  json.put(path + "__supplierName", door.supplier);
					  
					//  System.out.println("Door path:" + door.getSitePath());
					  
				  } else if (thing instanceof Window) {
					  Window window = (Window) thing;
					  
					  json.put(path + "__validity", new Boolean(true));
					  json.put(path + "__name", window.getName());
					  json.put(path + "__imagePath_open", window.imagePath_open);
					  json.put(path + "__imagePath_close", window.imagePath_close);
					  json.put(path + "__x", String.format("%.3f", window.x));
					  json.put(path + "__y", String.format("%.3f", window.y));
					  json.put(path + "__z", String.format("%.3f", window.z));	
					  json.put(path + "__open", new Boolean(m_siteService.isClosed(window)));
					  json.put(path + "__lock", new Boolean(m_siteService.isLocked(window)));					  
					  
				  } else if (thing instanceof TemperatureSensor) {
					  /*
					  TemperatureSensor sensor = (TemperatureSensor) thing;
					  Temperature temp = sensor.getTemperature();
					  
					  json.put(path + "__validity", new Boolean(true));
					  json.put(path + "__name", sensor.getName());
					  json.put(path + "__temperature", String.format("%.2f",  temp.getCelsius()));
					  json.put(path + "__x", String.format("%.3f", sensor.x));
					  json.put(path + "__y", String.format("%.3f", sensor.y));
					  json.put(path + "__z", String.format("%.3f", sensor.z));
					  */
					  
				  } else if (thing instanceof ContactSensor) {
					  ContactSensor contact = (ContactSensor) thing;
					  
					  json.put(path + "__validity", new Boolean(true));
					  json.put(path + "__name", contact.getName());
					  json.put(path + "__state_int", new Boolean(contact.getState()));
					  json.put(path + "__x", String.format("%.3f", contact.x));
					  json.put(path + "__y", String.format("%.3f", contact.y));
					  json.put(path + "__z", String.format("%.3f", contact.z));				  
					  
				  } else if (thing instanceof Switch) {
					  Switch swt = (Switch) thing;
					  				  
					  json.put(path + "__validity", new Boolean(true));
					  json.put(path + "__name", swt.getName());
					  json.put(path + "__state_int", new Integer(swt.retrieveStateInt()));
					  json.put(path + "__x", String.format("%.3f", swt.x));
					  json.put(path + "__y", String.format("%.3f", swt.y));
					  json.put(path + "__z", String.format("%.3f", swt.z));
					  
				  } else {
					  json.put(path + "__validity", new Boolean(false));
				  }
				  
			  } catch (SiteException e) {
				  e.printStackTrace();
				  json.put(path + "__validity", new Boolean(false));
			  }    	  
	  	  
			  return json;
	    }  	
		
		public JSONObject getThingArrayJSON (Class<?> t) {
	  	  
	  	  JSONObject json = new JSONObject();	
	  	  
	  	  Set<String> paths;
	  	  try {
	  		  paths =m_siteService.getThingPathSet(t);
	  		  json.put("Array_validity", new Boolean(true));
	  		  
	  	  } catch (SiteException e) {    		  
	  		  json.put("Array_validity", new Boolean(false));
	  		  e.printStackTrace();    		  
	  		  return json;
	  	  }				
	  	  
	  	  for (String path: paths) {
	  		  JSONObject jsonItem = getThingJSON (path);
	  		  
	  		  if (jsonItem.length() > 0){    			  
				      for(String key : JSONObject.getNames(jsonItem))
				      {
				    	  json.put(key, jsonItem.get(key));
				      }
	  		 }	      		  
	  	  }
	  	  
	  	  return json; 
	    }	
		/*
	    public JSONObject getTimeDateJSON() {	    		    	
		    Date curDate = new Date();
		    SimpleDateFormat format = new SimpleDateFormat("HH:mm");
		    String time = format.format(curDate); 	 		  
		    
		    SimpleDateFormat format2 = new SimpleDateFormat("MMM dd yyyy");
		    String date = format2.format(curDate); 	  	    	  		    		    	
	    	
			JSONObject json = new JSONObject();	
			
			json.put("time", time);
			json.put("date", date);	
			
			return json;
	    } 	
	    */
	    public void getTimeDateJSON(JSONObject json) {	    		    	
		    Date curDate = new Date();
		    SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");
		    String time = format.format(curDate); 	 		  
		    
		    SimpleDateFormat format2 = new SimpleDateFormat("MMM dd yyyy");
		    String date = format2.format(curDate); 	  	    	  		    		    	
	    	
			//JSONObject json = new JSONObject();	
			
			json.put("time", time);
			json.put("date", date);	
			
		//	return json;
	    } 		    
	
	public JSONObject command (JSONObject json) {
		
		String id = json.getString("idPost");
		
		JSONObject jsonRet = new JSONObject ();
	//	jsonRet.put("return", new Boolean(false));
		
		//logger.info("POST2....>> " + json.toString());
		
		if (id.equals("idThingCommand")) {
			
			String path = json.getString("path");
			String command = json.getString("command");
			
			Thing thing;
			
			try {
				  thing = m_siteService.getThing(path);		
				  
				  //logger.info("PATH: " + path);
				  
				  if (thing instanceof Switch) {
					  Switch swt = (Switch) thing;
					  
					  if (command.equals("on")) {
						  swt.setState(true);
						  
					  } else if (command.equals("off")) {
						  swt.setState(false);
					  }

					  jsonRet.put("return", new Boolean(true));
					  jsonRet.put("state_int", new Integer(swt.retrieveStateInt()));
					  
					  logger.info("Command to set:" );
					  
				  }
				  
			}catch (SiteException e) {
				  e.printStackTrace();
				  jsonRet.put("return", new Boolean(false));
			  } 

			
		} else if (id.equals("idTimeDate")) {
			
			getTimeDateJSON(jsonRet);
			
			jsonRet.put("return", new Boolean(true));
			
		} else if (id.equals("idSiteData")) {
			
			getSiteDataToJSON(jsonRet);
			
			jsonRet.put("return", new Boolean(true));
			
		} else if (id.equals("idFloorArr")) {
			
			try {
				Set <Thing> set = m_siteService.getThingSet(Floor.class);				
												
				jsonRet.put("idFloorArr", new JSONArray (set));
				jsonRet.put("return", new Boolean(true));
				
			//	logger.info("JsonXX: " + jsonRet.toString());
				
			} catch (SiteException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}		
			
		} else if (id.equals("idRoomArr")) {
			
			try {
				Set <Thing> set = m_siteService.getThingSet(Room.class);				
												
				jsonRet.put("idRoomArr", new JSONArray (set));
				jsonRet.put("return", new Boolean(true));
				
			//	logger.info("JsonXX: " + jsonRet.toString());
				
			} catch (SiteException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}					
		} else if (id.equals("idDoorArr")) {
			
			try {
				Set <Thing> set = m_siteService.getThingSet(Door.class);				
												
				jsonRet.put("idDoorArr", new JSONArray (set));
				jsonRet.put("return", new Boolean(true));
				
				//logger.info("JsonXX: " + jsonRet.toString());
				
			} catch (SiteException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}					
		} else if (id.equals("idWindowArr")) {
			
			try {
				Set <Thing> set = m_siteService.getThingSet(Window.class);				
												
				jsonRet.put("idWindowArr", new JSONArray (set));
				jsonRet.put("return", new Boolean(true));
				
				//logger.info("JsonXX: " + jsonRet.toString());
				
			} catch (SiteException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}					
		} else if (id.equals("idSwitchArr")) {
			
			try {
				Set <Thing> set = m_siteService.getThingSet(Switch.class);	
				
				logger.info("Number: " + set.size());
											
				jsonRet.put("idSwitchArr", new JSONArray (set));
				/*
				jsonRet.put("return", new Boolean(true));
				
				logger.info("JsonXX: " + jsonRet.toString());
				*/
				
			} catch (SiteException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}					
		} else if (id.equals("idTempSensArr")) {
			
			try {
				Set <Thing> set = m_siteService.getThingSet(TemperatureSensor.class);	
				
				JSONArray ja = new JSONArray();
						
				for (Thing item: set) {
					
					TemperatureSensor  ts = (TemperatureSensor) item;

					JSONObject obj = new JSONObject();
					
					obj.put("SitePath", ts.getSitePath());
					obj.put("name", ts.getName());
					
					//logger.info("JsonOB: " + jobj.toString());
													
					ja.put(obj);
					logger.info("JsonOB: " + item.getName());
				}
				
				
				jsonRet.put("idTempSensArr", ja);
				jsonRet.put("return", new Boolean(true));
				
				logger.info("JsonXX: " + jsonRet.toString());
				
				/*
				Door d = new Door();
				TemperatureSensor ts = new TemperatureSensor();
				TemperatureSensor  tv = set.
				
				JSONObject jobj = new JSONObject((Thing) set[0]);		
				
				logger.info("TS Number: " + set.size());
											
			//	jsonRet.put("idTempSensArr", new JSONArray (set));
				
				jsonRet.put("return", new Boolean(true));
				
				logger.info("JsonXX: " + jsonRet.toString());
				*/
				
			} catch (SiteException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}					
		}
		
		/*else if (id.equals("idSwitchArr")) {
			
			logger.info("Switch");
			
			try {
				Set <Thing> set = m_siteService.getThingSet(Switch.class);		
				
				JSONArray jarr = new JSONArray (set);
												
			//	jsonRet.put("idSwitchArr", new JSONArray (set));
				jsonRet.put("return", new Boolean(true));
				
				logger.info("JsonXX: " + jsonRet.toString());
				
			} catch (SiteException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}		
			
		}
		*/
		return jsonRet;
		
	}
	
	
	
		

}
