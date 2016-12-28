package org.openhs.core.remote.access;

import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.util.Date;
import java.util.Set;
import java.util.TreeMap;
import java.util.*;
import java.text.*;  

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.openhs.core.commons.Humidity;
import org.openhs.core.commons.Room;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Temperature;
import org.openhs.core.site.api.ISiteService;

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

public class TimeServlet extends HttpServlet{
	  private ISiteService m_siteService = null;

	   int width = 300; 
	   int height = 300;  
	   Thread t = null;  
	   boolean threadSuspended;  
	   int hours=0, minutes=0, seconds=0;  
	   String timeString = "";  

	    TimeServlet (ISiteService site) {
	    	m_siteService = site;
	    }

	    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
	  //      resp.setContentType("text/html");
	  //      resp.setHeader("Refresh", "5");
	    	
	    	
            Calendar cal = Calendar.getInstance();  
            hours = cal.get( Calendar.HOUR_OF_DAY );  
            if ( hours > 12 ) hours -= 12;  
            minutes = cal.get( Calendar.MINUTE );  
            seconds = cal.get( Calendar.SECOND );  
  
            SimpleDateFormat formatter  
               = new SimpleDateFormat( "hh:mm:ss", Locale.getDefault() );  
            Date date = cal.getTime();  
            timeString = formatter.format( date );                         
	        
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
	    
	    void drawHand( double angle, int radius, Graphics g ) {  
	        angle -= 0.5 * Math.PI;  
	        int x = (int)( radius*Math.cos(angle) );  
	        int y = (int)( radius*Math.sin(angle) );  
	        g.drawLine( width/2, height/2, width/2 + x, height/2 + y );  
	     }  
	    
	     void drawWedge( double angle, int radius, Graphics g ) {  
	        angle -= 0.5 * Math.PI;  
	        int x = (int)( radius*Math.cos(angle) );  
	        int y = (int)( radius*Math.sin(angle) );  
	        angle += 2*Math.PI/3;  
	        int x2 = (int)( 5*Math.cos(angle) );  
	        int y2 = (int)( 5*Math.sin(angle) );  
	        angle += 2*Math.PI/3;  
	        int x3 = (int)( 5*Math.cos(angle) );  
	        int y3 = (int)( 5*Math.sin(angle) );  
	        g.drawLine( width/2+x2, height/2+y2, width/2 + x, height/2 + y );  
	        g.drawLine( width/2+x3, height/2+y3, width/2 + x, height/2 + y );  
	        g.drawLine( width/2+x2, height/2+y2, width/2 + x3, height/2 + y3 );  
	     }  
	    
	     public void paint( Graphics g ) {  
	        g.setColor( Color.gray );  
	        drawWedge( 2*Math.PI * hours / 12, width/5, g );  
	        drawWedge( 2*Math.PI * minutes / 60, width/3, g );  
	        drawHand( 2*Math.PI * seconds / 60, width/2, g );  
	        g.setColor( Color.white );  
	        g.drawString( timeString, 10, height-10 );  
	     }  	    
	    
}
