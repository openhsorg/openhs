package org.openhs.core.weather.webservices;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.json.JSONObject;
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
     
        return "Hello ohs_weather_data web service!!!";
    }	      
    
    @POST
 //   @Produces("text/plain")
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })    
    public String postMessage(String id){
    	
    	//logger.info("POST....>> " + id);
    	
    	JSONObject json = new JSONObject(id);	
    	
    	//JSONObject jsonR = jsonMap.command(json);
    	
    	return json.toString(); //jsonMap.command(json).toString();    	
    	
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
