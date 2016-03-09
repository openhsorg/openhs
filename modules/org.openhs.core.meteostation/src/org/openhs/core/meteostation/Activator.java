package org.openhs.core.meteostation;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;
import org.osgi.framework.ServiceRegistration;
import org.openhs.core.site.services.SiteServiceFactory;
import org.openhs.core.site.data.ISiteService;


public class Activator implements BundleActivator {

	private static BundleContext context;
	ServiceReference siteServiceFactoryReference;
	private ServiceRegistration serviceRegistration;
	
	private Meteostation station;
	private Refresh refresh;

	static BundleContext getContext() {
		return context;
	}

	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#start(org.osgi.framework.BundleContext)
	 */
	public void start(BundleContext bundleContext) throws Exception {
		Activator.context = bundleContext;
		
		siteServiceFactoryReference= bundleContext.getServiceReference(SiteServiceFactory.class.getName());
        SiteServiceFactory siteServiceFactory =(SiteServiceFactory)bundleContext.getService(siteServiceFactoryReference);	                                                  

        station = new Meteostation ();
        
		//SiteServiceFactory sf = new SiteServiceFactory ();
		if (station != null)
		{
			System.out.println("Starting S2");
			serviceRegistration = bundleContext.registerService(Meteostation.class.getName(), station, null);
		}
		else
		{
			System.out.println("Starting S:  ERROR");
		}        
        
        refresh = new Refresh (siteServiceFactory, station);
        refresh.start();
	}

	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#stop(org.osgi.framework.BundleContext)
	 */
	public void stop(BundleContext bundleContext) throws Exception {
		Activator.context = null;
		
	    refresh.stopThread();
	    refresh.join();
	    
		bundleContext.ungetService(siteServiceFactoryReference);
	}

}
