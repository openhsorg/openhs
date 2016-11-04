package org.openhs.core.remote.access;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class WelcomeServlet extends HttpServlet {
	
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    	response.setContentType("text/html");
    //	response.setHeader("Refresh", "5");  

		 PrintWriter out = response.getWriter();
        
		 html_page (out);
    	        
         out.close();
         
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String value = request.getParameter("helloValue");
        System.out.println("Welcome: doPost,helloValue=" + value);
/*
        System.out.println("...doPost");
	       
        if (request.getParameter("Administration") != null) {
        	System.out.println("...Administration");
        	
        	
        } else if (request.getParameter("Datastruct") != null) {       	
        	System.out.println("...Datastruct");

        	
        } else if (request.getParameter(AdminScreensButtons.B_METEO.toString()) != null) {
        	        	
         	          	
          	
        } else{
        	
        }
        */
        
         PrintWriter out = response.getWriter();
	        
		 html_page (out);
   	        
         out.close();
    }
    
    
    protected void html_page (PrintWriter out){
    	
    	out.println("\n<!DOCTYPE html>");
    	out.println("<html>");
    	out.println("<head>");  
    	    	    	
    	//out.println("<script src='web/statistics/RGraph.common.core.js'></script>");
    	//out.println("<script src='web/statistics/RGraph.line.js'></script>");

   // 	out.println("<script src='web/statistics/graph.jsp'></script>");  
    	out.println("<link href='/web/welcome/welcome_styles.css' rel='stylesheet' type='text/css'>");
    
    	out.println("<title>OpenHS Welcome...</title>");
    	
    	out.print("</head>\n");
    	out.print("<body>\n");
    	
    	
        out.println("<form name='admin' method='post' action='/openhs'>" +
        "<input type='submit' class='button' name='Administration' value='Administration'>" +
        "</form>");     	
        
        out.println("<form name='meteo' method='' action='/org.openhs.core.meteostation'>" +
        "<input type='submit' class='button1' name='Meteo' value='Meteo'>" +
        "</form>");  
        
        out.println("<form name='stats' method=	'' action='/stats'>" +
        "<input type='submit' class='button2' name='Statisticss' value=''>" +
        "</form>");          

        out.println("<form name='clock' method='' action='/clock'>" +
        "<input type='submit' class='button3' name='Clock' value=''>" +
        "</form>");   
    	
    	//out.println("Testing...asfsdfdsf");
    	
    	out.println("</body>");
    	out.println("</html>");    	
    }	

}
