package org.openhs.comm.iqrf.json;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class IqrfJson {

	private Logger logger = LoggerFactory.getLogger(JsonMessageParser.class);
	
	public IqrfJson() {
	
	}

	public void activate(ComponentContext componentContext, Map<String, Object> properties) {
		logger.info("**** activate()");
	}

	public void deactivate() {
		
	}

	public void updated(Map<String, Object> properties) {
		logger.info("**** updated()");

		//TODO read cfg from props
		//m_properties = properties;
		if(properties != null && !properties.isEmpty()) {
			Iterator<Entry<String, Object>> it = properties.entrySet().iterator();
			while (it.hasNext()) {
				Entry<String, Object> entry = it.next();
				logger.info("    " + entry.getKey() + " = " +
						entry.getValue() + " of type " + entry.getValue().getClass().toString());
			}
		}
		
	}
}
