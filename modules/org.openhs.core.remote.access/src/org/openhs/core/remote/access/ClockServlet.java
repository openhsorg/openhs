package org.openhs.core.remote.access;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ClockServlet  extends HttpServlet {
	
	
	MyThread m_thread = new MyThread ();
	
	ClockServlet () {
		m_thread.start();
	}

	 @Override
	    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		 	System.out.println("\n\n...GET:" + m_thread.i);
		 
	    	response.setContentType("text/html");
	    	//response.setHeader("Refresh", "1");  

			 PrintWriter out = response.getWriter();
	        
	    	 print (out);
	    	        
	         out.close();
	        /* 
	         try{
	         Thread.sleep(1000);
	         }
	         catch (Exception ex) {
	        	 
	         }
	         
	         doPost(request, response);
	         */
	    }

	    @Override
	    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	        
	    	System.out.println("\n\n...POST");
	    	
	    	String value = request.getParameter("orderId").toString();
	        
	        System.out.println("Value:=" + value);
	        
	        doGet(request, response);
	        
	    }
	    
	    
	    protected void print (PrintWriter out){
	    	
	    	out.println("\n<!DOCTYPE html>");
	    	out.println("<html>");
	    	out.println("<head>");
	    	out.println("<title>Clock</title>");	   
	    	
	    	out.println("<script src='web/jquery-3.1.1.min.js'></script>");
	    	//out.println("<script src='web/test1.js'></script>");
	    	
	    	out.print("</head>");
	    	/*
	    	//CLOCK
	    	out.print("<body onLoad='clock();'>");

	    	out.println("<script src='web/clock/clock.jsp'></script>");  
	    	out.println("<canvas id='cnv'></canvas>");
	    	*/
	    		    	
	    	
	    	out.println("<body>");
	    	

 			//CLOCK 2
	    	out.println("<canvas id='clockCanvas' width='200' height='200' style='margin-top: 15px; margin-bottom:20px'>");
	    	out.println("Error: Your browser does not support the HTML canvas element.");
	    	out.println("</canvas>");

	    	out.println("<script src='web/test.js'></script>");
	    	
	    	out.println("<script type='text/javascript'>");
	    	out.println("new StationClock.Temperature(document.getElementById('clockCanvas'));");
	    	out.println("</script>");
	    	
	    	
	    	/*
	    	out.println("<p>I-counter: " + m_thread.i + "</p>");
	    	out.println("<p>If you click on me, I will disappear.</p>");
	    	out.println("<p>Click me away!</p>");
	    	out.println("<p>Click me too!!!</p>");
	    	*/
	    	
	    	//out.println("<button>Send an HTTP POST request to a page and get the result back</button>");

	    	
	    	out.println("</body>");
	    	out.println("</html>");    	
	    }
	    
}
