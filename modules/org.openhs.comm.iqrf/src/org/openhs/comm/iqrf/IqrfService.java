package org.openhs.comm.iqrf;

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.configuration.ConfigurationException;
import org.apache.commons.configuration.PropertiesConfiguration;
import org.openhs.core.commons.api.ICommService;
import org.openhs.core.commons.api.IMessageHandler;
import org.openhs.core.commons.api.Message;
import org.osgi.service.component.ComponentContext;

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

public class IqrfService implements ICommService, Runnable {
    
	private Logger logger = LoggerFactory.getLogger(IqrfService.class);
    private static Simply m_simply = null;
    private Map<String, Thermometer> m_thermos = null;
    private Map<String, Object> m_properties = null;
    private String m_propsFile = null;
    
    
	private final String m_name = "IqrfService";
	private IMessageHandler m_messageHandler = null;
	private Thread m_myThd = null;
    private volatile boolean running = true;

	public void activate(ComponentContext componentContext, Map<String, Object> properties) {
		//System.out.println("org.openhs.comm.dummy: Activated...");
        logger.info("IqrfTest: Activated");

        updated(properties);
        
        //URL url = componentContext.getBundleContext().getBundle().getResource(m_propsFile);
        
    	String currentUsersHomeDir = System.getProperty("user.home");
        String fileSep = System.getProperty( "file.separator"); 
        String openhsDir = currentUsersHomeDir + fileSep + "openhs";     
        String propsFile = openhsDir + fileSep + m_propsFile;
        
        logger.info("properties file: " + propsFile);

        PropertiesConfiguration tempCfg;
        
        try {
			tempCfg = new PropertiesConfiguration(propsFile);
		} catch (ConfigurationException e) {
			logger.debug("Error while creating Simply: " + e.getMessage());
			return;
		}
        
        //cfg workaround
        String implClassesMappingFile = tempCfg.getString("implClassesMapping.configFile");
        implClassesMappingFile = openhsDir + fileSep + implClassesMappingFile;
        tempCfg.setProperty("implClassesMapping.configFile", implClassesMappingFile);
        
        String networkConnectionTypesFile = tempCfg.getString("networkConnectionTypes.configFile");
        networkConnectionTypesFile = openhsDir + fileSep + networkConnectionTypesFile;
        tempCfg.setProperty("networkConnectionTypes.configFile", networkConnectionTypesFile);

        String networkSettingsFile = tempCfg.getString("networkSettings.configFile");
        networkSettingsFile = openhsDir + fileSep + networkSettingsFile;
        tempCfg.setProperty("networkSettings.configFile", networkSettingsFile);
        
        String initializationTypeDpaFixedFile = tempCfg.getString("initialization.type.dpa.fixed.sourceFile");
        initializationTypeDpaFixedFile = openhsDir + fileSep + initializationTypeDpaFixedFile;
        tempCfg.setProperty("initialization.type.dpa.fixed.sourceFile", initializationTypeDpaFixedFile);
        
        String tempFile = openhsDir + fileSep + "tmp" + fileSep + "SimplyTmp.properties";
        try {
			tempCfg.save(tempFile);
		} catch (ConfigurationException e) {
			logger.debug("Error while creating Simply: " + e.getMessage());
			return;
		}
        
        // creating Simply instance
        try {
            m_simply = DPA_SimplyFactory.getSimply(tempFile);
        } catch (SimplyException ex) {
            logger.debug("Error while creating Simply: " + ex.getMessage());
            return;
        }

        // getting network 1
        Network network1 = m_simply.getNetwork("1", Network.class);
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
        m_thermos = getThermometers(network1, bondedNodes.getList());
        if (m_thermos == null) {
            logger.debug("Error in getting thermometers on nodes");
            return;
        }

		m_myThd = new Thread(this);
		m_myThd.start();

        //System.out.println("IqrfTest: Activated finished1");
        logger.info("IqrfTest: Activated finished1");
	}
	
	public void deactivate () {
        this.terminate();
        try {
			m_myThd.join();
		} catch (InterruptedException ex) {
			// TODO Auto-generated catch block
			ex.printStackTrace();
		}
        
        // end of working with Simply
        m_simply.destroy();
        
        System.out.println("Thread successfully stopped.");		
		System.out.println("org.openhs.comm.dummy: De-activated...");
	}

    public void updated(Map<String, Object> properties) {
        m_properties = properties;
        if(properties != null && !properties.isEmpty()) {
            Iterator<Entry<String, Object>> it = m_properties.entrySet().iterator();
            while (it.hasNext()) {
                Entry<String, Object> entry = it.next();
                logger.info("New property - " + entry.getKey() + " = " +
                entry.getValue() + " of type " + entry.getValue().getClass().toString());
                if (entry.getKey().compareTo("commConfigFile") == 0) {
                	m_propsFile = (String) entry.getValue();
                }
            }
        }
    }
	
    public void terminate() {
        running = false;
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
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getName() {
		return m_name;
	}

	@Override
	public void run() {
		
        int noResponses = 0;
        int failures = 0;
        
        while (running) {
            for ( String nodeId : m_thermos.keySet() ) {

                // getting thermometer on the node
                Thermometer thermo = m_thermos.get(nodeId);
                    
                // blocking for default timeout, waiting timeout result
                Thermometer_values result = thermo.get();
                
                if ( result != null ) {
                    String strVal = result.getValue() + "." + result.getFractialValue();
//                    logger.debug("Temperature on the node " + nodeId + ": "
//                            + result.getValue() + "." + result.getFractialValue() + " *C"
//                    );
	                  logger.debug("Temperature on the node " + nodeId + ": " + strVal + " *C"
	                	);
                    double val = Double.parseDouble(strVal);
                    Message m_msg = new Message("Iqrf", "Sensor" + nodeId, Double.toString(val));
                    m_msg.setTopic("Iqrf");
					if (m_messageHandler != null)
						m_messageHandler.handleIncomingMessage(m_msg);
    
                } else {
                    CallRequestProcessingState procState = thermo.getCallRequestProcessingStateOfLastCall();
                    if ( procState == CallRequestProcessingState.ERROR ) {
                        CallRequestProcessingError error = thermo.getCallRequestProcessingErrorOfLastCall();
                        logger.debug("Getting temperature of the node " + nodeId
                                + " failed in processing: " + error.getErrorType()
                        );
                        failures++;
                    } else {
                    	logger.debug("Getting temperature of the node " + nodeId
                                + " hasn't arrived, timeouted: " + procState
                        );
                        noResponses++;
                    }
                }
            }
          	try {
				Thread.sleep (4000);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				running = false;
			}
        }
        
        System.out.println("No responses: " + noResponses);
        System.out.println("Failures: " + failures);
        
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


}
