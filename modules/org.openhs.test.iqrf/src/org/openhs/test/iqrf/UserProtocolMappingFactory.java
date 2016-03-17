package org.openhs.test.iqrf;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.microrisc.simply.iqrf.dpa.v22x.autonetwork.P2PPrebonder;
import com.microrisc.simply.iqrf.dpa.v22x.typeconvertors.DPA_AdditionalInfoConvertor;
import com.microrisc.simply.iqrf.typeconvertors.ArrayUns8Convertor;
import com.microrisc.simply.iqrf.typeconvertors.Uns16Convertor;
import com.microrisc.simply.iqrf.typeconvertors.VoidTypeConvertor;
import com.microrisc.simply.protocol.mapping.CallRequestToPacketMapping;
import com.microrisc.simply.protocol.mapping.ConstValueToPacketMapping;
import com.microrisc.simply.protocol.mapping.InterfaceToPacketMapping;
import com.microrisc.simply.protocol.mapping.MethodToPacketMapping;
import com.microrisc.simply.protocol.mapping.PacketPositionValues;
import com.microrisc.simply.protocol.mapping.PacketToCallResponseMapping;
import com.microrisc.simply.protocol.mapping.PacketToInterfaceMapping;
import com.microrisc.simply.protocol.mapping.PacketToMethodMapping;
import com.microrisc.simply.protocol.mapping.PacketToValueMapping;
import com.microrisc.simply.protocol.mapping.ProtocolMapping;
import com.microrisc.simply.protocol.mapping.ProtocolMappingFactory;
import com.microrisc.simply.protocol.mapping.SimpleCallRequestToPacketMapping;
import com.microrisc.simply.protocol.mapping.SimplePacketToCallResponseMapping;
import com.microrisc.simply.protocol.mapping.SimpleProtocolMapping;
import com.microrisc.simply.protocol.mapping.ValueToPacketMapping;
import com.microrisc.simply.typeconvertors.StringToByteConvertor;

public class UserProtocolMappingFactory implements ProtocolMappingFactory {
    /** Reference to protocol mapping. */
    private ProtocolMapping protocolMapping = null;

    // REQUEST MAPPING

    // returns currently empty list of mappings
    static private List<ConstValueToPacketMapping> createRequestConstMappings() {
        List<ConstValueToPacketMapping> mappings = new LinkedList<>();
        return mappings;
    }

    // returns empty list of mappings - more networks capability is not currently used
    static private List<ValueToPacketMapping> createRequestNetworkMappings() {
        List<ValueToPacketMapping> mappings = new LinkedList<>();
        return mappings;
    }

    static private List<ValueToPacketMapping> createRequestNodeMappings() {
        List<ValueToPacketMapping> mappings = new LinkedList<>();
        ValueToPacketMapping nodeMapping = new ValueToPacketMapping(0, StringToByteConvertor.getInstance());
        mappings.add(nodeMapping);
        return mappings;
    }

    // P2PPrebonder interface
    static private MethodToPacketMapping createSendPrebondingDataMapping() {
        List<ConstValueToPacketMapping> constMapping = new LinkedList<>();
        constMapping.add(new ConstValueToPacketMapping(3, new short[] { 0x00 }));

        List<ValueToPacketMapping> argMapping = new LinkedList<>();
        argMapping.add(new ValueToPacketMapping(4, Uns16Convertor.getInstance()));
        argMapping.add(new ValueToPacketMapping(6, ArrayUns8Convertor.getInstance()));

        return new MethodToPacketMapping(constMapping, argMapping);
    }

    static private InterfaceToPacketMapping createRequestP2PPrebonderMapping() {
        List<ConstValueToPacketMapping> constMappings = new LinkedList<>();
        constMappings.add(new ConstValueToPacketMapping(2, new short[] { 0x20 }));

        Map<String, MethodToPacketMapping> methodMappings = new HashMap<>();
        methodMappings.put("1", createSendPrebondingDataMapping());

        return new InterfaceToPacketMapping(constMappings, methodMappings);
    }

