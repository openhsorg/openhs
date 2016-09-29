package org.openhs.jetty.config;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;

public class FragmentActivator implements BundleActivator {

    @Override
    public void start(BundleContext context) throws Exception {
        // Set jetty.home.bundle to the name of our bundle
        System.setProperty("jetty.home.bundle", "org.openhs.jetty.config");
    }

    @Override
    public void stop(BundleContext context) throws Exception {
    }
}