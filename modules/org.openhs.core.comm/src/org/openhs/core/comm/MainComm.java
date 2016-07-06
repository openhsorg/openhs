package org.openhs.core.comm;

public class MainComm {
	
	MqttService  mqtt = new MqttService();
	RxTxService  rxtx = new RxTxService();
	
	boolean enableMqtt = false;
	boolean enableRxTx = false;
	
	public void activate () {
		System.out.println("org.openhs.core.comm: activated...");		
		
		if (enableMqtt){
			mqtt.connectBroker();
			
			mqtt.subscribe();	
		}
		
		if (enableRxTx){			
			try {
				rxtx.connect("/dev/ttyS33");
			}
	        catch ( Exception e )
	        {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        }	
		}
		else{
			System.out.println("org.openhs.core.comm: RxTx service disabled --> see parameter [boolean enableRxTx]");
		}
	}
	
	public void deactivate () {
		System.out.println("org.openhs.core.comm: De-activated...");
		
		if (enableMqtt){
			mqtt.disconnectBroker();
		}
	}		
	
	/**
	 * 
	 * @param Sends any message to OpenHS mesh
	 * @param Call it from outside anytime...
	 */
	
	public void sendMessage (String topic, String message){
				 	
		if (!enableMqtt){
			System.out.println("org.openhs.core.comm: MQTT service disabled --> see parameter [boolean enableMqtt]");	
		}
		mqtt.publish(message);			
	}

}