package org.openhs.core.clock.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ClockSimple2Servlet extends HttpServlet {
	
	String address = "org.openhs.core.clock.servlet.ClockSimple2Servlet";
	String addressHome = "/";
	String addressPrev = "/";
	String addressNext = "/";		

	 @Override
	    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {   	
	 
    		response.setContentType("text/html");
	    	response.setCharacterEncoding("UTF-8");
	    	response.setHeader("cache-control", "no-cache");		    	

    		PrintWriter out = response.getWriter();
        
    		print_html (out);
    	        
    		out.close();	         

	    }

	    @Override
	    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        /*
	    	System.out.println("\n\n...POST");
	        
		 	String value = request.getParameter("orderId");
	        
	    	if (value != null) {
	    		System.out.println("Value:=" + value.toString());
	    		
	    		if (value.toString().equals("next")) {
	    			
	    				    			
	    		}	    		
	    	}
	    	
	    	
	    	value = request.getParameter("Kitchen");
	    	
	    	if (value != null) {
	    		System.out.println("Value:=" + value.toString());
	    		
	    		if (value.toString().equals("Kitchen")) {
	    			
	    			  doGet(request, response);			    			
	    		}	    		
	    	}	    	
	        */
	    	doGet(request, response);
	        
	    }
	    
	    
	    protected void print_html (PrintWriter out){
	    	
	    	out.println("\n<!DOCTYPE html>");
	    	out.println("<html>");
	    	out.println("<head>");
	    	out.println("<meta http-equiv='content-type' content='text/html; charset=UTF8'>");

	    //	out.println("<script src='org.openhs.core.clock.servlet.res/jquery-3.1.1.min.js'></script>");
	    	out.println("<link href='org.openhs.core.clock.servlet.res/clocksimple2/styles.css' rel='stylesheet' type='text/css'>");		    	    	
	   // 	out.println("<script src='org.openhs.core.clock.servlet.res/clocksimple2/march.js' type='text/javascript'></script>");
	    	
	    	out.print("</head>");    		    	
	    	out.println("<body>");

	    	out.println("<canvas id='clockCanvas' class=canvasScreen charset='utf-8' width='800' height='600' style='margin-top: -250px; margin-left: -350px'>");		    			    	
	    	out.println("Error: Your browser does not support the HTML canvas element.");
	    	out.println("</canvas>");

	    	out.println("<script id='myScript' src='org.openhs.core.clock.servlet.res/clocksimple2/clock.js' next='" + addressNext +"' charset='utf-8'></script>");
/*		    	
	    	out.println("<script type='text/javascript'>");
	    	out.println("new KitchenInfoStation.Infoscreen(document.getElementById('infoCanvas'), '/org.openhs.core.meteostation');");
	    	out.println("</script>");
	    	*/
	    	
	    	out.println("</body>");
	    	out.println("</html>");    	
	    }  
	    
	    protected void getInfoData() {
	    		    	
	    	 /*
		   	tempOut = m_meteo.getTempOut();
		   	tempIn = m_meteo.getTempIn();	   
		   	
		    //Forecast indicator
		    cloudPerc = m_meteo.getCloudsForecast();
		    tempForecast = m_meteo.getTempForecast();
		    		    		    
		    if (cloudPerc <= 25.0) {
		    	imageFcs = "/ores/web/sunny.png"; 
		    } else if (cloudPerc > 25.0 && cloudPerc <= 75.0) {
		    	imageFcs = "/ores/web/clouds.png";
		    } else {
		    	imageFcs = "/ores/web/rainy.png";
		    }		   
		    
		    //Frost indicator
		    
		    if (tempOut <= 0 || tempIn <= 0.0) {
		    	frostOutside = true;		    
		    } else {
		    	frostOutside = false;
		    }
		    
		    Date curDate = new Date();
		    SimpleDateFormat format = new SimpleDateFormat("HH:mm:ss");
		    time = format.format(curDate); 	 		  
		    
		    SimpleDateFormat format2 = new SimpleDateFormat("EEE MMM dd yyyy");
		    date = format2.format(curDate); 	
		    */
		    
	    	
	    }
}
