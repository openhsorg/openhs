package org.openhs.comm.dummy;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.regex.Pattern;

import org.openhs.core.commons.DevicePath;
import org.openhs.core.commons.ObjectFactory;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Switch;
import org.openhs.core.commons.Thing;
import org.openhs.core.commons.ThingUpdater;
import org.openhs.core.commons.api.ICommService;
import org.openhs.core.commons.api.IMessageHandler;
import org.openhs.core.commons.api.IMessageParser;
import org.openhs.core.commons.api.Message;
import org.openhs.core.site.api.ISiteService;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DummyService implements IMessageParser, ICommService, Runnable {

	private Logger logger = LoggerFactory.getLogger(DummyService.class);
	
	private final String m_name = "DummyService";
	private final String m_parserName = "dummy";

	private Thread m_myThd = null;
    private volatile boolean running = true;
    
    private ISiteService m_siteService = null;
    private IMessageHandler m_messageHandler = null;
    
    private ObjectFactory<ThingUpdater, String> m_updaterFactory;
    
    private DummyMessage m_thm0 = new DummyMessage("0", "Thermometer", "0.0","");
    private DummyMessage m_thm1 = new DummyMessage("1", "Thermometer", "0.0","");

    public DummyService() {
    	m_updaterFactory = new ObjectFactory<ThingUpdater, String>(ThingUpdater.class);

    	m_updaterFactory.registerClass("Thermometer", TemperatureSensorUpdater.class);
    	m_updaterFactory.registerClass("Switch", SwitchUpdater.class);
    }

    public void activate(ComponentContext componentContext, Map<String, Object> properties) {
		logger.info("**** activate()");
		updated(properties);
		m_myThd = new Thread(this);
		m_myThd.start();
	}
	
	public void deactivate () {
        this.terminate();
        try {
			m_myThd.join();
		} catch (InterruptedException ex) {
			// TODO Auto-generated catch block
			ex.printStackTrace();
		}
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
				if(entry.getKey().substring(0, 5).equals("Dummy")) {
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
	
    public void terminate() {
        running = false;
    }
	
	@Override
	public void sendMessage(Message m) {
		logger.debug(" Sending message: " + m.toString());
		
		//send back response - just workaround here to mimic switch response
		ThingUpdater tu = parseMessage(m);
		DevicePath dp = tu.getDevicePath();
		
		if (dp.getType().equals("Switch")) {
			
			try {
				Thread.sleep(50);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			SwitchUpdater dsu = (SwitchUpdater) tu;

		    DummyMessage dmm = new DummyMessage("0", "Switch", "true", "OK");
			
			dmm.m_addr = dp.getAddr();
			dmm.m_value = Boolean.toString(dsu.isState());

			Message mes = new Message(m_name, "dummy", dmm.toString());
			m_messageHandler.handleIncomingMessage(mes);
		}
	}

	@Override
	public String getName() {
		return m_name;
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
	public void run() {
		try {
			Thread.sleep(3000);
		} catch (InterruptedException e1) {
			e1.printStackTrace();
		}
		
		double temp = 19.0;
		double hum = 40.0;
		
		double temp1 = -10.0;
		double hum1 = 80.0;

		while (running) {
									
			if (m_messageHandler != null) {			
				//msg 0
				{
					temp += 1.0;
					hum += 1.0;
					if (temp > 25.0)
						temp = 15.0;
					if (hum > 50.0)
						hum = 40.0;

					m_thm0.m_value = String.valueOf(temp);

					Message mes = new Message(m_name, "dummy", m_thm0.toString());
					m_messageHandler.handleIncomingMessage(mes);
				}

				//msg 1
				{
					temp1 += 1.0;
					hum1 += 1.0;
					if (temp1 > 5.0)
						temp1 = -15.0;
					if (hum1 > 101.0)
						hum1 = 80.0;

					m_thm1.m_value = String.valueOf(temp1);

					Message mes = new Message(m_name, "dummy", m_thm1.toString());
					m_messageHandler.handleIncomingMessage(mes);
				}
			
			}
          	try {
				Thread.sleep (2000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				running = false;
			}
		}
	}

	@Override
	public ThingUpdater parseMessage(Message msg) {
		String[] parts = msg.getData().split(Pattern.quote("|"));
		String id = parts[1];

   		return m_updaterFactory.createObject(id, msg.getData());
	}

	@Override
	public String getParserName() {
    	return m_parserName;
	}
	
}
