/**
 * Copyright (c) 2014-2015 openHAB UG (haftungsbeschraenkt) and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 */
package org.eclipse.smarthome.binding.iqrf.handler;

import static org.eclipse.smarthome.binding.iqrf.IQRFBindingConstants.*;

import java.math.BigDecimal;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.TimeUnit;

import org.eclipse.smarthome.config.core.Configuration;
import org.eclipse.smarthome.core.library.types.DecimalType;
import org.eclipse.smarthome.core.thing.ChannelUID;
import org.eclipse.smarthome.core.thing.Thing;
import org.eclipse.smarthome.core.thing.ThingStatus;
import org.eclipse.smarthome.core.thing.binding.BaseThingHandler;
import org.eclipse.smarthome.core.types.Command;
import org.eclipse.smarthome.core.types.RefreshType;
import org.eclipse.smarthome.core.types.State;
import org.eclipse.smarthome.core.types.UnDefType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.microrisc.simply.CallRequestProcessingState;
import com.microrisc.simply.Network;
import com.microrisc.simply.Node;
import com.microrisc.simply.Simply;
import com.microrisc.simply.SimplyException;
import com.microrisc.simply.errors.CallRequestProcessingError;
import com.microrisc.simply.iqrf.dpa.v22x.DPA_SimplyFactory;
import com.microrisc.simply.iqrf.dpa.v22x.devices.Coordinator;
import com.microrisc.simply.iqrf.dpa.v22x.devices.Thermometer;
import com.microrisc.simply.iqrf.dpa.v22x.types.BondedNodes;
import com.microrisc.simply.iqrf.dpa.v22x.types.Thermometer_values;

/**
 * The {@link IQRFHandler} is responsible for handling commands, which are
 * sent to one of the channels.
 *
 * @author frantisek.mikulu@openhs.org - Initial contribution
 */
public class IQRFHandler extends BaseThingHandler {

    private Logger logger = LoggerFactory.getLogger(IQRFHandler.class);

    // reference to Simply
    private static Simply simply = null;
    Map<String, Thermometer> thermos = null;

    // private Float sensorData = null;
    private BigDecimal refresh;
    // private Float toffset;

    ScheduledFuture<?> refreshJob;

    public IQRFHandler(Thing thing) {
        super(thing);
    }

    @Override
    public void handleCommand(ChannelUID channelUID, Command command) {
        if (command instanceof RefreshType) {

            updateSensorData();

            if (channelUID.getId().equals(CHANNEL_1)) {
                // TODO: handle command

                // Note: if communication with thing fails for some reason,
                // indicate that by setting the status with detail information
                // updateStatus(ThingStatus.OFFLINE, ThingStatusDetail.COMMUNICATION_ERROR,
                // "Could not control device at IP address x.x.x.x");
                updateState(channelUID, getTemperature());
            } else if (channelUID.getId().equals(CHANNEL_TEMPERATURE)) {
                // TODO: handle command

                // Note: if communication with thing fails for some reason,
                // indicate that by setting the status with detail information
                // updateStatus(ThingStatus.OFFLINE, ThingStatusDetail.COMMUNICATION_ERROR,
                // "Could not control device at IP address x.x.x.x");
                updateState(channelUID, getTemperature());
            }
        }
    }

    // returns map of thermometers or null, if thermometer is not present at
    // some node
    private static Map<String, Thermometer> getThermometers(Network network, List<Integer> nodeIds) {
        Map<String, Thermometer> thermoMap = new LinkedHashMap<>();
        for (Integer nodeId : nodeIds) {
            Node node = network.getNode(nodeId.toString());
            Thermometer thermometer = node.getDeviceObject(Thermometer.class);
            if (thermometer == null) {
                System.out.println("THERMOMETER not present at the node " + nodeId);
                return null;
            }
            thermometer.setDefaultWaitingTimeout(5000);
            thermoMap.put(nodeId.toString(), thermometer);
        }
        return thermoMap;
    }

