package org.openhs.core.meteostation.servlet;

import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.Date;

public class ServletDigital extends ServletTemplate {
	

	ServletDigital(MeteostationServlet m_main) {
		super(m_main);

		address = "org.openhs.core.meteostation.digital";
	}

	private static final long serialVersionUID = 1L;

	protected void print (PrintWriter out){
	   	
	   	out.println("\n<!DOCTYPE html>");
	   	out.println("<html>");
	   	out.println("<head>");  
	   	    	    	
	   	//out.println("<script src='res/web/gauge.min.js'></script>");
	   	    	
	   //	out.println("<script src='web/meteo/meteo.jsp'></script>");    
	   	
	   	out.println("<link href='/res/web/meteo_styles.css' rel='stylesheet' type='text/css'>");
	   	out.println("<link href='/res/web/servletdigital/styles.css' rel='stylesheet' type='text/css'>");
	   	   	
	   	out.println("<title>Meteo</title>");  	
	   	
	   	out.print("</head>\n");
	   	out.print("<body>\n");
	   	
	   	out.println("<canvas id='canvas' class='canvas0' width=800 height=600></canvas>");
	   	//out.println("<canvas id='canvas1' class='canvas1'></canvas>");
	   	//out.println("<canvas id='canvas2' class='canvas2'></canvas>");
	    Date curDate = new Date();
	    SimpleDateFormat format = new SimpleDateFormat("hh:mm:ss");
	    String TimeToStr = format.format(curDate); 	
	   	
		out.println("<script id='InputVars' type='text/javascript' ccc='ahojte'>");
		out.println("var TempInDesc = 'In:';");
		out.println("var TempInVal = '" + m_meteo.getTempIn() + "';");	
		out.println("var TempOutDesc = 'Out:';");
		out.println("var TempOutVal = '" + getTempOut() + "';");
		out.println("var Time = '" + TimeToStr + "';");
		out.println("</script>");
	   	
	   	out.println("<script type='text/javascript' src='/res/web/servletdigital/scripts.jsp'></script>");
	   	
	    out.println("<form name='clock' method='' action='" + addressHome + "'>" +
	    "<input type='submit' class='buttonHome' name='next' value=''>" +
	    "</form>");    	
	    
	    out.println("<form name='clock' method='' action='/" + addressNext + "'>" +
	    "<input type='submit' class='buttonNext' name='next' value=''>" +
	    "</form>"); 	    
	   	
	   	out.println("</body>");
	   	out.println("</html>");    	
	   }    
 
}
