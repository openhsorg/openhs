package org.openhs.core.site.webservices;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.Path;
 
// The Java class will be hosted at the URI path "/helloworld"
@Path("/helloworld")
public interface ISiteWebService {
	
    // The Java method will process HTTP GET requests
    @GET
    // The Java method will produce content identified by the MIME Media
    // type "text/plain"
    @Produces("text/plain")
    public String getMessage();	

}
