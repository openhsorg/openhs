package org.openhs.apps.infostation.webservices;

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
import org.openhs.apps.infostation.Infostation;
import org.openhs.core.commons.InfoStationData;
import org.osgi.service.http.HttpService;
import org.osgi.service.http.NamespaceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/ohsinfo")
public class InfostationWebService implements IInfoStationWebService {
	
	private Logger logger = LoggerFactory.getLogger(InfostationWebService.class);
	
	public Infostation m_infostation = null;   
	HttpService m_httpService = null;
	InfoStationServlet servlet = null;
	
	
	// The Java method will process HTTP GET requests
    @GET
    // The Java method will produce content identified by the MIME Media
    @Produces("text/plain")
    public String getMessage(
    		@QueryParam("idGet") String id,
    		@QueryParam("path") String path,
    		@QueryParam("command") String command) {
    	
        InfoStationData data = this.m_infostation.getData();
    	
    	String out = "Hello ohsinfo web service!!!";
    	out = out + "\n";
    	out = out + "--- Info Data [InfoStationData] ---";
    	out = out + data.toString();    	
     
        return out;
    }	      
    
    // This method is called if XML is request
    /*
    @GET
    @Path("/bla")
    @Produces(MediaType.TEXT_XML)
    public String sayXMLHello() {
      return "<?xml version=\"1.0\"?>" + "<hello> Hello Jersey" + "</hello>";
    } 
    */
     
    @POST
 //   @Produces("text/plain")
    @Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Produces({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })    
    public String postMessage(String id){
    	
    	//logger.info("+++++POST....>> " + id);
    	
    	JSONObject json = new JSONObject(id);	
    	
    	//JSONObject jsonR = jsonMap.command(json);
    	
    	return command(json).toString();    	
    	
    }	
    
    public JSONObject command (JSONObject json) {
    	
		String id = json.getString("idPost");
		
		JSONObject jsonRet = new JSONObject ();
	//	jsonRet.put("return", new Boolean(false));
		
	//	logger.info("POST2....>> " + json.toString());
		
		if (id.equals("idInfoStationData")) {
			
			//logger.info("POST....1***>> command " + id);
			
			InfoStationData data = this.m_infostation.getData();
			
			boolean ret = getInfoDataJSON (data, jsonRet);
			
			jsonRet.put("return", new Boolean(ret));
			
			//logger.info("POST....***>> command " + id);
			
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
    
	public boolean getInfoDataJSON (InfoStationData data, JSONObject json) {
		
	//	JSONObject json = new JSONObject();
		
		try {
						
			json.put("validity", data.validity);
			json.put("tmpInPath", data.tmpInPath);
			json.put("tmpOutPath", data.tmpOutPath);
			
			//logger.info("POST....***>> command: " + data.tmpOutPath);
		  
		} catch (Exception e) {
			e.printStackTrace();
			//  json.put(path + "__validity", new Boolean(false));
			return false;
		}    	  
	  
		return true;
    }     
    
	
	public void activate () {
		
	}
	
	public void deactivate () {
		
	}
	
    public void setService(Infostation ser) {
    	  logger.info("**** setService(): ISiteService");
    	  m_infostation = ser;

          //logger.info("IDDDDDDDDDDDD: " + this.m_siteService.getId());
          
      }

      public void unsetService(Infostation ser) {
    	  logger.info("**** unsetService(): ISiteService");
          if (m_infostation == ser) {
              ser = null;
          }
      }  
      
      
      public void setService(HttpService ser) {
      	logger.info("org.openhs.core.remote.access: Set HttpService");
          m_httpService = ser;
          
  		servlet = new InfoStationServlet ();
  		
          try {
          	m_httpService.registerServlet("/ohsinfo", servlet, null, null);  
          	m_httpService.registerResources("/ohsinfo_res", "/web", null);       
          	m_httpService.registerResources("/ohsinfo_assets", "/web/dist/ohsinfo_assets", null);  
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
           
}
