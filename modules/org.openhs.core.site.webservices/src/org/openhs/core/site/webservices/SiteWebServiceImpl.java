package org.openhs.core.site.webservices;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Set;

import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;

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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.Path;

//The Java class will be hosted at the URI path "/helloworld"
@Path("/ohs_site_data")
public class SiteWebServiceImpl implements ISiteWebService {
	
	final String idTimeDate = "idTimeDate";
	final String idSiteData = "idSiteData";
	final String idContactSensArr = "idContactSensArr";
		
	// initialize logger
	private Logger logger = LoggerFactory.getLogger(SiteWebServiceImpl.class);
	
	public ISiteService m_siteService = null;
	
	JsonSiteMapping jsonMap = null;

	// The Java method will process HTTP GET requests
    @GET
    // The Java method will produce content identified by the MIME Media
    // type "text/plain"
    @Produces("text/plain")
    public String getMessage(
    		@QueryParam("idGet") String id) {
        // Return some textual content
    	
    	logger.info("....>> " + id);
    	
    	if (id != null) {
    		if (id.equals(idTimeDate)) {
        		return m_siteService.getTimeDateJSON().toString();
        		
        	} else if (id.equals(idSiteData)) {
        		return jsonMap.getSiteDataToJSON().toString();
        		
        	} else if (id.equals(idContactSensArr)){
        		return m_siteService.getThingArrayJSON(ContactSensor.class).toString();
        	}
    	}
    	
        return "Hello ohs_site_data web service!!!";
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
