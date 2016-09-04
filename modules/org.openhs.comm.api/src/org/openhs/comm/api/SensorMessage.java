package org.openhs.comm.api;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SensorMessage implements IMessage {
	
	//TODO topic, message - isn't it specific just for mqtt?
	//private String m_topic;
	//public String m_message;

	private String m_device;
	private String m_name;
	private double m_temp;
	private double m_hum;

	public SensorMessage(String device, String name, double temp, double hum) {
		m_device = device;
		m_name = name;
		m_temp = temp;
		m_hum = hum;
	}
	
	public String getDevice() {
		return m_device;
	}

	public String getName() {
		return m_name;
	}

	public double getTemp() {
		return m_temp;
	}

	public double getHum() {
		return m_hum;
	}

	public void setTemp(double temp) {
		m_temp = temp;
	}

	public void setHum(double hum) {
		m_hum = hum;
	}

	public String toString() {
		String retval = " device: " + m_device + " name: " + m_name + " temp: " + m_temp + " hum: " + m_hum;
		return retval;
	}

}
