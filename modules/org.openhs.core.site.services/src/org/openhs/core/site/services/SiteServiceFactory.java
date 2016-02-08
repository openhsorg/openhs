package org.openhs.core.site.services;

import org.openhs.core.site.data.ISiteService;
import org.openhs.core.site.services.internal.MySiteServiceImpl;

public class SiteServiceFactory {
	
	  private static ISiteService siteService = new MySiteServiceImpl();

	  public static ISiteService getInstance() {
	    return siteService;
	  }
}
