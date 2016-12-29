package org.openhs.comm.dummy;

import java.util.regex.Pattern;

import org.openhs.core.commons.TemperatureSensor;
import org.openhs.core.site.api.ISensorUpdater;

public class DummyTemperatureSensorUpdater implements ISensorUpdater {

	private String m_addr;
	private String m_type;
	private String m_value;
	
	public DummyTemperatureSensorUpdater(String data) {
		String[] parts = data.split(Pattern.quote("|"));
		m_addr = parts[0];
		m_type = parts[1];
		m_value = parts[2];
	}
	
	@Override
	public void update(Object thing) {
		((TemperatureSensor)thing).getTemperature().set(Double.parseDouble(m_value));
	}

	@Override
	public String getAddress() {
		return new String(m_addr + '/' + m_type); 
	}

	
}
