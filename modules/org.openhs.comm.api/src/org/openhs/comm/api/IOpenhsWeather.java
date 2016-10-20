package org.openhs.comm.api;

import org.openhs.core.commons.Weather;

public interface IOpenhsWeather {
	
	public void activate ();
	public void deactivate ();
	public Weather getCurrentWeather();

}
