package org.openhs.core.commons;

import java.util.regex.Pattern;

public class DevicePath {
	private String channel = "-";
	private String topic = "-";
	private String addr = "-";
	private String type = "-";
	
	public DevicePath() {
	}
	
	public DevicePath(String channel, String topic, String addr, String type) {
		this.channel = channel;
		this.topic = topic;
		this.addr = addr;
		this.type = type;
	}

	public void parse(String devicePath) {
		String[] parts = devicePath.split(Pattern.quote("/"),2);
		if (parts.length == 2) {
			channel = parts[0];
			String reminder = parts[1];
			String[] partsReminder = reminder.split(Pattern.quote("/"));
			if (partsReminder.length >= 3) {
				type = partsReminder[partsReminder.length-1];
				addr = partsReminder[partsReminder.length-2];
				topic = "";
				for (int i = 0; i < partsReminder.length-2; i++) {
					topic += partsReminder[i] + '/';
				}
				topic = topic.substring(0, topic.length()-1);
			}
			else {
				throw new IndexOutOfBoundsException(
					" Parsed devicePath has insufficient number of elements: " + devicePath);
			}
		}
		else {
			throw new IndexOutOfBoundsException(
				" Parsed devicePath has insufficient number of elements: " + devicePath);
		}
	}

	public String encode() {
		return channel + '/' + topic + '/' + addr  + '/' + type;  
	}

	public String getChannel() {
		return channel;
	}
	public void setChannel(String channel) {
		this.channel = channel;
	}
	public String getTopic() {
		return topic;
	}
	public void setTopic(String topic) {
		this.topic = topic;
	}
	public String getAddr() {
		return addr;
	}
	public void setAddr(String addr) {
		this.addr = addr;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
}
