package org.openhs.core.remote.access;

import java.io.IOException;
import java.util.Date;
import java.util.Set;
import java.util.TreeMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
	    resp.setContentType("text/plain");
	    resp.setHeader("Refresh", "3");
	    resp.getWriter().write("Hello OpenHS World !!!\n");
	    i ++;	    
	    resp.getWriter().write("\nDate: " + new Date().toString() + "     Refresh:" + i);
	    
	    getHouseData (resp);
	    
	    /*
	    resp.getWriter().write("\n\n---------- OpenHS Core Data ---------");
	    resp.getWriter().write("\nSite ID is: " + siteServiceFactory.getInstance().getId());	    	  
	    resp.getWriter().write("\nNumber rooms is: " + siteServiceFactory.getInstance().getNumberRooms());
	    */

	  }
	  
	  protected void getHouseData (HttpServletResponse resp)
		throws ServletException, IOException{
		  
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
	  
	}