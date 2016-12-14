package org.openhs.core.infostation.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.openhs.core.commons.Weather;
import org.openhs.core.infostation.Infostation;
import org.openhs.core.meteostation.Meteostation;


public class KitchenServlet extends HttpServlet {

	Infostation	m_infostation = null;
	Meteostation m_meteo = null;	
	
	String address = "kitchen";
	String addressHome = "/";
	String addressPrev = "/";
	String addressNext = "/";		

	KitchenServlet(Infostation m_infostation) {
		this.m_infostation = m_infostation;		
		this.m_meteo = m_infostation.getMeteostation();
	}   	

	 @Override
	    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		 	System.out.println("\n\n...GET:");
		 	
		 	String value = request.getParameter("orderId");
		 //	System.out.println("Value:=" + value);
	        
	    	if (value != null) {
	    		System.out.println("Value:=" + value.toString());
	    		
	    		if (value.toString().equals("InfoData")) {	    		
	    			/*
	    			 * Get data from meteo module.
	    			 */
	    			JSONObject json = getDataToJSON();

	    			//System.out.println("\nJSON:" + json.toString());
	    			
	    			response.setContentType("application/json");
	    			response.setCharacterEncoding("UTF-8");

	    			PrintWriter out = response.getWriter();	    			
				 
	    			out.println(json.toString());
		    	        
	    			out.flush();
	    			out.close();
	    			
	    		} else if (value.toString().equals("Day0")) {			    		
	    			/*
	    			 * Get data from meteo module.
	    			 */
	    			JSONObject json = getDataToJSON_Day(0);

	    			//System.out.println("\nJSON:" + json.toString());
	    			
	    			response.setContentType("application/json");
	    			response.setCharacterEncoding("UTF-8");

	    			PrintWriter out = response.getWriter();	    			
				 
	    			out.println(json.toString());
		    	        
	    			out.flush();
	    			out.close();		    			
	    			
	    		} else if (value.toString().equals("Day1")) {			    		
	    			/*
	    			 * Get data from meteo module.
	    			 */
	    			JSONObject json = getDataToJSON_Day(1);

	    			//System.out.println("\nJSON:" + json.toString());
	    			
	    			response.setContentType("application/json");
	    			response.setCharacterEncoding("UTF-8");

	    			PrintWriter out = response.getWriter();	    			
				 
	    			out.println(json.toString());
		    	        
	    			out.flush();
	    			out.close();	    		
	    			
	    		} else if (value.toString().equals("Day2")) {		    		
	    			/*
	    			 * Get data from meteo module.
	    			 */
	    			JSONObject json = getDataToJSON_Day(2);

	    			//System.out.println("\nJSON:" + json.toString());
	    			
	    			response.setContentType("application/json");
	    			response.setCharacterEncoding("UTF-8");

	    			PrintWriter out = response.getWriter();	    			
				 
	    			out.println(json.toString());
		    	        
	    			out.flush();
	    			out.close();	  
	    			
	    		} else if (value.toString().equals("Day3")) {		    		
	    			/*
	    			 * Get data from meteo module.
	    			 */
	    			JSONObject json = getDataToJSON_Day(3);

	    			//System.out.println("\nJSON:" + json.toString());
	    			
	    			response.setContentType("application/json");
	    			response.setCharacterEncoding("UTF-8");

	    			PrintWriter out = response.getWriter();	    			
				 
	    			out.println(json.toString());
		    	        
	    			out.flush();
	    			out.close();	    			
		    	} 	 	    		
	    	}
	    	else {
	    		
	    		//System.out.println("Value:= null");	    	
		 
	    		response.setContentType("text/html");
		    	response.setCharacterEncoding("UTF-8");
		    	response.setHeader("cache-control", "no-cache");		    	

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
	    	
	    	
	    	value = request.getParameter("Kitchen");
	    	
	    	if (value != null) {
	    		System.out.println("Value:=" + value.toString());
	    		
	    		if (value.toString().equals("Kitchen")) {
	    			
	    			  doGet(request, response);			    			
	    		}	    		
	    	}	    	 
	    }
	    
	    
	    protected void print_html (PrintWriter out){
	    	
	    	out.println("\n<!DOCTYPE html>");
	    	out.println("<html>");
	    	out.println("<head>");
	    	out.println("<meta http-equiv='content-type' content='text/html; charset=UTF8'>");

	    	out.println("<script src='infores/servlets/kitchen/jquery-3.1.1.min.js'></script>");
	    	out.println("<link href='infores/servlets/kitchen/styles.css' rel='stylesheet' type='text/css'>");
	    	    	
	    	out.print("</head>");    		    	
	    	out.println("<body>");

	    	out.println("<canvas id='infoCanvas' class=canvasScreen charset='utf-8' width='600' height='400' style='margin-top: -200px; margin-left: -300px'>");
	    	out.println("Error: Your browser does not support the HTML canvas element.");
	    	out.println("</canvas>");

	    	out.println("<script src='infores/servlets/kitchen/KitchenServlet.js' charset='utf-8'></script>");
	    	
	    	out.println("<script type='text/javascript'>");
	    	out.println("new KitchenInfoStation.BasicScreen(document.getElementById('infoCanvas'));");
	    	out.println("</script>");
	    	
	    	out.println("</body>");
	    	out.println("</html>");    	
	    }  
	   
