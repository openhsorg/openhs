package org.openhs.core.remote.access;

import javax.servlet.http.HttpServlet;

import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;
import javax.servlet.http.*;
import javax.servlet.*;
import java.io.*;
import java.net.URL;
import java.awt.*;
import java.awt.Graphics2D;
import java.util.Date;

public class ImageServlet2 extends HttpServlet {
	
	 int  i = 0;

	 protected void doGet(HttpServletRequest req, HttpServletResponse response) throws IOException, ServletException {
		  
          URL location = ImageServlet.class.getProtectionDomain().getCodeSource().getLocation();
  		  String path = location.getFile() + "images/HomeInformationStation.png";
		 
  		  BufferedImage image=ImageIO.read(new File(path));
		  //BufferedImage image = new BufferedImage(500, 500, BufferedImage.TYPE_INT_RGB); // 123 wide, 123 tall
  		  
		  Graphics2D graphics2D = image.createGraphics();
		  		
		  Font font=new Font("Courier", Font.HANGING_BASELINE , 14); 
		  graphics2D.setColor(Color.red); 
		  graphics2D.setFont(font); 
		  
		  i++;
		  
		  String text = "Date: " + new Date().toString() + "     Refresh:" + i;
		  graphics2D.drawString(text, 10, 390);
		  graphics2D.drawRect(5, 375, 400, 30);  
		  
		  graphics2D.dispose();
		  
		  response.setContentType("image/png");
		  response.setHeader("Refresh", "1");
		  OutputStream outputStream = response.getOutputStream();
		  ImageIO.write(image, "jpeg", outputStream);
		  outputStream.close();
		 }	
	
}
