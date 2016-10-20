package org.openhs.core.meteostation.servlet;

import java.io.PrintWriter;

public class ServletGauge  extends ServletTemplate {
	
	int i = 0;
	
	ServletGauge(MeteostationServlet m_main) {
		super(m_main);
		
		address = "org.openhs.core.meteostation";
		
	}   	
	
	private static final long serialVersionUID = 1L;	
   
	 protected void print (PrintWriter out){
	   	
	   	out.println("\n<!DOCTYPE html>");
	   	out.println("<html>");
	   	out.println("<head>");  
	   	    	    	
	   	out.println("<script src='res/web/gauge.min.js'></script>");
	   	    	
	   //	out.println("<script src='web/meteo/meteo.jsp'></script>");    
	   	
	   	out.println("<link href='/res/web/meteo_styles.css' rel='stylesheet' type='text/css'>");
	   
	   	out.println("<title>Meteo</title>");
	   	
	   	out.print("</head>\n");
	   	out.print("<body>\n");
	   	
	   	/*
	   	out.println("<canvas id='cvs' width='300' height='300'>");
	
	   	out.println("</canvas>"); 
	   	*/    	
	   	
	   	float tempOut = m_meteo.getTempOut();
	   	float tempIn = m_meteo.getTempIn();
	   	
	   	float temp = Float.NaN;
	   	
	   	for (int i = 1; i <= 3; i++) {
	   		
	   		if (i == 1) {    			 
	   			
					out.println("<canvas class='cnv1' data-type='radial-gauge'");						
					out.println("data-value='" + tempOut + "'");
					out.println("data-title='Outside Temp'");
					
	   		} else {    			
					out.println("<canvas class='cnv2' data-type='radial-gauge'");						
					out.println("data-value='" + tempIn + "'");
					out.println("data-title='Inside Temp'");    			    			
	   		}    		
				
				out.println("data-width='300'");
				out.println("data-height='300'");
				out.println("data-units='°C'");			
				out.println("data-min-value='-50'");
				out.println("data-max-value='50'");
				out.println("data-major-ticks='[-50,-40,-30,-20,-10,0,10,20,30,40,50]'");
				out.println("data-minor-ticks='2'");
				out.println("data-stroke-ticks='true'");
				out.println("data-highlights='[ {&quot;from&quot;: -50, &quot;to&quot;: 0, &quot;color&quot;: &quot;rgba(0,0, 255, .3)&quot;}, {&quot;from&quot;: 0, &quot;to&quot;: 50, &quot;color&quot;: &quot;rgba(255, 0, 0, .3)&quot;} ]'");
				out.println("data-ticks-angle='225'");
				out.println("data-start-angle='67.5'");
				out.println("data-color-major-ticks='#ddd'");
				out.println("data-color-minor-ticks='#ddd'");
				out.println("data-color-title='#eee'");
				out.println("data-color-units='#ccc'");
				out.println("data-color-numbers='#eee'");
				out.println("data-color-plate='#222'");
				out.println("data-border-shadow-width='0'");
				out.println("data-borders='true'");
				out.println("data-needle-type='arrow'");
				out.println("data-needle-width='2'");
				out.println("data-needle-circle-size='7'");
				out.println("data-needle-circle-outer='true'");
				out.println("data-needle-circle-inner='false");
				out.println("data-animation-duration='1500'");
				out.println("data-animation-rule='linear'");
				out.println("data-color-border-outer='#333'");
				out.println("data-color-border-outer-end='#111'");
				out.println("data-color-border-middle='#222'");
				out.println("data-color-border-middle-end='#111'");
				out.println("data-color-border-inner='#111'");
				out.println("data-color-border-inner-end='#333'");
				out.println("data-color-needle-shadow-down='#333'");
				out.println("data-color-needle-circle-outer='#333'");
				out.println("data-color-needle-circle-outer-end='#111'");
				out.println("data-color-needle-circle-inner='#111'");
				out.println("data-color-needle-circle-inner-end='#222'");
				out.println("data-value-box-border-radius='0'");
				out.println("data-color-value-box-rect='#222'");
				out.println("data-color-value-box-rect-end='#333'");
				out.println("></canvas>");
	   	}    	
	   	
	    out.println("<form name='clock' method='' action='" + addressHome + "'>" +
	    "<input type='submit' class='buttonHome' name='next' value=''>" +
	    "</form>");    	
	    
	    out.println("<form name='clock' method='' action='/" + addressNext + "'>" +
	    "<input type='submit' class='buttonNext' name='next' value=''>" +
	    "</form>");  	
	    
	    // Indicator of day/night time
	    /*
	    if (m_meteo.isDayTime()) {
	    	out.println("<img src='/res/web/servletdigital/indicatorDay.png' class='imageDayTime' alt='Smiley face'>");
	    } else {
	    	out.println("<img src='/res/web/servletdigital/indicatorNight.png' class='imageNightTime' alt='Smiley face'>");
	    }
	    */
	    
	    //Forecast indicator
	    float cloudPerc = m_meteo.getCloudsForecast();
	    float tempForecast = m_meteo.getTempForecast();
	    String imageFcs = "";
	    
	    if (cloudPerc <= 25.0) {
	    	imageFcs = "/res/web/sunny.png"; 
	    } else if (cloudPerc > 25.0 && cloudPerc <= 75.0) {
	    	imageFcs = "/res/web/clouds.png";
	    } else {
	    	imageFcs = "/res/web/rainy.png";
	    }
	    	    	    
	    out.println("<img src='" + imageFcs + "' class='imageForecast' alt='Weather'>");
	    
	    out.println("<tempTextBox>" + "Temp: " + tempForecast + " °C </tempTextBox>");
	    
	    //out.println("Perc cloud:" + cloudPerc);
	    //out.println("Temp:" + tempForecast);
	    	    	   	
	   	out.println("</body>");
	   	out.println("</html>");    	
	   }    

	
}
