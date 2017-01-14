package org.openhs.core.commons.api;

public class Message {
	
	public Message(String channel, String topic, String data) {
		m_channel = channel;
		m_topic = topic;
		m_data = data;
	}

	public String getTopic() {
		return m_topic;
	}
	public void setTopic(String topic) {
		this.m_topic = topic;
	}
	public String getData() {
		return m_data;
	}
	public void setData(String data) {
		this.m_data = data;
	}
	public String getChannel() {
		return m_channel;
	}

	public void setChannel(String channel) {
		this.m_channel = channel;
	}
	
	@Override
	public String toString() {
		return new String('<' + m_channel + '/' + m_topic + '/' + m_data + '>');
	}
	
	private String m_channel;
	private String m_topic;
	private String m_data;
}
