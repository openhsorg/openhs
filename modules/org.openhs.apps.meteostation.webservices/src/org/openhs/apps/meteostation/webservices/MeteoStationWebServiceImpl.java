package org.openhs.apps.meteostation.webservices;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.json.JSONObject;
import org.openhs.apps.meteostation.IMeteoStation;
import org.openhs.core.commons.MeteoStationData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/ohs_meteo")
public class MeteoStationWebServiceImpl {

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
	
	IMeteoStation m_meteo = null;
		
	// initialize logger
	private Logger logger = LoggerFactory.getLogger(MeteoStationWebServiceImpl.class);
	
	// The Java method will process HTTP GET requests
    @GET
    // The Java method will produce content identified by the MIME Media
    @Produces("text/plain")
    public String getMessage(
    		@QueryParam("idGet") String id,
    		@QueryParam("path") String path,
    		@QueryParam("command") String command) {
    	
    	MeteoStationData data = this.m_meteo.getData();
    	
    	String out = "Hello ohs_meteo web service!!!";
    	out = out + "\n";
    	out = out + "--- Meteo Data [MeteoStationData] ---";
    	out = out + data.toString();    	
     
        return out;
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
		System.out.println("Component MeteoStationWebServiceImpl activated!");
		
		logger.info("KKKKKKKKKKKKKKKKK");

	}

	public void deactivate() {
		System.out.println("Component MeteoStationWebServiceImpl de-activated!");
	}
	
    public void setService(IMeteoStation ser) {
  	  logger.info("**** setService(): IMeteoStation");
  	  m_meteo = ser;
    }

    public void unsetService(IMeteoStation ser) {
  	  logger.info("**** unsetService(): IMeteoStation");
        if (m_meteo == ser) {
            ser = null;
        }
    }   	
	
}
