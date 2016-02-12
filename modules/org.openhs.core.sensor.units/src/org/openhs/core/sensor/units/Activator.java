package org.openhs.core.sensor.units;

import org.openhs.core.site.services.SiteServiceFactory;
import org.openhs.core.sensor.units.ReadSensors;
import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;

public class Activator implements BundleActivator {

	private static BundleContext context;
	ServiceReference siteServiceFactoryReference;
	private ReadSensors readThread;

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

        readThread = new ReadSensors();	  
        readThread.siteServiceFactory = siteServiceFactory;
        readThread.start();	  		
	}

	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#stop(org.osgi.framework.BundleContext)
	 */
	public void stop(BundleContext bundleContext) throws Exception {
		Activator.context = null;
		
	    //System.out.println("Stopping thread...");
	    readThread.stopThread();
	    readThread.join();		
	    
	    bundleContext.ungetService(siteServiceFactoryReference);		
	}

}
