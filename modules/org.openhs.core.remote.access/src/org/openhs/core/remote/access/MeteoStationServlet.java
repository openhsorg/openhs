package org.openhs.core.remote.access;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.openhs.core.cfg.OpenhsProps;
import org.openhs.core.meteostation.Meteostation;
import org.openhs.core.site.data.ISiteService;
import org.openhs.core.commons.Temperature;
import org.openhs.core.commons.Weather;

import javax.servlet.http.HttpServlet;
import javax.servlet.RequestDispatcher;

public class MeteoStationServlet extends HttpServlet {
	
	 private Meteostation m_meteo = null;
	
	int i = 0;
	
	MeteoStationServlet(Meteostation meteo) {
    	m_meteo = meteo;
    }	
	
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html");
        resp.setHeader("Refresh", "5");
        
        //req.setAttribute("gauge.value", "12"); 
       // req.getRequestDispatcher("web/meteo/meteo.jsp").forward(req, resp); 
       
        boolean ex = true;
        
      //  while (ex) {
        	
        	i ++;
        	
        	String str = req.getParameter("gauge");
        	System.out.println("\n................>:" + str);
        	
        //	req.setAttribute(str, "33");
        //	getServletContext().getRequestDispatcher("web/meteo/meteo.jsp").forward(req,resp);        	
        
        
        	PrintWriter out = resp.getWriter(); 
	        
    	 print (out);
    	 
    	 
    	 out.close();   
    	 
    	 System.out.println("\n................>");
    	 /*
    	 try {
				Thread.sleep (500);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
		
			}	    	 
    	 
        }
    	        
             */ 
        
    }    
    
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    	
    }	
    
	private void performTask(HttpServletRequest request, HttpServletResponse response) throws ServletException,
	IOException {
		
		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.println("TestServlet says hi<br/>");
		
		String action = request.getParameter("action");
		if (action != null) {
			RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
			if ("include".equalsIgnoreCase(action)) {
				rd.include(request, response);
			} else if ("forward".equalsIgnoreCase(action)) {
				rd.forward(request, response);
			}
		}

}    
    
    
  protected void print (PrintWriter out){
    	
    	out.println("\n<!DOCTYPE html>");
    	out.println("<html>");
    	out.println("<head>");  
    	    	    	
    	out.println("<script src='web/meteo/gauge.min.js'></script>");
    	    	
    //	out.println("<script src='web/meteo/meteo.jsp'></script>");    
    
    	out.println("<title>Meteo</title>");
    	
    	out.print("</head>\n");
    	out.print("<body>\n");
    	
    	///out.println("number:" + i);
    	/*
    	out.println("<canvas id='cvs' width='300' height='300'>");

    	out.println("</canvas>"); 
    	*/
    	
    	
		out.println("<canvas data-type='radial-gauge'");
		out.println("data-value='" + getTemperature() + "'");
		out.println("data-width='300'");
		out.println("data-height='300'");
		out.println("data-units='°C'");
		out.println("data-title='Temperature'");
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
    	
    	
    	out.println("</body>");
    	out.println("</html>");    	
    }    
  
  public float getTemperature(){
	  
	  float tmp = -5f;
	  
	  Weather wet = m_meteo.getCurrentWeather();
	  
	  Temperature temp = wet.getTemperature();
	  
	  tmp = (float) temp.getCelsius();
	  
	  System.out.println("\n.....TEMP.........>:" + tmp);
	  	  
	  return tmp;
  }

}
