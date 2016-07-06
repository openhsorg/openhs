package org.openhs.core.mqtt.client;

import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;


public class MqttSender {
	
	MqttSubscriber smc = new MqttSubscriber();
	
	public void activate () {
		System.out.println("org.openhs.core.mqtt.client: activated...");		
		smc.runClient();
	}
	
	public void deactivate () {
		System.out.println("org.openhs.core.mqtt.client: De-activated...");
	}	
	
	public void SendMessage(String topic, String message)
	{
       // String topic        = "hello/world";
        //String content      = "My first message from OSGI...!!!";
        int qos             = 2;
        String broker       = "tcp://192.168.1.217:1883";
        String clientId     = "openhs2";
        MemoryPersistence persistence = new MemoryPersistence();

        try {
            MqttClient sampleClient = new MqttClient(broker, clientId, persistence);
            MqttConnectOptions connOpts = new MqttConnectOptions();
            connOpts.setCleanSession(true);
            System.out.println("Connecting to broker: "+broker);
            sampleClient.connect(connOpts);
            System.out.println("Connected");
            System.out.println("Publishing message: "+ message);
            MqttMessage msg = new MqttMessage(message.getBytes());
            msg.setQos(qos);
            sampleClient.publish(topic, msg);
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
