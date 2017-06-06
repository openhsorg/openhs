package org.openhs.core.heloworld;

import java.util.Map;

import javax.ws.rs.GET;
import javax.ws.rs.Produces;

import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.Path;
 
// The Java class will be hosted at the URI path "/helloworld"
@Path("/helloworld")
public class hello implements helloService {
 
	private Logger logger = LoggerFactory.getLogger(hello.class);

	// The Java method will process HTTP GET requests
    @GET
    // The Java method will produce content identified by the MIME Media
    // type "text/plain"
    @Produces("text/plain")
    public String getMessage() {
        // Return some textual content
        return "Hello World";
    }

    public void activate(ComponentContext componentContext, Map<String, Object> properties) {
		logger.info("**** activate()");
		System.out.println("org.openhs.core.hello: activate"); 	      	       	
		//updated(properties);
		//m_myThd = new Thread(this);
		//m_myThd.start();
	}
}