package org.openhs.core.remote.access;

import java.io.IOException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import javax.servlet.*;  
import java.net.URL;

public class ImageServlet extends HttpServlet {
		 	
	 
	 public void doGet(HttpServletRequest req, HttpServletResponse response) throws IOException {
		    
	        URL location = ImageServlet.class.getProtectionDomain().getCodeSource().getLocation();

	        String path = location.getFile() + "images/HomeInformationStation.png";
	        
//	        System.out.println("Path:" + path);	
		    		    		    		 
		    response.setContentType("image/jpeg");  
		    ServletOutputStream out;  
		    out = response.getOutputStream();  
		    FileInputStream fin = new FileInputStream(path);  

		    BufferedInputStream bin = new BufferedInputStream(fin);  
		    BufferedOutputStream bout = new BufferedOutputStream(out);  
		    
		    int ch =0; ;  
		    while((ch=bin.read())!=-1)  
		    {  
		    	bout.write(ch);
		    }  
		      
		    bin.close();  
		    fin.close();  
		    bout.close();  
		    out.close();  
	}	 
	
}
