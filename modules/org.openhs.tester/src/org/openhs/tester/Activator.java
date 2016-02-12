package org.openhs.tester;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;

import org.openhs.tester.MyThread;
import org.openhs.tester.HttpServiceTracker;
import org.openhs.core.site.services.SiteServiceFactory;
import org.openhs.core.site.data.ISiteService;

public class Activator implements BundleActivator {

	ServiceReference siteServiceFactoryReference;
	private HttpServiceTracker serviceTracker;

	private static BundleContext context;
	private MyThread myThread;

	static BundleContext getContext() {
		return context;
	}

	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#start(org.osgi.framework.BundleContext)
	 */
	public void start(BundleContext bundleContext) throws Exception {
		Activator.context = bundleContext;		
						
	    serviceTracker = new HttpServiceTracker(context);
	    serviceTracker.open();		
	    	    	    
		System.out.println("Tester Activator Starts...");
		
		siteServiceFactoryReference= bundleContext.getServiceReference(SiteServiceFactory.class.getName());
        SiteServiceFactory siteServiceFactory =(SiteServiceFactory)bundleContext.getService(siteServiceFactoryReference);	                                                  

	    myThread = new MyThread();	  
	    myThread.siteServiceFactory = siteServiceFactory;
	    myThread.serviceTracker = serviceTracker;
	    myThread.start();	        
        
	}

	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#stop(org.osgi.framework.BundleContext)
	 */
	public void stop(BundleContext bundleContext) throws Exception {
		Activator.context = null;
		
	    serviceTracker.close();
	    serviceTracker = null;		
		
	    System.out.println("Stopping thread...");
	    myThread.stopThread();
	    myThread.join();		
	    
	    bundleContext.ungetService(siteServiceFactoryReference);
	}

}