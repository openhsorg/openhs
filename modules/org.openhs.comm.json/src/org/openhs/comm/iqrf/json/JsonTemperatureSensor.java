package org.openhs.comm.iqrf.json;

import org.json.JSONObject;
import org.openhs.core.commons.sensors.TemperatureSensor;

public class JsonTemperatureSensor extends TemperatureSensor {
	private IqrfNode m_iqrfNode = null;
	
	public JsonTemperatureSensor(JSONObject jobj) {
		m_iqrfNode = new IqrfNode(jobj);

		double temp = jobj.getInt("Temperature");
		this.getTemperature().set(temp);

	}

	public IqrfNode getIqrfNode() {
		return m_iqrfNode;
	}
}
