package org.openhs.apps.coreadmin;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.osgi.service.http.HttpService;
import org.osgi.service.http.NamespaceException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class Admin extends HttpServlet {
	
	private Logger logger = LoggerFactory.getLogger(Admin.class);

	HttpService m_httpService = null;
	
	
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
	        
	       
	    	
	}
	    
	    
    protected void print_html (PrintWriter out){
    	
    	out.println("\n<!DOCTYPE html>");
    	out.println("<html>");
    	out.println("<head>");
    	out.println("<meta http-equiv='content-type' content='text/html; charset=UTF8'>");

    	out.println("<script src='adminres/OhsLibrary/jquery-3.1.1.min.js'></script>");
    	out.println("<link href='adminres/OhsLibrary/styles.css' rel='stylesheet' type='text/css'>");
    	    	
    	out.print("</head>");    		    	
    	out.println("<body>");
    	
//    	out.println("Hello Admin!");
    	
    	out.println("<canvas id='infoCanvas' class=canvasScreen charset='utf-8' width='850' height='550' style='margin-top: -275px; margin-left: -425px'>");
    	//out.println("<canvas id='infoCanvas' class=canvasScreen charset='utf-8' width='1000' height='600' style='margin-top: -325px; margin-left: -500px'>");
    	out.println("Error: Your browser does not support the HTML canvas element.");
    	out.println("</canvas>");
    	
    	out.println("<script src='adminres/OhsLibrary/OhsSiteData.js' charset='utf-8'></script>");    	
    	out.println("<script src='adminres/OhsLibrary/OhsCanvasGraphics.js' charset='utf-8'></script>");
    	out.println("<script src='adminres/AdminApp.js' charset='utf-8'></script>");
    	
    	out.println("<script type='text/javascript'>");
    	out.println("new AdminApp.Admin(document.getElementById('infoCanvas'));");
    	out.println("</script>");
    	
    	out.println("</body>");
    	out.println("</html>");    	
    }  	

	
	public void activate () {
		System.out.println("Component Admin activated!");
		
		/* Make adress references */										
        try {
            m_httpService.registerServlet("/admin", this, null, null);  
            m_httpService.registerResources("/adminres", "/res", null);                        
        } catch (ServletException e) {
            // TODO Auto-generated catch block
        	System.out.println("\n\n--->*************************");
            e.printStackTrace();
        } catch (NamespaceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }  		
	}

	public void deactivate() {
		System.out.println("Component Admin de-activated!");
	}	
	
    public void setService(HttpService ser) {
    	logger.info("org.openhs.core.remote.access: Set HttpService");
        m_httpService = ser;
    }

    public void unsetService(HttpService ser) {
    	logger.info("org.openhs.core.remote.access: UnSet HttpService");
        if (m_httpService == ser) {
            m_httpService = null;
        }
    }	

}