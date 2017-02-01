package org.openhs.core.infostation.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Weather;
import org.openhs.core.commons.api.IInfostation;

public class KitchenServlet extends HttpServlet {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	IInfostation	m_infostation = null;
	
	String address = "kitchen";
	String addressHome = "/";
	String addressPrev = "/";
	String addressNext = "/";		

	KitchenServlet(IInfostation m_infostation) {
		this.m_infostation = m_infostation;		
	}   	

	 @Override
	    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		 	//System.out.println("\n\n...GET:");
		 	
		 	String value = request.getParameter("orderId");
	        
	    	if (value != null) {
	    		//System.out.println("Value:=" + value.toString());
	    		
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
	    			
	    		} else if (value.toString().equals("SiteData")) {	    		
	    			/*
	    			 * Get site data.
	    			 */
	    			JSONObject json = getSiteDataToJSON();
	    			
	    			response.setContentType("application/json");
	    			response.setCharacterEncoding("UTF-8");

	    			PrintWriter out = response.getWriter();	    			
				 
	    			out.println(json.toString());
		    	        
	    			out.flush();
	    			out.close();
	    			
	    		} else if (value.toString().contains("WeatherForecast_")) {	
	    			
	    			// Divide
	    			String delim = "[_]+";
	    			String[] parts = value.toString().split(delim);

	    			// Check for empty parts...
	    			for (String str : parts) {
	    				if (str.equals("")) {
	    				}
	    			}	    	
	    				    				    			
	    			int numForecast = Integer.parseInt(parts[1]);
	    			
	    		    //System.out.println("\n\n ***Forecast: " + numForecast);
	    			
	    			/*
	    			 * Get data from meteo module.
	    			 */
	    			JSONObject json = getDataToJSON_Forecast(numForecast);

	    			//System.out.println("\nJSON:" + json.toString());
	    			
	    			response.setContentType("application/json");
	    			response.setCharacterEncoding("UTF-8");

	    			PrintWriter out = response.getWriter();	    			
				 
	    			out.println(json.toString());
		    	        
	    			out.flush();
	    			out.close();		    			
	    			
	    		} else if (value.toString().equals("floor1")) {		    		
	    			/*
	    			 * Get data from meteo module.
	    			 */
	    			JSONObject json = getDataToJSON_Data();

	    			//System.out.println("\n\nJSON:" + json.toString());
	    			
	    			response.setContentType("application/json");
	    			response.setCharacterEncoding("UTF-8");

	    			PrintWriter out = response.getWriter();	    			
				 
	    			out.println(json.toString());
		    	        
	    			out.flush();
	    			out.close();	    			
	    		} else if (value.toString().equals("switch1")) {		    		
	    			/*
	    			 * Get data from core module.
	    			 */
	    				    				    			
	    			int stateInt = 0; // 0- unknown, 1- off, 2- requested on,  3- device on, 4- requested off 
	    			
	    			try {
	    				List<Boolean> list = m_infostation.getSwitchState("floors/Floor1/rooms/Room0/sensors/Kitchen_light");
	    				
	    				boolean state = list.get(0);
	    				boolean stateDevice = list.get(1);
	    				
	    				if (stateDevice) { //device on
	    					if (state) {
	    						stateInt = 3; //request is on
	    					} else {
	    						stateInt = 4; //request is off
	    					}
	    				} else { //device off
	    					if (state) { //request is on
	    						stateInt = 2;
	    					} else { // request is off
	    						stateInt = 1;
	    					}	    					
	    				}	    					    				
	    			} catch (Exception ex) {
	    				
	    			}
	    			
	    			//System.out.println("\n\n    switch  JSON:" + stateInt);
	    			
	    			JSONObject json = new JSONObject();
	    			json.put("switchState", new Integer(stateInt));
	    				    			
	    			response.setContentType("application/json");
	    			response.setCharacterEncoding("UTF-8");

	    			PrintWriter out = response.getWriter();	    			
				 
	    			out.println(json.toString());
		    	        
	    			out.flush();
	    			out.close();	    			
		    	}		 	    		
	    	} else {
	    		
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
	        
	    	//System.out.println("\n\n...POST");
	        
		 	String value = request.getParameter("postId");	       
		 	//System.out.println("\n\n****POST value:=" + value);
		// 	response.addHeader("Cache-Control","no-cache,no-store");
		 	
		 	if (value != null) {
		 		
		 		if(value.toString().equals("switchClicked")) {
		 			
		 			String swtch = request.getParameter("dataId");
		 			
		 			if (swtch != null) {
		 				//System.out.println("Clicked switch: " + swtch.toString());
		 				m_infostation.setSwitch("floors/Floor1/rooms/Room0/sensors/Kitchen_light");
		 				
		 			}
		 			
		 		}
		 		
		 		/*
		 		JSONObject json = new JSONObject(value);
		 		
		 		String foo = json.get("ahoj").toString();
		 		
		 		System.out.println("POST value:=" + foo);
		 		*/
		 	}
		 	
		 	/*
	    	if (value != null) {
	    		System.out.println("Value:=" + value.toString());
	    		
	    		if (value.toString().equals("next")) {
	    				    				    			
	    		}	    		
	    	}
	    	*/
	    	
	    	value = request.getParameter("Kitchen");
	    	
	    	if (value != null) {
	    		//System.out.println("Value:=" + value.toString());
	    		
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
	    	
	    	out.println("<script src='infores/servlets/kitchen/OhsSiteData.js' charset='utf-8'></script>");
	    	out.println("<script src='infores/servlets/kitchen/OhsWeatherData.js' charset='utf-8'></script>");
	    	out.println("<script src='infores/servlets/kitchen/OhsCanvasGraphics.js' charset='utf-8'></script>");
	    	out.println("<script src='infores/servlets/kitchen/KitchenServlet.js' charset='utf-8'></script>");
	    	
	    	out.println("<script type='text/javascript'>");
	    	out.println("new KitchenInfoStation.BasicScreen(document.getElementById('infoCanvas'));");
	    	out.println("</script>");
	    	
	    	out.println("</body>");
	    	out.println("</html>");    	
	    }  
	   
	    protected JSONObject getDataToJSON() {
	    	
	    	Weather wth = m_infostation.getForecastWeather6();
	    	
		    Date curDate = new Date();
		    SimpleDateFormat format = new SimpleDateFormat("HH:mm");
		    String time = format.format(curDate); 	 		  
		    
		    SimpleDateFormat format2 = new SimpleDateFormat("EEE MMM dd yyyy");
		    String date = format2.format(curDate); 	  		    
		    		    
			JSONObject json = new JSONObject();
			json.put("city", "Mumbai");
			json.put("country", "India");				 				 				 
			json.put("order", 44);
			json.put("tempOut", String.format("%.2f", m_infostation.getTempOut()));
			json.put("tempIn", String.format("%.2f", m_infostation.getTempIn()));
			json.put("cloudPerc", m_infostation.getCloudsForecast());
			json.put("tempForecast", m_infostation.getTempForecast());
			json.put("time", time);
			json.put("date", date);
			json.put("frostOutside", new Boolean(m_infostation.isFrost()));
			json.put("weatherSymbol", String.format("%d", wth.getWeatherSymbol()));
			json.put("windSpeed", String.format("%.2f", wth.getWindSpeed()));
		//	json.put("number_floors", String.format("%d", m_infostation.getNumberFloors()));
			
			//System.out.println("\nCLOUD: " + wth.getWeatherSymbol() + " cloudPerc: " + m_meteo.getCloudsForecast());
			
			return json;
	    }
	    
	    protected JSONObject getSiteDataToJSON() {
	    	  		    		    	
			JSONObject json = new JSONObject();			
			
			// Floors
			try {
				Set<String> floorPaths = this.m_infostation.getFloorsPaths ();						
				json.put("number_floors", String.format("%d", floorPaths.size()));
				
				int i = 0;
				for (String item: floorPaths) {
					i ++;
					String id = "floorPath_" + i;					
					json.put(id, item);
				}
				
			} catch (SiteException e) {
				json.put("number_floors", String.format("0"));								
				e.printStackTrace();
			}	
			
			// Rooms			
			try {
				Set<String> roomsPaths = this.m_infostation.getRoomsPaths ();						
				json.put("number_rooms", String.format("%d", roomsPaths.size()));
				
				int i = 0;
				for (String item: roomsPaths) {
					i ++;
					String id = "roomPath_" + i;					
					json.put(id, item);
				}
				
			} catch (SiteException e) {
				json.put("number_rooms", String.format("0"));								
				e.printStackTrace();
			}		
			
			// temperatureSensors			
			try {
				Set<String> tempSensorsPaths = this.m_infostation.getTempSensorsPaths();						
				json.put("number_tempsensors", String.format("%d", tempSensorsPaths.size()));
				
				
				
				int i = 0;
				for (String item: tempSensorsPaths) {
													
					json.put("tempSensorPath_" + i, item);
					//json.put("x_coordinate_ts", String.format("500"));
				//	json.put("y_coordinate_ts", String.format("200"));		
					
					if (i == 0) {
						json.put("temp_ts" + i, String.format("%.2f", m_infostation.getTempOut()));
						json.put("x_coordinate_ts" + i, String.format("300"));
						json.put("y_coordinate_ts" + i, String.format("300"));	
					} else if (i == 1) {
						json.put("temp_ts" + i, String.format("%.2f", m_infostation.getTempIn()));
						json.put("x_coordinate_ts" + i, String.format("300"));
						json.put("y_coordinate_ts" + i, String.format("150"));							
						//json.put("x_coordinate", String.format("%d", 300 + 160));
					} else {
						json.put("temp_ts" + i, "NaN");	
						json.put("x_coordinate_ts" + i, String.format("100"));
						json.put("y_coordinate_ts" + i, String.format("150"));	
					}
					
					i ++;
					//System.out.println("\n\n\n\n ------> CLOUD  <-----------------: " + i);
					
				}
				
			} catch (SiteException e) {
				json.put("number_tempsensors", String.format("0"));								
				e.printStackTrace();
			}		
			
			// door		
			Set<String> doorsPaths = new HashSet <String> (); 
			/*
			 * TEMPORARY code
			 */
			doorsPaths.add("test/doorsA"); //this.m_infostation.getTempSensorsPaths();
			doorsPaths.add("test/doorsB"); //this.m_infostation.getTempSensorsPaths();
			doorsPaths.add("test/doorsC"); //this.m_infostation.getTempSensorsPaths();
			/*
			 * TEMPORARY code end...
			 */
			
			json.put("number_doors", String.format("%d", doorsPaths.size()));
			
			int i = 0;
			for (String item: doorsPaths) {			
				json.put("doorPath_" + i, item);
				json.put("x_coordinate_door_" + i, String.format("%d", 100 + (i * 80)));
				json.put("y_coordinate_door_" + i, String.format("%d", 50));
				
				i++;
			}			
			
			/*
			 * TEMPORARY code
			 */			
			json.put("open_door_0", new Boolean(true));
			json.put("open_door_1", new Boolean(false));
			json.put("open_door_2", new Boolean(false));
			
			json.put("lock_door_0", new Boolean(false));
			json.put("lock_door_1", new Boolean(false));
			json.put("lock_door_2", new Boolean(true));	
			/*
			 * TEMPORARY code end...
			 */			
			
			//System.out.println("\nCLOUD: " + wth.getWeatherSymbol() + " cloudPerc: " + m_meteo.getCloudsForecast());
			
			return json;
	    }	    
	    
	    protected JSONObject getDataToJSON_Forecast(int nFcs) {
	    		    	
	    	ArrayList<Weather> forecasts = m_infostation.getForecasts();
	    	
	    	if (nFcs < 0 || nFcs > 4) { 
	    		nFcs = 4;
	    	}
	    	
	    	int n = nFcs * 8;
	    	
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
	    
	    protected JSONObject getDataToJSON_Data() {
	    	
			JSONObject json = new JSONObject();
														
			int n = -1;
			
			/*
			
			try {
				n = this.m_infostation.m_siteService.getNumberThings("floors/Floor1/rooms");
				
				//System.out.print("\n\n--->: " + floorPath + "/rooms" + ": " + n);
				
			} catch (Exception ex) {	
				//System.out.print("\nEXCPT: " + ex);
			}
	            			*/			
		    json.put("nRooms", String.format("%d",n));
						
			return json;
	    }	    
}
