package org.openhs.apps.infostation.webservices;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class InfoStationServlet extends HttpServlet {

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
    	out.println("<title>ABC xxx2</title>");
    	//out.println("<base href='/'>");

    	out.println("<meta name='viewport' content='width=device-width, initial-scale=1'>");
    	out.println("<link rel='icon' type='image/x-icon' href='ohsinfo_res/dist/favicon.ico'>");
    	out.println("<link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet'>");
    	out.println("<link href='https://fonts.googleapis.com/css?family=Oswald|Roboto+Condensed' rel='stylesheet'>");    	
    	out.println("</head>");
    	out.println("<body>");
    	
    //	out.println("blllllllaaaaaaaaaa");
    	
    	
    	out.println("<canvas id='infoCanvas' class=canvasScreen charset='utf-8' width='800' height='500' style='margin-top: -250px; margin-left: -400px'>");
    	out.println("Error: Your browser does not support the HTML canvas element.");
    	out.println("</canvas>");  
    	out.println("<app-root></app-root>");
    	out.println("<script type='text/javascript' src='ohsinfo_res/dist/inline.bundle.js'></script><script type='text/javascript' src='ohsinfo_res/dist/polyfills.bundle.js'></script><script type='text/javascript' src='ohsinfo_res/dist/scripts.bundle.js'></script><script type='text/javascript' src='ohsinfo_res/dist/styles.bundle.js'></script><script type='text/javascript' src='ohsinfo_res/dist/vendor.bundle.js'></script><script type='text/javascript' src='ohsinfo_res/dist/main.bundle.js'></script></body>");
    	
    	out.println("</html>");
    } 	
}
