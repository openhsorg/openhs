package org.openhs.core.configuration;

import org.openhs.core.commons.Configuration;
import org.openhs.core.commons.Message;
import org.openhs.core.site.data.ISiteService;


public interface IConfiguration {

		
	Configuration getConfiguration ();
	
	public boolean setConfiguration (Configuration configIn);

}
