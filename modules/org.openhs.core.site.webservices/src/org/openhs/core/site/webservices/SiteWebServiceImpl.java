package org.openhs.core.site.webservices;

import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Produces;

import org.openhs.core.site.api.ISiteService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.Path;

//The Java class will be hosted at the URI path "/helloworld"
@Path("/helloworld")
public class SiteWebServiceImpl implements ISiteWebService {
	
	// initialize logger
	private Logger logger = LoggerFactory.getLogger(SiteWebServiceImpl.class);
	
	public ISiteService m_siteService = null;  

	// The Java method will process HTTP GET requests
    @GET
    // The Java method will produce content identified by the MIME Media
    // type "text/plain"
    @Produces("text/plain")
    public String getMessage() {
        // Return some textual content
        return "Hello World";
    }	
	
	public void activate () {
		System.out.println("Component SiteWebServiceImpl activated!");
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
