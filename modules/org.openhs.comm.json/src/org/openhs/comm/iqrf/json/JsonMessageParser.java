package org.openhs.comm.iqrf.json;

import org.json.JSONObject;
import org.openhs.comm.api.IMessageParser;
import org.openhs.comm.api.Message;
import org.openhs.comm.api.ObjectFactory;
import org.openhs.core.site.api.ISensorUpdater;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JsonMessageParser extends ObjectFactory<JSONObject> implements IMessageParser {

	private Logger logger = LoggerFactory.getLogger(JsonMessageParser.class);
	
	public JsonMessageParser() {
		registerClass("Thermometer", JsonSensorUpdaterTemperature.class);
	}

	@Override
	public ISensorUpdater parseMessage(Message message) {
		Object obj = null;
    	JSONObject jobj = new JSONObject(message.getData());
    	
    	String id = jobj.getString("Type");
    	if (id != null && this.hasClass(id)) {
    		obj = this.createObject(id, jobj);
    	}
		return (ISensorUpdater) obj;
	}
	
	public void activate() {
		
	}

	public void deactivate() {
		
	}
}
