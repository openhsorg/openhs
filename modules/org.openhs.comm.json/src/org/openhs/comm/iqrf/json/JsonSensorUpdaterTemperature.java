package org.openhs.comm.iqrf.json;

import org.json.JSONObject;
import org.openhs.core.site.services.SensorUpdaterTemperature;

public class JsonSensorUpdaterTemperature extends SensorUpdaterTemperature {

	private IqrfNode m_iqrfNode = null;
	
	public JsonSensorUpdaterTemperature(JSONObject jobj) {
		m_iqrfNode = new IqrfNode(jobj);

		double temp = jobj.getInt("Temperature");
		this.setTemperature(temp);

	}

	public IqrfNode getIqrfNode() {
		return m_iqrfNode;
	}

	@Override
	public String getAddress() {
		return String.valueOf(m_iqrfNode.getAddress());
	}

}
