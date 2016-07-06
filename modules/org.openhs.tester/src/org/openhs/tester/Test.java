package org.openhs.tester;

import org.openhs.core.site.data.ISiteService;
import org.openhs.core.commons.Message;
import org.openhs.core.commons.Temperature;
import org.openhs.core.mqtt.client.MqttSender;

public class Test {
	
	
	Message msg = new Message ();

    private MyThread m_myThread;

    public void activate() {
        msg.println("org.openhs.tester: activate");
        
        m_myThread = new MyThread(m_siteService, mqtt, this);
        m_myThread.start();                
    }

    public void deactivate() {
    	msg.println("org.openhs.tester: deactivate");
        m_myThread.stopThread();
        try {
            m_myThread.join();
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public void setService(ISiteService ser) {
    	msg.println("org.openhs.tester: Set ISiteService");
        m_siteService = ser;
        
        temp1.set(-10.0);
        temp2.set(-10.0);
    }

    public void unsetService(ISiteService ser) {
    	msg.println("org.openhs.tester: UnSet ISiteService");
        if (m_siteService == ser) {
            ser = null;
        }
    }

    public void setServiceMqtt(MqttSender sender) {
    	msg.println("org.openhs.tester: Set setServiceMqtt");
        mqtt = sender;
    }

    public void unsetServiceMqtt(MqttSender sender) {
    	msg.println("org.openhs.tester: UnSet unsetServiceMqtt");
        if (mqtt == sender) {
            sender = null;
        }
    }    
    
    private ISiteService m_siteService = null;
    private MqttSender mqtt = null;

    // double temp1 = 0;
    // double temp2 = 0;

    Temperature temp1 = new Temperature();
    Temperature temp2 = new Temperature();

    void SetTemperature() {
        temp1.set(temp1.getCelsius() + 0.5);
        temp2.set(temp2.getCelsius() + 2);
        /*
         * temp1 = temp1 + 0.5;
         * temp2 = temp2 + 2;
         */
        if (temp1.getCelsius() >= 40) {
            temp1.set(-40);
        }
        if (temp2.getCelsius() >= 40) {
            temp2.set(-40);
        }

       // m_siteService.setSensorTemperature("Room1", "Sensor1", temp1);
       m_siteService.setSensorTemperature("Outside", "Sensor1", temp2);

    }   

}
