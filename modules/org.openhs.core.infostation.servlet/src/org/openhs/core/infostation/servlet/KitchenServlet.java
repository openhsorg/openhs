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
import org.openhs.core.commons.Room;
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
	    	//	System.out.println("Value:=" + value.toString());
	    		/*
	    		if (value.toString().equals("InfoData")) {	    		
	    	
	    			JSONObject json = getDataToJSON();

	    			//System.out.println("\nJSON:" + json.toString());
	    			
	    			response.setContentType("application/json");
	    			response.setCharacterEncoding("UTF-8");

	    			PrintWriter out = response.getWriter();	    			
				 
	    			out.println(json.toString());
		    	        
	    			out.flush();
	    			out.close();
	    			
	    		} else
	    			*/
	    	    if (value.toString().equals("SiteData")) {	    		
	    			/*
	    			 * Get site data.
	    			 */
	    			
	    			//System.out.println("\n\n\n\n ------> SiteData  <-----------------: ");
	    			
	    			JSONObject json = getSiteDataToJSON();
	    			
	    			response.setContentType("application/json");
	    			response.setCharacterEncoding("UTF-8");

	    			PrintWriter out = response.getWriter();	    			
				 
	    			out.println(json.toString());
		    	        
	    			out.flush();
	    			out.close();
	    			
	    		} else if (value.toString().contains("WeatherCurrent")) {	
	    			/*
	    			 * Get data from meteo module.
	    			 */
	    			JSONObject json = getCurWeatherToJSON();

	    			//System.out.println("\nWeatherCurrent JSON:" + json.toString());
	    			
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
	    			
	    		} else if (value.toString().equals("SwitchS")) {
		    		
//		    		System.out.println("\n\n\n\n    SwitchS  ");
	    			
		    		String path2 = request.getParameter("path").toString();
		    			
	    			int stateInt = 0; // 0- unknown, 1- off, 2- requested on,  3- device on, 4- requested off 
	    			
	    			try {
	    				stateInt = m_infostation.getSwitchIntState(path2);	    					    					    				
	    			} catch (Exception ex) {
	    				
	    			}
	    			
	    			//System.out.println("\n\n\n\n    SwitchS  JSON: " + path2 + " State: " + stateInt);
	    			
	    			JSONObject json = new JSONObject();
	    			json.put("state_sw", new Integer(stateInt));
					json.put("x_coordinate", String.format("%d", 200));
					json.put("y_coordinate", String.format("%d", 200));		    			
	    				    			
	    			response.setContentType("application/json");
	    			response.setCharacterEncoding("UTF-8");

	    			PrintWriter out = response.getWriter();	    			
				 
	    			out.println(json.toString());
		    	        
	    			out.flush();
	    			out.close();	
	    			
		    	} else if (value.toString().equals("TempSensor")) {
		    			    			
		    		String path = request.getParameter("path").toString();
	    			
	    			//System.out.println("\n\n\n\n    SwitchS  JSON: " + path2 + " State: " + stateInt);
	    			
	    			JSONObject json = new JSONObject();
										
					if (path.contains("WC")) {
						
						json.put("temp", String.format("%.2f", m_infostation.getTempIn()));
						json.put("x_coordinate", String.format("300"));
						json.put("y_coordinate", String.format("150"));								
						
					} else {
					
						json.put("temp", String.format("%.2f", m_infostation.getTempOut()));
						json.put("x_coordinate", String.format("300"));
						json.put("y_coordinate", String.format("300"));		
					}
	    				    			
	    			response.setContentType("application/json");
	    			response.setCharacterEncoding("UTF-8");

	    			PrintWriter out = response.getWriter();	    			
				 
	    			out.println(json.toString());
		    	        
	    			out.flush();
	    			out.close();		
	    			
		    	} else if (value.toString().equals("Room")) {
	    			
					String path = request.getParameter("path").toString();
					
					Room room = null;
					
					try {
						room = (Room) this.m_infostation.getThing(path);
					} catch (SiteException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
					
					//System.out.println("\n\n\n\n    Room name: " + room.getName());
					
					JSONObject json = new JSONObject();
					
					
					if (room != null){
						json.put("name", String.format(room.getName()));
					} else {
						json.put("name", String.format("Error!"));
					}
						    			
					response.setContentType("application/json");
					response.setCharacterEncoding("UTF-8");
					
					PrintWriter out = response.getWriter();	    			
					
					out.println(json.toString());
					    
					out.flush();
					out.close();	
					
					
		        } else if (value.toString().equals("DoorD")) {
		    		
	    			String path = request.getParameter("path").toString();
					
					//System.out.println("\n\n\n\n    SwitchS  JSON: " + path2 + " State: " + stateInt);
					
					JSONObject json = new JSONObject();
										
					if (path.contains("Door1")) {						
						json.put("x_coordinate", String.format("%d", 100));
						json.put("y_coordinate", String.format("%d", 50));						
						json.put("open", new Boolean(true));
						json.put("lock", new Boolean(false));												
					} else if (path.contains("Door2")) {
						json.put("x_coordinate", String.format("%d", 200));
						json.put("y_coordinate", String.format("%d", 50));						
						json.put("open", new Boolean(false));
						json.put("lock", new Boolean(false));	
					} else {
						json.put("x_coordinate", String.format("%d", 300));
						json.put("y_coordinate", String.format("%d", 50));						
						json.put("open", new Boolean(false));
						json.put("lock", new Boolean(true));	
					}
						    			
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
		 			
		 		} else if (value.toString().equals("SwitchS")) {		 			
		 			String path = request.getParameter("path").toString();				 			
		 			m_infostation.setSwitch(path);		 			
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
	    	out.println("new KitchenInfoStation.ApplicationKitchen(document.getElementById('infoCanvas'));");
	    	out.println("</script>");
	    	
	    	out.println("</body>");
	    	out.println("</html>");    	
	    }  
	   /*
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
	    */
	    protected JSONObject getSiteDataToJSON() {
		    Date curDate = new Date();
		    SimpleDateFormat format = new SimpleDateFormat("HH:mm");
		    String time = format.format(curDate); 	 		  
		    
		    SimpleDateFormat format2 = new SimpleDateFormat("EEE MMM dd yyyy");
		    String date = format2.format(curDate); 	  	    	  		    		    	
	    	
			JSONObject json = new JSONObject();	
			
			json.put("time", time);
			json.put("date", date);			
			
			// Floors
			try {
				Set<String> floorPaths = this.m_infostation.getFloorsPaths ();						
				json.put("number_floors", String.format("%d", floorPaths.size()));
				
				int i = 0;
				for (String item: floorPaths) {

					String id = "floorPath_" + i;					
					json.put(id, item);
					
					i ++;
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
					String id = "roomPath_" + i;					
					json.put(id, item);
					
					i++;
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

					i ++;
					//System.out.println("\n\n\n\n ------> CLOUD  <-----------------: " + i);					
				}				
			} catch (SiteException e) {
				json.put("number_tempsensors", String.format("0"));								
				e.printStackTrace();
			}		
						
			// Switch			
			try {
				Set<String> switchPaths = this.m_infostation.getSwitchPaths();						
				json.put("number_switches", String.format("%d", switchPaths.size()));				
								
				int i = 0;
				for (String item: switchPaths) {
													
					json.put("switchPath_" + i, item);

					i ++;
					//System.out.println("\n\n\n\n ------> CLOUD  <-----------------: " + i);
					
				}
				
			} catch (SiteException e) {
				json.put("number_switches", String.format("0"));								
				e.printStackTrace();
			}			
			
			
			// door		
			Set<String> doorsPaths = new HashSet <String> (); 
			/*
			 * TEMPORARY code
			 */
			doorsPaths.add("floors/Floor1/rooms/Room0/doors/Door1"); //this.m_infostation.getTempSensorsPaths();
			doorsPaths.add("floors/Floor1/rooms/Room0/doors/Door2"); //this.m_infostation.getTempSensorsPaths();
			doorsPaths.add("floors/Floor1/rooms/Room0/doors/Door3"); //this.m_infostation.getTempSensorsPaths();
			/*
			 * TEMPORARY code end...
			 */
			
			json.put("number_doors", String.format("%d", doorsPaths.size()));
			
			int i = 0;
			for (String item: doorsPaths) {			
				json.put("doorPath_" + i, item);
				
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
	    
	    protected JSONObject getCurWeatherToJSON() {
	    	
	    	Weather wth = m_infostation.getForecastWeather6();		    
		    		    
			JSONObject json = new JSONObject();
			json.put("tempIn", String.format("%.2f", m_infostation.getTempIn()));
			json.put("tempOut", String.format("%.2f", m_infostation.getTempOut()));			
			json.put("cloudPerc", m_infostation.getCloudsForecast());
			json.put("tempForecast", m_infostation.getTempForecast());
			json.put("frostOutside", new Boolean(m_infostation.isFrost()));
			json.put("weatherSymbol", String.format("%d", wth.getWeatherSymbol()));
			json.put("windSpeed", String.format("%.2f", wth.getWindSpeed()));
			
			return json;
	    }	    
	    /*
	    protected JSONObject getDataToJSON_Data() {
	    	
			JSONObject json = new JSONObject();
														
			int n = -1;
			
			
			
			try {
				n = this.m_infostation.m_siteService.getNumberThings("floors/Floor1/rooms");
				
				//System.out.print("\n\n--->: " + floorPath + "/rooms" + ": " + n);
				
			} catch (Exception ex) {	
				//System.out.print("\nEXCPT: " + ex);
			}
	            						
		    json.put("nRooms", String.format("%d",n));
						
			return json;
	    }	
	    */
}
