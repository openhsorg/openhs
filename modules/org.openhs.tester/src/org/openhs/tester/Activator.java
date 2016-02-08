package org.openhs.tester;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;

import org.openhs.tester.MyThread;
import org.openhs.core.site.services.*;
import org.openhs.core.site.data.ISiteService;

public class Activator implements BundleActivator {

	ServiceReference helloServiceReference;

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
	    
        helloServiceReference= bundleContext.getServiceReference(SiteServiceFactory.class.getName());
        SiteServiceFactory helloService =(SiteServiceFactory)bundleContext.getService(helloServiceReference);	    
        
        System.out.println("OKOKOK");
        System.out.println(helloService.getInstance().tellMe());
        
        System.out.println("Number rooms is: " + helloService.getInstance().getNumberRooms());
        
		System.out.println("Starting thread");
	    myThread = new MyThread();
	    myThread.start();	        
        
	}

	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#stop(org.osgi.framework.BundleContext)
	 */
	public void stop(BundleContext bundleContext) throws Exception {
		Activator.context = null;
		
	    System.out.println("Stopping thread...");
	    myThread.stopThread();
	    myThread.join();		
	    
	    bundleContext.ungetService(helloServiceReference);
	}

}
