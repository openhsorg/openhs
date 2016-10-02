package org.openhs.core.remote.access;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URL;
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
        
        html_page(out);
        
        out.close();
        
    }    
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	
        PrintWriter out = response.getWriter();
        
        html_page(out);
    	
        String value = request.getParameter("helloValue");
        System.out.println("doPost,helloValue=" + value);
       // response.setContentType("text/html");
       // response.getWriter().print("<html><body>helloValue=" + value + "</body></html>");
   
        
        //response.getWriter().print("<html><body>helloValue=" + value + "</body></html>");
        
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
    
    protected void ccs_styles( PrintWriter out){
    	
    	out.println("\n<style>\n");
    	
    	out.print("h1 {\n" + 
    	"font: 15px arial, sans-serif;\n" +
    	"font-size: 28px;" +    	 
    	"color: #ff6600;" + 
    	"}\n");    	
    	    	
    	out.print("h2 {\n" + 
    	"font: 20px arial, sans-serif;\n" +    	
    	"color: #ff6600;" + 
    	"}\n");      	    	
    	
    	out.print(".tree {\n" +
    	"font: 20px arial, sans-serif;\n" + 
    	"font-size: 18px;\n" +
    	"color: #0174DF;\n" + 
    	"}\n");
    	
    	out.print("info {\n" +
    	"font-family: sans-serif;\n" + 
    	"font-weight: bold;\n" + 
    	"font-size: 16px;\n" +
    	"color: #0174DF;\n" + 
    	"}\n");    	
    	
    	out.print("info2 {\n" +    	
    	"font-family: sans-serif;\n" +     	
    	"font-size: 16px;\n" +	
    	"color: #0174DF;\n" + 
    	"}\n");      	
    	
    	out.print("div.container {\n" +
    	"width: 100%;\n" +
    	"border: 1px solid gray;\n" + 
    	"}\n\n");
    	
    	out.print("\nheader, footer {\n" + 
    	"font: 20px arial, sans-serif;\n" + 
    	"padding: 1em;\n" +
    	"color: #ff6600;\n" +
    	"background-color: #CEE3F6;\n" +
    	"clear: left;\n" +
    	"text-align: center;\n" +
    	"}\n");

    	out.print("\nnav {\n" +
    	"float: left;\n" +
    	"max-width: 600px;\n" +
    	"margin: 0;\n" +
    	"padding: 1em;\n" +
    	"}\n");

    	out.print("\nnav ul {\n" +
    	"list-style-type: none;\n" +
    	"padding: 0;\n" +
    	"}\n");
    	   
    	out.print("\nnav ul a {\n" +
    	"text-decoration: none;\n" +
    	"}\n");
    	
		out.print("\narticle {\n" +
    	"margin-left: 610px;\n" +
    	"border-left: 1px solid gray;\n" +
    	"padding: 1em;\n" +
    	"overflow: hidden;\n" +
    	"}\n");
		
		
		out.print("\n.clt, .clt ul, .clt li {\n"+
		"position: relative;\n" + 
		"font: 14px arial, sans-serif;\n" +
		"}\n");

		out.print("\n.clt ul {\n"+
		"list-style: none;\n"+
		"padding-left: 32px;\n"+
		"}\n");
		
		out.print("\n.clt li::before, .clt li::after {\n"+
		"content: '';\n"+
		"position: absolute;\n"+
		"left: -12px;\n"+
		"}\n");
		
		out.print("\n.clt li::before {\n"+
		"border-top: 1px solid #000;\n"+
		"top: 9px;\n"+
		"width: 8px;\n"+
		"height: 0;\n"+
		"}\n");
		
		out.print("\n.clt li::after {\n"+
		    "border-left: 1px solid #000;\n"+
		    "height: 100%;\n"+
		    "width: 0px;\n"+
		    "top: 2px;\n"+
		"}\n");		
		
		out.print("\n.clt ul > li:last-child::after {\n"+
		    "height: 8px;\n"+
		"}\n");
		
		
		
		out.print("\nbutton {" +
		"color: #900;\n" +
			  "font-weight: bold;\n" +			  
			"}\n");
		
		out.print("\n.submit-button {" +
			  "background-image: url('images/layout/indicatorFrost.png');\n" +
			"}\n");		
		
		
		out.print("\n.buttonx {" +
		"background-color: #4CAF50;\n" +
			  "border: none;\n" +
			  "color: white;\n" +
			  "padding: 15px 32px;\n" +
			  "text-align: center;\n" +
			  "text-decoration: none;\n" +
			  "display: inline-block;\n" +
			  "font-size: 16px;\n" +
			  "border-radius: 5px;\n" +
			"}\n");		
		
		
    	out.println("</style>\n");
    }
    
    protected void html_page(PrintWriter out){
    	
    	    	
    	out.println("\n<!DOCTYPE html>");
    	out.println("<html>");
    	out.println("<head>");
    	
    	ccs_styles(out);
    	
    	out.print("</head>\n");
    	out.print("<body>\n");

    	out.println("<div class='container'>");

    	out.println("<header>");
    	out.println("<h1>Admin page</h1>");
    	out.println("</header>");
    	
    	out.println("<nav>");
    	
    	html_tree(out);
    	
    	out.println("</nav>");   	
    	
    	
    	out.println("<article>");
    	  
    	html_data(out);
    	        
        out.print("<h3>Hello Servlet</h3>" +
                "<form name=\"input\" method=\"post\">\n" +
                "Hello value: <input type=\"text\" name=\"helloValue\">\n" +
                "<input type=\"submit\" value=\"Submit\">\n" +
                "");       	
        
        
        out.print("<form action=\"MyServ\">" +
        "<input type=\"submit\" name=\"btn1\" value=\"click me baby...\">" +
        "<input type=\"submit\" class=\"buttonx\" name=\"btn2\" value=\"OKOKOK\" />" + 
        "<button type=\"submit\" value=\"Submit\">Submit</button>\n" +
        "</form>\n");
        
        
        /*
        URL location = ImageServlet.class.getProtectionDomain().getCodeSource().getLocation();        
        String path = location.getFile() + "images/aaa.jpg";
        
        
        System.out.println("\n\n>>>>>>path: " + path + "\n\n");
        
        out.print("<br>");
        out.print("<a href='#' onclick='document.form[0].submit();'><img src=\"" + path + "\"></a>\n");
        */
            	  
    	out.println("</article>");    	
    	
    	out.println("<footer>Copyright © openhs.org</footer>");

    	out.println("</div>");

    	out.println("</body>");
    	out.println("</html>");
    	
    }
    
    protected void html_tree(PrintWriter out){
    	    	   	
    	out.println("<h2>Data tree structure:</h2>");
    	//out.println("<p class=\"tree\">");
    	    	/*
        if (m_siteService != null) {            	
        	getHouseData(out);
        }
        else {
            out.println("<br/><br/>error no data site :(");
            out.println("<br/>");                    
        }
        */
    	
    	out.println("<div class=\"clt\">");
    	
    	if (m_siteService != null) {   
    		getHouseData2(out);
    	}
    	else {
            out.println("<br/><br/>error no data site :(");
            out.println("<br/>");     
    	}
    
        out.println("</div>");  	    	    	
      //  out.println("</p>");
    }
    
    protected void html_data(PrintWriter out){
	   	
    	out.println("<h2>Information:</h2>");
    	//out.println("<p class='info'>");

    	out.println("<info2>Time: </info2>" + "<info>" + new Date().toString() + "</info>");
    	out.println("<br><info2>Name: </info2>" + "<info>" + "Not specified..." + "</info>");
        
        //out.println("</p>");
    }    
    
    protected void getHouseData2(PrintWriter out) {


    	out.println("<ul>");
        //out.println("<li>Site:" + m_siteService.getId() + "; Number rooms: " + m_siteService.getNumberRooms());
    	out.println("<li><info2>Site:</info2>" + "<info>" + m_siteService.getId() + "</info>");
        out.println("<ul>");
      //  out.println("<br/>Number rooms is: " + m_siteService.getNumberRooms());

        TreeMap<String, Room> rooms = m_siteService.getRooms();

        Set<String> keys = rooms.keySet();

        for (String key : keys) {            
            
            //out.println("<li>Room:" + key + "   ..." + "Num Sensors:" + m_siteService.getNumberSensors(key));
        	out.println("<li><info2>Room:</info2>" + "<info>" + key + "</info>");
            out.println("<ul>");
            TreeMap<String, Sensor> sensors = m_siteService.getSensors(key);

            Set<String> keysSensors = sensors.keySet();

            Temperature temp;
            Humidity 	hum;
            
            for (String keyS : keysSensors) {
                try {
                    temp = m_siteService.getSensorTemperature(key, keyS);
                    hum = m_siteService.getSensorHumidity(key, keyS);
                    
                    out.println("<li><info2>Sensor:</info2>" + "<info>" + keyS + "</info>");
                    
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

    }      
    
    
}
