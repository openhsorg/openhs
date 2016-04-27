package org.openhs.core.remote.access;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Date;
import java.util.Set;
import java.util.TreeMap;
import java.util.*;
import java.text.*;  

import org.openhs.core.site.data.ISiteService;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Toolkit;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.TimeZone;
import java.util.TimerTask;
import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JPanel;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.Image;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.Toolkit;
import java.awt.font.TextAttribute;
import java.awt.image.BufferedImage;
import java.awt.Graphics;  
import java.awt.BasicStroke;

public class TimeServlet2 extends HttpServlet{
	  private ISiteService m_siteService = null;

	  ImageIcon img;

	  private GregorianCalendar m_calendar;
	  private int[] x=new int[2];
	  private int[] y=new int[2];
	  private java.util.Timer clocktimer=new java.util.Timer();
	  
	   int width = 300; 
	   int height = 300;  	  

	  /**You could set the TimeZone for the clock here. I used the Dfault time
	  zone from the user so that every time the program runs on different
	  computers the correct time is displayed*/

	  private TimeZone clockTimeZone=TimeZone.getDefault();	  
	
	   TimeServlet2 (ISiteService site) {
	    	m_siteService = site;
	    }

	    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	  //      resp.setContentType("text/html");
	  //      resp.setHeader("Refresh", "5");
	    	
	    	m_calendar=(GregorianCalendar)GregorianCalendar.getInstance(clockTimeZone);
	    	
	        // Get toolkit
	        Toolkit toolkit = Toolkit.getDefaultToolkit();

	        // Get size
	        Dimension dimension = toolkit.getScreenSize();	  
	        
	        width = dimension.width;
	        height = dimension.height;
                	    	       	        
	        // BufferedImage image=ImageIO.read(new File(path));
	        BufferedImage image = new BufferedImage(dimension.width, dimension.height, BufferedImage.TYPE_INT_RGB);
	        
	        Graphics graphics = image.createGraphics();
	        	        
	        paint(graphics);
	        
	        Toolkit.getDefaultToolkit().sync();

	        graphics.dispose();

	        resp.setContentType("image/jpg");
	        resp.setHeader("Refresh", "1");
	        OutputStream outputStream = resp.getOutputStream();

	        ImageIO.write(image, "jpg", outputStream);

	        outputStream.close();	        
	
	    }    
	    
	
	    
	    public void paint(Graphics g)
	    {

		    g.setColor(Color.BLACK);
		    g.fillRect(0,0,width,height);
		    drawCardinals((Graphics2D)g);
		    drawHands((Graphics2D)g);

	    }
	 	
	  //Endpoints of the Clock Hand
	    void clockMinutes(int startRadius,int endRadius,double theta)
	    {
		    theta-=Math.PI/2;
		    x[0]=(int)(width/2+startRadius*Math.cos(theta));
		    y[0]=(int)(height/2+startRadius*Math.sin(theta));
		    x[1]=(int)(width/2+endRadius*Math.cos(theta));
		    y[1]=(int)(height/2+endRadius*Math.sin(theta));
	    }

	    //The Hours/Cardinals of the clock
	    /** Set Stroke sets the thickness of the cardinals and hands*/
	    void drawCardinals(Graphics2D g) {
	    	//	g.setStroke(new BasicStroke(9));
	    	g.setStroke(new BasicStroke(12));
	    	g.setColor(Color.gray);

		    for(double theta=0;theta<Math.PI*2;theta+=Math.PI/6)
		    {
			    clockMinutes(100,100,theta);
			    /**Draws a sequence of connected lines defined by arrays of x and
			    *y coordinates. Each pair of (x, y) coordinates defines a point.
			    *The figure is not closed if the first point
			    differs from the last point.*/
			    g.drawPolyline(x,y,2);
		    }
	    }

	    //The Hand of the Clocks instance method
	    public void drawHands(Graphics2D g)
	    {
		    double h=2*Math.PI*(m_calendar.get(Calendar.HOUR));
		    double m=2*Math.PI*(m_calendar.get(Calendar.MINUTE));
		    double s=2*Math.PI*(m_calendar.get(Calendar.SECOND));
	
		    g.setStroke(new BasicStroke(9));
	
		    clockMinutes(0,55,h/12+m/(60*12));
		    g.setColor(Color.gray);
		    g.drawPolyline(x,y,2);
	
		    clockMinutes(0,70,m/60+s/(60*60));
		    g.setColor(Color.gray);
		    g.drawPolyline(x,y,2);
	
		    clockMinutes(0,70,s/60);
		    g.setColor(Color.red);
		    g.drawPolyline(x,y,2);
	
		    g.fillOval(width/2-8,height/2-8,16,16);
	    }

	    
}
