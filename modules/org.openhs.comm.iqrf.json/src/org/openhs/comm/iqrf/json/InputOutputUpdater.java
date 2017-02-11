package org.openhs.comm.iqrf.json;

import org.json.JSONObject;
import org.openhs.core.commons.TemperatureSensor;
import org.openhs.core.commons.InputOutput;
import org.openhs.core.commons.ThingUpdater;

public class InputOutputUpdater extends ThingUpdater {

	private IqrfNode m_iqrfNode = null;
	private boolean m_state;
	
	public InputOutputUpdater() {
		m_iqrfNode = new IqrfNode();
    	m_state = false;
	}

	public InputOutputUpdater(JSONObject jobj) {
		m_iqrfNode = new IqrfNode(jobj);

		setDevicePath("Mqtt" + '/' + "Iqrf/DpaResponse" + '/' + Integer.toString(m_iqrfNode.getAddress())  + '/' + m_iqrfNode.getType());  
//		getDevicePath().setAddr(Integer.toString(m_iqrfNode.getAddress()));
//		getDevicePath().setType(m_iqrfNode.getType());

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
		((InputOutput)getThing()).setState(m_state);
	}

	@Override
	public void updateOutcoming() {
	}

}
