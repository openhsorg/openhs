package org.openhs.comm.dummy;

import org.openhs.comm.api.ICommService;
import org.openhs.comm.api.IMessage;
import org.openhs.comm.api.IMessageHandler;
import org.openhs.comm.api.SensorMessage;

public class DummyService implements ICommService, Runnable {
	
	private final String m_name = "DummyService";
	private IMessageHandler m_mh = null;
	private Thread m_myThd = null;
    private volatile boolean running = true;
    private SensorMessage m_msg1 = new SensorMessage("dummyDev", "Sensor1", 0.0, 0.0);
    private SensorMessage m_msg2 = new SensorMessage("dummyDev", "Sensor2", 0.0, 0.0);

	public void activate() {
		m_myThd = new Thread(this);
		m_myThd.start();
		System.out.println("org.openhs.comm.dummy: Activated...");
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
		System.out.println("org.openhs.comm.dummy: De-activated...");
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
	public void sendMessage(IMessage m) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getName() {
		return m_name;
	}

	@Override
	public void run() {
		double temp = 19.0;
		double hum = 40.0;
		
		double temp2 = -10.0;
		double hum2 = 80.0;

		while (running) {
			if (m_mh != null) {
				//msg 1
				{
					temp += 1.0;
					hum += 1.0;
					if (temp > 25.0)
						temp = -4.0;
					if (hum > 50.0)
						hum = 40.0;
					m_msg1.setTemp(temp);
					m_msg1.setHum(hum);
					m_mh.handleMessage(m_msg1, this);
				}

				//msg 2
				{
					temp2 += 1.0;
					hum2 += 1.0;
					if (temp2 > 20.0)
						temp2 = -15.0;
					if (hum2 > 101.0)
						hum2 = 80.0;
					m_msg2.setTemp(temp2);
					m_msg2.setHum(hum2);
					m_mh.handleMessage(m_msg2, this);
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

}