    @Override
    public void initialize() {
        // TODO: Initialize the thing. If done set status to ONLINE to indicate proper working.
        // Long running initialization should be done asynchronously in background.

        // Note: When initialization can NOT be done set the status with more details for further
        // analysis. See also class ThingStatusDetail for all available status details.
        // Add a description to give user information to understand why thing does not work
        // as expected. E.g.
        // updateStatus(ThingStatus.OFFLINE, ThingStatusDetail.CONFIGURATION_ERROR,
        // "Can not access device as username and/or password are invalid");

        System.out.println("Initializing IQRF handler.");
        logger.debug("Initializing IQRF handler.");
        super.initialize();

        Configuration config = getThing().getConfiguration();

        // creating Simply instance
        try {
            simply = DPA_SimplyFactory
                    .getSimply("platform:/plugin/org.eclipse.smarthome.binding.iqrf/config/Simply.properties");
        } catch (SimplyException ex) {
            logger.debug("Error while creating Simply: " + ex.getMessage());
            return;
        }

        // getting network 1
        Network network1 = simply.getNetwork("1", Network.class);
        if (network1 == null) {
            logger.debug("Network 1 doesn't exist");
            return;
        }

        // getting number of bonded nodes
        // getting a master node
        Node master = network1.getNode("0");
        if (master == null) {
            logger.debug("Master doesn't exist");
            return;
        }

        // getting Coordinator interface
        Coordinator coordinator = master.getDeviceObject(Coordinator.class);
        if (coordinator == null) {
            logger.debug("Coordinator doesn't exist");
            return;
        }

        // get all bonded nodes
        BondedNodes bondedNodes = coordinator.getBondedNodes();
        if (bondedNodes == null) {
            CallRequestProcessingState procState = coordinator.getCallRequestProcessingStateOfLastCall();
            if (procState == CallRequestProcessingState.ERROR) {
                CallRequestProcessingError error = coordinator.getCallRequestProcessingErrorOfLastCall();
                logger.debug("Getting of bonded nodes failed: " + error);
                return;
            } else {
                logger.debug("Getting of bonded nodes hasn't been processed yet: " + procState);
            }
        }

        // getting map of thermometers on specified nodes
        thermos = getThermometers(network1, bondedNodes.getList());
        if (thermos == null) {
            logger.debug("Error in getting thermometers on nodes");
            return;
        }

        // try {
        // refresh = (BigDecimal) config.get("refresh");
        // } catch (Exception e) {
        // }
        //
        // if (refresh == null) {
        // // let's go for the default
        // refresh = new BigDecimal(60);
        // }

        refresh = new BigDecimal(10);
        // toffset = new Float(0);
        // sensorData = new Float(15.0);

        // startAutomaticRefresh();

        updateStatus(ThingStatus.ONLINE);
        System.out.println("Initializing IQRF handler done.");

    }

    @Override
    public void dispose() {
        refreshJob.cancel(true);

        if (simply != null) {
            simply.destroy();
        }

    }

    private synchronized boolean updateSensorData() {
        // sensorData = "15.0";
        // sensorData += toffset;
        // toffset = (float) (toffset + 0.1);
        // updateStatus(ThingStatus.ONLINE);
        // logger.debug("Sensor datat updated to: {}", sensorData);
        return true;
    }

    private State getTemperature() {

        for (String nodeId : thermos.keySet()) {

            // getting thermometer on the node
            Thermometer thermo = thermos.get(nodeId);

            // blocking for default timeout, waiting timeout result
            Thermometer_values result = thermo.get();

            if (result != null) {
                System.out.println("Temperature on the node " + nodeId + ": " + result.getValue() + "."
                        + result.getFractialValue() + " *C");
                DecimalType retval = new DecimalType(result.getValue());
                return retval;

            } else {
                CallRequestProcessingState procState = thermo.getCallRequestProcessingStateOfLastCall();
                if (procState == CallRequestProcessingState.ERROR) {
                    CallRequestProcessingError error = thermo.getCallRequestProcessingErrorOfLastCall();
                    System.out.println("Getting temperature of the node " + nodeId + " failed in processing: "
                            + error.getErrorType());
                    // failures++;
                } else {
                    System.out.println(
                            "Getting temperature of the node " + nodeId + " hasn't arrived, timeouted: " + procState);
                    // noResponses++;
                }
                return UnDefType.UNDEF;
            }
        }
        // System.out.println("CYCLE: " + (cycle + 1));

        // if (sensorData != null) {
        // DecimalType retval = new DecimalType(sensorData);
        // return retval;
        // }
        return UnDefType.UNDEF;
    }

    private void startAutomaticRefresh() {
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                try {
                    boolean success = updateSensorData();
                    if (success) {
                        updateState(new ChannelUID(getThing().getUID(), CHANNEL_TEMPERATURE), getTemperature());
                    }
                } catch (Exception e) {
                    logger.debug("Exception occurred during execution: {}", e.getMessage(), e);
                }
            }
        };

        refreshJob = scheduler.scheduleAtFixedRate(runnable, 0, refresh.intValue(), TimeUnit.SECONDS);
    }

}
