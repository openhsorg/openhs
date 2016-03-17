package org.openhs.tester;

import org.openhs.core.site.data.ISiteService;
import org.openhs.core.site.data.Temperature;;

public class Test {

    private MyThread m_myThread;

    public void activate() {
        System.out.println("Starting Test");
        m_myThread = new MyThread(m_siteService, this);
        m_myThread.start();

    }

    public void deactivate() {
        System.out.println("Stopping Test");
        m_myThread.stopThread();
        try {
            m_myThread.join();
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public void setService(ISiteService ser) {
        System.out.println("Test: Set ISiteService");
        m_siteService = ser;
    }

    public void unsetService(ISiteService ser) {
        System.out.println("Test: Unset ISiteService");
        if (m_siteService == ser) {
            ser = null;
        }
    }

    private ISiteService m_siteService = null;

    // double temp1 = 0;
    // double temp2 = 0;

    Temperature temp1 = new Temperature();
    Temperature temp2 = new Temperature();

    void BuildHouse() {
        m_siteService.addRoom("Room1");
        m_siteService.addRoom("Room2");
        m_siteService.addRoom("Room3");
        m_siteService.addRoom("Outside");

        m_siteService.addSensor("Room1", "Sensor1");
        m_siteService.addSensor("Room2", "Sensor1");
        m_siteService.addSensor("Room3", "Sensor1");
        m_siteService.addSensor("Room3", "Sensor2");
        m_siteService.addSensor("Outside", "Sensor1");

        temp1.set(-6);
        temp2.set(-6);
    }

    void SetTemperature() {
        temp1.set(temp1.getCelsius() + 0.5);
        temp2.set(temp2.getCelsius() + 2);
        /*
         * temp1 = temp1 + 0.5;
         * temp2 = temp2 + 2;
         */
        if (temp1.getCelsius() >= 80) {
            temp1.set(-6);
        }
        if (temp2.getCelsius() >= 80) {
            temp2.set(-6);
        }

        m_siteService.setSensorTemperature("Room1", "Sensor1", temp1);
        m_siteService.setSensorTemperature("Outside", "Sensor1", temp2);

    }

}
