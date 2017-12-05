package org.openhs.core.site.webservices;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
//import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MediaType;

import org.json.JSONObject;
import org.openhs.core.site.api.ISiteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.Path;

//The Java class will be hosted at the URI path "/helloworld"
@Path("/ohs_site_data")
public class SiteWebServiceImpl implements ISiteWebService {
	
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
	private Logger logger = LoggerFactory.getLogger(SiteWebServiceImpl.class);
	
	public ISiteService m_siteService = null;
	
	JsonSiteMapping jsonMap = null;

	// The Java method will process HTTP GET requests
    @GET
    // The Java method will produce content identified by the MIME Media
    @Produces("text/plain")
    public String getMessage(
    		@QueryParam("idGet") String id,
    		@QueryParam("path") String path,
    		@QueryParam("command") String command) {
     
        return "Hello ohs_site_data web service!!!";
    }	      
    
    @POST
 //   @Produces("text/plain")
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })    
    public String postMessage(String id){
    	
    	//logger.info("POST....>> " + id);
    	
    	JSONObject json = new JSONObject(id);	
    	
    	//JSONObject jsonR = jsonMap.command(json);
    	
    	return jsonMap.command(json).toString();    	
    	
    }
	
	public void activate () {
		System.out.println("Component SiteWebServiceImpl activated!");
		
		jsonMap = new JsonSiteMapping (m_siteService);

	}

	public void deactivate() {
		System.out.println("Component SiteWebServiceImpl de-activated!");
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
	
}
