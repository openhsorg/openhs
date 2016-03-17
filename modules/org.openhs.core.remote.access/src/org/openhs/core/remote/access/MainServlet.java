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
import org.openhs.core.site.data.ISiteService;
import org.openhs.core.site.data.Room;
import org.openhs.core.site.data.Sensor;
import org.openhs.core.site.data.SiteException;
import org.openhs.core.site.data.Temperature;
import org.osgi.service.http.HttpService;
import org.osgi.service.http.NamespaceException;

public class MainServlet extends HttpServlet {

    public void activate() {
        System.out.println("Starting MainServlet");

        mainServlet = new MainServlet();
        imageServlet = new ImageServlet();
        imageServlet2 = new ImageServlet2();
        imageServlet3 = new ImageServlet3();
        btnSrv = new ButtonServlet();
        meteoServlet = new MeteoServlet(m_meteo);

        try {
            m_httpService.registerServlet("/openhs", mainServlet, null, null);
            m_httpService.registerServlet("/image", imageServlet, null, null);
            m_httpService.registerServlet("/image2", imageServlet2, null, null);
            m_httpService.registerServlet("/image3", imageServlet3, null, null);
            m_httpService.registerServlet("/btn", btnSrv, null, null);
            m_httpService.registerServlet("/meteo", meteoServlet, null, null);
        } catch (ServletException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (NamespaceException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public void deactivate() {
        System.out.println("Stopping MainServlet");
        m_httpService.unregister("/openhs");
        m_httpService.unregister("/image");
        m_httpService.unregister("/image2");
        m_httpService.unregister("/image3");
        m_httpService.unregister("/btn");
        m_httpService.unregister("/meteo");
    }

    public void setService(ISiteService ser) {
        System.out.println("MainServlet: Set ISiteService");
        m_siteService = ser;
    }

    public void unsetService(ISiteService ser) {
        System.out.println("MainServlet: Unset ISiteService");
        if (m_siteService == ser) {
            ser = null;
        }
    }

    public void setService(Meteostation ser) {
        System.out.println("MainServlet: Set Meteostation");
        m_meteo = ser;
    }

    public void unsetService(Meteostation ser) {
        System.out.println("MainServlet: Unset Meteostation");
        if (m_meteo == ser) {
            m_meteo = null;
        }
    }

    public void setService(HttpService ser) {
        System.out.println("MainServlet: Set HttpService");
        m_httpService = ser;
    }

    public void unsetService(HttpService ser) {
        System.out.println("MainServlet: Unset HttpService");
        if (m_httpService == ser) {
            m_httpService = null;
        }
    }

    private MainServlet mainServlet = null;
    private ImageServlet imageServlet = null;
    private ImageServlet2 imageServlet2 = null;
    private ImageServlet3 imageServlet3 = null;
    private ButtonServlet btnSrv = null;
    private MeteoServlet meteoServlet = null;

    private HttpService m_httpService = null;
    private ISiteService m_siteService = null;
    private Meteostation m_meteo = null;

    private static final long serialVersionUID = 1L;

    int i = 5;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("text/html");
        resp.setHeader("Refresh", "5");

        i++;

        PrintWriter out = resp.getWriter();

        // Write the response message, in an HTML page
        try {

            out.println("<!DOCTYPE html>");
            out.println("<html lang='en'>");
            out.println("<head>");
            out.println("<meta charset='utf-8'/>");
            out.println("<link href='css/some-stylesheet.css' rel='stylesheet'/>");
            out.println("<body>");

            getHouseData(out);

            out.println("</body>");
            out.println("</html>");

        } finally {
            out.close(); // Always close the output writer
        }
    }

    protected void getHouseData(PrintWriter out) {

        out.println("<font color=green>");
        out.println("<h1>OpenHS world...\n</h1>");
        out.println("<font color=green>");
        out.println("<p style='font-family:Courier; color:#0020C2; font-size: 20px;'>");
        out.println("Date: " + new Date().toString() + "     Refresh:" + i);
        out.println("</p>");

        out.println("<font color=black>");
        out.println("<br/>---------- OpenHS Core Data ---------");
        out.println("<br/>");

        out.println("<br/>Site ID is: " + m_siteService.getId());
        out.println("<br/>Number rooms is: " + m_siteService.getNumberRooms());

        TreeMap<String, Room> rooms = m_siteService.getRooms();

        Set<String> keys = rooms.keySet();

        for (String key : keys) {
            out.println(" ");
            out.println("<br/><br/> -" + key + "(Num Sensors:" + m_siteService.getNumberSensors(key) + ")");

            TreeMap<String, Sensor> sensors = m_siteService.getSensors(key);

            Set<String> keysSensors = sensors.keySet();

            Temperature temp;

            for (String keyS : keysSensors) {
                try {
                    temp = m_siteService.getSensorTemperature(key, keyS);

                    out.println("<br><tr/>  -" + keyS + " Temperature: " + temp.get() + " C");
                } catch (SiteException ex) {

                }

                // out.println("<br><tr/> -" + keyS + " Temperature: " + temp.get() + " C");
            }
        }

    }

    /*
     * protected void getHouseData (HttpServletResponse resp)
     * throws ServletException, IOException{
     *
     * resp.getWriter().println("<h1>Hello Servlet</h1>");
     * resp.getWriter().write("\n\n---------- OpenHS Core Data ---------");
     *
     * ISiteService service = siteServiceFactory.getInstance();
     *
     * resp.getWriter().write("\nSite ID is: " + service.getId());
     * resp.getWriter().write("\nNumber rooms is: " + service.getNumberRooms());
     *
     * TreeMap<String, Room> rooms = service.getRooms();
     *
     * Set<String> keys = rooms.keySet();
     *
     * for(String key: keys)
     * {
     * resp.getWriter().write("\n\n-" + key + "(Num Sensors:" + service.getNumberSensors(key) + ")");
     *
     * TreeMap<String, Sensor> sensors = service.getSensors(key);
     *
     * Set<String> keysSensors = sensors.keySet();
     *
     * for (String keyS : keysSensors)
     * {
     * resp.getWriter().write("\n -" + keyS + " Temperature: " + service.getSensorTemperature(key, keyS) + " C");
     * }
     * }
     *
     * }
     */

}
