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
        ISiteService service = siteServiceFactory.getInstance();	
        
        station = new Meteostation (service);
        
		serviceRegistration = bundleContext.registerService(Meteostation.class.getName(), station, null);
	}

	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#stop(org.osgi.framework.BundleContext)
	 */
	public void stop(BundleContext bundleContext) throws Exception {
		Activator.context = null;

		bundleContext.ungetService(siteServiceFactoryReference);
	}

}
