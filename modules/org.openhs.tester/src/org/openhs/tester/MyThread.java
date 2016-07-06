package org.openhs.tester;

import org.openhs.core.site.data.ISiteService;
import org.openhs.core.mqtt.client.MqttSender;

public class MyThread extends Thread {
    private volatile boolean active = true;

    public Test m_test = null;

    private ISiteService m_siteService = null;
    private MqttSender mqtt = null;
    
    int i = 0; 

    MyThread(ISiteService ser, MqttSender sender, Test test) {
        m_siteService = ser;
        m_test = test;
        mqtt = sender;
    }

    @Override
    public void run() {
        while (active) {
            // System.out.println("\nThread adjustment...........");
        	       	

            if (m_siteService != null) {
                 //System.out.println("Site ID is: " + m_siteService.getId());
                // System.out.println("Number rooms is: " + siteServiceFactory.getInstance().getNumberRooms());

            	
            	System.out.println("Alive...");
            	
                m_test.SetTemperature();
                
                i ++;
                
                if (i > 1)
                {
                	//m_test.SendMessage();
                	mqtt.SendMessage("hello/world", "Ted trochu jina message...");
                }
                
            } else {
                System.out.println("ISiteService is null !!!");
            }

            try {
                Thread.sleep(3000);
            } catch (Exception e) {
                System.out.println("Thread interrupted " + e.getMessage());
            }
        }
    }

    public void stopThread() {
        active = false;
    }
}