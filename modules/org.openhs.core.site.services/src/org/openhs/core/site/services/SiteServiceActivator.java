package org.openhs.core.site.services;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceRegistration;

import org.openhs.core.site.services.SiteServiceFactory;
import org.openhs.core.site.services.internal.MySiteServiceImpl;
import org.openhs.core.site.data.ISiteService;


public class SiteServiceActivator implements BundleActivator {

	private ServiceRegistration serviceRegistration;

	private static BundleContext context;
		
	static BundleContext getContext() {
		return context;
	}

	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#start(org.osgi.framework.BundleContext)
	 */
	public void start(BundleContext bundleContext) throws Exception {
		SiteServiceActivator.context = bundleContext;
		
		System.out.println("Starting S");
		
		SiteServiceFactory sf = new SiteServiceFactory ();
		if (sf != null)
		{
			System.out.println("Starting S2");
			serviceRegistration = bundleContext.registerService(SiteServiceFactory.class.getName(), sf, null);
		}
		else
		{
			System.out.println("Starting S:  ERROR");
		}
	}

	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#stop(org.osgi.framework.BundleContext)
	 */
	public void stop(BundleContext bundleContext) throws Exception {
		SiteServiceActivator.context = null;
		
		serviceRegistration.unregister();
		
	    System.out.println("Stopping S");
	
	}
	
}
