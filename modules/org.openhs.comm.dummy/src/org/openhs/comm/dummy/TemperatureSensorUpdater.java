package org.openhs.comm.dummy;

import org.openhs.core.commons.ThingUpdater;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.json.JSONObject;
import org.openhs.core.commons.TemperatureSensor;

public class TemperatureSensorUpdater extends ThingUpdater {

	private Logger logger = LoggerFactory.getLogger(TemperatureSensorUpdater.class);
	
	//private String m_value;
	private int m_addr;
	private String m_type;
	private int m_period = 2000;
	private double m_max = 100.0;
	private double m_min = 0.0;
	private double m_step = 1.0;
	private double m_value;
	Run m_run;
	Thread m_myThd;
	
	public TemperatureSensorUpdater() {
	}

	public TemperatureSensorUpdater(JSONObject jobj) {
    	m_type = jobj.getString("Type");
    	m_addr = jobj.getInt("Addr");
    	m_period = jobj.optInt("Period", m_period);
    	m_max = jobj.optDouble("Max", m_max);
    	m_min = jobj.optDouble("Min", m_min);
    	m_step = jobj.optDouble("Step", m_step);
    	m_value = jobj.optDouble("Init",m_min);

    	m_valid = true;
		setDevicePath("DummyService" + '/' + "dummy" + '/' + m_addr  + '/' + m_type);
		
		m_run = new Run();
		m_myThd = new Thread(m_run);
		m_myThd.start();
		
	}
	
	@Override
	public void updateIncoming() {
		if (getThing() != null)
			((TemperatureSensor)getThing()).getTemperature().set(m_value);
		
		//((TemperatureSensor)getThing()).setTimestamp();
	}

	@Override
	public void updateOutcoming() {
	}
	
	void updateTemperature() {
		m_value = m_value + m_step < m_max ? m_value + m_step : m_min;
    	//logger.info(" Updated: " + getDevicePath() + " t= " + m_value);
    	updateIncoming();
	}
	
	class Run implements Runnable {

		@Override
		public void run() {
			if (m_period > 0) {
				while (true) {
					updateTemperature();
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
