package org.openhs.comm.dummy;

import org.openhs.core.commons.TemperatureSensor;

public class DummyTemperatureSensor extends TemperatureSensor {

	public String m_addr;
	public String m_type;
	public String m_value;
	
	public DummyTemperatureSensor(String msg) {
	}
	
	DummyMessage encode() {
		return new DummyMessage(m_addr, m_type, getTemperature().toString());
	}

}
