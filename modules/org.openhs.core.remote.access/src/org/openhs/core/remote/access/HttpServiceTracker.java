package org.openhs.core.remote.access;


import org.openhs.core.remote.access.MainServlet;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;
import org.osgi.service.http.HttpService;
import org.osgi.util.tracker.ServiceTracker;

public class HttpServiceTracker extends ServiceTracker {
	
  public MainServlet mainServlet = new MainServlet();
  public ImageServlet imageServlet = new ImageServlet();
  public ImageServlet2 imageServlet2 = new ImageServlet2();
  public ImageServlet3 imageServlet3 = new ImageServlet3();

  public HttpServiceTracker(BundleContext context) {
    super(context, HttpService.class.getName(), null);
  }
  // ...
  
  // ...
  public Object addingService(ServiceReference reference) {
    HttpService httpService = (HttpService) super.addingService(reference);
    if (httpService == null)
      return null;

    try {
      //System.out.println("Registering servlet at /openhs");
      httpService.registerServlet("/openhs", mainServlet, null, null);
      httpService.registerServlet("/image", imageServlet, null, null);
      httpService.registerServlet("/image2", imageServlet2, null, null);
      httpService.registerServlet("/image3", imageServlet3, null, null);
    } catch (Exception e) {
      e.printStackTrace();
    }

    return httpService;
  }
  
  // ..
  public void removedService(ServiceReference reference, Object service) {
    HttpService httpService = (HttpService) service;

   // System.out.println("Unregistering /openhs");
    httpService.unregister("/openhs");
    httpService.unregister("/image");
    httpService.unregister("/image2");
    httpService.unregister("/image3");

    super.removedService(reference, service);
  }

} 
