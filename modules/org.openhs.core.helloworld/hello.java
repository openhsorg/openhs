package org.openhs.core.infostation.servlet;

import javax.ws.rs.GET;
import javax.ws.rs.Produces;
import javax.ws.rs.Path;
 
// The Java class will be hosted at the URI path "/helloworld"
@Path("/helloworld")
public class hello implements helloService {
 
    // The Java method will process HTTP GET requests
    @GET
    // The Java method will produce content identified by the MIME Media
    // type "text/plain"
    @Produces("text/plain")
    public String getMessage() {
        // Return some textual content
        return "Hello World";
    }
}