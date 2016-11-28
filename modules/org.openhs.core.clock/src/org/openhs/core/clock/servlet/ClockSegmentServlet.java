package org.openhs.core.clock.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ClockSegmentServlet extends HttpServlet {
	
	String address = "org.openhs.core.clock.servlet.ClockSegmentServlet";
	String addressHome = "/";
	String addressPrev = "/";
	String addressNext = "/";		

	 @Override
	    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {   		 
    		response.setContentType("text/html");
	    	response.setCharacterEncoding("UTF-8");
	    	response.setHeader("cache-control", "no-cache");		    	

    		PrintWriter out = response.getWriter();
        
    		print_html (out);
    	        
    		out.close();	         

	    }

	    @Override
	    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	    	doGet(request, response);
	        
	    }
	    
	    
	    protected void print_html (PrintWriter out){
	    	
	    	out.println("\n<!DOCTYPE html>");
	    	out.println("<html>");
	    	out.println("<head>");
	    	out.println("<meta http-equiv='content-type' content='text/html; charset=UTF8'>");
	    	out.println("<link href='org.openhs.core.clock.servlet.res/clocksegment/styles.css' rel='stylesheet' type='text/css'>");		    	    	

			out.println("<!--[if IE]>");
			out.println("<script type='text/javascript' src='org.openhs.core.clock.servlet.res/clocksegment/excanvas.js'></script>");
			out.println("<![endif]-->");
			
			out.println("<script type='text/javascript' src='org.openhs.core.clock.servlet.res/clocksegment/segment-display.js'></script>");
			out.println("<script id='segmentclock' type='text/javascript' src='org.openhs.core.clock.servlet.res/clocksegment/start.js' next='" + addressNext + "'></script>");			  	
	    	
	    	out.print("</head>");    		    	
	    	out.println("<body>");

	    	out.println("<canvas id='display' class=canvasScreen charset='utf-8' width='120' height='34' style='margin-top: -25px; margin-left: -60px'>");		    			    	
	    	out.println("Error: Your browser does not support the HTML canvas element.");
	    	out.println("</canvas>");
	    	
	    	
	    	/*  
			out.print("<div style='padding: 50px 100px'>");
			out.print("<div style='width: 216px; height: 126px; position: relative; background: transparent url(plexiglas.png) no-repeat top left'>");
			out.print("<div style='position: absolute; left: 38px; top: 33px; width: 120px; height: 34px'>");
			out.print("<canvas id='display' width='120' height='34'></canvas>");
			out.print("</div>");
			out.print("</div>");
			out.print("<p>Dokumentation: <a href='http://www.3quarks.com/de/Segmentanzeige'>http://www.3quarks.com/de/Segmentanzeige</a></p>");
			out.print("</div>");	    	  
	    	 */
	    	
	    	out.println("</body>");
	    	out.println("</html>");    	
	    }  
	    	 
}
