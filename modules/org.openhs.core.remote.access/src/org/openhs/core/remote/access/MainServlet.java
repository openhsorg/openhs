package org.openhs.core.remote.access;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.Set;
import java.util.TreeMap;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.openhs.core.meteostation.Meteostation;
import org.openhs.core.clock.OhsClock;
import org.openhs.core.site.data.ISiteService;
import org.osgi.service.http.HttpService;
import org.osgi.service.http.NamespaceException;
import org.openhs.core.commons.TextOutput;
import org.openhs.core.commons.Temperature;
import org.openhs.core.commons.Sensor;
import org.openhs.core.commons.Room;
import org.openhs.core.commons.SiteException;

public class MainServlet {
	
	TextOutput msg = new TextOutput ();
	
    private MainServlet mainServlet = null;
    private AdminServlet adminServlet = null;
    private ImageServlet imageServlet = null;
    private ImageServlet2 imageServlet2 = null;
    private ImageServlet3 imageServlet3 = null;
    private ButtonServlet btnSrv = null;
    private MeteoServlet meteoServlet = null;
    private TimeServlet timeServlet = null;
    private TimeServlet2 timeServlet2 = null;

    private HttpService m_httpService = null;
    private ISiteService m_siteService = null;
    private Meteostation m_meteo = null;
    private OhsClock m_clock = null;

    private static final long serialVersionUID = 1L;

    int i = 5;	

    public void activate() {
        msg.println("org.openhs.core.remote.access: activate");

        mainServlet = new MainServlet();
        adminServlet = new AdminServlet(m_siteService, m_meteo);
        imageServlet = new ImageServlet();
        imageServlet2 = new ImageServlet2();
        imageServlet3 = new ImageServlet3();
        btnSrv = new ButtonServlet();
        meteoServlet = new MeteoServlet(m_meteo);
        timeServlet = new TimeServlet(m_siteService);
        timeServlet2 = new TimeServlet2(m_siteService, m_meteo);

        try {
            m_httpService.registerServlet("/openhs", adminServlet, null, null);
            m_httpService.registerServlet("/image", imageServlet, null, null);
            m_httpService.registerServlet("/image2", imageServlet2, null, null);
            m_httpService.registerServlet("/image3", imageServlet3, null, null);
            m_httpService.registerServlet("/btn", btnSrv, null, null);
            m_httpService.registerServlet("/meteo", meteoServlet, null, null);            
            m_httpService.registerServlet("/time", timeServlet2, null, null);
        } catch (ServletException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (NamespaceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public void deactivate() {
    	msg.println("org.openhs.core.remote.access: deactivate");
        m_httpService.unregister("/openhs");
        m_httpService.unregister("/image");
        m_httpService.unregister("/image2");
        m_httpService.unregister("/image3");
        m_httpService.unregister("/btn");
        m_httpService.unregister("/meteo");
        m_httpService.unregister("/time");
    }

    public void setService(ISiteService ser) {
        msg.println("org.openhs.core.remote.access: Set ISiteService");
        m_siteService = ser;
    }

    public void unsetService(ISiteService ser) {
    	msg.println("org.openhs.core.remote.access: UnSet ISiteService");
        if (m_siteService == ser) {
            ser = null;
        }
    }

    public void setService(Meteostation ser) {
        msg.println("org.openhs.core.remote.access: Set Meteostation");
        m_meteo = ser;
    }

    public void unsetService(Meteostation ser) {
    	msg.println("org.openhs.core.remote.access: UnSet Meteostation");
        if (m_meteo == ser) {
            m_meteo = null;
        }
    }
    
    public void setService(OhsClock clock) {
        msg.println("org.openhs.core.remote.access: Set OhsClock");
        m_clock = clock;
    }

    public void unsetService(OhsClock clock) {
    	msg.println("org.openhs.core.remote.access: UnSet OhsClock");
        if (m_clock == clock) {
        	m_clock = null;
        }
    }    

    public void setService(HttpService ser) {
    	msg.println("org.openhs.core.remote.access: Set HttpService");
        m_httpService = ser;
    }

    public void unsetService(HttpService ser) {
    	msg.println("org.openhs.core.remote.access: UnSet HttpService");
        if (m_httpService == ser) {
            m_httpService = null;
        }
    }


}
