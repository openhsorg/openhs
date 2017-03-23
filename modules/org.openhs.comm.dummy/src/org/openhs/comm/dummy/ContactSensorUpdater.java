package org.openhs.comm.dummy;

import org.openhs.core.commons.ThingUpdater;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.json.JSONObject;
import org.openhs.core.commons.ContactSensor;

public class ContactSensorUpdater extends ThingUpdater {

	private Logger logger = LoggerFactory.getLogger(ContactSensorUpdater.class);

	private boolean m_value = false;
	private int m_addr;
	private String m_type;
	private int m_period = 8000;
	Run m_run;
	Thread m_myThd;
	
	public ContactSensorUpdater() {
	}

	public ContactSensorUpdater(JSONObject jobj) {
    	m_type = jobj.getString("Type");
    	m_addr = jobj.getInt("Addr");
    	m_period = jobj.optInt("Period", m_period);
    	m_value = jobj.optBoolean("Init", m_value);
		m_valid = true;
		setDevicePath("DummyService" + '/' + "dummy" + '/' + m_addr  + '/' + m_type);  

		m_run = new Run();
		m_myThd = new Thread(m_run);
		m_myThd.start();
	
	}
	
	@Override
	public void updateIncoming() {
		if (getThing() != null)
			((ContactSensor)getThing()).setState(m_value);
	}

	@Override
	public void updateOutcoming() {
	}

	void updateVal() {
		m_value = ! m_value;
    	logger.info(" Updated: " + getDevicePath() + " v= " + m_value);
    	updateIncoming();
	}

	class Run implements Runnable {

		@Override
		public void run() {
			if (m_period > 0) {
				while (true) {
					updateVal();
					try {
						Thread.sleep(m_period);
					} catch (InterruptedException e1) {
						e1.printStackTrace();
					}
				}
			}
		}
	};
	
}
