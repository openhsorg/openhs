package org.openhs.core.site.webservices;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;

import org.json.JSONObject;
import org.openhs.core.commons.ContactSensor;
import org.openhs.core.commons.Door;
import org.openhs.core.commons.Floor;
import org.openhs.core.commons.Room;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Switch;
import org.openhs.core.commons.TemperatureSensor;
import org.openhs.core.commons.Window;
import org.openhs.core.site.api.ISiteService;

public class JsonSiteMapping {
	
	public ISiteService m_siteService = null;
	
	JsonSiteMapping (ISiteService ser) {
		m_siteService = ser;
	}
	
	protected JSONObject getSiteDataToJSON() {	   
		
		
	    	
		Date curDate = new Date();
	    SimpleDateFormat format = new SimpleDateFormat("HH:mm");
	    String time = format.format(curDate); 	 		  
	    
	    SimpleDateFormat format2 = new SimpleDateFormat("MMM dd yyyy");
	    String date = format2.format(curDate); 	  	    	  		    		    	
		
		JSONObject json = new JSONObject();	
		
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
		
				
		
		return json;
	}	

}
