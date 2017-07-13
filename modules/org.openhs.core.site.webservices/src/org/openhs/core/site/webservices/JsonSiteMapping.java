package org.openhs.core.site.webservices;

import java.lang.reflect.InvocationTargetException;
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
import org.openhs.core.commons.Site;
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
	
		public boolean getThingJSON (Thing thing, JSONObject json) {
			
			//These strings must reflect to TypeScript definitions of strings
			final String keyName = "name";
			final String keySitePath = "sitePath";
		//	final String keyImagePath = "imagePath";
			final String keyPosX = "posX";
			final String keyPosY = "posY";
			final String keyPosZ = "posZ";
			final String keyDimX = "dimX";
			final String keyDimY = "dimY";
			final String keyStateInt = "stateInt";
			final String keyTemperature = "temperature";
			final String keyValid = "valid";
			
		//	JSONObject json = new JSONObject();
			
			try {
				if (thing instanceof Site) {
					Site site = (Site) thing;	
					
					json.put(keyName, site.getName());
					//json.put(keySitePath, site.getSitePath());
					json.put(keyValid, new Boolean(true));

				} else if (thing instanceof Floor) {
					Floor floor = (Floor) thing;	
					
					json.put(keyName, floor.getName());
					json.put(keySitePath, floor.getSitePath());
				//	json.put(keyImagePath, floor.getSitePath());
					json.put(keyPosX, floor.x);
					json.put(keyPosY, floor.y);
					json.put(keyPosZ, floor.z);
					json.put(keyDimX, floor.dim_x);
					json.put(keyDimY, floor.dim_y);
					json.put(keyValid, new Boolean(true));

				} else if (thing instanceof Room) {
					Room room = (Room) thing;		
					
					json.put(keyName, room.getName());
					json.put(keySitePath, room.getSitePath());
					json.put(keyPosX, room.x);
					json.put(keyPosY, room.y);
					json.put(keyPosZ, room.z);	
					json.put(keyValid, new Boolean(true));
				  
				} else if (thing instanceof Door) {
					Door door = (Door) thing;
					
					json.put(keyName, door.getName());
					json.put(keySitePath, door.getSitePath());
					json.put(keyPosX, door.x);
					json.put(keyPosY, door.y);
					json.put(keyPosZ, door.z);	
					json.put(keyValid, new Boolean(true));
	  
				} else if (thing instanceof Window) {
					Window window = (Window) thing;
					
					json.put(keyName, window.getName());
					json.put(keySitePath, window.getSitePath());
					json.put(keyPosX, window.x);
					json.put(keyPosY, window.y);
					json.put(keyPosZ, window.z);	
					json.put(keyValid, new Boolean(true));

				} else if (thing instanceof TemperatureSensor) {
										
					TemperatureSensor ts = (TemperatureSensor) thing;
					
					json.put(keyName, ts.getName());
					json.put(keySitePath, ts.getSitePath());
					json.put(keyPosX, ts.x);
					json.put(keyPosY, ts.y);
					json.put(keyPosZ, ts.z);
					json.put(keyTemperature, ts.getTemperature().getCelsius());	
					json.put(keyValid, new Boolean(true));
				  
				} else if (thing instanceof ContactSensor) {
					ContactSensor contact = (ContactSensor) thing;
					
					json.put(keyName, contact.getName());
					json.put(keySitePath, contact.getSitePath());
					json.put(keyPosX, contact.x);
					json.put(keyPosY, contact.y);
					json.put(keyPosZ, contact.z);	
					json.put(keyValid, new Boolean(true));

				} else if (thing instanceof Switch) {
					Switch swt = (Switch) thing;
					
					json.put(keyName, swt.getName());
					json.put(keySitePath, swt.getSitePath());
					json.put(keyPosX, swt.x);
					json.put(keyPosY, swt.y);
					json.put(keyPosZ, swt.z);
					json.put(keyStateInt, swt.getStateInt());
					json.put(keyValid, new Boolean(true));
				  
				} else {
					//  json.put(path + "__validity", new Boolean(false));
				}
			  
			} catch (Exception e) {
				e.printStackTrace();
				//  json.put(path + "__validity", new Boolean(false));
				return false;
			}    	  
  	  
			return true;
	    }  	
		
		public JSONArray getThingArrayJSON (Class<?> t) {
			
			JSONArray jsonArray = new JSONArray();
			Set<Thing> set;
			try {
				set = m_siteService.getThingSet(t);
				
				for (Thing item: set) {
					JSONObject obj = new JSONObject ();
					
					boolean ret = getThingJSON(item, obj);
					
					if (ret) {
						obj.put("validity", new Boolean(true));
						
					} else {
						obj.put("validity", new Boolean(false));
					}
													
					jsonArray.put(obj);
				}
				
			} catch (SiteException e) {
				e.printStackTrace();
				
				return null;
			}						

			return jsonArray;						
		}
	
    public void getTimeDateJSON(JSONObject json) {	    		    	
	    Date curDate = new Date();
	    SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");
	    String time = format.format(curDate); 	 		  
	    
	    SimpleDateFormat format2 = new SimpleDateFormat("MMM dd yyyy");
	    String date = format2.format(curDate); 	  	    	  		    		    	
    	
		//JSONObject json = new JSONObject();	
		
		json.put("time", time);
		json.put("date", date);	
		
		//logger.info("TIME, DATE....>> " + json.toString());
		
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
						  
					  } else if (command.equals("update")){
						  
					  }

					  jsonRet.put("return", new Boolean(true));
					  jsonRet.put("state_int", new Integer(swt.getStateInt()));
					  
					  logger.info("Command to set:" );
					  
				  }
				  
			}catch (SiteException e) {
				  e.printStackTrace();
				  jsonRet.put("return", new Boolean(false));
			  } 

			
		} else if (id.equals("idSetFloors")) {
			
			int n = json.getInt("nmb");
			
			boolean ret = false;
			
			try {
				ret = m_siteService.setNumberThings(n, Floor.class);
			} catch (NoSuchMethodException | SecurityException | ClassNotFoundException | InstantiationException
					| IllegalAccessException | IllegalArgumentException | InvocationTargetException | SiteException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			//String nFloors = json.getString("path");
			
			//getTimeDateJSON(jsonRet);
			
			jsonRet.put("return", new Boolean(true));
			
			logger.info("***WWWWWWWWW:" + n);
			
		} else if (id.equals("idTimeDate")) {
			
			getTimeDateJSON(jsonRet);
			
			jsonRet.put("return", new Boolean(true));
			
		} else if (id.equals("idSiteUpdate")) {
			
			Site site = m_siteService.getSite();
			
			boolean ret = getThingJSON(site, jsonRet);
			
			if (ret) {
				jsonRet.put("validity", new Boolean(true));
				
			} else {
				jsonRet.put("validity", new Boolean(false));
			}									
			
		} else if (id.equals("idFloorArr")) {
			
			JSONArray jsonArr = getThingArrayJSON (Floor.class);
			
			if (jsonArr != null) {
				jsonRet.put("idFloorArr", jsonArr);
				jsonRet.put("return", new Boolean(true));
				
			} else {
				jsonRet.put("return", new Boolean(false));				
			}	
			
			logger.info("JsonXX: " + jsonRet.toString());	
			
		} else if (id.equals("idRoomArr")) {
			
			JSONArray jsonArr = getThingArrayJSON (Room.class);
			
			if (jsonArr != null) {
				jsonRet.put("idRoomArr", jsonArr);
				jsonRet.put("return", new Boolean(true));
				
			} else {
				jsonRet.put("return", new Boolean(false));				
			}	
			
			//logger.info("JsonXX: " + jsonRet.toString());
			
		} else if (id.equals("idDoorArr")) {
			
			JSONArray jsonArr = getThingArrayJSON (Door.class);
			
			if (jsonArr != null) {
				jsonRet.put("idDoorArr", jsonArr);
				jsonRet.put("return", new Boolean(true));
				
			} else {
				jsonRet.put("return", new Boolean(false));				
			}	
			
		} else if (id.equals("idWindowArr")) {
			
			JSONArray jsonArr = getThingArrayJSON (Window.class);
			
			if (jsonArr != null) {
				jsonRet.put("idWindowArr", jsonArr);
				jsonRet.put("return", new Boolean(true));
				
			} else {
				jsonRet.put("return", new Boolean(false));				
			}				
			
		} else if (id.equals("idSwitchArr")) {
			
			JSONArray jsonArr = getThingArrayJSON (Switch.class);
			
			if (jsonArr != null) {
				jsonRet.put("idSwitchArr", jsonArr);
				jsonRet.put("return", new Boolean(true));
				
			} else {
				jsonRet.put("return", new Boolean(false));
				
			}
			
			//logger.info("JsonXX: " + jsonRet.toString());		
			
		} else if (id.equals("idTempSensArr")) {
			
			JSONArray jsonArr = getThingArrayJSON (TemperatureSensor.class);
			
			if (jsonArr != null) {
				jsonRet.put("idTempSensArr", jsonArr);
				jsonRet.put("return", new Boolean(true));
				
			} else {
				jsonRet.put("return", new Boolean(false));
				
			}
			
			//logger.info("JsonXX: " + jsonRet.toString());			
		} else if (id.equals("idContactSensArr")) {
			
			JSONArray jsonArr = getThingArrayJSON (ContactSensor.class);
			
			if (jsonArr != null) {
				jsonRet.put("idContactSensArr", jsonArr);
				jsonRet.put("return", new Boolean(true));
				
			} else {
				jsonRet.put("return", new Boolean(false));
				
			}
				
		}
		
		//logger.info("JsonXX: " + jsonRet.toString());

		return jsonRet;		
	}			
}
