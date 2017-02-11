package org.openhs.comm.iqrf.json;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import org.apache.commons.io.IOUtils;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.json.JSONArray;
import org.json.JSONObject;
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

import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

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
		m_updaterFactory.registerClass("IO", ContactSensorUpdater.class);
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

		String configFileName = (String) properties.get("ConfigFile");
		String openhsHome = (String) properties.get("openhsHome");
		String configFilePathName = openhsHome + configFileName;
		
		try {
			loadConfig(configFilePathName);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
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

	public void loadConfig(String path) throws IOException {
        InputStream is;
        is = new FileInputStream(path);
        String jsonTxt;
		jsonTxt = IOUtils.toString(is);
    	JSONObject jobj = new JSONObject(jsonTxt);
    	
    	JSONArray things = jobj.getJSONArray("thingsMapping");
    	Iterator<Object> it = things.iterator();
    	while (it.hasNext()) {
    		JSONObject thingJobj = (JSONObject)it.next();
    		String iqrfType = thingJobj.getString("Type");
        	ThingUpdater thingUpdater = m_updaterFactory.createObject(iqrfType, thingJobj);
        	thingUpdater.setMessageHandler(m_messageHandler);

        	logger.info("TU: " + iqrfType + " " + (thingUpdater != null ? thingUpdater.getClass().getName() : "null") +
        			" DP: " + thingUpdater.getDevicePath()
        			);
    		
			try {
				Thing thing = m_siteService.getThingDevice(thingUpdater.getDevicePath());
				thing.setUpdater(thingUpdater);
	        	logger.info("  T: " + thing.getClass().getName() + " SP: " + thing.getSitePath());
			} catch (SiteException e) {
				logger.info(e.getMessage() + thingUpdater.getDevicePath());
			}

    	}
	}

}
