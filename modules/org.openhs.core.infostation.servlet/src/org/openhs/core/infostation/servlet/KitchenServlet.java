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
import org.openhs.core.commons.ContactSensor;
import org.openhs.core.commons.Door;
import org.openhs.core.commons.Floor;
import org.openhs.core.commons.Room;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Switch;
import org.openhs.core.commons.Temperature;
import org.openhs.core.commons.TemperatureSensor;
import org.openhs.core.commons.Thing;
import org.openhs.core.commons.Weather;
import org.openhs.core.commons.Window;
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
	    		
	    		String jsonString = null;

	    	    if (value.toString().equals("SiteData")) {	    		
	    		//	JSONObject json = getSiteDataToJSON();	
	    		//	jsonString = json.toString();
	    			
	    		} else if (value.toString().contains("TimeDate")) {
	    			jsonString =  this.JSON_TimeDateToString();
	    			
	    		} else if (value.toString().contains("TempSensors")){ 	    			
	    			jsonString =  this.m_infostation.JSON_ThingArrayToString(TemperatureSensor.class);
		    				    		
	    		} else if (value.toString().contains("ContactSensors")){ 	    			
	    			//jsonString =  this.m_infostation.JSON_ThingArrayToString(ContactSensor.class);	    			
	    		
	    		} else if (value.toString().contains("SwitchSensors")){ 	    			
	    			jsonString =  this.m_infostation.JSON_ThingArrayToString(Switch.class);	    				    			
	    		
	    		}  else if (value.toString().contains("DoorArray")){ 	    			
	    			jsonString =  this.m_infostation.JSON_ThingArrayToString(Door.class);	    				    			
	    		
	    		} else if (value.toString().contains("WindowArray")){ 	    			
	    			jsonString =  this.m_infostation.JSON_ThingArrayToString(Window.class);	    				    			
	    		
	    		} else if (value.toString().contains("RoomArray")){ 	
	    			jsonString =  this.m_infostation.JSON_ThingArrayToString(Room.class);	    				    			
	    		
	    		} else if (value.toString().contains("FloorArray")){ 	
	    			jsonString =  this.m_infostation.JSON_ThingArrayToString(Floor.class);	    				    			
	    		
	    		}  else if (value.toString().contains("WeatherCurrent")) {	
	    			JSONObject json = getCurWeatherToJSON();
	    			
	    			jsonString = json.toString();

	    			//System.out.println("\nWeatherCurrent JSON:" + json.toString());	    		    			
	    			
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
	    			
	    			jsonString = json.toString();

	    			//System.out.println("\nJSON:" + json.toString());
	    			
	    			
	    		} else if (value.toString().equals("SwitchS")) {
	    			
	    			String path = request.getParameter("path");
	    			
	    			if (path != null) {	    			
	    				jsonString = this.m_infostation.JSON_ThingToString(path.toString());
	    			}
	    			
	    			
		    	}else if (value.toString().equals("ContactSensor")) {
		    		
	    			String path = request.getParameter("path");
	    			
	    			if (path != null) {	    			
	    				jsonString = this.m_infostation.JSON_ThingToString(path.toString());
	    			}		    		
	    			
		    	} else if (value.toString().equals("TempSensor")) {
		    		
	    			String path = request.getParameter("path");
	    			
	    			if (path != null) {	    			
	    				jsonString = this.m_infostation.JSON_ThingToString(path.toString());
	    			}
	    			
		    	} else if (value.toString().equals("Room")) {
	    			
	    			String path = request.getParameter("path");
	    			
	    			if (path != null) {	    			
	    				jsonString = this.m_infostation.JSON_ThingToString(path.toString());
	    			}
																				
		        } else if (value.toString().equals("DoorD")) {
		    		
	    			String path = request.getParameter("path");
	    			
	    			if (path != null) {	    			
	    				jsonString = this.m_infostation.JSON_ThingToString(path.toString());
	    			}		        		
					
				} else if (value.toString().equals("Window")) {
					
	    			String path = request.getParameter("path");
	    			
	    			if (path != null) {	    			
	    				jsonString = this.m_infostation.JSON_ThingToString(path.toString());
	    			}								    			    		
				} else if (value.toString().equals("Supplier")) {
					/*
	    			String name = request.getParameter("name");
	    			
	    			if (name != null) {	    			
	    				jsonString = this.m_infostation.JSON_Supplier(name);
	    			}			
	    			*/
				}
	    	    
	    	    if (jsonString != null) {
	    			response.setContentType("application/json");
	    			response.setCharacterEncoding("UTF-8");
	
	    			PrintWriter out = response.getWriter();	    			
				 
	    			out.println(jsonString);
		    	        
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
		 			String command = request.getParameter("command").toString();		
		 			
		 			if (command.equals("click")){
		 				m_infostation.setSwitch(path);
		 				
		 			} else if (command.equals("on")){
		 				m_infostation.setSwitch(path, true);
		 				
		 			} else if (command.equals("off")){
		 				m_infostation.setSwitch(path, false);
		 			}
		 			
		 		} else if (value.toString().equals("GeneralCommand")) {	
		 			
		 			String command = request.getParameter("command").toString();		

		 			if (command.equals("AllRoomSwitchesOn")){
		 				try {
							m_infostation.setAllRoomSwitches(true);
							//m_infostation.sendMail();
						} catch (SiteException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
		 				
		 			} else if (command.equals("AllRoomSwitchesOff")){
		 				try {
							m_infostation.setAllRoomSwitches(false);
						} catch (SiteException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}	
		 				
		 			} else if (command.equals("AllDoorSwitchesOn")){
		 				try {
							m_infostation.setAllDoorsSwitch(true);
						} catch (SiteException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}		 				
		 			} else if (command.equals("AllDoorSwitchesOff")){
		 				try {
							m_infostation.setAllDoorsSwitch(false);
						} catch (SiteException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}		 				
		 			}		 		
		 		}
		 	}
	    	
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

	    	out.println("<canvas id='infoCanvas' class=canvasScreen charset='utf-8' width='850' height='550' style='margin-top: -275px; margin-left: -425px'>");
	    	//out.println("<canvas id='infoCanvas' class=canvasScreen charset='utf-8' width='1000' height='600' style='margin-top: -325px; margin-left: -500px'>");
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
	    
	    protected String JSON_TimeDateToString() {	    		    	
		    Date curDate = new Date();
		    SimpleDateFormat format = new SimpleDateFormat("HH:mm");
		    String time = format.format(curDate); 	 		  
		    
		    SimpleDateFormat format2 = new SimpleDateFormat("MMM dd yyyy");
		    String date = format2.format(curDate); 	  	    	  		    		    	
	    	
			JSONObject json = new JSONObject();	
			
			json.put("time", time);
			json.put("date", date);	
			
			return json.toString();
	    }
	  
	    protected JSONObject getSiteDataToJSON() {	    	
	    	
		    Date curDate = new Date();
		    SimpleDateFormat format = new SimpleDateFormat("HH:mm");
		    String time = format.format(curDate); 	 		  
		    
		    SimpleDateFormat format2 = new SimpleDateFormat("MMM dd yyyy");
		    String date = format2.format(curDate); 	  	    	  		    		    	
	    	
			JSONObject json = new JSONObject();	
			
			json.put("time", "--");
			json.put("date", "--");			
			
			// Floors
			try {

				Set<String> floorPaths = this.m_infostation.getThingPaths (Floor.class);						

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

				Set<String> roomsPaths = this.m_infostation.getThingPaths (Room.class);						

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
			
			// TemperatureSensors			
			try {

				Set<String> tempSensorsPaths = this.m_infostation.getThingPaths(TemperatureSensor.class);						

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
			
			// ContactSensor			
			try {
				Set<String> contactSensorPaths = this.m_infostation.getThingPaths(ContactSensor.class);						
				json.put("number_contactSensors", String.format("%d", contactSensorPaths.size()));				
								
				int i = 0;
				for (String item: contactSensorPaths) {
													
					json.put("contactSensorPath_" + i, item);

					i ++;
					//System.out.println("\n\n\n\n ------> CLOUD  <-----------------: " + i);
					
				}
				
			} catch (SiteException e) {
				json.put("number_contactSensors", String.format("0"));								
				e.printStackTrace();
			}
		
			// Doors			
			try {
				Set<String> doorsPaths = this.m_infostation.getThingPaths(Door.class);						
				json.put("number_doors", String.format("%d", doorsPaths.size()));
				
				int i = 0;
				for (String item: doorsPaths) {	
					String id = "doorPath_" + i;					
					json.put(id, item);
					
					i++;
				}
				
			} catch (SiteException e) {
				json.put("number_doors", String.format("0"));								
				e.printStackTrace();
			}	
			
			// Windows			
			try {
				Set<String> windowsPaths = this.m_infostation.getThingPaths(Window.class);						
				json.put("number_windows", String.format("%d", windowsPaths.size()));
				
				int i = 0;
				for (String item: windowsPaths) {	
					String id = "windowPath_" + i;					
					json.put(id, item);
					
					i++;
				}
				
			} catch (SiteException e) {
				json.put("number_windows", String.format("0"));								
				e.printStackTrace();
			}				
			
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

}
