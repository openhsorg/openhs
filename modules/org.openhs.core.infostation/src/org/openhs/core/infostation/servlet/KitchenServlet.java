package org.openhs.core.infostation.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.openhs.core.infostation.Infostation;


public class KitchenServlet extends HttpServlet {

	Infostation	m_infostation = null;
	
	String address = "kitchen";
	String addressHome = "/";
	String addressPrev = "/";
	String addressNext = "/";		
	
	boolean frostOutside = false;
	
	float	tempIn = Float.NaN;
	float	tempOut = Float.NaN;
	float	cloudPerc = Float.NaN;
	float	tempForecast = Float.NaN;
	
	String	imageFcs = "";
	String	time = "";
	String	date = "";
	
	KitchenServlet(Infostation m_infostation) {
		this.m_infostation = m_infostation;		
	}   	

	 @Override
	    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		 	System.out.println("\n\n...GET:");
		 	
		 	String value = request.getParameter("orderId");
		 //	System.out.println("Value:=" + value);
	        
	    	if (value != null) {
	    		System.out.println("Value:=" + value.toString());
	    		
	    		if (value.toString().equals("John")) {
	    				    		
	    			/*
	    			 * Get data from meteo module.
	    			 */
	    			getInfoData();
	    			
	    			response.setContentType("application/json");
	    			response.setCharacterEncoding("UTF-8");
	    		//	response.setHeader("cache-control", "no-cache");
	    	//		response.setHeader("Pragma", "No-cache"); 
	    		//	response.setHeader("Cache-Control", "no-cache"); 
	    	//		response.setDateHeader("Expires", 1);	    			
	    			//response.setHeader("Refresh", "1");  

	    			PrintWriter out = response.getWriter();
		        
	    			//out.println("OKOKOK..... mnam!");
				 
	    			JSONObject json = new JSONObject();
	    			json.put("city", "Mumbai");
	    			json.put("country", "India");				 				 				 
	    			json.put("order", 44);
	    			json.put("tempOut", String.format("%.2f", tempOut));
	    			json.put("tempIn", String.format("%.2f", tempIn));
	    			json.put("cloudPerc", cloudPerc);
	    			json.put("tempForecast", tempForecast);
	    			json.put("imageFcs", imageFcs);
	    			json.put("time", time);
	    			json.put("date", date);
	    			json.put("frostOutside", new Boolean(frostOutside));

	    			
	    		//	System.out.println("tempIn:=" + tempIn);
	    		//	System.out.println("tempOut:=" + tempOut);

	    			//String output = json.toString();	
	    			System.out.println("\nJSON:" + json.toString());
				 
	    			out.println(json.toString());
		    	        
	    			out.flush();
	    			out.close();
	    			
	    		} 
	    		
	    	}
	    	else {
	    		
	    		System.out.println("Value:= null");	    	
		 
	    		response.setContentType("text/html");
		    	response.setCharacterEncoding("UTF-8");
		    	response.setHeader("cache-control", "no-cache");	
    		//	response.setHeader("Pragma", "No-cache"); 
    		//	response.setHeader("Cache-Control", "no-cache"); 
    		//	response.setDateHeader("Expires", 1);		    	

	    		PrintWriter out = response.getWriter();
	        
	    		print_html (out);
	    	        
	    		out.close();	         
	    	}
	    }

	    @Override
	    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        
	    	System.out.println("\n\n...POST");
	        
		 	String value = request.getParameter("orderId");
	        
	    	if (value != null) {
	    		System.out.println("Value:=" + value.toString());
	    		
	    		if (value.toString().equals("next")) {
	    			
	    				    			
	    		}	    		
	    	}
	        
	    //    doGet(request, response);
	        
	    }
	    
	    
	    protected void print_html (PrintWriter out){
	    	
	    	out.println("\n<!DOCTYPE html>");
	    	out.println("<html>");
	    	out.println("<head>");
	    	out.println("<title>Digital meteo</title>");	
	    	//out.println("<meta HTTP-EQUIV='Pragma' content='no-cache'>");
	    	//out.println("<meta HTTP-EQUIV='Expires' content='-1'>");
	    	
	    	out.println("<script src='/infores/servlets/kitchen/jquery-3.1.1.min.js'></script>");
	    	out.println("<link href='/infores/servlets/kitchen/styles.css' rel='stylesheet' type='text/css'>");
	    	    	
	    	out.print("</head>");    		    	
	    	out.println("<body>");

	    	out.println("<canvas id='clockCanvas' class=canvasDigital width='600' height='400' style='margin-top: -200px; margin-left: -300px'>");
	    	out.println("Error: Your browser does not support the HTML canvas element.");
	    	out.println("</canvas>");

	    	out.println("<script src='/infores/servlets/kitchen/KitchenServlet.js'></script>");
	    	
	    	out.println("<script type='text/javascript'>");
	    	out.println("new KitchenInfoStation.Infoscreen(document.getElementById('clockCanvas'), '/org.openhs.core.meteostation');");
	    	out.println("</script>");
	    	
		    out.println("<form name='clock' method='' action='" + addressHome + "'>" +
		    	    "<input type='submit' class='buttonHome' name='next' value=''>" +
		    	    "</form>"); 
		    /*
		    out.println("<form name='clock' method='' action='/" + addressNext + "'>" +
		    	    "<input type='submit' class='buttonNext' name='next' value=''>" +
		    	    "</form>");  
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
