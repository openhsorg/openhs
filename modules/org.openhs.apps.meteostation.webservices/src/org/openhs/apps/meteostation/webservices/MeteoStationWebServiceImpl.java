package org.openhs.apps.meteostation.webservices;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.json.JSONObject;
import org.openhs.apps.meteostation.IMeteoStation;
import org.openhs.core.commons.ContactSensor;
import org.openhs.core.commons.Door;
import org.openhs.core.commons.Floor;
import org.openhs.core.commons.MeteoStationData;
import org.openhs.core.commons.Room;
import org.openhs.core.commons.Site;
import org.openhs.core.commons.Switch;
import org.openhs.core.commons.TemperatureSensor;
import org.openhs.core.commons.Thing;
import org.openhs.core.commons.WifiNode;
import org.openhs.core.commons.Window;
import org.osgi.service.http.HttpService;
import org.osgi.service.http.NamespaceException;
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
	
	HttpService m_httpService = null;
	MeteoStationServlet servlet = null;
		
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
    	
    	JSONObject json = new JSONObject(id);	
    	
    	return command(json).toString();    	
    }
	
	public void activate () {
		System.out.println("Component MeteoStationWebServiceImpl activated!");
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
    
    public void setService(HttpService ser) {
    	logger.info("org.openhs.core.remote.access: Set HttpService");
        m_httpService = ser;
        
		servlet = new MeteoStationServlet ();
		
        try {
        	m_httpService.registerServlet("/meteo", servlet, null, null);  
        	m_httpService.registerResources("/meteores", "/web", null);       
        	m_httpService.registerResources("/meteo_assets", "/web/dist/meteo_assets", null);  
        } catch (ServletException e) {
            // TODO Auto-generated catch block
        	System.out.println("\n\n--->*************************");
            e.printStackTrace();
        } catch (NamespaceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } 		        
    }

    public void unsetService(HttpService ser) {
    	logger.info("org.openhs.core.remote.access: UnSet HttpService");
        if (m_httpService == ser) {
            m_httpService = null;
        }
    }	    
   
    
    public JSONObject command (JSONObject json) {
    	
		String id = json.getString("idPost");
		
		JSONObject jsonRet = new JSONObject ();
		
		if (id.equals("idMeteoData")) {
			
			MeteoStationData data = this.m_meteo.getData();
			
			boolean ret = getMeteoDataJSON (data, jsonRet);
			
			jsonRet.put("return", new Boolean(ret));
			
			logger.info("POST....>> command " + id);
			
		} else if (id.equals("idDateTime")) {
			
		    Date curDate = new Date();
		    SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");
		    String time = format.format(curDate); 	 		  
		    
		    SimpleDateFormat format2 = new SimpleDateFormat("MMM dd yyyy");
		    String date = format2.format(curDate); 	  	    	  		    		    	
			
		    jsonRet.put("time", time);
		    jsonRet.put("date", date);		
		    jsonRet.put("return", new Boolean(true));
		
		}		
    
		return jsonRet;	
    }
    
	public boolean getMeteoDataJSON (MeteoStationData data, JSONObject json) {

		try {
				
			json.put("id", data.id);
			json.put("validity", data.validity);
			json.put("tmpIn", data.tmpIn);
			json.put("tmpOut", data.tmpOut);
		  
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}    	  
	  
		return true;
    }  	    
	
}
