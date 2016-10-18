package org.openhs.core.meteostation.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.openhs.core.commons.Temperature;
import org.openhs.core.commons.Weather;
import org.openhs.core.meteostation.Meteostation;

public class ServletDigital extends HttpServlet {
	
	private Meteostation m_meteo = null;
	
	String address = "org.openhs.core.meteostation.digital";
	
	int i = 0;
	
	
	ServletDigital(Meteostation meteo) {
		this.m_meteo = meteo;
	}   	
	
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
       resp.setContentType("text/html");
       resp.setHeader("Refresh", "1");
       
      	PrintWriter out = resp.getWriter(); 
	        
      	print (out);    	
   	 
      	out.close();          
   }    
   
   @Override
   protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
   	
   }	
   
	private void performTask(HttpServletRequest request, HttpServletResponse response) throws ServletException,
	IOException {
		
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.println("TestServlet says hi<br/>");
		
		String action = request.getParameter("action");
		if (action != null) {
			RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
			if ("include".equalsIgnoreCase(action)) {
				rd.include(request, response);
			} else if ("forward".equalsIgnoreCase(action)) {
				rd.forward(request, response);
			}
		}
}    
   
   
 protected void print (PrintWriter out){
   	
   	out.println("\n<!DOCTYPE html>");
   	out.println("<html>");
   	out.println("<head>");  
   	    	    	
   	//out.println("<script src='res/web/gauge.min.js'></script>");
   	    	
   //	out.println("<script src='web/meteo/meteo.jsp'></script>");    
   	
   	out.println("<link href='/res/web/meteo_styles.css' rel='stylesheet' type='text/css'>");
   	out.println("<link href='/res/web/servletdigital/styles.css' rel='stylesheet' type='text/css'>");
   	   	
   	out.println("<title>Meteo</title>");  	
   	
   	out.print("</head>\n");
   	out.print("<body>\n");
   	
   	out.println("<canvas id='canvas' class='canvas0' width=800 height=600></canvas>");
   	//out.println("<canvas id='canvas1' class='canvas1'></canvas>");
   	//out.println("<canvas id='canvas2' class='canvas2'></canvas>");
    Date curDate = new Date();
    SimpleDateFormat format = new SimpleDateFormat("hh:mm:ss");
    String TimeToStr = format.format(curDate); 	
   	
	out.println("<script id='InputVars' type='text/javascript' ccc='ahojte'>");
	out.println("var TempInDesc = 'In:';");
	out.println("var TempInVal = '" + m_meteo.getTempIn() + "';");	
	out.println("var TempOutDesc = 'Out:';");
	out.println("var TempOutVal = '" + getTempOut() + "';");
	out.println("var Time = '" + TimeToStr + "';");
	out.println("</script>");
   	
   	out.println("<script type='text/javascript' src='/res/web/servletdigital/scripts.jsp'></script>");
   	
    out.println("<form name='clock' method='' action='/org.openhs.core.meteostation'>" +
    "<input type='submit' class='button' name='next' value=''>" +
    "</form>");    	
   	
   	out.println("</body>");
   	out.println("</html>");    	
   }    
 
 public float getTempOut(){
	  
	  float tmp = -5f;
	  
	  Weather wet = m_meteo.getCurrentWeather();
	  
	  Temperature temp = wet.getTemperature();
	  
	  tmp = (float) temp.getCelsius();
	  
	 // System.out.println("\n.....TEMP.........>:" + tmp);
	  	  
	  return tmp;
 }	
}
