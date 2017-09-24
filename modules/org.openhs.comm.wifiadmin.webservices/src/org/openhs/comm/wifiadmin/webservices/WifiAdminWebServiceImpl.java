package org.openhs.comm.wifiadmin.webservices;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.json.JSONObject;
import org.openhs.comm.wifiadmin.WifiAdmin;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/ohs_wifiadmin_ws")
public class WifiAdminWebServiceImpl {
	// initialize logger
	private Logger logger = LoggerFactory.getLogger(WifiAdminWebServiceImpl.class);
	
	public WifiAdmin m_wifiAdmin = null;	
	
	JsonWifiAdminMapping jsonMap = null;

	// The Java method will process HTTP GET requests
    @GET
    // The Java method will produce content identified by the MIME Media
    @Produces("text/plain")
    public String getMessage(
    		@QueryParam("idGet") String id,
    		@QueryParam("path") String path,
    		@QueryParam("command") String command) {
     
        return "Hello ohs_wifiadmin_ws web service!!!";
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
		//System.out.println("Component SiteWebServiceImpl activated!");
		
		jsonMap = new JsonWifiAdminMapping (m_wifiAdmin);
	}

	public void deactivate() {
		//System.out.println("Component SiteWebServiceImpl de-activated!");
	}
	
    public void setService(WifiAdmin ser) {
  	 //logger.info("**** setService(): m_wifiAdmin");    	
  	  	m_wifiAdmin = ser;
    }

    public void unsetService(WifiAdmin ser) {
  	  //logger.info("**** unsetService(): m_wifiAdmin");
        if (m_wifiAdmin == ser) {
            ser = null;
        }
    }   
}
