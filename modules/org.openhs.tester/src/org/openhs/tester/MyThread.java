package org.openhs.tester;

import org.openhs.core.site.data.ISiteService;

public class MyThread extends Thread {
    private volatile boolean active = true;

    public Test m_test = null;

    private ISiteService m_siteService = null;

    MyThread(ISiteService ser, Test test) {
        m_siteService = ser;
        m_test = test;
    }

    @Override
    public void run() {
        while (active) {
            // System.out.println("\nThread adjustment...........");

            if (m_siteService != null) {
                // System.out.println("Site ID is: " + siteServiceFactory.getInstance().getId());
                // System.out.println("Number rooms is: " + siteServiceFactory.getInstance().getNumberRooms());

                m_test.SetTemperature();
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