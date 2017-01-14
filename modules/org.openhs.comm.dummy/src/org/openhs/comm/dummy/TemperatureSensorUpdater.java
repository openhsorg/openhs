package org.openhs.comm.dummy;

import java.util.regex.Pattern;

import org.openhs.core.commons.ThingUpdater;
import org.openhs.core.commons.TemperatureSensor;

public class TemperatureSensorUpdater extends ThingUpdater {

	private String m_value;
	
	public TemperatureSensorUpdater() {
	}

	public TemperatureSensorUpdater(String data) {
		String[] parts = data.split(Pattern.quote("|"));
		if (parts.length > 2) {
			getDevicePath().setAddr(parts[0]);
			getDevicePath().setType(parts[1]);
			m_value = parts[2];
			m_valid = true;
		}
		else {
			m_valid = false;
		}
	}
	
	@Override
	public void updateIncoming() {
		((TemperatureSensor)getThing()).getTemperature().set(Double.parseDouble(m_value));
	}

	@Override
	public void updateOutcoming() {
	}
}
