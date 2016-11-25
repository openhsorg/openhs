package org.openhs.core.clock.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Clock1Servlet extends HttpServlet {
	
	String address = "org.openhs.core.clock.servlet.Clock1Servlet";
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
	    	out.println("<link href='org.openhs.core.clock.servlet.res/clock1/styles.css' rel='stylesheet' type='text/css'>");		    	    	
			
			out.println("<script type='text/javascript' src='org.openhs.core.clock.servlet.res/clock1/canvas_clock.js'></script>");					  	
	    	
	    	out.print("</head>");    		    	
	    	out.println("<body>");

	    	out.println("<canvas id='clock1_' class=canvasScreen charset='utf-8' width='600' height='600' style='margin-top: -300px; margin-left: -300px'>");		    			    	
	    	out.println("Error: Your browser does not support the HTML canvas element.");
	    	out.println("</canvas>");
	    	
	    	out.println("<script id='clock1script' type='text/javascript' src='org.openhs.core.clock.servlet.res/clock1/start.js' next='" + addressNext + "'></script>");	    	
	    	
	    	out.println("</body>");
	    	out.println("</html>");    	
	    }  
	
}