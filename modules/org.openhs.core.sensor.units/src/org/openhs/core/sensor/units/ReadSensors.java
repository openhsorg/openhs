package org.openhs.core.sensor.units;

import org.openhs.core.site.data.ISiteService;

public class ReadSensors extends Thread {
    private volatile boolean active = true;

    int i = 0;

    public void activate() {
        System.out.println("Starting ReadSensors");
        start();
    }

    public void deactivate() {
        System.out.println("Stopping ReadSensors");
        stopThread();
        try {
            join();
        } catch (InterruptedException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
    }

    public void setService(ISiteService ser) {
        System.out.println("ReadSensors: Set ISiteService");
        m_siteService = ser;
    }

    public void unsetService(ISiteService ser) {
        System.out.println("ReadSensors: Unset ISiteService");
        if (m_siteService == ser) {
            ser = null;
        }
    }

    private ISiteService m_siteService = null;

    @Override
    public void run() {
        while (active) {
            // System.out.println("\nThread run...........");

            if (m_siteService != null) {
                i++;
                // System.out.println("ReadSensors: " + i);

                if (i >= 150) {
                    i = 0;
                }

            } else {
                System.out.println("Factory is null !!!");
            }

            try {
                Thread.sleep(5000);
            } catch (Exception e) {
                System.out.println("Thread interrupted " + e.getMessage());
            }
        }
    }

    public void stopThread() {
        active = false;
    }
}