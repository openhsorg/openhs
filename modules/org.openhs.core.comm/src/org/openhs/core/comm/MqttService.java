package org.openhs.core.comm;

import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttDeliveryToken;

//import java.util.ArrayList;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttTopic;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;

public class MqttService implements MqttCallback {

	    MqttClient myClient;
		MqttConnectOptions connOpt;
				
		/**
		 * Topics identificators...
		 */
		String myTopic = TopicsID.OPENHS.toString();
		
		Boolean brokerConnected = false;
		
		CircularArrayList <Message> messages = null;

		static final String BROKER_URL = "tcp://192.168.1.217:1883";
		static final String M2MIO_DOMAIN = "<Insert m2m.io domain here>";
		static final String M2MIO_STUFF = "things";
		static final String M2MIO_THING = "openhs1";
		static final String M2MIO_USERNAME = "<m2m.io username>";
		static final String M2MIO_PASSWORD_MD5 = "<m2m.io password (MD5 sum of password)>";

		// the following two flags control whether this example is a publisher, a subscriber or both
		static final Boolean subscriber = true;
		static final Boolean publisher = false;

		/**
		 * 
		 * connectionLost
		 * This callback is invoked upon losing the MQTT connection.
		 * 
		 */
		@Override
		public void connectionLost(Throwable t) {
			System.out.println("Connection lost!");
			// code to reconnect to the broker would go here if desired
		}

		/**
		 * 
		 * deliveryComplete
		 * This callback is invoked when a message published by this client
		 * is successfully received by the broker.
		 * 
		 */
		
		@Override
		public void deliveryComplete(IMqttDeliveryToken token) {
			//System.out.println("Pub complete" + new String(token.getMessage().getPayload()));
		}
		/**
		 * 
		 * messageArrived
		 * This callback is invoked when a message is received on a subscribed topic.
		 * 
		 */
		@Override
		public void messageArrived(String topic, MqttMessage message) throws Exception {
			
			String msg = new String(message.getPayload());
			
			System.out.println("-------------------------------------------------");
			System.out.println("| Topic:" + topic);
			System.out.println("| Message: " + msg);
			System.out.println("-------------------------------------------------");
			
			Message mes = new Message();
			
			mes.topic = topic;
			mes.message = msg;
			
			messages.insert(mes);
			
			
		}

		public void connectBroker () {
			
			String clientID = M2MIO_THING;
			connOpt = new MqttConnectOptions();
			
			connOpt.setCleanSession(true);
			connOpt.setKeepAliveInterval(30);
			connOpt.setUserName(M2MIO_USERNAME);
			connOpt.setPassword(M2MIO_PASSWORD_MD5.toCharArray());
			
			MemoryPersistence persistence = new MemoryPersistence();
			
			// Connect to Broker
			try {
				System.out.println("Connecting to..." + BROKER_URL + " clientID: " + clientID);
				
				myClient = new MqttClient(BROKER_URL, clientID, persistence);
				myClient.setCallback(this);
				myClient.connect(connOpt);
				brokerConnected = true;
			} catch (MqttException e) {
				//e.printStackTrace();
				brokerConnected = false;
			}
			
			if (brokerConnected) {				
				System.out.println("Connected to " + BROKER_URL + " ... OK");
			}
			else {
				System.out.println("Connected to " + BROKER_URL + " ... Failed!!!");
				
				return;
			}
			
		}
		
		public void disconnectBroker () {
			
			// disconnect
			try {
				// wait to ensure subscribed messages are delivered
				if (brokerConnected) {
					myClient.disconnect();
					
					System.out.println("Disconnected " + BROKER_URL );					
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		public void subscribe () {
			
			if (!brokerConnected) return;			
									
			// subscribe to topic if subscriber
			try {
				int subQoS = 0;
				myClient.subscribe(myTopic, subQoS);
				
			} catch (Exception e) {
					e.printStackTrace();
			}
			
		}
		
		public void publish (String message) {
			
			if (!brokerConnected) return;
			
            MqttMessage msg = new MqttMessage(message.getBytes());
            int qos = 2;
            msg.setQos(qos);
            msg.setRetained(false);
            
            MqttTopic topic = myClient.getTopic(myTopic);
            
        	MqttDeliveryToken token = null;
	    	try {
	    		// publish message to broker
				token = topic.publish(msg);
		    	// Wait until the message has been delivered to the broker
				token.waitForCompletion();
				Thread.sleep(100);
			} catch (Exception e) {
				e.printStackTrace();
			}	
			
		}	
		
		

		
		/**
		 * 
		 * runClient
		 * The main functionality of this simple example.
		 * Create a MQTT client, connect to broker, pub/sub, disconnect.
		 * 
		 */
		/*
		public void runClient() {
			// setup MQTT Client
			String clientID = M2MIO_THING;
			connOpt = new MqttConnectOptions();
			
			connOpt.setCleanSession(true);
			connOpt.setKeepAliveInterval(30);
			connOpt.setUserName(M2MIO_USERNAME);
			connOpt.setPassword(M2MIO_PASSWORD_MD5.toCharArray());
			
			MemoryPersistence persistence = new MemoryPersistence();
			
			// Connect to Broker
			try {
				System.out.println("Connecting to..." + BROKER_URL + " clientID: " + clientID);
				
				myClient = new MqttClient(BROKER_URL, clientID, persistence);
				myClient.setCallback(this);
				myClient.connect(connOpt);
			} catch (MqttException e) {
				e.printStackTrace();
				System.exit(-1);
			}
			
			System.out.println("Connected to " + BROKER_URL);

			// setup topic
			// topics on m2m.io are in the form <domain>/<stuff>/<thing>
			//String myTopic = M2MIO_DOMAIN + "/" + M2MIO_STUFF + "/" + M2MIO_THING;
			String myTopic = "ahojte";
			MqttTopic topic = myClient.getTopic(myTopic);

			// subscribe to topic if subscriber
			if (subscriber) {
				try {
					int subQoS = 0;
					myClient.subscribe(myTopic, subQoS);
				} catch (Exception e) {
					e.printStackTrace();
				}
			}

			// publish messages if publisher
			if (publisher) {								
				String pubMsg = "This is my message...----><------";
	            MqttMessage msg = new MqttMessage(pubMsg.getBytes());
	            int qos = 2;
	            msg.setQos(qos);
	            msg.setRetained(false);
	            
	        	MqttDeliveryToken token = null;
		    	try {
		    		// publish message to broker
					token = topic.publish(msg);
			    	// Wait until the message has been delivered to the broker
					token.waitForCompletion();
					Thread.sleep(100);
				} catch (Exception e) {
					e.printStackTrace();
				}			    	
			}
		
			
			// disconnect
			try {
				// wait to ensure subscribed messages are delivered
				if (subscriber) {
					Thread.sleep(5000);
				}
				myClient.disconnect();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		*/
		
		/*
		
		
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
		 *
		 * 
		 */
		
}
