package org.openhs.core.remote.access;

import java.io.IOException;


import java.io.PrintWriter;
import java.net.URL;
import java.util.Date;
import java.util.Set;
import java.util.TreeMap;
import java.util.ArrayList;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.openhs.core.commons.Site;
import org.openhs.core.commons.Room;
import org.openhs.core.commons.Sensor;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Temperature;
import org.openhs.core.commons.Floor;
import org.openhs.core.commons.Humidity;
import org.openhs.core.meteostation.Meteostation;
import org.openhs.core.site.data.ISiteService;
import org.osgi.framework.Bundle;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.openhs.core.cfg.OpenhsProps;


public class AdminServlet extends HttpServlet{
    private ISiteService m_siteService = null;
    private Meteostation m_meteo = null;
    private OpenhsProps m_openhsProps = null;

    int i = 100;
    
   // int screen = 0; //0 - admin, 1 - data structure
  //  boolean edit = false;
    
    AdminScreens  		screen = AdminScreens.ADMIN;
    AdminScreensDetail  sreenDet = AdminScreensDetail.NONE;
    AdminScreensButtons btn = AdminScreensButtons.NONE;
    
    String dataItemID = "";

    AdminServlet(OpenhsProps props, ISiteService site, Meteostation meteo) {
    	m_openhsProps = props;
    	m_siteService = site;
    	m_meteo = meteo;
    }

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html");
        resp.setHeader("Refresh", "5");        

        i++;

        PrintWriter out = resp.getWriter();    
        
        html_page(out);
        
