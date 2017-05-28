package org.openhs.apps.cobalt;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class CobaltServlet extends HttpServlet {
	
	@Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/html");
    	response.setCharacterEncoding("UTF-8");
    	//response.setHeader("cache-control", "no-cache");		    	

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
    	//out.println("<meta http-equiv='content-type' content='text/html; charset=UTF8'>");

    	//out.println("<script src='infores/servlets/kitchen/jquery-3.1.1.min.js'></script>");
    	//out.println("<link href='infores/servlets/kitchen/styles.css' rel='stylesheet' type='text/css'>");
    	
    //	out.println("<meta charset='utf-8' />");
    //	out.println("<title>Cobalt</title>");    	

    	
    	out.println("<style>");
    	out.println("body { margin: 0; }");
    	out.println("canvas { width: 100%; height: 100% }");
    	out.println("</style>");
    	
    	

    	 
    	out.print("</head>");    		    	
    	out.println("<body>");
    	
    //	out.println("--------------- COBALT ---------------");

    	
    //	out.println("<div id='content' style='width:500px;height:500px'></div>");

    	out.println("<script src='robotres/three/build/three.js'></script>");
    	out.println("<script src='robotres/CobaltScript.js'></script>");	
    	
    	/*
    	out.println("<canvas id='infoCanvas' class=canvasScreen charset='utf-8' width='850' height='550' style='margin-top: -275px; margin-left: -425px'>");
    	//out.println("<canvas id='infoCanvas' class=canvasScreen charset='utf-8' width='1000' height='600' style='margin-top: -325px; margin-left: -500px'>");
    	out.println("Error: Your browser does not support the HTML canvas element.");
    	out.println("</canvas>");
    	
    	out.println("<script src='infores/servlets/kitchen/OhsSiteData.js' charset='utf-8'></script>");
    	out.println("<script src='infores/servlets/kitchen/OhsWeatherData.js' charset='utf-8'></script>");
    	out.println("<script src='infores/servlets/kitchen/OhsCanvasGraphics.js' charset='utf-8'></script>");
    	out.println("<script src='infores/servlets/kitchen/KitchenServlet.js' charset='utf-8'></script>");
    	
    	out.println("<script type='text/javascript'>");
    	out.println("new KitchenInfoStation.ApplicationKitchen(document.getElementById('infoCanvas'));");
    	out.println("</script>");
    	*/
    	out.println("</body>");
    	out.println("</html>");   	
    }  	

}
