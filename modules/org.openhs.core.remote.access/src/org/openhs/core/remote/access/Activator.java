package org.openhs.core.remote.access;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;
import org.openhs.core.site.services.SiteServiceFactory;
import org.openhs.core.site.data.ISiteService;

public class Activator implements BundleActivator {

	private static BundleContext context;
	private HttpServiceTracker serviceTracker;
	ServiceReference siteServiceFactoryReference;

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
				
		serviceTracker = new HttpServiceTracker(context);
		serviceTracker.mainServlet.siteServiceFactory = siteServiceFactory;
		serviceTracker.open();			
	}

	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#stop(org.osgi.framework.BundleContext)
	 */
	public void stop(BundleContext bundleContext) throws Exception {
		Activator.context = null;
		
	    serviceTracker.close();
	    serviceTracker = null;	
	    
	    bundleContext.ungetService(siteServiceFactoryReference);	 		
	}

}
