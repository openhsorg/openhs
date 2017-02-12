package org.openhs.comm.dummy;

import org.openhs.core.commons.ThingUpdater;
import org.json.JSONObject;
import org.openhs.core.commons.TemperatureSensor;

public class TemperatureSensorUpdater extends ThingUpdater {

	private String m_value;
	private int m_addr;
	private String m_type = "-273.15";
	
	public TemperatureSensorUpdater() {
	}

	public TemperatureSensorUpdater(JSONObject jobj) {
    	m_type = jobj.getString("Type");
    	m_addr = jobj.getInt("Addr");
    	m_value = jobj.optString("Value", "-273.15");
		m_valid = true;
		setDevicePath("DummyService" + '/' + "dummy" + '/' + m_addr  + '/' + m_type);  
	}
	
	@Override
	public void updateIncoming() {
		((TemperatureSensor)getThing()).getTemperature().set(Double.parseDouble(m_value));
	}

	@Override
	public void updateOutcoming() {
	}
}
