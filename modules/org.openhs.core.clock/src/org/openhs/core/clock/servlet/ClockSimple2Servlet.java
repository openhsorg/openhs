package org.openhs.core.clock.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ClockSimple2Servlet extends HttpServlet {
	
	String address = "org.openhs.core.clock.servlet.ClockSimple2Servlet";
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

	    //	out.println("<script src='org.openhs.core.clock.servlet.res/jquery-3.1.1.min.js'></script>");
	    	out.println("<link href='org.openhs.core.clock.servlet.res/clocksimple2/styles.css' rel='stylesheet' type='text/css'>");		    	    	
	    	
	    	out.print("</head>");    		    	
	    	out.println("<body>");

	    	out.println("<canvas id='clockCanvas' class=canvasScreen charset='utf-8' width='600' height='600' style='margin-top: -300px; margin-left: -300px'>");		    			    	
	    	out.println("Error: Your browser does not support the HTML canvas element.");
	    	out.println("</canvas>");

	    	out.println("<script id='myScript' src='org.openhs.core.clock.servlet.res/clocksimple2/clock.js' next='" + addressNext +"' charset='utf-8'></script>");
	    	
	    	out.println("</body>");
	    	out.println("</html>");    	
	    }  

}
