package org.openhs.core.commons.api;

public class DeviceMapping implements IDeviceMapping {

	private String m_device_name = ""; //device name
	private String m_ohs_name = ""; //name in data structure
	
	public DeviceMapping(String device_name, String ohs_name) {
		m_device_name = device_name;
		m_ohs_name = ohs_name;
	}
	
	public String getDeviceName() {
		return m_device_name;
	}
	
	public String getOhsName() {
		return m_ohs_name;
	}
	
}
