package org.openhs.comm.wifiadmin.webservices;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;
import org.openhs.comm.wifiadmin.WifiAdmin;
import org.openhs.comm.wifiadmin.WifiNode;

public class JsonWifiAdminMapping {
	
	// initialize logger
	private Logger logger = LoggerFactory.getLogger(JsonWifiAdminMapping.class);	
	
	public WifiAdmin m_wifiAdmin = null;
	
	JsonWifiAdminMapping (WifiAdmin ser) {
		m_wifiAdmin = ser;
	}	
	
	public JSONObject command (JSONObject json) {
		
		String id = json.getString("idPost");
		
		JSONObject jsonRet = new JSONObject ();		
		
		if (id.equals("idThingCommand")) {
			
			JSONArray jsonArr = getThingArrayJSON ();
			
			if (jsonArr != null) {
				jsonRet.put("idFloorArr", jsonArr);
				jsonRet.put("return", new Boolean(true));
				
			} else {
				jsonRet.put("return", new Boolean(false));				
			}	
			
			logger.info("JsonXX: " + jsonRet.toString());				
			
			
			jsonRet.put("return", new Boolean(true));
		}
			
		return jsonRet;	
	}
	
	public JSONArray getThingArrayJSON () {
		
		JSONArray jsonArray = new JSONArray();
		/*
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
*/
		return jsonArray;						
	}	

	public boolean getThingJSON (WifiNode node, JSONObject json) {
		
		//These strings must reflect to TypeScript definitions of strings
		final String keyName = "name";
		final String keySitePath = "sitePath";
		final String keyDevicePath = "devicePath";
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
			
/*
			json.put(keyName, floor.getName());
			json.put(keySitePath, floor.getSitePath());
			json.put(keyDevicePath, m_siteService.getDevicePath(floor.getSitePath()));
		//	json.put(keyImagePath, floor.getSitePath());
			json.put(keyPosX, floor.x);
			json.put(keyPosY, floor.y);
			json.put(keyPosZ, floor.z);
			json.put(keyDimX, floor.dim_x);
			json.put(keyDimY, floor.dim_y);
			json.put(keyValid, new Boolean(true));
*/
		  
		} catch (Exception e) {
			e.printStackTrace();
			//  json.put(path + "__validity", new Boolean(false));
			return false;
		}    	  
	  
		return true;
    }  		
	
}
