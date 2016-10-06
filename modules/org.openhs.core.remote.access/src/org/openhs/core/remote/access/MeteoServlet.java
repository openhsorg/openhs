package org.openhs.core.remote.access;

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
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.openhs.core.meteostation.Meteostation;
import org.openhs.core.commons.Sensor;
import org.openhs.core.commons.Temperature;
import org.openhs.core.commons.SiteException;

public class MeteoServlet extends HttpServlet {

    private static final long serialVersionUID = -6476684824720027339L;

    private Meteostation m_meteo = null;

    int i = 0;

    MeteoServlet(Meteostation meteo) {
        m_meteo = meteo;
    }
/*
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse response) throws IOException, ServletException {

        ArrayList<Boolean> list = m_meteo.getIndicatorsList();

        // Get toolkit
        Toolkit toolkit = Toolkit.getDefaultToolkit();

        // Get size
        Dimension dimension = toolkit.getScreenSize();

        // BufferedImage image=ImageIO.read(new File(path));
        BufferedImage image = new BufferedImage(dimension.width, dimension.height, BufferedImage.TYPE_INT_RGB); // 500
                                                                                                                // wide,
                                                                                                                // 500
                                                                                                                // tall
        // BufferedImage image = new BufferedImage(1000, 500, BufferedImage.TYPE_INT_RGB); // 500 wide, 500 tall

        Graphics2D graphics2D = image.createGraphics();

        graphics2D.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        graphics2D.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);

        graphics2D.clearRect(0, 0, dimension.width, dimension.height);

        graphics2D.setColor(Color.white);

        // Inside temp
        Font fontIn = new Font("Aerial", Font.BOLD, 60);
        Map<TextAttribute, Object> attributes = new HashMap<>();

        attributes.put(TextAttribute.FAMILY, fontIn.getFamily());
        attributes.put(TextAttribute.WEIGHT, TextAttribute.WEIGHT_MEDIUM);
        attributes.put(TextAttribute.SIZE, (int) (fontIn.getSize() * 1.4));
        attributes.put(TextAttribute.WEIGHT, (80));
        Font tempFont = Font.getFont(attributes);

        graphics2D.setFont(tempFont);

        String tmpInStr = "error";
        String tempOutStr = "error";
        
        try {
        	Temperature tIn =  m_meteo.getSensorIn().getTemperature();
        	
        	tmpInStr = "In   " + tIn.getCelsiusString() + "  C";
        	        	           
        } catch (Exception ex) {
        	tmpInStr = "" + "--" + "";
        }        
        
        graphics2D.drawString(tmpInStr, 20, 120);

        try {
        	
        	Temperature tOut =  m_meteo.getSensorOut().getTemperature();
        	
        	tempOutStr = "Out   " + tOut.getCelsiusString() + "  C";
        	            
        } catch (Exception ex) {
        	tempOutStr = "" + "--" + "";
        }

        graphics2D.drawString(tempOutStr, 20, 270);

        // Line in the middle
        graphics2D.drawLine(20, 170, 400, 170);
        graphics2D.drawRect(5, 5, 410, 550);

        // Time
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

        // Draw indicators...
        URL location = ImageServlet.class.getProtectionDomain().getCodeSource().getLocation();
        // String path = location.getFile() + "images/HomeInformationStation.png";

        File imageFile = new File(location.getFile() + "images/indicatorFrost.png");
        BufferedImage imgFrost = ImageIO.read(imageFile);
        imageFile = new File(location.getFile() + "images/indicatorDay.png");
        Image imgDay = ImageIO.read(imageFile);
        imageFile = new File(location.getFile() + "images/indicatorIntruder.png");
        Image imgIntruder = ImageIO.read(imageFile);

        Rectangle rect = new Rectangle(10, 300, 50, 50);

        if (list.get(0)) {
            graphics2D.drawImage(imgFrost, rect.x, rect.y, rect.width, rect.height, null);
        }

        if (list.get(1)) {
            rect = new Rectangle(80, 300, 50, 50);
            graphics2D.drawImage(imgDay, rect.x, rect.y, rect.width, rect.height, null);
        }

        if (list.get(2)) {
            rect = new Rectangle(150, 300, 50, 50);
            graphics2D.drawImage(imgIntruder, rect.x, rect.y, rect.width, rect.height, null);
        }

        Toolkit.getDefaultToolkit().sync();

        graphics2D.dispose();

        response.setContentType("image/jpg");
        response.setHeader("Refresh", "1");
        
        OutputStream outputStream = response.getOutputStream();
        ImageIO.write(image, "jpg", outputStream);
        outputStream.close();
                       

    }
    */
    
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse response) throws IOException, ServletException {

        ArrayList<Boolean> list = m_meteo.getIndicatorsList();

        // Get toolkit
        Toolkit toolkit = Toolkit.getDefaultToolkit();

        // Get size
        Dimension dimension = toolkit.getScreenSize();

        // BufferedImage image=ImageIO.read(new File(path));
        BufferedImage image = new BufferedImage(dimension.width, dimension.height, BufferedImage.TYPE_INT_RGB); // 500
                                                                                                                // wide,
                                                                                                                // 500
                                                                                                                // tall
        // BufferedImage image = new BufferedImage(1000, 500, BufferedImage.TYPE_INT_RGB); // 500 wide, 500 tall

        Graphics2D graphics2D = image.createGraphics();

        graphics2D.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        graphics2D.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);

        graphics2D.clearRect(0, 0, dimension.width, dimension.height);

        graphics2D.setColor(Color.white);

        // Inside temp
        Font fontIn = new Font("Aerial", Font.BOLD, 60);
        Map<TextAttribute, Object> attributes = new HashMap<>();

        attributes.put(TextAttribute.FAMILY, fontIn.getFamily());
        attributes.put(TextAttribute.WEIGHT, TextAttribute.WEIGHT_MEDIUM);
        attributes.put(TextAttribute.SIZE, (int) (fontIn.getSize() * 1.4));
        attributes.put(TextAttribute.WEIGHT, (80));
        Font tempFont = Font.getFont(attributes);

        graphics2D.setFont(tempFont);

        String tmpInStr = "error";
        String tempOutStr = "error";
        
        try {
        	Temperature tIn =  m_meteo.getSensorIn().getTemperature();
        	
        	tmpInStr = "In   " + tIn.getCelsiusString() + "  C";
        	        	           
        } catch (Exception ex) {
        	tmpInStr = "" + "--" + "";
        }        
        
        graphics2D.drawString(tmpInStr, 20, 120);

        try {
        	
        	Temperature tOut =  m_meteo.getSensorOut().getTemperature();
        	
        	tempOutStr = "Out   " + tOut.getCelsiusString() + "  C";
        	            
        } catch (Exception ex) {
        	tempOutStr = "" + "--" + "";
        }

        graphics2D.drawString(tempOutStr, 20, 270);

        // Line in the middle
        graphics2D.drawLine(20, 170, 400, 170);
        graphics2D.drawRect(5, 5, 410, 550);

        // Time
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

        // Draw indicators...
      //  URL location = ImageServlet.class.getProtectionDomain().getCodeSource().getLocation();
        // String path = location.getFile() + "images/HomeInformationStation.png";

     //   File imageFile = new File(location.getFile() + "images/indicatorFrost.png");
        //BufferedImage imgFrost = ImageIO.read(imageFile);
        
        BufferedImage imgFrost = ImageIO.read(this.getClass().getResource("/images/indicatorFrost.png"));
        BufferedImage imgDay = ImageIO.read(this.getClass().getResource("/images/indicatorDay.png"));
        BufferedImage imgIntruder = ImageIO.read(this.getClass().getResource("/images/indicatorIntruder.png"));
        
        /*
        imageFile = new File(location.getFile() + "images/indicatorDay.png");
        Image imgDay = ImageIO.read(imageFile);
        imageFile = new File(location.getFile() + "images/indicatorIntruder.png");
        Image imgIntruder = ImageIO.read(imageFile);
*/
        Rectangle rect = new Rectangle(10, 300, 50, 50);

        if (list.get(0)) {
            graphics2D.drawImage(imgFrost, rect.x, rect.y, rect.width, rect.height, null);
        }

        if (list.get(1)) {
            rect = new Rectangle(80, 300, 50, 50);
            graphics2D.drawImage(imgDay, rect.x, rect.y, rect.width, rect.height, null);
        }

        if (list.get(2)) {
            rect = new Rectangle(150, 300, 50, 50);
            graphics2D.drawImage(imgIntruder, rect.x, rect.y, rect.width, rect.height, null);
        }

        Toolkit.getDefaultToolkit().sync();

        graphics2D.dispose();

        response.setContentType("image/jpg");
        response.setHeader("Refresh", "1");
        
        OutputStream outputStream = response.getOutputStream();
        ImageIO.write(image, "jpg", outputStream);
        outputStream.close();
                       

    }    

}
