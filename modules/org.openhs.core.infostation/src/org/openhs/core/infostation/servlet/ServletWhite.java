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
  
	   	
	   	out.println("<link href='/infores/servlets/white/styles.css' rel='stylesheet' type='text/css'>");
	   	//out.println("<link href='/res/web/servletdigital/styles.css' rel='stylesheet' type='text/css'>");
	   	   	
	   	out.println("<title>Infostation</title>");  	
	   	
	   	out.print("</head>\n");
	   	out.print("<body>\n");
	   	
	   	String imageCirc = "/infores/servlets/white/circle.png";
	   	String imageFcs = "/infores/servlets/white/sunny.png";
	   	String imageDrop = "/infores/servlets/white/drop.png"; 
	   	String imageWind = "/infores/servlets/white/wind.png"; 
	   	//String imageFcs = "/infores/servlets/white/sunny.png"; 
	   	
	   	
	   	out.println("<img src='" + imageCirc + "' class='imageCircle' alt=''>");
	    out.println("<img src='" + imageFcs + "' class='imageForecast' alt=''>");
	    out.println("<img src='" + imageWind + "' class='imageWind' alt=''>");
	    out.println("<img src='" + imageDrop + "' class='imageDrop' alt=''>");
	    
	    
	    out.println("<tempText>" + "-16 °C </tempText>");
	    out.println("<windText>" + "160 m/s </windText>");
	    
	    Date curDate = new Date();
	    SimpleDateFormat format = new SimpleDateFormat("HH:MM");
	    String timeStr = format.format(curDate); 	    
	    
	    out.println("<timeText>" + timeStr + "</timeText>");
	    
	    
	    SimpleDateFormat formatDate = new SimpleDateFormat("EEE MMM dd yyyy");
	    String timeStrDate = formatDate.format(curDate); 	    
	    
	    out.println("<dateText>" + timeStrDate + "</dateText>");
	    
	    out.println("<mainTempText>-16 °C" + "</mainTempText>");
	    out.println("<humText>48" + "</humText>");
	   	
	   	out.println("</body>");
	   	out.println("</html>");    	
	   }   	

}
