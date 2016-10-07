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

import org.openhs.core.commons.Room;
import org.openhs.core.commons.Sensor;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Temperature;
import org.openhs.core.commons.Humidity;
import org.openhs.core.meteostation.Meteostation;
import org.openhs.core.site.data.ISiteService;

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

public class AdminServlet extends HttpServlet{
    private ISiteService m_siteService = null;
    private Meteostation m_meteo = null;

    int i = 100;
    
   // int screen = 0; //0 - admin, 1 - data structure
  //  boolean edit = false;
    
    AdminScreens  		screen = AdminScreens.ADMIN;
    AdminScreensDetail  sreenDet = AdminScreensDetail.NONE;
    AdminScreensButtons btn = AdminScreensButtons.NONE;
    
    String dataItemID = "";

    AdminServlet(ISiteService site, Meteostation meteo) {
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
    	
    	System.out.println("...doPost");
    	       
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
            
            m_siteService.setRoomKey (dataItemID, value);
                        
            
        } else if (request.getParameter(AdminScreensButtons.SENSOR_NAME.toString()) != null) {
        	System.out.println(AdminScreensButtons.SENSOR_NAME.toString());
        	
            String value = request.getParameter(AdminScreensButtons.SENSOR_NAME.toString());
            System.out.println("Sensor Name changing =" + value);    
            
            m_siteService.setSensorKey (dataItemID, value);                         
            
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
    
    protected void getHouseData(PrintWriter out) {


        out.println("<info2>Site:</info2> " + "<info>" + m_siteService.getId() + "; Number rooms: " + m_siteService.getNumberRooms() + "</info>");
      //  out.println("<br/>Number rooms is: " + m_siteService.getNumberRooms());

        TreeMap<String, Room> rooms = m_siteService.getRooms();

        Set<String> keys = rooms.keySet();

        for (String key : keys) {
            out.println(" ");
            out.println("<br/>|<br/>|");
            out.println("-- <info2>Room:</info2>" + key + "   ..." + "Num Sensors:" + m_siteService.getNumberSensors(key));

            TreeMap<String, Sensor> sensors = m_siteService.getSensors(key);

            Set<String> keysSensors = sensors.keySet();

            Temperature temp;
            Humidity 	hum;
            
            for (String keyS : keysSensors) {
                try {
                    temp = m_siteService.getSensorTemperature(key, keyS);
                    hum = m_siteService.getSensorHumidity(key, keyS);

                    out.println("<br/>|&nbsp;&nbsp;&nbsp;|- Sensor:" + keyS);
                    out.println("  ...Temperature: " + temp.getCelsiusString() + " C" + "; ");
                    out.println(" Humidity: " + hum.getString() + " %" + "; ");
                } catch (SiteException ex) {

                }

                // out.println("<br><tr/> -" + keyS + " Temperature: " + temp.get() + " C");
            }
        }

    }    
    
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
    	
    	out.println("<footer>Copyright � openhs.org</footer>");

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
        	out.println("<br><info2>Name: </info2>" + "<info>" + "Not specified..." + "</info>");    
        	
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

        TreeMap<String, Room> rooms = m_siteService.getRooms();

        Set<String> keys = rooms.keySet();

        for (String key : keys) {            
            
            //out.println("<li>Room:" + key + "   ..." + "Num Sensors:" + m_siteService.getNumberSensors(key));
        	//out.println("<li><info2>Room:</info2>" + "<info>" + key + "</info>");
        	
            out.print("<li><form name='admin' method='post' action=''>" +
                    "<input type='submit' class='buttonSensorEdit' name='" + btn.ROOM.toString() + "' value='" + key + "'>" +
                    "</form>");           	
        	
            out.println("<ul>");
            TreeMap<String, Sensor> sensors = m_siteService.getSensors(key);

            Set<String> keysSensors = sensors.keySet();

            Temperature temp;
            Humidity 	hum;
            
            for (String keyS : keysSensors) {
                try {
                    temp = m_siteService.getSensorTemperature(key, keyS);
                    hum = m_siteService.getSensorHumidity(key, keyS);
                                        
                //    out.print("<li><info2>Sensor:</info2>" + "<info>" + keyS + "</info>");
                    
                 //   out.print("<a href='/meteo' accesskey='1' title=''>Meteo station</a>");
                    
                    out.print("<li><form name='admin' method='post' action=''>" +
                            "<input type='submit' class='buttonSensorEdit' name='" + btn.SENSOR.toString() + "' value='" + keyS + "'>" +
                            "</form>");                    
                    
                //    out.print("<br>");
                    
                    out.println("<ul>");
                    out.println("<li><info2>Temperature.</info2>" + "<info>" + temp.getCelsiusString() + " C" + "; </info></li>");                    
                    out.println("<li><info2>Humidity:</info2>" + "<info>" + hum.getString() + " %" + "; </info></li>");
                                        
                    out.println("</ul>");
                    out.println("</li>");
                } catch (SiteException ex) {

                }
            }    
           out.println("</ul>"); 
           out.println("</li>");
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
            out.print("<info2>Number of rooms: </info2>" + "<info2>" + m_siteService.getNumberRooms() + "</info2>");
        break;
        
    	case ROOM:
    		
    		out.println("<h2>Room detail:</h2>");
        	
            out.print("<form name='input' method='post'>\n" +
                    "<info2>Name of room:</info2> <input type='text' name='" + AdminScreensButtons.ROOM_NAME.toString() + "' value='" + dataItemID + "'>\n" +
                    "<input type='submit' value='Submit'>" +
                    ""); 
            
            out.print("<br>");
            out.print("<info2>Number of sensors: </info2>" + "<info2>" + m_siteService.getNumberSensors(dataItemID) + "</info2>");
            
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
            	temp = m_siteService.getSensorTemperature("Room1", dataItemID);
            	hum = m_siteService.getSensorHumidity("Room1", dataItemID);
            	
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
    	
        TreeMap<String, Room> rooms = m_siteService.getRooms();

        Set<String> keys = rooms.keySet();

        for (String key : keys) {
        	
            TreeMap<String, Sensor> sensors = m_siteService.getSensors(key);

            Set<String> keysSensors = sensors.keySet();

            for (String keyS : keysSensors) {
            	sensorList.add(key + "/" + keyS);
            }        
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
    	out.println("<a href=\"/meteo\" accesskey=\"1\" title=\"\">Meteo station page</a>");
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
     	 out.println("<script src='web/canvas1.jsp'></script>");
    	//URL  url = this.getClass().getResource("/web/canvas1.txt");
    	
    	//fileToPage(out, url.getPath());
    	
    }
    
}
