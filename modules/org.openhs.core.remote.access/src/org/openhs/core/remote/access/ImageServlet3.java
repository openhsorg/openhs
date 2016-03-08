package org.openhs.core.remote.access;

import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
import javax.servlet.http.*;
import javax.servlet.*;
import java.io.*;
import java.net.URL;
import java.awt.*;
import java.util.Date;


public class ImageServlet3 extends HttpServlet {

	 int  i = 0;
	 boolean state = false;
	 Graphics2D graphics2D;
	 BufferedImage image;

	 protected void doGet(HttpServletRequest req, HttpServletResponse response) throws IOException, ServletException {
		  
          URL location = ImageServlet.class.getProtectionDomain().getCodeSource().getLocation();
 		  String path =  location.getFile() + "images/HomeInformationStation.png";
 		  String path2 = location.getFile() + "images/HomeSystem.png";
		 
		  //BufferedImage image = new BufferedImage(500, 500, BufferedImage.TYPE_INT_RGB); // 123 wide, 123 tall
 		  
 		  if (state)
 		  {
 			  image=ImageIO.read(new File(path));
 			  graphics2D = image.createGraphics();
 			  
 			  state = false;
 		  }
 		  else
 		  {
 			  image=ImageIO.read(new File(path2));
 			  graphics2D = image.createGraphics();
 			  
 			  state = true; 			  
 		  }
		  		
		  Font font=new Font("Courier", Font.HANGING_BASELINE , 14); 
		  graphics2D.setColor(Color.red); 
		  graphics2D.setFont(font); 
		  
		  i++;
		  
		  String text = "Date: " + new Date().toString() + "     Refresh:" + i;
		  graphics2D.drawString(text, 10, 500);
		  graphics2D.drawRect(5, 485, 400, 30);  
		  
		  graphics2D.dispose();
		  
		  response.setContentType("image/png");
		  response.setHeader("Refresh", "2");
		  OutputStream outputStream = response.getOutputStream();
		  ImageIO.write(image, "jpeg", outputStream);
		  outputStream.close();		 
		
		 }	
	 
}
