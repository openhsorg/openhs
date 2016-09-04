package org.openhs.core.dataupdate;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;

import org.openhs.comm.api.ICommService;
import org.openhs.comm.api.IMessage;
import org.openhs.comm.api.IMessageHandler;
import org.openhs.comm.api.SensorMessage;
import org.openhs.core.commons.Humidity;
import org.openhs.core.commons.Temperature;
import org.openhs.core.site.data.ISiteService;

public class Dataupdate implements IMessageHandler, Runnable {
	
	private BlockingQueue<IMessage> m_queue = null;
	private Thread m_myThd = null;
    private volatile boolean running = true;
    private ISiteService m_siteService = null;
	
	public Dataupdate() {
		m_queue = new LinkedBlockingQueue<IMessage>();
	}
	
	public void activate () {
		System.out.println("org.openhs.core.dataupdate: Activated...");
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
        System.out.println("Thread successfully stopped.");		
		System.out.println("org.openhs.core.dataupdate: De-activated...");
	}
	
    public void setService(ICommService cs) {
    	System.out.println("org.openhs.core.dataupdate: Set ICommService: " + cs.getName());
    	cs.registerMessageHandler(this);
    }

    public void unsetService(ICommService cs) {
    	System.out.println("org.openhs.core.dataupdate: UnSet ICommService: " + cs.getName());
    	cs.unregisterMessageHandler(this);
    }

    public void setService(ISiteService siteService) {
    	System.out.println("org.openhs.core.dataupdate: Set ISiteService: ");
    	m_siteService = siteService;
    }

    public void unsetService(ISiteService siteService) {
    	System.out.println("org.openhs.core.dataupdate: UnSet ISiteService: ");
    }

    void consume(IMessage x) {
    	//TODO
    	if (x == null) {
        	System.out.println("no msg");
    	}
    	else {
    		SensorMessage smsg = (SensorMessage)x;
    		System.out.println("do soming: " + smsg );
    		
    		Temperature temp = new Temperature ();
    		temp.set(smsg.getTemp());
    		Humidity hum = new Humidity ();
    		hum.set(smsg.getHum());
    		
	  		if (m_siteService != null) {
	  			//TODO link - sensor room?
	  			if (smsg.getName().compareTo("Sensor1") == 0) {
	  			
		    		if (!this.m_siteService.setSensorTemperature("Room1", smsg.getName(), temp)) {
			  			System.out.println("Cannot write temp :(");
					} 	  		
		    	
			  		if (!this.m_siteService.setSensorHumidity("Room1", smsg.getName(), hum)) {
			  			System.out.println("Cannot write temp :(");
					}
	  			}
	  			else if (smsg.getName().compareTo("Sensor2") == 0) {
		  			
		    		if (!this.m_siteService.setSensorTemperature("Outside", smsg.getName(), temp)) {
			  			System.out.println("Cannot write temp :(");
					} 	  		
		    	
			  		if (!this.m_siteService.setSensorHumidity("Outside", smsg.getName(), hum)) {
			  			System.out.println("Cannot write temp :(");
					}
	  			}
	  			else {
		  			System.out.println("Unknown Sensor name: " + smsg.getName());
	  			}
	  		}
    	}
    }
    
    @Override
	public void run() {
	     try {
	       while (running) { consume(m_queue.poll(5, TimeUnit.SECONDS)); }
	     } catch (InterruptedException e) { 
			// TODO Auto-generated catch block
	     	System.out.println("no message for 5 sec");
	     }
    }
		
    public void terminate() {
        running = false;
    }
    
	@Override
	public void handleMessage(IMessage m, ICommService cs) {
    	System.out.println(cs.getName() + ": " + m);
		try {
			m_queue.offer(m, 100, TimeUnit.MILLISECONDS);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}  
}