	    protected JSONObject getDataToJSON() {
	    	
	    	Weather wth = m_meteo.getForecastWeather6();
	    	
		    Date curDate = new Date();
		    SimpleDateFormat format = new SimpleDateFormat("HH:mm");
		    String time = format.format(curDate); 	 		  
		    
		    SimpleDateFormat format2 = new SimpleDateFormat("EEE MMM dd yyyy");
		    String date = format2.format(curDate); 	  		    
		    		    
			JSONObject json = new JSONObject();
			json.put("city", "Mumbai");
			json.put("country", "India");				 				 				 
			json.put("order", 44);
			json.put("tempOut", String.format("%.2f", m_meteo.getTempOut()));
			json.put("tempIn", String.format("%.2f", m_meteo.getTempIn()));
			json.put("cloudPerc", m_meteo.getCloudsForecast());
			json.put("tempForecast", m_meteo.getTempForecast());
			json.put("time", time);
			json.put("date", date);
			json.put("frostOutside", new Boolean(m_meteo.isFrost()));
			json.put("weatherSymbol", String.format("%d", wth.getWeatherSymbol()));
			json.put("windSpeed", String.format("%.2f", wth.getWindSpeed()));
			
			//System.out.println("\nCLOUD: " + wth.getWeatherSymbol() + " cloudPerc: " + m_meteo.getCloudsForecast());
			
			return json;

	    }
	    
	    protected JSONObject getDataToJSON_Day(int nDay) {
	    		    	
	    	ArrayList<Weather> forecasts = m_meteo.getForecasts();
	    	
	    	if (nDay < 0 || nDay > 4) { 
	    		nDay = 4;
	    	}
	    	
	    	int n = nDay * 8;
	    	
	    	if (forecasts.size() < n) {
	    		return null;
	    	}
	    	
	    	Weather wth = forecasts.get(n);
	    	
	    	JSONObject json = getWeatherToJSON(wth);
	    		    	
			return json;
	    }	
	    
	    protected JSONObject getWeatherToJSON(Weather wth) {
	    	
			JSONObject json = new JSONObject();
			json.put("temp", String.format("%.2f", wth.getTemperature().getCelsius()));
			json.put("cloudPerc", wth.getPercentageOfClouds());
			json.put("weatherSymbol", String.format("%d", wth.getWeatherSymbol()));
			json.put("windSpeed", String.format("%.2f", wth.getWindSpeed()));
						
			return json;
	    }
}
