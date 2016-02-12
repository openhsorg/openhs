package org.openhs.core.remote.access;

import java.io.IOException;
import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.openhs.core.site.services.SiteServiceFactory;

public class MainServlet extends HttpServlet {
	  
	public SiteServiceFactory siteServiceFactory = null;
	private static final long serialVersionUID = 1L;
	  
	int  i = 5;

	  protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
	    throws ServletException, IOException {
	    resp.setContentType("text/plain");
	    resp.setHeader("Refresh", "5");
	    resp.getWriter().write("Hello OpenHS World !!!");
	    i ++;	    
	    resp.getWriter().write("\nDate: " + new Date().toString() + "     Refresh:" + i);
	    
	    resp.getWriter().write("\n\n---------- OpenHS Core Data ---------");
	    resp.getWriter().write("\nSite ID is: " + siteServiceFactory.getInstance().getId());	    	  
	    resp.getWriter().write("\nNumber rooms is: " + siteServiceFactory.getInstance().getNumberRooms());	

	  }
	}