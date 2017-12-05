package org.openhs.core.weather.webservices;

import java.util.ArrayList;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.json.JSONArray;
import org.json.JSONObject;
import org.openhs.core.commons.WeatherData;
import org.openhs.core.weather.OpenhsWeather;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/ohs_weather_data")
public class WeatherWebServiceImpl implements IWeatherWebService {
	
	final String idTimeDate = "idTimeDate";
	final String idSiteData = "idSiteData";
	final String idContactSensArr = "idContactSensArr";
	final String idTempSensArr = "idTempSensArr";
	final String idSwitchArr = "idSwitchArr";
	final String idDoorArr = "idDoorArr";
	final String idWindowArr = "idWindowArr";
	final String idRoomArr = "idRoomArr";
	final String idFloorArr = "idFloorArr";
	final String idThingGet = "idThingGet";
		
	// initialize logger
	private Logger logger = LoggerFactory.getLogger(WeatherWebServiceImpl.class);
	
	public OpenhsWeather m_weather = null;

	// The Java method will process HTTP GET requests
    @GET
    // The Java method will produce content identified by the MIME Media
    @Produces("text/plain")
    public String getMessage(
    		@QueryParam("idGet") String id,
    		@QueryParam("path") String path,
    		@QueryParam("command") String command) {
    	
        WeatherData data = this.m_weather.getCurrentWeatherData();
    	
    	String out = "Hello ohs_weather_data web service!!!";
    	out = out + "\n";
    	out = out + "--- [WeatherData] ---";
    	out = out + data.toString();        	
     
        return out;
    }	      
    
    @POST
 //   @Produces("text/plain")
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })    
    public String postMessage(String id){
    	
    	JSONObject json = new JSONObject(id);	    	    	
    	
    	return command(json).toString();       	
    	
    }
    
    public JSONObject command (JSONObject json) {
    	
		String id = json.getString("idPost");
		
		JSONObject jsonRet = new JSONObject ();
		
		if (id.equals("idGetCurrentWeatherData")) {
			
			WeatherData data = this.m_weather.getCurrentWeatherData();

			boolean ret = getJSONWeatherData (data, jsonRet);
			
			jsonRet.put("return", new Boolean(ret));
			
		} else if (id.equals("idGetForecastWeatherData")) {

			ArrayList<WeatherData> fcs = this.m_weather.getForecastsData();
			
			JSONArray jsonArray = new JSONArray();
			
			for (WeatherData item: fcs) {
				JSONObject obj = new JSONObject ();
				
				boolean ret = getJSONWeatherData(item, obj);
				
				if (ret) {
					obj.put("validity", new Boolean(true));
					
				} else {
					obj.put("validity", new Boolean(false));
				}
												
				jsonArray.put(obj);
			}			
						
			jsonRet.put("idGetForecastWeatherData", jsonArray);
			jsonRet.put("return", new Boolean(true));
		}		
    
		return jsonRet;	
    }
    
	public boolean getJSONWeatherData (WeatherData data, JSONObject json) {
		
		try {
						
			json.put("validity", data.validity);
			json.put("location", data.location);
			json.put("temp", data.temp);
			json.put("tempMin", data.tempMin);
			json.put("tempMax", data.tempMax);
			json.put("hum", data.hum);
			json.put("pressure", data.pressure);
			json.put("cloudsPercent", data.cloudsPercent);
			json.put("windDegree", data.windDegree);
			json.put("windSpeed", data.windSpeed);
			json.put("rain", data.rain);
			json.put("snow", data.snow);
			json.put("weatherSymbol", data.weatherSymbol);
		  
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}    	  
	  
		return true;
    }  
		    
	
	public void activate () {
		System.out.println("Component WeatherWebServiceImpl activated!");

	}

	public void deactivate() {
		System.out.println("Component WeatherWebServiceImpl de-activated!");
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
	
}
