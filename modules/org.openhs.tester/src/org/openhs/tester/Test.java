package org.openhs.tester;

import org.openhs.core.site.data.ISiteService;
import org.openhs.core.commons.Message;
import org.openhs.core.commons.Temperature;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;


public class Test {
	
	
	Message msg = new Message ();

    private MyThread m_myThread;

    public void activate() {
        msg.println("org.openhs.tester: activate");
        
        m_myThread = new MyThread(m_siteService, this);
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

    private ISiteService m_siteService = null;

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
    
    void SendMessage ()
    {
    	
        String topic        = "hello/world";
        String content      = "My first message from OSGI...!!!";
        int qos             = 2;
        String broker       = "tcp://192.168.1.217:1883";
        String clientId     = "openhs1";
        MemoryPersistence persistence = new MemoryPersistence();

        try {
            MqttClient sampleClient = new MqttClient(broker, clientId, persistence);
            MqttConnectOptions connOpts = new MqttConnectOptions();
            connOpts.setCleanSession(true);
            System.out.println("Connecting to broker: "+broker);
            sampleClient.connect(connOpts);
            System.out.println("Connected");
            System.out.println("Publishing message: "+content);
            MqttMessage message = new MqttMessage(content.getBytes());
            message.setQos(qos);
            sampleClient.publish(topic, message);
            System.out.println("Message published");
            sampleClient.disconnect();
            System.out.println("Disconnected");
           // System.exit(0);
        } catch(MqttException me) {
            System.out.println("reason "+me.getReasonCode());
            System.out.println("msg "+me.getMessage());
            System.out.println("loc "+me.getLocalizedMessage());
            System.out.println("cause "+me.getCause());
            System.out.println("excep "+me);
            me.printStackTrace();
        }
    	
    }

}
