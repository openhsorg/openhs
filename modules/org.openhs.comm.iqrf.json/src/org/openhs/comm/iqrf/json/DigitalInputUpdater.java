package org.openhs.comm.iqrf.json;

import org.json.JSONObject;
import org.openhs.core.commons.TemperatureSensor;
import org.openhs.core.commons.DigitalInput;
import org.openhs.core.commons.ThingUpdater;

public class DigitalInputUpdater extends ThingUpdater {

	private IqrfNode m_iqrfNode = null;
	private boolean m_state;
	
	public DigitalInputUpdater() {
		m_iqrfNode = new IqrfNode();
    	m_state = false;
	}

	public DigitalInputUpdater(JSONObject jobj) {
		m_iqrfNode = new IqrfNode(jobj);

		getDevicePath().setAddr(Integer.toString(m_iqrfNode.getAddress()));
		getDevicePath().setType(m_iqrfNode.getType());

		if (m_iqrfNode.getCommand().equals("READ") && m_iqrfNode.isResult()) {
			m_state = jobj.getBoolean("State");
		}
		else 
	    	m_state = false;
	}

	public IqrfNode getIqrfNode() {
		return m_iqrfNode;
	}

	@Override
	public void updateIncoming() {
		((DigitalInput)getThing()).setState(m_state);
	}

	@Override
	public void updateOutcoming() {
	}

}
