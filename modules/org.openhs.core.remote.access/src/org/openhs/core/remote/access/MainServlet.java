package org.openhs.core.remote.access;

import java.io.IOException;
import java.util.Date;
import java.util.Set;
import java.util.TreeMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.*;

import org.openhs.core.site.data.ISiteService;
import org.openhs.core.site.data.Room;
import org.openhs.core.site.data.Sensor;
import org.openhs.core.site.services.SiteServiceFactory;


public class MainServlet extends HttpServlet {
	  
	public SiteServiceFactory siteServiceFactory = null;
	private static final long serialVersionUID = 1L;
	  
	int  i = 5;

	  protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
	    throws ServletException, IOException {
	    resp.setContentType("text/html");
	    resp.setHeader("Refresh", "5");
	    
	    i ++;	    
	    
	    PrintWriter out = resp.getWriter();
	  	    
		// Write the response message, in an HTML page
		try {
			  
		 out.println("<!DOCTYPE html>");
		 out.println("<html lang='en'>");
		 out.println("<head>");
		 out.println("<meta charset='utf-8'/>");
		 out.println("<link href='css/some-stylesheet.css' rel='stylesheet'/>");
		 out.println("<body>");	         
		         
		 getHouseData (out);
		   
		 out.println("</body>");
		 out.println("</html>");
		 
		  } finally {
		     out.close();  // Always close the output writer	
		  }
	  }
	  
	  protected void getHouseData (PrintWriter out){
				  
  		out.println("<font color=green>");		  		
  		out.println("<h1>OpenHS world...\n</h1>");
  		out.println("<font color=green>");
  		out.println("<p style='font-family:Courier; color:#0020C2; font-size: 20px;'>");
  		out.println("Date: " + new Date().toString() + "     Refresh:" + i);
  		out.println("</p>");
  						  		  		
  		out.println("<font color=black>");
  		out.println("<br/>---------- OpenHS Core Data ---------");
  		out.println("<br/>");
		
		ISiteService service = siteServiceFactory.getInstance();				
		
		out.println("<br/>Site ID is: " + service.getId());						
		out.println("<br/>Number rooms is: " + service.getNumberRooms());
		
		TreeMap<String, Room> rooms = service.getRooms();			
	
        Set<String> keys = rooms.keySet();
        
        for(String key: keys)
        {     
        	out.println(" ");
        	out.println("<br/><br/> -" + key + "(Num Sensors:" + service.getNumberSensors(key) + ")");
        	
        	TreeMap<String, Sensor> sensors = service.getSensors(key);
        	
        	Set<String> keysSensors = sensors.keySet();
        	
        	for (String keyS : keysSensors)
        	{
        		out.println("<br><tr/>  -" + keyS + " Temperature: " + service.getSensorTemperature(key, keyS) + " C");
        	}        	        	        	
        }			
				
	  }	 	  
	  
	  /*
	  protected void getHouseData (HttpServletResponse resp)
		throws ServletException, IOException{
		  
		resp.getWriter().println("<h1>Hello Servlet</h1>");
		resp.getWriter().write("\n\n---------- OpenHS Core Data ---------");
		
		ISiteService service = siteServiceFactory.getInstance();				
		
		resp.getWriter().write("\nSite ID is: " + service.getId());						
		resp.getWriter().write("\nNumber rooms is: " + service.getNumberRooms());
		
		TreeMap<String, Room> rooms = service.getRooms();			
	
        Set<String> keys = rooms.keySet();
        
        for(String key: keys)
        {                	
        	resp.getWriter().write("\n\n-" + key + "(Num Sensors:" + service.getNumberSensors(key) + ")");
        	
        	TreeMap<String, Sensor> sensors = service.getSensors(key);
        	
        	Set<String> keysSensors = sensors.keySet();
        	
        	for (String keyS : keysSensors)
        	{
        		resp.getWriter().write("\n -" + keyS + " Temperature: " + service.getSensorTemperature(key, keyS) + " C");
        	}        	        	        	
        }			
				
	  }	  
	  */
	  
	}
