package org.openhs.test.iqrf;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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

public class IqrfTest {
    private Logger logger = LoggerFactory.getLogger(IqrfTest.class);

    // reference to Simply
    private static Simply simply = null;
    Map<String, Thermometer> thermos = null;

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

    public synchronized void activate() {
        System.out.println("IqrfTest: Activated");

        // creating Simply instance
        try {
            simply = DPA_SimplyFactory.getSimply("platform:/plugin/org.openhs.test.iqrf/config/Simply.properties");
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

        System.out.println("IqrfTest: Activated finished");
    }

    public synchronized void modified() {
        System.out.println("IqrfTest: Modified");
    }

}
