package org.openhs.core.remote.access;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ClockServlet  extends HttpServlet {

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
	        System.out.println("doPost,helloValue=" + value);

	    }
	    
	    
	    protected void print (PrintWriter out){
	    	
	    	out.println("\n<!DOCTYPE html>");
	    	out.println("<html>");
	    	out.println("<head>");
	    	out.println("<title>Clock</title>");	    	   	    		    	  	    	    		    	
	    	out.print("</head>");
	    	
	    	out.print("<body onLoad='clock();'>");

	    	out.println("<script src='web/clock/clock.jsp'></script>");  
	    	out.println("<canvas id='cnv'></canvas>");
	    	
	    	out.println("</body>");
	    	out.println("</html>");    	
	    }
	    
}
