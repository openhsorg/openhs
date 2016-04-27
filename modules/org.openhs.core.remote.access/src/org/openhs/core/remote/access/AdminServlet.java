package org.openhs.core.remote.access;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.Set;
import java.util.TreeMap;

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

public class AdminServlet extends HttpServlet{
    private ISiteService m_siteService = null;

    int i = 0;

    AdminServlet(ISiteService site) {
    	m_siteService = site;
    }

    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html");
        resp.setHeader("Refresh", "5");
        
     //   System.out.println("Site ID is: " + m_siteService.getId());

        i++;

        PrintWriter out = resp.getWriter();

        // Write the response message, in an HTML page
        try {

            out.println("<!DOCTYPE html>");
            out.println("<html lang='en'>");
            out.println("<head>");
            out.println("<meta charset='utf-8'/>");
            out.println("<link href='css/some-stylesheet.css' rel='stylesheet'/>");
            out.println("<body>");
            
            out.println("<font color=green>");
            out.println("<h1>Admin page...\n</h1>");
            out.println("<font color=green>");
            out.println("<p style='font-family:Courier; color:#0020C2; font-size: 20px;'>");
            out.println("Date: " + new Date().toString() + "     Refresh:" + i);
            out.println("</p>");

            out.println("<font color=black>");
            out.println("<br/>---------- OpenHS Core Data ---------");
            out.println("<br/>");            

            if (m_siteService != null) {            	
            	getHouseData(out);
            }
            else {
                out.println("<br/><br/>error no data site :(");
                out.println("<br/>");                    
            }
            
            out.println("</body>");
            out.println("</html>");

        } finally {
            out.close(); // Always close the output writer
        }
    }    
    
    protected void getHouseData(PrintWriter out) {


        out.println("<br/>Site ID: " + m_siteService.getId() + "...Number rooms: " + m_siteService.getNumberRooms());
      //  out.println("<br/>Number rooms is: " + m_siteService.getNumberRooms());

        TreeMap<String, Room> rooms = m_siteService.getRooms();

        Set<String> keys = rooms.keySet();

        for (String key : keys) {
            out.println(" ");
            out.println("<br/>|<br/>|");
            out.println("-- Room:" + key + "   ..." + "Num Sensors:" + m_siteService.getNumberSensors(key));

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
}
