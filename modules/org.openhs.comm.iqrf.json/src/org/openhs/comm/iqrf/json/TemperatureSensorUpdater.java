package org.openhs.comm.iqrf.json;

import org.json.JSONObject;
import org.openhs.core.commons.TemperatureSensor;
import org.openhs.core.commons.ThingUpdater;

public class TemperatureSensorUpdater extends ThingUpdater {

	private IqrfNode m_iqrfNode = null;
	private double m_temperature;
	
	public TemperatureSensorUpdater() {
		m_iqrfNode = new IqrfNode();
    	m_temperature = -273.15;
	}

	public TemperatureSensorUpdater(JSONObject jobj) {
		m_iqrfNode = new IqrfNode(jobj);

		setDevicePath("Mqtt" + '/' + "Iqrf/DpaResponse" + '/' + Integer.toString(m_iqrfNode.getAddress())  + '/' + m_iqrfNode.getType());  

		if (m_iqrfNode.getCommand().equals("READ") && m_iqrfNode.isResult()) {
			m_temperature = jobj.optDouble("Temperature");
		}
		else 
	    	m_temperature = -273.15;
	}
	
	public IqrfNode getIqrfNode() {
		return m_iqrfNode;
	}

	@Override
	public void updateIncoming() {
		((TemperatureSensor)getThing()).getTemperature().set(m_temperature);
	}

	@Override
	public void updateOutcoming() {
	}

}
