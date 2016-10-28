package org.openhs.core.infostation.servlet;

import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.openhs.core.infostation.Infostation;

public class ServletWhite extends ServletTemplate {

	ServletWhite(Infostation m_infostation) {
		super(m_infostation);
		// TODO Auto-generated constructor stub
		
		address = "cecil";
	}

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	protected void print (PrintWriter out){
	   	
	   	out.println("\n<!DOCTYPE html>");
	   	out.println("<html>");
	   	out.println("<head>");  
  
	   	
	   	//out.println("<link href='/res/web/meteo_styles.css' rel='stylesheet' type='text/css'>");
	   	//out.println("<link href='/res/web/servletdigital/styles.css' rel='stylesheet' type='text/css'>");
	   	   	
	   	out.println("<title>Infostation</title>");  	
	   	
	   	out.print("</head>\n");
	   	out.print("<body>\n");
	   	
	    out.print(".............Infostation;");
	   	
	   	out.println("</body>");
	   	out.println("</html>");    	
	   }   	

}
