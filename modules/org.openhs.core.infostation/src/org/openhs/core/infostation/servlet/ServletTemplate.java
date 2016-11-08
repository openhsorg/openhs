package org.openhs.core.infostation.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.openhs.core.infostation.Infostation;


public class ServletTemplate extends HttpServlet {

	Infostation	m_infostation = null;
	
	String address = "kitchen";
	String addressHome = "/";
	String addressPrev = "/";
	String addressNext = "/";	
	
	int i = 0;
	
	
	ServletTemplate(Infostation m_infostation) {
		this.m_infostation = m_infostation;		
	}   	
	
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		resp.setContentType("text/html");
		resp.setHeader("Refresh", "1");
       
      	PrintWriter out = resp.getWriter(); 
	        
      	print (out);    	
   	 
      	out.close();          
   }    
   
   @Override
   protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
   	
   }	  
	
   
 protected void print (PrintWriter out){
   	
   	out.println("\n<!DOCTYPE html>");
   	out.println("<html>");
   	out.println("<head>");  
   	   	
   	out.println("<title>Template</title>");  	
   	
   	out.print("</head>\n");
   	out.print("<body>\n");
   	
   	out.println("template only..."); 	
   	
   	out.println("</body>");
   	out.println("</html>");    	
   }    	
}
