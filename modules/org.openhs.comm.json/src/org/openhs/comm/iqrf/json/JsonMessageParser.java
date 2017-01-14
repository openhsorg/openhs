package org.openhs.comm.iqrf.json;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import org.json.JSONObject;
import org.openhs.core.commons.DevicePath;
import org.openhs.core.commons.ObjectFactory;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Thing;
import org.openhs.core.commons.ThingUpdater;
import org.openhs.core.commons.api.IMessageHandler;
import org.openhs.core.commons.api.IMessageParser;
import org.openhs.core.commons.api.Message;
import org.openhs.core.site.api.ISiteService;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class JsonMessageParser implements IMessageParser {

	private Logger logger = LoggerFactory.getLogger(JsonMessageParser.class);

    private ISiteService m_siteService = null;
    private IMessageHandler m_messageHandler = null;
    
	private ObjectFactory<ThingUpdater, JSONObject> m_updaterFactory = null;

	private final String m_parserName = "Iqrf/DpaResponse";
    
	public JsonMessageParser() {
		m_updaterFactory = new ObjectFactory<ThingUpdater, JSONObject>(ThingUpdater.class);
		m_updaterFactory.registerClass("Thermometer", TemperatureSensorUpdater.class);
		m_updaterFactory.registerClass("LedR", SwitchUpdater.class);
	}

    public void activate(ComponentContext componentContext, Map<String, Object> properties) {
		logger.info("**** activate()");
		updated(properties);
	}
	
	public void deactivate () {
		logger.info("**** deactivate()");
	}

	public void updated(Map<String, Object> properties) {
		logger.info("**** updated()");

		//TODO read cfg from props
		if(properties != null && !properties.isEmpty()) {
			Iterator<Entry<String, Object>> it = properties.entrySet().iterator();
			while (it.hasNext()) {
				Entry<String, Object> entry = it.next();
				logger.info("    " + entry.getKey() + " = " +
						entry.getValue() + " of type " + entry.getValue().getClass().toString());
				if(entry.getKey().substring(0, 4).equals("Mqtt")) {
					try {
						DevicePath devPath = new DevicePath(); 
						devPath.parse((String) entry.getKey());
						
						ThingUpdater tu = m_updaterFactory.createObject(devPath.getType());
						
						logger.info("      updater: " + entry.getKey() + " " + (tu != null ? tu.getClass().getName() : "null"));
						if (tu != null) {
						
							tu.setMessageHandler(m_messageHandler);
							tu.setDevicePath(devPath);
							
							Thing th = m_siteService.getThingDevice(entry.getKey());
							th.setUpdater(tu);
						}
					} catch (SiteException e) {
						logger.info(e.getMessage());
					}
				}
			}
		}
	}
	
    public void setService(ISiteService siteService) {
    	logger.info( "**** setService(): ISiteService");
    	m_siteService = siteService;
    }

    public void unsetService(ISiteService siteService) {
    	logger.info( "**** unsetService(): ISiteService");
    	if (m_siteService == siteService)
    		m_siteService = null;
    }

    public void setService(IMessageHandler messageHandler) {
    	logger.info( "**** setService(): IMessageHandler");
    	m_messageHandler = messageHandler;
    }

    public void unsetService(IMessageHandler messageHandler) {
    	logger.info( "**** unsetService(): IMessageHandler");
    	if (m_messageHandler == messageHandler)
    		m_messageHandler = null;
    }

	
	@Override
	public ThingUpdater parseMessage(Message message) {
    	JSONObject jobj = new JSONObject(message.getData());
    	String id = jobj.getString("Type");
    	return m_updaterFactory.createObject(id, jobj);
	}
	
	@Override
	public String getParserName() {
    	return m_parserName;
	}

}