    /**
     * Creates map of mapping of Device Interfaces into protocol packets.
     * 
     * @return
     */
    static private Map<Class, InterfaceToPacketMapping> createRequestIfaceMappings() {
        Map<Class, InterfaceToPacketMapping> mappings = new HashMap<>();

        // creating interface mappings
        mappings.put(P2PPrebonder.class, createRequestP2PPrebonderMapping());
        return mappings;
    }

    static private CallRequestToPacketMapping createCallRequestToPacketMapping() {
        List<ConstValueToPacketMapping> constMappings = createRequestConstMappings();
        List<ValueToPacketMapping> networkMappings = createRequestNetworkMappings();
        List<ValueToPacketMapping> nodeMappings = createRequestNodeMappings();
        Map<Class, InterfaceToPacketMapping> ifaceMappings = createRequestIfaceMappings();

        return new SimpleCallRequestToPacketMapping(constMappings, networkMappings, nodeMappings, ifaceMappings);
    }

    // RESPONSES MAPPING
    static private PacketToValueMapping createResponseNetworkMapping() {
        return new PacketToValueMapping(0, 0, StringToByteConvertor.getInstance());
    }

    static private PacketToValueMapping createResponseNodeMapping() {
        return new PacketToValueMapping(0, 1, StringToByteConvertor.getInstance());
    }

    // P2PPrebonder

    static private PacketToMethodMapping createResponseSendPrebondingData() {
        List<PacketPositionValues> packetValues = new LinkedList<>();
        packetValues.add(new PacketPositionValues(3, (short) 0x80));

        PacketToValueMapping resultMapping = new PacketToValueMapping(8, 0, VoidTypeConvertor.getInstance());
        return new PacketToMethodMapping("1", packetValues, resultMapping);
    }

    static private PacketToInterfaceMapping createResponseP2PPrebonderMapping() {
        List<PacketPositionValues> packetValues = new LinkedList<>();
        packetValues.add(new PacketPositionValues(2, (short) 0x20));

        Map<String, PacketToMethodMapping> methodMappings = new HashMap<>();
        methodMappings.put("1", createResponseSendPrebondingData());

        return new PacketToInterfaceMapping(P2PPrebonder.class, packetValues, methodMappings);
    }

    // creating response mapping for Device Interfaces
    static private Map<Class, PacketToInterfaceMapping> createResponseIfaceMappings() {
        Map<Class, PacketToInterfaceMapping> mappings = new HashMap<>();

        // creating interface mappings
        mappings.put(P2PPrebonder.class, createResponseP2PPrebonderMapping());
        return mappings;
    }

    static private PacketToValueMapping createAdditionalDataMapping() {
        return new PacketToValueMapping(4, DPA_AdditionalInfoConvertor.getInstance());
    }

    static private PacketToCallResponseMapping createPacketToCallResponseMapping() {
        PacketToValueMapping networkMapping = createResponseNetworkMapping();
        PacketToValueMapping nodeMapping = createResponseNodeMapping();
        Map<Class, PacketToInterfaceMapping> ifaceMappings = createResponseIfaceMappings();
        PacketToValueMapping additionalDataMapping = createAdditionalDataMapping();

        return new SimplePacketToCallResponseMapping(networkMapping, nodeMapping, ifaceMappings, additionalDataMapping);
    }

    public UserProtocolMappingFactory() {
    }

    @Override
    public ProtocolMapping createProtocolMapping() throws Exception {
        if (protocolMapping != null) {
            return protocolMapping;
        }

        CallRequestToPacketMapping callRequestToPacketMapping = createCallRequestToPacketMapping();

        PacketToCallResponseMapping packetToCallResponseMapping = createPacketToCallResponseMapping();

        protocolMapping = new SimpleProtocolMapping(callRequestToPacketMapping, packetToCallResponseMapping);
        return protocolMapping;
    }
}
