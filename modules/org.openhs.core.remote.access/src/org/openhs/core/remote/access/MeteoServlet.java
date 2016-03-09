package org.openhs.core.remote.access;

import java.awt.Color;
import java.awt.Font;
import java.awt.Graphics2D;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URL;
import java.util.Date;
import java.util.*;
import java.text.*;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.font.TextAttribute;
import java.awt.Rectangle;
import java.awt.Image;
import java.awt.*;

import org.openhs.core.meteostation.*;


public class MeteoServlet extends HttpServlet {
	
	Meteostation meteo = null;
	
	 int  i = 0;

	 protected void doGet(HttpServletRequest req, HttpServletResponse response) throws IOException, ServletException {
		  		 
		  // Get toolkit
		  Toolkit toolkit = Toolkit.getDefaultToolkit();

		  // Get size
		  Dimension dimension = toolkit.getScreenSize();
		 
  		  //BufferedImage image=ImageIO.read(new File(path));
		  BufferedImage image = new BufferedImage(dimension.width, dimension.height, BufferedImage.TYPE_INT_RGB); // 500 wide, 500 tall
  		  
		  Graphics2D graphics2D = image.createGraphics();
		  graphics2D.setColor(Color.white); 
		  
		  //Inside temp		  
		  Font fontIn=new Font("Aerial", Font.BOLD, 60);
		  Map<TextAttribute, Object> attributes = new HashMap<>();

		  attributes.put(TextAttribute.FAMILY, fontIn.getFamily());
		  attributes.put(TextAttribute.WEIGHT, TextAttribute.WEIGHT_MEDIUM);
	      attributes.put(TextAttribute.SIZE, (int) (fontIn.getSize() * 1.4));
	      attributes.put(TextAttribute.WEIGHT, (int) (80));
		  Font tempFont = Font.getFont(attributes);

		  graphics2D.setFont(tempFont);
		  
		  String tmpInStr = "In" + "      22°C";
		  graphics2D.drawString(tmpInStr, 20, 120);		
		  
		  //Out temp		  	  
		  String tmpOutStr = "Out" + "   " + meteo.getOutTemp() + " °C";
		  graphics2D.drawString(tmpOutStr, 20, 270);		 		  
		  		
		  //Line in the middle
		  graphics2D.drawLine(20, 170, 400, 170); 
		  
		  //Time
		  attributes.put(TextAttribute.SIZE, (int) (fontIn.getSize() * 0.5));
		  Font timeFont = Font.getFont(attributes);

		  graphics2D.setFont(timeFont);		  
		  
		  i++;
		  
		  Date curDate = new Date();
	      SimpleDateFormat format = new SimpleDateFormat("hh:mm:ss");

	      String TimeToStr = format.format(curDate);

		  graphics2D.drawString(TimeToStr, 10, 410);
		  		  
	      SimpleDateFormat formatDate = new SimpleDateFormat("EEE-dd-MMM-yyyy");

	      String DateToStr = formatDate.format(curDate);

		  graphics2D.drawString(DateToStr, 10, 450);		 
		  
		  //Draw indicators...		  
          URL location = ImageServlet.class.getProtectionDomain().getCodeSource().getLocation();
  		  //String path = location.getFile() + "images/HomeInformationStation.png";
		  
	      File imageFile = new File(location.getFile() + "images/indicatorFrost.png");
	      Image imgFrost = ImageIO.read(imageFile);		  
	      imageFile = new File(location.getFile() + "images/indicatorDay.png");
	      Image imgDay = ImageIO.read(imageFile);	
	      imageFile = new File(location.getFile() + "images/indicatorIntruder.png");
	      Image imgIntruder = ImageIO.read(imageFile);			      
		  
	      //Rectangle2D rect = new Rectangle2D.Float();

	      Rectangle rect = new Rectangle(10, 300, 50, 50);	      
	      graphics2D.drawImage(imgFrost, rect.x, rect.y, rect.width, rect.height, null);	
	      
	      rect = new Rectangle(80, 300, 50, 50);	      
	      graphics2D.drawImage(imgDay, rect.x, rect.y, rect.width, rect.height, null);			 
	      
	      rect = new Rectangle(150, 300, 50, 50);    
	      graphics2D.drawImage(imgIntruder, rect.x, rect.y, rect.width, rect.height, null);			      
		  
		  graphics2D.dispose();
		  
		  response.setContentType("image/png");
		  response.setHeader("Refresh", "1");
		  OutputStream outputStream = response.getOutputStream();
		  ImageIO.write(image, "jpeg", outputStream);
		  outputStream.close();
		  
		 }		

}
