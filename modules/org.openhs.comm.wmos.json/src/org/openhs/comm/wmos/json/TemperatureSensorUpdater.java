package org.openhs.comm.wmos.json;

import org.json.JSONObject;
import org.openhs.core.commons.TemperatureSensor;
import org.openhs.core.commons.ThingUpdater;

public class TemperatureSensorUpdater extends ThingUpdater {

	private WmosNode m_wmosNode = null;
	private double m_temperature;
	
	public TemperatureSensorUpdater() {
		m_wmosNode = new WmosNode();
    	m_temperature = -273.15;
	}

	public TemperatureSensorUpdater(JSONObject jobj) {
		m_wmosNode = new WmosNode(jobj);

		setDevicePath("Mqtt" + '/' + m_wmosNode.getAddress()  + '/' + m_wmosNode.getType());  

		m_temperature = jobj.optDouble("Temperature");
	}
	
	public WmosNode getIqrfNode() {
		return m_wmosNode;
	}

	@Override
	public void updateIncoming() {
		((TemperatureSensor)getThing()).getTemperature().set(m_temperature);
	}

	@Override
	public void updateOutcoming() {
	}

}
