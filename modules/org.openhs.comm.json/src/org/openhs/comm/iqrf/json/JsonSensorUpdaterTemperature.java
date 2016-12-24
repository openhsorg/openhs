package org.openhs.comm.iqrf.json;

import org.json.JSONObject;
import org.openhs.core.site.services.SensorUpdaterTemperature;

public class JsonSensorUpdaterTemperature extends SensorUpdaterTemperature {
	private IqrfNode m_iqrfNode = null;
	private String m_channel;
	private String m_topic;
	private String m_address;
	
	public JsonSensorUpdaterTemperature(JSONObject jobj) {
		m_iqrfNode = new IqrfNode(jobj);

		double temp = jobj.getInt("Temperature");
		this.setTemperature(temp);

	}

	public IqrfNode getIqrfNode() {
		return m_iqrfNode;
	}

	@Override
	public String getPathAddress() {
		return m_channel + '/' + m_topic + '/' + m_address;
	}

	@Override
	public void setPath(String channel, String topic) {
		m_channel = channel;
		m_topic = topic;
		m_address = String.valueOf(m_iqrfNode.getAddress());
	}
}
