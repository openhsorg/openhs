package org.openhs.core.site.webservices;


import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
//import javax.ws.rs.core.MediaType;
import javax.ws.rs.Path;
 
// The Java class will be hosted at the URI path "/helloworld"
@Path("/ohs_site_data")
public interface ISiteWebService {
	
    // The Java method will process HTTP GET requests
    @GET
    // The Java method will produce content identified by the MIME Media
    // type "text/plain"
    @Produces("text/plain")
    public String getMessage(
    		@QueryParam("idGet") String id);	
    
    @POST
    //
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })  
    public void postMessage(String id);

}
