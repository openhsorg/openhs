package org.openhs.core.site.services;

import org.openhs.core.site.api.ISensorUpdater;
import org.openhs.core.commons.Sensor;

public abstract class SensorUpdaterTemperature implements ISensorUpdater {
	
	private double m_temperature = 0.0;
	
	public void setTemperature (double temperature)	{
		m_temperature = temperature;
	}
	
	@Override
	public void update(Object thing) {
		((Sensor) thing).getTemperature().set(m_temperature);
	}

}
