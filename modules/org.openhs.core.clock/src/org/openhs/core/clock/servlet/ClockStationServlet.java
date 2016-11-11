package org.openhs.core.clock.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ClockStationServlet extends HttpServlet {
	
	
	String address = "org.openhs.core.clock.servlet.ClockStationServlet";
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
	        /*
	    	System.out.println("\n\n...POST");
	        
		 	String value = request.getParameter("orderId");
	        
	    	if (value != null) {
	    		System.out.println("Value:=" + value.toString());
	    		
	    		if (value.toString().equals("next")) {
	    			
	    				    			
	    		}	    		
	    	}
	    	
	    	
	    	value = request.getParameter("Kitchen");
	    	
	    	if (value != null) {
	    		System.out.println("Value:=" + value.toString());
	    		
	    		if (value.toString().equals("Kitchen")) {
	    			
	    			  doGet(request, response);			    			
	    		}	    		
	    	}	    	
	        */
	    	doGet(request, response);
	        
	    }
	    
	    
	    protected void print_html (PrintWriter out){
	    	
	    	out.println("\n<!DOCTYPE html>");
	    	out.println("<html>");
	    	out.println("<head>");
	    	out.println("<meta http-equiv='content-type' content='text/html; charset=UTF8'>");
	    	out.println("<link href='org.openhs.core.clock.servlet.res/clockstation/styles.css' rel='stylesheet' type='text/css'>");		    	    	

			out.println("<!--[if IE]>");
			out.println("<script type='text/javascript' src='org.openhs.core.clock.servlet.res/clockstation/excanvas.js'></script>");
			out.println("<![endif]-->");
			
			out.println("<script type='text/javascript' src='org.openhs.core.clock.servlet.res/clockstation/station-clock.js'></script>");
			out.println("<script id='stationclock' type='text/javascript' src='org.openhs.core.clock.servlet.res/clockstation/start.js' next='" + addressNext + "'></script>");			  	
	    	
	    	out.print("</head>");    		    	
	    	out.println("<body>");

	    	out.println("<canvas id='clock' class=canvasScreen charset='utf-8' width='800' height='600' style='margin-top: -250px; margin-left: -350px'>");		    			    	
	    	out.println("Error: Your browser does not support the HTML canvas element.");
	    	out.println("</canvas>");
	    	
	    	out.println("</body>");
	    	out.println("</html>");    	
	    }  
	    	   
}
