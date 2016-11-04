package org.openhs.core.remote.access;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URL;
import java.util.Vector;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletConfig;

public class TestServlet extends HttpServlet {

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

    	response.setContentType("text/html");
    //	response.setHeader("Refresh", "5");  

		 PrintWriter out = response.getWriter();
        
    	 print (out);
    	        
         out.close();
         
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String value = request.getParameter("helloValue");
        System.out.println("Test: doPost,helloValue=" + value);
       // response.setContentType("text/html");
       // response.getWriter().print("<html><body>helloValue=" + value + "</body></html>");
        
       
        
    	/*
    	PrintWriter out = response.getWriter();
        
    	 print (out);
    	        
         out.close();
         */
    }
    
    
    protected void print (PrintWriter out){
    	
    	out.println("\n<!DOCTYPE html>");
    	out.println("<html>");
    	out.println("<head>");  
    	    	    	
    	out.println("<script src='web/statistics/RGraph.common.core.js'></script>");
    	out.println("<script src='web/statistics/RGraph.line.js'></script>");

    	//API from "http://www.rgraph.net"
    	out.println("<script src='web/statistics/graph.jsp'></script>");    
    
    	out.println("<title>Statistics</title>");
    	
    	out.print("</head>\n");
    	out.print("<body>\n");

    	out.println("<canvas id='cvs' width='1000' height='400'>");
    	out.println("[No canvas support]");
    	out.println("</canvas>");
    	
    	out.println("</body>");
    	out.println("</html>");    	
    }
    
  
}