        out.close();
        
    }    
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	
    	sreenDet = AdminScreensDetail.NONE;
    	
    	//String[] c = request.getParameterValues("ccc");
    	
    	System.out.println("...doPost...");
    	       
        if (request.getParameter("Administration") != null) {
        	System.out.println("...Administration");
        	
        	screen = AdminScreens.ADMIN;
        	
        } else if (request.getParameter("Datastruct") != null) {       	
        	System.out.println("...Datastruct");

        	screen = AdminScreens.DATA_STRUCTURE;
        	
        } else if (request.getParameter(AdminScreensButtons.B_METEO.toString()) != null) {
        	        	
        	screen = AdminScreens.METEO_SETUP;              	          	
          	
        } else if (request.getParameter(AdminScreensButtons.B_CLOCK.toString()) != null) {
        	
        	screen = AdminScreens.CLOCK_SETUP;              	          	
	
        } else if (request.getParameter(AdminScreensButtons.BCH_SERIAL.toString()) != null) {
        	
        	//screen = AdminScreens.CLOCK_SETUP;  
        	//System.out.println("---->Checkbox!!!=");
        	
        	String[] c = request.getParameterValues("interfaces");       
        	boolean on [] = {false, false, false, false};
        	
        	if (c != null){
        		
        	//	int n=0;
        	
	        	for (String s : c){
	        		System.out.println("---->Checkbox!!!=" + s);	        			        	
	        		
	        		if(s.equals("sercom")){
	        			on[1]=true;
	        		} 
	        		
	        		if(s.equals("mqttcom")){
	        			on[2]=true;
	        		} 
	        		
	        		//n++;
	        	}
        	}
        	
			if(on[1]==true){
				m_openhsProps.m_bundles.startSerialComm();;
			} else{
				m_openhsProps.m_bundles.stopSerialComm();
			}
			
			if(on[2]==true){
				m_openhsProps.m_bundles.startMqttComm();;
			} else{
				m_openhsProps.m_bundles.stopMqttComm();
			}
			/*
			try{
				Thread.sleep(1000);
			}catch(Exception ex){
				
			}
			*/
			
        	/*
        	for (int i=0; i<on.length; i++)
        	{
        		if (i==0){
        			if(on[i]){
        				m_openhsProps.m_bundles.startSerialComm();;
        			} else{
        				m_openhsProps.m_bundles.stopSerialComm();
        			}
        		}
        		
        		if (i==1){
        			if(on[i]){
        				m_openhsProps.m_bundles.startMqttComm();;
        			} else{
        				m_openhsProps.m_bundles.stopMqttComm();
        			}
        		}        		
        	}
        	*/
        	
	
        } else if (request.getParameter(AdminScreensButtons.SITE.toString()) != null) {
        	System.out.println("...Edit site");
        	
          	sreenDet = AdminScreensDetail.SITE;
          	
          	dataItemID = request.getParameter(AdminScreensButtons.SITE.toString());
            System.out.println("Site=" + dataItemID);               	          	
          	
        } else if (request.getParameter(AdminScreensButtons.ROOM.toString()) != null) {
        	System.out.println("...Edit room");
        	
          	sreenDet = AdminScreensDetail.ROOM;
          	
          	dataItemID = request.getParameter(AdminScreensButtons.ROOM.toString());
            System.out.println("Room=" + dataItemID);   
          	
        } else if (request.getParameter(AdminScreensButtons.SENSOR.toString()) != null) {
        	System.out.println("...Edit sensor");
        	
          	sreenDet = AdminScreensDetail.SENSOR;
          	
          	dataItemID = request.getParameter(AdminScreensButtons.SENSOR.toString());
            System.out.println("Sensor=" + dataItemID);   
          	
        } else if (request.getParameter(AdminScreensButtons.SITE_NAME.toString()) != null) {
        	System.out.println(AdminScreensButtons.SITE_NAME.toString());
        	
            String value = request.getParameter(AdminScreensButtons.SITE_NAME.toString());
            System.out.println("Site Name changing = " + value);     
             
            m_siteService.setId(value);
            
        } else if (request.getParameter(AdminScreensButtons.ROOM_NAME.toString()) != null) {
        	System.out.println(AdminScreensButtons.ROOM_NAME.toString());
        	
            String value = request.getParameter(AdminScreensButtons.ROOM_NAME.toString());
            System.out.println("Room Name changing =" + value);    
            
           // m_siteService.setRoomKey (dataItemID, value);
                        
            
        } else if (request.getParameter(AdminScreensButtons.SENSOR_NAME.toString()) != null) {
        	System.out.println(AdminScreensButtons.SENSOR_NAME.toString());
        	
            String value = request.getParameter(AdminScreensButtons.SENSOR_NAME.toString());
            System.out.println("Sensor Name changing =" + value);    
            
           // m_siteService.setSensorKey (dataItemID, value);                         
            
        } else if (request.getParameter(AdminScreensButtons.METEO_IN_TEMP.toString()) != null) {
        	System.out.println("in temp settings...");
        	
            String v = request.getParameter(AdminScreensButtons.METEO_IN_TEMP.toString());
            System.out.println("sensor =" + v);     
            
            m_meteo.sensorInString = v;
            
            v = request.getParameter(AdminScreensButtons.METEO_OUT_TEMP.toString());
            System.out.println("sensor2 =" + v);
            
            m_meteo.sensorOutString = v;
            
        } else {
            // ???
        }
    	       
    	
    	PrintWriter out = response.getWriter();
        
        html_page(out);
    	        
        out.close();
    }    
    /*
    protected void getHouseData(PrintWriter out) {

        try {
        	
        out.println("<info2>Site:</info2> " + "<info>" + m_siteService.getId() + "; Number rooms: " + m_siteService.getNumberThings("floors/Floor1/rooms") + "</info>");
      //  out.println("<br/>Number rooms is: " + m_siteService.getNumberRooms());

        //TreeMap<String, Room> rooms = m_siteService.getRooms();
        
    //    Site site = m_siteService.getSite();
      //  Set<String> keys = site.rooms.keySet();
        
        TreeMap<String, Room> rooms = (TreeMap<String, Room>) m_siteService.getThing2("floors/Floor1/rooms");
        Set<String> keys = rooms.keySet();

        for (String key : keys) {
            out.println(" ");
            out.println("<br/>|<br/>|");
            out.println("-- <info2>Room:</info2>" + key + "   ..." + "Num Sensors:" + m_siteService.getNumberThings("floors/Floor1/rooms/" + key + "/sensors"));

           // TreeMap<String, Sensor> sensors = m_siteService.getSensors(key);
            
          //  try {
	            //Room room = m_siteService.getRoom(key);
            	 Room room = (Room) m_siteService.getThing2("floors/Floor1/rooms/" + key);
	
	            Set<String> keysSensors = room.sensors.keySet();
	
	            Temperature temp;
	            Humidity 	hum;
	            
	            for (String keyS : keysSensors) {
	                try {
	                    temp = m_siteService.getSensorTemperature("floors/Floor1/rooms/" + key + "/sensors/" + keyS);
	                    hum = m_siteService.getSensorHumidity("floors/Floor1/rooms/" + key + "/sensors/" + keyS);
	
	                    out.println("<br/>|&nbsp;&nbsp;&nbsp;|- Sensor:" + keyS);
	                    out.println("  ...Temperature: " + temp.getCelsiusString() + " C" + "; ");
	                    out.println(" Humidity: " + hum.getString() + " %" + "; ");
	                } catch (SiteException ex) {
	
	                }
	
	                // out.println("<br><tr/> -" + keyS + " Temperature: " + temp.get() + " C");
	            }
            
         //   }catch (Exception ex) {
            	
          //  }
        }
        
        } catch (Exception ex) {
        	System.out.println(ex);
        }

    }    
    */
    protected void html_page(PrintWriter out){
    	    	    	
    	out.println("\n<!DOCTYPE html>");
    	out.println("<html>");
    	out.println("<head>");
    	
    	//out.println("<style>");
        	
    //	URL  url = this.getClass().getResource("/web/styles.css");
    	
   // 	fileToPage(out, url.getPath());
    	
    	out.println("<link href='/web/styles.css' rel='stylesheet' type='text/css'>");
    	//out.println("<script src='web/canvas1.jsp'></script>");    
   
    	out.print("</head>\n");
    	out.print("<body>\n");

    	out.println("<div class='container'>");

    	out.println("<header>");
    	out.println("<h1>Admin page</h1>");
    	out.println("</header>");
    	
    	out.println("<nav>");
    	
    	html_left(out);
    	
    	out.println("</nav>");   	
    	    	
    	out.println("<article>");
    	  
    	html_center(out);
    	            	  
    	out.println("</article>");    	
    	
    	out.println("<footer>Copyright © openhs.org</footer>");

    	out.println("</div>");

    	out.println("</body>");
    	out.println("</html>");
    	
    }
    /*
    protected void fileToPage(PrintWriter out, String filepath){
    	
		ServletContext context = getServletContext();
		
		try {
			InputStream is = context.getResourceAsStream(filepath);
				if (is != null) {
					InputStreamReader isr = new InputStreamReader(is);
					BufferedReader reader = new BufferedReader(isr);
					String text = "";

					
					while ((text = reader.readLine()) != null) {
						out.println(text);
					}
					
					//out.println("</style>");
				}					
			} catch (IOException e) {
		}
    }
    */
    protected void html_left(PrintWriter out){    	 
    	    	
    	out.println("<h2>Menu</h2>");
    	
        out.print("<form name=\"admin\" method=\"post\" action=\"\">" +
        "<input type=\"submit\" class=\"buttonx\" name=\"Administration\" value=\"Administration\">" +
        "</form>\n"); 
        
        out.print("<br>");
    	
        out.print("<form name='admin' method='post' action=''>" +
        "<input type='submit' class='buttonx' name='Datastruct' value='Data Structure'>" +
        "</form>\n");    
        
        out.print("<br>");
    	
        out.print("<form name='admin' method='post' action=''>" +
        "<input type='submit' class='buttonx' name='" + AdminScreensButtons.B_METEO.toString() + "' value='Meteo Setup'>" +
        "</form>\n");       
        
        out.print("<br>");
    	
        out.print("<form name='admin' method='post' action=''>" +
        "<input type='submit' class='buttonx' name='" + AdminScreensButtons.B_CLOCK.toString() + "' value='Clock Setup'>" +
        "</form>\n");           
     
     /*   
        out.print("<br>");
        
        out.println("<h2>Applications:</h2>");
        
        out.print("<a href=\"/meteo\" accesskey=\"1\" title=\"\">Meteo station</a>");
        out.print("<br>");
        out.print("<a href=\"/meteo2\" accesskey=\"1\" title=\"\">Time and temperature</a>");
        out.print("<br>");
        out.print("<a href=\"/image\" accesskey=\"1\" title=\"\">Image Demo</a>");        
        
        out.print("<br>");
    */
    }
    
    protected void html_center(PrintWriter out){
    	
    	switch (screen) {
    	
    	case ADMIN:
    		    		
        	out.println("<h2>General Administration</h2>");

        	out.println("<info2>Time: </info2>" + "<info>" + new Date().toString() + "</info>");
        	
        	//Interfaces
        	out.println("<br><h3>Interfaces</h3>");        	
        	        	
			out.println("<form method='post' action='openhs'>");
			
			if (m_openhsProps.m_bundles.getSerialCommState() == Bundle.ACTIVE){			
				out.println("<p><input type='checkbox' name='interfaces' value='sercom' checked />");
				out.println("Serial communication</p>");
			} else {
				out.println("<p><input type='checkbox' name='interfaces' value='sercom' />");
				out.println("Serial communication</p>");
			}		
			
			if (m_openhsProps.m_bundles.getMqttCommState() == Bundle.ACTIVE){			
				out.println("<p><input type='checkbox' name='interfaces' value='mqttcom' checked />");
				out.println("Mqtt communication</p>");
			} else {
				out.println("<p><input type='checkbox' name='interfaces' value='mqttcom' />");
				out.println("Mqtt communication</p>");
			}				
			
			//out.println("<p><input type='checkbox' name='interfaces' value='" + AdminScreensButtons.CH_SERIALCOMM.toString() + "' checked />");
			//out.println("Serial communication</p>");
			//out.println("<p><input type='checkbox' name='interfaces' value='Playing Game' />");
			//out.println("MQTT communication</p>");
			out.println("<p><input type='submit' name='" + AdminScreensButtons.BCH_SERIAL.toString() + "' value='Update'></input></p>");
			out.println("</form>");       	
        	
        	// Draw list of running bundles
        	out.println("<br><h3>List of modules</h3>");
        	        	
        	ArrayList<String> bundleList = m_openhsProps.m_bundles.getBundlesList();
        	
        	out.print("<info2>Number of running modules:</info2>");
        	out.print("<br>");
        	
        	for(String item:bundleList){
        		if(item.contains("ACTIVE")){
        			out.println("<bundleActive>" + item + "</bundleActive><br>");
        		}else{
        			out.println("<bundleIdle>" + item + "</bundleIdle><br>");	
        		}        		
        	}
        	
        break;
    		
    	case DATA_STRUCTURE:
    		
    		html_datatree(out);
    		
    	break;
    	
    	case METEO_SETUP:
    		
    		html_meteo(out);
    		
    	break;    
    	
    	case CLOCK_SETUP:
    		
    		html_clock(out);
    		
    	break;      	
    		
    	}
    	
	   	

        
    }    
    
    protected void html_datatree (PrintWriter out){
    	
    	out.println("<h2>Data structure</h2>");
      	
    	out.println("<div class=\"clt\">");
    	
    	if (m_siteService != null) {   
    		getHouseData2(out);
    	}
    	else {
            out.println("<br/><br/>error no data site :(");
            out.println("<br/>");     
    	}
    
        out.println("</div>");  
    }
    
    protected void getHouseData2(PrintWriter out) {

    	out.println("<ul>");
    	
    	//System.out.println("\n\n--->>>");
    	
        //out.println("<li>Site:" + m_siteService.getId() + "; Number rooms: " + m_siteService.getNumberRooms());
    	//out.println("<li><info2>Site:</info2>" + "<info>" + m_siteService.getId() + "</info>");
   // 	if (!edit){
    		out.print("<li><form name='admin' method='post' action=''>" +
    				"<input type='submit' class='buttonSensorEdit' name='" + btn.SITE.toString() + "' value='" + m_siteService.getId() + "'>" +
    				"</form>");
    	/*}
    	else{
          	
            out.print("<li><form name=\"input\" method=\"post\">\n" +
                    "Site: <input type=\"text\" name=\"siteID\" value=\"" + m_siteService.getId() + "\">" +
                    "<input type=\"submit\" value=\"Submit\">");       		
    	}
    	*/    	
        out.println("<ul>");
      //  out.println("<br/>Number rooms is: " + m_siteService.getNumberRooms());

        //TreeMap<String, Room> rooms = m_siteService.getRooms();
        //Site site = m_siteService.getSite();
        //Set<String> keys = site.rooms.keySet();
      
        try {
        	
        	Site site = m_siteService.getSite();
        	Set<String> keysF = site.floors.keySet();
        	
        	for (String keyF : keysF) {
        		
	            out.print("<li><form name='admin' method='post' action=''>" +
	                    "<input type='submit' class='buttonSensorEdit' name='" + btn.FLOOR.toString() + "' value='" + keyF + "'>" +
	                    "</form>");       
	            
	            out.println("<ul>");
        	
		        Floor floor = (Floor) m_siteService.getThing2("floors/" + keyF);
		        Set<String> keysR = floor.rooms.keySet();        	
		
		        for (String keyR : keysR) {            
		        	
		            out.print("<li><form name='admin' method='post' action=''>" +
		                    "<input type='submit' class='buttonSensorEdit' name='" + btn.ROOM.toString() + "' value='" + keyR + "'>" +
		                    "</form>");           	
		        	
		            out.println("<ul>");
		
		        	Room room = (Room) m_siteService.getThing2("floors/" + keyF + "/rooms/"+ keyR);
		            Set<String> keysS = room.sensors.keySet();
		
		            Temperature temp;
		            Humidity 	hum;
		            
		            for (String keyS : keysS) {
		
		                temp = m_siteService.getSensorTemperature("floors/" + keyF + "/rooms/" + keyR + "/sensors/" + keyS);
		                hum = m_siteService.getSensorHumidity("floors/" + keyF + "/rooms/" + keyR + "/sensors/" + keyS);
		                
		                out.print("<li><form name='admin' method='post' action=''>" +
		                        "<input type='submit' class='buttonSensorEdit' name='" + btn.SENSOR.toString() + "' value='" + keyS + "'>" +
		                        "</form>");                    
		                
		                out.println("<ul>");
		                out.println("<li><info2>Temperature.</info2>" + "<info>" + temp.getCelsiusString() + " C" + "; </info></li>");                    
		                out.println("<li><info2>Humidity:</info2>" + "<info>" + hum.getString() + " %" + "; </info></li>");
		                                    
		                out.println("</ul>");
		                out.println("</li>");
		            }   
		                    
		           out.println("</ul>"); 
		           out.println("</li>");
		        }
		        
		        out.println("</ul>"); 
		        out.println("</li>");		        
	        
        	}
        
        } catch (Exception ex) {
        	System.out.println("\n\nException:" + ex);
        }
        
      	out.println("</ul>");
        out.println("</li></ul>");        
                
        out.print("<br>");
        
        html_detail(out);              
    }      
    
    protected void getHouseData2_Z(PrintWriter out) {

    	out.println("<ul>");
    	
    	//System.out.println("\n\n--->>>");
    	
        //out.println("<li>Site:" + m_siteService.getId() + "; Number rooms: " + m_siteService.getNumberRooms());
    	//out.println("<li><info2>Site:</info2>" + "<info>" + m_siteService.getId() + "</info>");
   // 	if (!edit){
    		out.print("<li><form name='admin' method='post' action=''>" +
    				"<input type='submit' class='buttonSensorEdit' name='" + btn.SITE.toString() + "' value='" + m_siteService.getId() + "'>" +
    				"</form>");
    	/*}
    	else{
          	
            out.print("<li><form name=\"input\" method=\"post\">\n" +
                    "Site: <input type=\"text\" name=\"siteID\" value=\"" + m_siteService.getId() + "\">" +
                    "<input type=\"submit\" value=\"Submit\">");       		
    	}
    	*/    	
        out.println("<ul>");
      //  out.println("<br/>Number rooms is: " + m_siteService.getNumberRooms());

        //TreeMap<String, Room> rooms = m_siteService.getRooms();
        //Site site = m_siteService.getSite();
        //Set<String> keys = site.rooms.keySet();
      
        try {
	        Floor floor = (Floor) m_siteService.getThing2("floors/Floor1");
	        Set<String> keys = floor.rooms.keySet();        	
	
	        for (String key : keys) {            
	        	
	            out.print("<li><form name='admin' method='post' action=''>" +
	                    "<input type='submit' class='buttonSensorEdit' name='" + btn.ROOM.toString() + "' value='" + key + "'>" +
	                    "</form>");           	
	        	
	            out.println("<ul>");
	
	        	Room room = (Room) m_siteService.getThing2("floors/Floor1/rooms/" + key);
	            Set<String> keysSensors = room.sensors.keySet();
	
	            Temperature temp;
	            Humidity 	hum;
	            
	            for (String keyS : keysSensors) {
	
	                temp = m_siteService.getSensorTemperature("floors/Floor1/rooms/" + key + "/sensors/" + keyS);
	                hum = m_siteService.getSensorHumidity("floors/Floor1/rooms/" + key + "/sensors/" + keyS);
	                
	                out.print("<li><form name='admin' method='post' action=''>" +
	                        "<input type='submit' class='buttonSensorEdit' name='" + btn.SENSOR.toString() + "' value='" + keyS + "'>" +
	                        "</form>");                    
	                
	                out.println("<ul>");
	                out.println("<li><info2>Temperature.</info2>" + "<info>" + temp.getCelsiusString() + " C" + "; </info></li>");                    
	                out.println("<li><info2>Humidity:</info2>" + "<info>" + hum.getString() + " %" + "; </info></li>");
	                                    
	                out.println("</ul>");
	                out.println("</li>");
	            }   
	                    
	           out.println("</ul>"); 
	           out.println("</li>");
	        }
        
        } catch (Exception ex) {
        	System.out.println("\n\nException:" + ex);
        }
        
      	out.println("</ul>");
        out.println("</li></ul>");        
                
        out.print("<br>");
        
        html_detail(out);              
    }         
    
    
    void html_detail (PrintWriter out){
    	
    	switch (sreenDet){
    	
    	case SITE:
    		
    		out.println("<h2>Site detail:</h2>");
    		        	        	
            out.print("<form name='input' method='post'>\n" +
                    "<info2>Name of site:</info2> <input type='text' name='" + AdminScreensButtons.SITE_NAME.toString() + "' value='" + dataItemID + "'>\n" +
                    "<input type='submit' value='Submit'>" +
                    ""); 
            
            out.print("<br>");
            try {
            out.print("<info2>Number of rooms: </info2>" + "<info2>" + m_siteService.getNumberThings("floors/Floor1/rooms/") + "</info2>");
            } catch (Exception ex) {
            	
            }
        break;
        
    	case ROOM:
    		
    		out.println("<h2>Room detail:</h2>");
        	
            out.print("<form name='input' method='post'>\n" +
                    "<info2>Name of room:</info2> <input type='text' name='" + AdminScreensButtons.ROOM_NAME.toString() + "' value='" + dataItemID + "'>\n" +
                    "<input type='submit' value='Submit'>" +
                    ""); 
            
            out.print("<br>");
           // out.print("<info2>Number of sensors: </info2>" + "<info2>" + m_siteService.getNumberSensors(dataItemID) + "</info2>");
            
        break;    
        
    	case SENSOR:
    		
    		out.println("<h2>Sensor detail:</h2>");
        	
            out.println("<form name='input' method='post'>\n" +
                    "<info2>Name of room:</info2> <input type='text' name='" + AdminScreensButtons.SENSOR_NAME.toString() + "' value='" + dataItemID + "'>\n" +
                    "<input type='submit' value='Submit'>" +
                    "");
            
            Temperature temp;
            Humidity hum;
            
            try {
            	temp = m_siteService.getSensorTemperature("floors/Floor1/Room1/sensors/" + dataItemID);
            	hum = m_siteService.getSensorHumidity("floors/Floor1/Room1/sensors/" + dataItemID);
            	
            	out.print("<br>");
                out.print("<info2>Temperature.</info2>" + "<info>" + temp.getCelsiusString() + " C" + "; </info>");
                out.print("<br>");
                out.print("<info2>Humidity:</info2>" + "<info>" + hum.getString() + " %" + "; </info>");             	
            }
            catch (Exception ex){
            	
            }                       
            
        break;            
        
    	}
    	    	
    }
    
    void buttonSensorEdit (PrintWriter out){
    	
        out.print("<form name='admin' method='post' action=''>" +
        "<input type='submit' class='buttonSensorEdit' name='Edit' value='Edit'>" +
        "</form>\n");       	
    	
    }
    
    protected void html_meteo (PrintWriter out){
    	
    	ArrayList<String> sensorList = new ArrayList<String>();
    	
        //TreeMap<String, Room> rooms = m_siteService.getRooms();
    	
    	//Site site = m_siteService.getSite();
        //Set<String> keys = site.rooms.keySet();
        
    	try {
        TreeMap<String, Room> rooms = (TreeMap<String, Room>) m_siteService.getThing2("floors/Floor1/rooms");
        Set<String> keys = rooms.keySet();        

        for (String key : keys) {
        	
            //TreeMap<String, Sensor> sensors = m_siteService.getSensors(key);
        
        		        	
	        	//Room room = m_siteService.getRoom(key);
        		Room room = (Room) m_siteService.getThing2("floors/Floor1/rooms/" + key);
	
	            Set<String> keysSensors = room.sensors.keySet();
	
	            for (String keyS : keysSensors) {
	            	sensorList.add(key + "/" + keyS);
	            }
            
        	
        }
    	
        } catch (Exception ex){
    		
    	}
        
    	out.println("<h2>Meteo station setup</h2>");
    	
    	//Inner temp
   	    out.print("<form action='' method='post'\n");
   	    out.print("<br>");
   	    out.print("<info2>Select sensor measuring inner temperature:  </info2>");
    	out.print("<select name='" + AdminScreensButtons.METEO_IN_TEMP.toString() + "'  size='1'>\n");
    	
    	out.print("<option value='none' selected>none</option>\n");
    	
    	String selected = "";
    	
    	for (String item : sensorList) {
    		
    		if (m_meteo.sensorInString.contentEquals(item)){
    			selected = " selected";
    		} else{
    			selected = "";
    		}
    		    		
    		out.print("<option value='" + item + "'" + selected + ">" + item + "</option>\n");
    	}
    	out.print("</select>\n");    	
     	
     	//Out temp
   	    out.print("<br>");
   	    out.print("<br>");
   	    out.print("<info2>Select sensor measuring outer temperature:  </info2>");
    	out.print("<select name='" + AdminScreensButtons.METEO_OUT_TEMP.toString() + "'  size='1'>\n");
    	
    	out.print("<option value='none' selected>none</option>\n");
    	
    	selected = "";
    	
    	for (String item : sensorList) {
    		
    		if (m_meteo.sensorOutString.contentEquals(item)){
    			selected = " selected";
    		} else{
    			selected = "";
    		}
    		    		
    		out.print("<option value='" + item + "'" + selected + ">" + item + "</option>\n");
    	}
    	out.print("</select>\n");
    	out.print("<br>");
    	out.print("<br>");
    	out.print("<input type='submit' value='save'/>");  
     	out.print("</form>\n");       	
    	out.println("<br>");
    	out.println("<br>");       	
    	
    	out.println("<h2>Meteo station application</h2>");

    	out.println("<info2>Application:&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;");    	
    	out.println("<a href='/org.openhs.core.meteostation' accesskey=\"1\" title=\"\">Meteo station page</a>");
    	out.println("<br>");
    	
    	out.println("<info2>Check for updates:&emsp;&emsp;&emsp;");    	
    	out.println("<a href=\"/meteo\" accesskey=\"1\" title=\"\">Link to web-shop</a>");    
    	out.println("<br>");
    	
    	out.println("<br>");
    	out.println("<br>");    	
    }
    
    protected void html_clock (PrintWriter out){
    	/*
    	out.println("<canvas id='myCanvas' width='200' height='100' style='border:1px solid #d3d3d3;'>");
    	out.println("Your browser does not support the HTML5 canvas tag.</canvas>");

		out.println("<script>");
		out.println("var c = document.getElementById('myCanvas');");
		out.println("var ctx = c.getContext('2d');");
		out.println("ctx.beginPath();");
						
		i = i + 5;
		
		out.println("ctx.arc(" + i + ", 50, 40, 0, 2*Math.PI);");
		out.println("ctx.stroke();");
		out.println("</script>");
		
		if (i > 150) i = 100;
		*/   	
    	
    	 out.print("<canvas id='myCanvas' width='578' height='200'></canvas>");
     	 out.println("<script src='web/canvas1.js'></script>");
    	//URL  url = this.getClass().getResource("/web/canvas1.txt");
    	
    	//fileToPage(out, url.getPath());
    	
    }
    
}
