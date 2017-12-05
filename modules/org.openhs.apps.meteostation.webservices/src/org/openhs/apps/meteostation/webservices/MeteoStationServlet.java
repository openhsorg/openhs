package org.openhs.apps.meteostation.webservices;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class MeteoStationServlet extends HttpServlet {
	
	@Override
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	 
 		response.setContentType("text/html");
	    response.setCharacterEncoding("UTF-8");
	    response.setHeader("cache-control", "no-cache");		    	

 		PrintWriter out = response.getWriter();
     
 		print_html2 (out);
 	        
 		out.close();	         
	 
    }

	@Override
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        	       
	    	
	}	

	
    protected void print_html2 (PrintWriter out){
    	
    	out.println("<!doctype html>");
    	out.println("<html lang='en'>");
    	out.println("<head>");
    	out.println("<meta charset='utf-8'>");
    	out.println("<title>Meteo Station</title>");
    	//out.println("<base href='/'>");

    	out.println("<meta name='viewport' content='width=device-width, initial-scale=1'>");
    	out.println("<link rel='icon' type='image/x-icon' href='meteores/dist/favicon.ico'>");
    	out.println("</head>");
    	out.println("<body>");
    	
    //	out.println("blllllllaaaaaaaaaa");
    	
    	
    	out.println("<canvas id='infoCanvas' class=canvasScreen charset='utf-8' width='850' height='550' style='margin-top: -275px; margin-left: -425px'>");
    	out.println("Error: Your browser does not support the HTML canvas element.");
    	out.println("</canvas>");  
    	out.println("<app-root></app-root>");
    	out.println("<script type='text/javascript' src='meteores/dist/inline.bundle.js'></script><script type='text/javascript' src='meteores/dist/polyfills.bundle.js'></script><script type='text/javascript' src='meteores/dist/scripts.bundle.js'></script><script type='text/javascript' src='meteores/dist/styles.bundle.js'></script><script type='text/javascript' src='meteores/dist/vendor.bundle.js'></script><script type='text/javascript' src='meteores/dist/main.bundle.js'></script></body>");
    	
    	out.println("</html>");
    } 	
}
