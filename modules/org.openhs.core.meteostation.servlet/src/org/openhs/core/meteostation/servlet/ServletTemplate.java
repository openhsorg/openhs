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

public class ServletTemplate extends HttpServlet {
	
	public MeteostationServlet m_main = null;
	public Meteostation m_meteo = null;
	
	String address = "org.openhs.core.meteostation.digital";
	String addressHome = "/";
	String addressPrev = "/";
	String addressNext = "/";	
	
	int i = 0;
	
	
	ServletTemplate(MeteostationServlet m_main) {
		this.m_main = m_main;
		this.m_meteo = m_main.m_meteo;
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
	
   
 protected void print (PrintWriter out){
   	
   	out.println("\n<!DOCTYPE html>");
   	out.println("<html>");
   	out.println("<head>");  
   	    	    	
   	//out.println("<script src='res/web/gauge.min.js'></script>");
   	    	
   //	out.println("<script src='web/meteo/meteo.jsp'></script>");    
   	
   //	out.println("<link href='/res/web/meteo_styles.css' rel='stylesheet' type='text/css'>");
 //  	out.println("<link href='/res/web/servletdigital/styles.css' rel='stylesheet' type='text/css'>");
   	   	
   	out.println("<title>Template</title>");  	
   	
   	out.print("</head>\n");
   	out.print("<body>\n");
   	
   	out.println("template only..."); 	
   	
   	out.println("</body>");
   	out.println("</html>");    	
   }    

}
