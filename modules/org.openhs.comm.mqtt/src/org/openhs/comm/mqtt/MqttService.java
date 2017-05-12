package org.openhs.comm.mqtt;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import org.eclipse.paho.client.mqttv3.IMqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttCallback;
import org.eclipse.paho.client.mqttv3.MqttClient;
import org.eclipse.paho.client.mqttv3.MqttConnectOptions;
import org.eclipse.paho.client.mqttv3.MqttDeliveryToken;
import org.eclipse.paho.client.mqttv3.MqttException;
import org.eclipse.paho.client.mqttv3.MqttMessage;
import org.eclipse.paho.client.mqttv3.MqttTopic;
import org.eclipse.paho.client.mqttv3.persist.MemoryPersistence;
import org.openhs.core.commons.api.ICommService;
import org.openhs.core.commons.api.IMessageHandler;
import org.openhs.core.commons.api.Message;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MqttService implements MqttCallback, ICommService {

	private Logger logger = LoggerFactory.getLogger(MqttService.class);
	
	Map<String, Object> m_properties = null;

	final String m_name = "Mqtt";

	MqttClient myClient;
	MqttConnectOptions connOpt;

	/**
	 * Topics identificators...
	 */
	
	//String myTopic = TopicsID.OPENHS.toString();
	//static final String MQTT_TOPIC_DPA_RESPONSE = "Iqrf/DpaResponse";
	String myTopic0 = "Iqrf/DpaResponse";
	//String myTopic1 = "Wmos";
	
	Boolean brokerConnected = false;

	IMessageHandler m_messageHandler = null;

	String m_broker_url;

	static final String OPENHS_DOMAIN = "<Insert m2m.io domain here>";
	static final String OPENHS_STUFF = "things";
	static final String OPENHS_CLIENT = "openhs";
	static final String OPENHS_USERNAME = "openhs1";
	static final String OPENHS_PASSWORD_MD5 = "ohsPswd";

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
		logger.warn("Connection lost!");
		// code to reconnect to the broker would go here if desired

		//connectBroker();

		//subscribe();
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
		//logger.debug("Pub complete" + new String(token.getMessage().getPayload()));
	}
	/**
	 * 
	 * messageArrived
	 * This callback is invoked when a message is received on a subscribed topic.
	 * 
	 */
	@Override
	public void messageArrived(String topic, MqttMessage message) throws Exception {
//		logger.debug("-");
/*
		String msg = new String(message.getPayload());

		logger.debug("-------------------------------------------------");
		logger.debug("| Topic:" + topic);
		logger.debug("| Message: " + msg);
		logger.debug("-------------------------------------------------");
		//logger.debug("***");


		SensorMessage mes = parseMsg(topic, msg);
*/
		String msg = new String(message.getPayload());
		Message mes = new Message(m_name, topic, msg);

		logger.debug("Received: " + m_broker_url + msg);

		if (msg != null && m_messageHandler != null) {
			m_messageHandler.handleIncomingMessage(mes);
		}

	}

	public void connectBroker () {

		String clientID = OPENHS_CLIENT;
		connOpt = new MqttConnectOptions();

		connOpt.setCleanSession(true);
		connOpt.setKeepAliveInterval(30);
		connOpt.setUserName(OPENHS_USERNAME);
		connOpt.setPassword(OPENHS_PASSWORD_MD5.toCharArray());

		MemoryPersistence persistence = new MemoryPersistence();

		// Connect to Broker
		try {
			logger.debug("Connecting to..." + m_broker_url + " clientID: " + clientID);

			myClient = new MqttClient(m_broker_url, clientID, persistence);
			myClient.setCallback(this);
			myClient.connect(connOpt);
			brokerConnected = true;
		} catch (MqttException e) {
			//e.printStackTrace();
			brokerConnected = false;
		}

		if (brokerConnected) {				
			logger.debug("Connected to " + m_broker_url + " ... OK");
		}
		else {
			logger.debug("Connected to " + m_broker_url + " ... Failed!!!");
			return;
		}

	}

	public void disconnectBroker () {

		// disconnect
		try {
			// wait to ensure subscribed messages are delivered
			if (brokerConnected) {
				myClient.disconnect();
				logger.debug("Disconnected " + m_broker_url );					
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void subscribe () {

		if (!brokerConnected) {
	    	logger.warn( " connection broken");
		}

		// subscribe to topic if subscriber
		try {
			int subQoS = 0;
			myClient.subscribe(myTopic0, subQoS);
			//myClient.subscribe(myTopic1, subQoS);
			myClient.subscribe("devices/+/temperature/degrees", subQoS);
			myClient.subscribe("devices/+/relay/on", subQoS);

		} catch (Exception e) {
			e.printStackTrace();
		}

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
	public void sendMessage(Message m) {
		if (!brokerConnected) {
	    	logger.warn( " connection broken");
		}

		MqttMessage msg = new MqttMessage(m.getData().getBytes());
		int qos = 2;
		msg.setQos(qos);
		msg.setRetained(false);

		MqttTopic topic = myClient.getTopic(m.getTopic());

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

	@Override
	public String getName() {
		return m_name;
	}

	public synchronized void activate(ComponentContext componentContext, Map<String, Object> properties) {
		logger.debug("MqttService: activate");

		updated(properties);

		connectBroker();
		subscribe();	
	}

	public void updated(Map<String, Object> properties) {
		//TODO read cfg from props
		m_properties = properties;
		if(properties != null && !properties.isEmpty()) {
			Iterator<Entry<String, Object>> it = m_properties.entrySet().iterator();
			while (it.hasNext()) {
				Entry<String, Object> entry = it.next();
				//logger.info("New property - " + entry.getKey() + " = " +
				//entry.getValue() + " of type " + entry.getValue().getClass().toString());
				if (entry.getKey().compareTo("broker.url") == 0) {
					m_broker_url = (String) entry.getValue();
				}
			}
		}
	}

	public void deactivate () {
		logger.debug("MqttService: deactivate");
		disconnectBroker();
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
				logger.debug("Connecting to..." + BROKER_URL + " clientID: " + clientID);

				myClient = new MqttClient(BROKER_URL, clientID, persistence);
				myClient.setCallback(this);
				myClient.connect(connOpt);
			} catch (MqttException e) {
				e.printStackTrace();
				System.exit(-1);
			}

			logger.debug("Connected to " + BROKER_URL);

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
            logger.debug("Connecting to broker: "+broker);
            sampleClient.connect(connOpts);
            logger.debug("Connected");
            logger.debug("Publishing message: "+ message);
            MqttMessage msg = new MqttMessage(message.getBytes());
            msg.setQos(qos);
            sampleClient.publish(topic, msg);
            logger.debug("Message published");
            sampleClient.disconnect();
            logger.debug("Disconnected");
           // System.exit(0);
        } catch(MqttException me) {
            logger.debug("reason "+me.getReasonCode());
            logger.debug("msg "+me.getMessage());
            logger.debug("loc "+me.getLocalizedMessage());
            logger.debug("cause "+me.getCause());
            logger.debug("excep "+me);
            me.printStackTrace();
        }

	}
	 *
	 * 
	 */

}
