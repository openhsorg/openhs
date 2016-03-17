package org.eclipse.smarthome.binding.iqrf.internal;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.microrisc.simply.iqrf.dpa.protocol.PeripheralToDevIfaceMapper;
import com.microrisc.simply.iqrf.dpa.protocol.PeripheralToDevIfaceMapperFactory;
import com.microrisc.simply.iqrf.dpa.v22x.autonetwork.P2PPrebonder;

public class UserPerToDevIfaceMapperFactory implements PeripheralToDevIfaceMapperFactory {

    /**
     * Holds mapping between my peripherals and Device Interfaces.
     */
    private class UserPerToDevIfaceMapper implements PeripheralToDevIfaceMapper {
        private final Map<Integer, Class> peripheralToIface;
        private final Map<Class, Integer> ifaceToPeripheral;

        private void createMappings() {
            peripheralToIface.put(32, P2PPrebonder.class);

            // creating transposition
            for (Map.Entry<Integer, Class> entry : peripheralToIface.entrySet()) {
                ifaceToPeripheral.put(entry.getValue(), entry.getKey());
            }
        }

        public UserPerToDevIfaceMapper() {
            peripheralToIface = new HashMap<>();
            ifaceToPeripheral = new HashMap<>();
            createMappings();
        }

        @Override
        public Set<Class> getMappedDeviceInterfaces() {
            return ifaceToPeripheral.keySet();
        }

        @Override
        public Class getDeviceInterface(int perId) {
            return peripheralToIface.get(perId);
        }

        @Override
        public Integer getPeripheralId(Class devInterface) {
            return ifaceToPeripheral.get(devInterface);
        }

        @Override
        public Set<Integer> getMappedPeripherals() {
            return peripheralToIface.keySet();
        }
    }

    @Override
    public PeripheralToDevIfaceMapper createPeripheralToDevIfaceMapper() throws Exception {
        return new UserPerToDevIfaceMapper();
    }
}
