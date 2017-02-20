package org.openhs.comm.dummy;

import org.openhs.core.commons.ThingUpdater;
import org.json.JSONObject;
import org.openhs.core.commons.ContactSensor;

public class ContactSensorUpdater extends ThingUpdater {

	private String m_value;
	private int m_addr;
	private String m_type = "-273.15";
	
	public ContactSensorUpdater() {
	}

	public ContactSensorUpdater(JSONObject jobj) {
    	m_type = jobj.getString("Type");
    	m_addr = jobj.getInt("Addr");
    	m_value = jobj.optString("Value", "0.0");
		m_valid = true;
		setDevicePath("DummyService" + '/' + "dummy" + '/' + m_addr  + '/' + m_type);  
	}
	
	@Override
	public void updateIncoming() {
		double val = Double.parseDouble(m_value);
		((ContactSensor)getThing()).setState(val > 0.0);
	}

	@Override
	public void updateOutcoming() {
	}
}
