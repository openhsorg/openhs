package org.openhs.comm.dummy;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.regex.Pattern;

import org.openhs.comm.api.ICommService;
import org.openhs.comm.api.Message;
import org.openhs.comm.api.ObjectFactory;
import org.openhs.comm.api.IMessageHandler;
import org.openhs.comm.api.IMessageParser;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Thing;
import org.openhs.core.site.api.ISensorUpdater;
import org.openhs.core.site.api.ISiteService;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class DummyService implements IMessageParser, ICommService, Runnable {

	private Logger logger = LoggerFactory.getLogger(DummyService.class);
	
	private final String m_name = "DummyService";
	private IMessageHandler m_mh = null;
	private Thread m_myThd = null;
    private volatile boolean running = true;
    private ISiteService m_siteService = null;

    private ObjectFactory<String> m_updaterFactory;
    private ObjectFactory<String> m_thingFactory;
    
    private DummyMessage m_msg0 = new DummyMessage("0", "Thermometer", "0.0");
    private DummyMessage m_msg1 = new DummyMessage("1", "Thermometer", "0.0");
    
    public DummyService() {
    	m_updaterFactory = new ObjectFactory<String>();
    	m_updaterFactory.registerClass("Thermometer", DummyTemperatureSensorUpdater.class);
    	m_thingFactory = new ObjectFactory<String>();
    	m_thingFactory.registerClass("TemperatureSensor", DummyTemperatureSensor.class);
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
						Thing thg = createThing((String)entry.getValue());
						logger.info("      setThingDevice: " + entry.getKey() + " " + (thg != null ? thg.getClass().getName() : "null"));
						if (thg != null) {
							m_siteService.setThingDevice(entry.getKey(), thg);
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
	public void registerMessageHandler(IMessageHandler mh) {
		m_mh = mh;
	}

	@Override
	public void unregisterMessageHandler(IMessageHandler mh) {
		m_mh = null;
	}

	@Override
	public void sendMessage(Message m) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getName() {
		return m_name;
	}

    public void setService(ISiteService siteService) {
    	logger.info( "setService(): ISiteService");
    	m_siteService = siteService;
    }

    public void unsetService(ISiteService siteService) {
    	logger.info( "unsetService(): ISiteService");
    	if (m_siteService == siteService)
    		m_siteService = null;
    }

	
	@Override
	public void run() {
		double temp = 19.0;
		double hum = 40.0;
		
		double temp1 = -10.0;
		double hum1 = 80.0;

		while (running) {
									
			if (m_mh != null) {			
				//msg 0
				{
					temp += 1.0;
					hum += 1.0;
					if (temp > 25.0)
						temp = -4.0;
					if (hum > 50.0)
						hum = 40.0;
					m_msg0.m_value = String.valueOf(temp);

					Message mes = new Message(m_name, "dummy", m_msg0.toString());

					if (m_mh != null) {
						m_mh.handleMessage(mes, this);
					}
				}

				//msg 1
				{
					temp1 += 1.0;
					hum1 += 1.0;
					if (temp1 > 20.0)
						temp1 = -15.0;
					if (hum1 > 101.0)
						hum1 = 80.0;
					m_msg1.m_value = String.valueOf(temp1);

					Message mes = new Message(m_name, "dummy", m_msg1.toString());

					if (m_mh != null) {
						m_mh.handleMessage(mes, this);
					}
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

	private Thing createThing(String thingType ) {
		Object obj = null;
		if (m_thingFactory.hasClass(thingType)) {
    		obj = m_thingFactory.createObject(thingType, "");
    	}
		return (Thing) obj;
	}

	@Override
	public ISensorUpdater parseMessage(Message msg) {
		String[] parts = msg.getData().split(Pattern.quote("|"));
		String id = parts[1];

		Object obj = null;
		if (id != null && m_updaterFactory.hasClass(id)) {
    		obj = m_updaterFactory.createObject(id, msg.getData());
    	}
		return (ISensorUpdater) obj;
	}

}
