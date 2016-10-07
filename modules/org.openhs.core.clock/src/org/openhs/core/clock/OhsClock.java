package org.openhs.core.clock;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.openhs.core.commons.Clock;

public class OhsClock {
	
	Clock clock = new Clock();
	
	//initialize logger
	private Logger logger = LoggerFactory.getLogger(OhsClock.class);	
	
	public void activate() {
        logger.info("org.openhs.core.clock: activate()");
	}
	
	public void deactivate() {
        logger.info("org.openhs.core.clock: deactivate()");
	}

}
