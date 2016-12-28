/**
* @name		MySiteServiceImpl.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Site Interface implementation.
*
*/

package org.openhs.core.site.services;

import java.io.File;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.TreeMap;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.openhs.core.commons.Thing;
import org.openhs.core.commons.Floor;
import org.openhs.core.commons.Humidity;
import org.openhs.core.commons.HumiditySensor;
import org.openhs.core.commons.Room;
import org.openhs.core.commons.Sensor;
import org.openhs.core.commons.Site;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Temperature;
import org.openhs.core.commons.TemperatureSensor;
import org.openhs.core.commons.TextOutput;
import org.openhs.core.site.api.ISiteService;
import org.osgi.service.component.ComponentContext;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Attr;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import jdk.nashorn.internal.objects.annotations.Constructor;

public class MySiteServiceImpl implements ISiteService {

	// initialize logger
	private Logger logger = LoggerFactory.getLogger(MySiteServiceImpl.class);

	private Map<String, Object> m_properties = null;

	Site ss = new Site();

	TextOutput msg = new TextOutput();

	public void activate(ComponentContext componentContext, Map<String, Object> properties) {
		logger.info("org.openhs.core.site.services: activate()");
		msg.println("org.openhs.core.site.services: activate");
		updated(properties);
	}

	public void deactivate() {
		msg.println("org.openhs.core.site.services: deactivate");
	}

	public void updated(Map<String, Object> properties) {
		m_properties = properties;
		loadData();
	}

	@Override
	public void buildHouse(int rooms) {

		try {
			addThing("floors/Floor1", new Floor());
			addThing("floors/Floor2", new Floor());

			for (int i = 0; i <= rooms; i++) {

				addThing("floors/Floor1/rooms/Room" + i, new Room());
				addThing("floors/Floor1/rooms/Room" + i + "/sensors/" + "Room" + i + "_Sensor1", new Room());
			}

			addThing("floors/Floor2/rooms/Room1/sensors/SensorWC", "mqtt/0/path", new TemperatureSensor());

		} catch (Exception ex) {
			System.out.println("\n\n EXception***:" + ex);
		}

		System.out.println("\n\n BUILD DONE");
	}

	@Override
	public String getId() {
		return ss.getId();
	}

	@Override
	public void setId(String newID) {
		ss.setId(newID);
	}
/*
	public int getNumberThings(String keyPath) throws SiteException {

		Object item = getThing(keyPath);
		if (item == null) {
			throw new SiteException("Bad object specifications");
		}

		if (item instanceof TreeMap) {

			String key = keyPath.substring(keyPath.lastIndexOf("/") + 1, keyPath.length());

			// System.out.println("\n\nXXX: " + key + " : " + keyPath);

			if (key.equals("floors")) {
				TreeMap<String, Floor> floors = (TreeMap<String, Floor>) item;
				return floors.size();
			} else if (key.equals("rooms")) {
				TreeMap<String, Room> rooms = (TreeMap<String, Room>) item;
				return rooms.size();
			} else if (key.equals("sensors")) {
				TreeMap<String, Sensor> sensors = (TreeMap<String, Sensor>) item;
				return sensors.size();
			} else {
				throw new SiteException("Bad key specifications -> doesn't exists");
			}

		} else {
			throw new SiteException("Bad object specifications");
		}

	}

	public Object getThing(String keyPath) throws SiteException {

		if (keyPath.equals("")) {
			throw new SiteException("Bad keyPath");
		}

		// Divide
		String delim = "[/]+";
		String[] parts = keyPath.split(delim);

		// Check for empty parts...
		for (String str : parts) {
			if (str.equals("")) {
				System.out.println("\n\n eeeee");
				throw new SiteException("keyPath contaims empty strings...");
			}
		}

		// System.out.println("\n\n------+++>: " + parts[0] + " : " +
		// parts.length);

		Object item = ss;
		String strItem = "";

		for (String str : parts) {

			if (item instanceof TreeMap) {
				if (strItem.equals("floors")) {
					item = ((TreeMap<String, Floor>) item).get(str);
				} else if (strItem.equals("rooms")) {
					item = ((TreeMap<String, Room>) item).get(str);
				} else if (strItem.equals("sensors")) {
					item = ((TreeMap<String, Sensor>) item).get(str);
				} else {
					throw new SiteException("keyPath error... TreeMap");
				}
			} else if (item instanceof Site) {
				if (str.equals("floors")) {
					Site site = (Site) item;
					item = site.floors;
				} else {
					throw new SiteException("keyPath error... Site");
				}
			} else if (item instanceof Floor) {
				if (str.equals("rooms")) {
					Floor floor = (Floor) item;
					item = floor.rooms;
				} else {
					throw new SiteException("keyPath error... Floor");
				}
			} else if (item instanceof Room) {
				if (str.equals("sensors")) {
					Room room = (Room) item;
					item = room.sensors;
				} else {
					throw new SiteException("keyPath error... Room");
				}

			} else {
				throw new SiteException("keyPath class type error...");
			}

			strItem = str;

			if (item == null) {
				throw new SiteException("keyPath cannot get object...");
			}
		}

		return item;
	}
	*/
	public boolean addThing (String sitePath, Thing thing){
		
		if (ss.things.get(sitePath) == null) {
			ss.things.put(sitePath,  thing);

			return true;
		}

		return false;
	}
	
	public boolean addThing (String sitePath, String devicePath, Thing thing){
		
		if (addThing(sitePath, thing)) {
			ss.devPaths.put(devicePath, sitePath);
			/*
			if (thing instanceof Floor) {
				ss.floorPaths.add(sitePath);
			} else if (thing instanceof Floor) {
				ss.roomPaths.add(sitePath);
			}
			*/
			return true;
		}
		/*
		if (ss.things.get(sitePath) == null) {
			ss.things.put(sitePath,  thing);
			ss.devPaths.put(devicePath, sitePath);
		}
*/
		return false;
	}	
	
	public Object getThing (String sitePath) throws SiteException {		

		Object obj = ss.things.get(sitePath);
		
		if (obj == null) {
			throw new SiteException("Object does not exist...");
		}		

		return obj;
	}	
	
	public Object getThingDevice (String devicePath) throws SiteException {
				
		String sitePath = ss.devPaths.get(devicePath);
		
		if (sitePath == null) {
			throw new SiteException("Device path is not mapped to site...");
		}	
		
		return getThing(sitePath);
		
	}
	/*
	 * (non-Javadoc)
	 * @see org.openhs.core.site.api.ISiteService#setThingDevice(java.lang.String, org.openhs.core.commons.Thing)
	 * string devicePath must exists, then this replaces in datastructure the object...
	 */
	
	public boolean setThingDevice (String devicePath, Thing device) throws SiteException {
		
		String sitePath = ss.devPaths.get(devicePath);
		
		if (sitePath == null) {
			throw new SiteException("[setThingDevice] Device path is not mapped to site...");
		}	
		
		Object devOld = ss.things.remove(sitePath);
		
		if (devOld == null) {
			throw new SiteException("[setThingDevice] Wrong object...");
		}	
		
		ss.things.put(sitePath, device);
				
		return true;
	}
	
	/*
	 * (non-Javadoc)
	 * @see org.openhs.core.site.api.ISiteService#getChildren(java.lang.String)
	 * Returns list of sitePaths, childrens of included sitePath item.  Only first level of children.
	 */
	
	public Set<String> getChildren (String sitePath) throws SiteException {
		
		// Divide
		String delim = "[/]+";
		String[] parts = sitePath.split(delim);

		// Check for empty parts...
		for (String str : parts) {
			if (str.equals("")) {
				System.out.println("\n\n eeeee");
				throw new SiteException("keyPath contaims empty strings...");
			}
		}		
			
		Set<String> keySet = new HashSet <String> ();
		
		Set<String> keySetAll = ss.things.keySet();
		
		for (String item : keySetAll) {
			
			if (!item.equals(sitePath)) {
				if (item.contains(sitePath)) {		
					
					String[] partsItem = item.split(delim);
					for (String str : partsItem) {
						if (str.equals("")) {
							System.out.println("\n\n eeeee");
							throw new SiteException("keyPath contaims empty strings...");
						}
					}
					
					if (parts.length == partsItem.length - 1) {
						keySet.add(item);
					}
				}
			}
		}
		
		return keySet;
	}
	
	public int getNumberThings (String sitePath) throws SiteException {
				
		Set<String> set = getChildren (sitePath);
		
		return set.size();				
	}
	
	public String getDevicePath (String sitePath) {
		
		Set <String> devicePaths = ss.devPaths.keySet();
		
		for (String devicePath : devicePaths) {
			String sitePathItem = ss.devPaths.get(devicePath);
			
			if (sitePathItem != null) {
				if (sitePathItem.equals(sitePath)) {
					return devicePath;
				}
			}			
		}
		
		return new String(); 
	}
	
/*
	public Object addThing(String keyPath) throws SiteException {

		if (keyPath.equals("")) {
			throw new SiteException("Bad keyPath");
		}

		// Divide
		String delim = "[/]+";
		String[] parts = keyPath.split(delim);

		// Check for empty parts...
		for (String str : parts) {
			if (str.equals("")) {
				System.out.println("\n\n eeeee");
				throw new SiteException("keyPath contaims empty strings...");
			}
		}

		// System.out.println("\n\n------+++>: " + parts[0] + " : " +
		// parts.length);

		Object item = ss;
		String strItem = "";

		for (String str : parts) {

			if (item instanceof TreeMap) {
				if (strItem.equals("floors")) {
					TreeMap<String, Floor> floors = (TreeMap<String, Floor>) item;
					item = floors.get(str);

					if (item == null) {
						Floor floor = new Floor();
						floors.put(str, floor);
						item = floor;

						//System.out.println("\n>>>Floor created:" + str + " : " + strItem);
					}
				} else if (strItem.equals("rooms")) {
					TreeMap<String, Room> rooms = (TreeMap<String, Room>) item;
					item = rooms.get(str);

					if (item == null) {
						Room room = new Room();
						rooms.put(str, room);
						item = room;
					}

				} else if (strItem.equals("sensors")) {
					TreeMap<String, Sensor> sensors = (TreeMap<String, Sensor>) item;
					item = sensors.get(str);

					if (item == null) {
						Sensor sensor = new Sensor();
						sensors.put(str, sensor);
						item = sensor;
					}
				} else {
					throw new SiteException("keyPath error...O-O");
				}

			} else if (item instanceof Site) {
				if (str.equals("floors")) {
					item = ((Site) item).floors;
				} else {
					throw new SiteException("keyPath error... floor");
				}

			} else if (item instanceof Floor) {
				if (str.equals("rooms")) {
					item = ((Floor) item).rooms;
				} else {
					throw new SiteException("keyPath error...floor");
				}
			} else if (item instanceof Room) {
				if (str.equals("sensors")) {
					item = ((Room) item).sensors;

				} else {
					throw new SiteException("keyPath error...room");
				}
			} else {
				throw new SiteException("keyPath class type error...OOO");
			}

			strItem = str;

			if (item == null) {
				throw new SiteException("keyPath cannot get object...");
			}
		}

		return item;
	}
*/
	/*
	@Override
	public Temperature getSensorTemperature(String keyPath) throws SiteException {
		TemperatureSensor sensor = null;
		// keyPath = "rrr";
		try {
			Object obj = getThing(keyPath);

			if (obj == null)
				throw new SiteException("Cannot get thing!");

			if (!(obj instanceof TemperatureSensor)) {
				throw new SiteException("Sensor path required!");
			} else {
				sensor = (TemperatureSensor) obj;
			}

		} catch (SiteException ex) {

			throw ex;
		}

		return sensor.getTemperature();
	}

	@Override
	public boolean setSensorTemperature(String keyPath, Temperature temp) throws SiteException {
		TemperatureSensor sensor = null;

		try {

			Object obj = getThing(keyPath);

			if (obj == null) {
				System.out.println("Cannot find object...");
				throw new SiteException("Cannot get thing!");

			}

			if (!(obj instanceof TemperatureSensor)) {
				throw new SiteException("Sensor path required!");
			} else {
				sensor = (TemperatureSensor) obj;
			}

		} catch (SiteException ex) {
			System.out.println("Exeption get:...: " + ex);
			return false;
		}

		sensor.setTemperature(temp);

		return true;
	}

	@Override
	public Humidity getSensorHumidity(String keyPath) throws SiteException {
		HumiditySensor sensor = null;

		try {
			Object obj = getThing(keyPath);

			if (obj == null)
				throw new SiteException("Cannot get thing!");

			if (!(obj instanceof HumiditySensor)) {
				throw new SiteException("Sensor path required!");
			} else {
				sensor = (HumiditySensor) obj;
			}
		} catch (SiteException ex) {
			throw ex;
		}

		return sensor.getHumidity();
	}

	@Override
	public boolean setSensorHumidity(String keyPath, Humidity hum) {
		HumiditySensor sensor = null;

		try {
			Object obj = getThing(keyPath);

			if (obj == null)
				throw new SiteException("Cannot get thing!");

			if (!(obj instanceof HumiditySensor)) {
				throw new SiteException("Sensor path required!");
			} else {
				sensor = (HumiditySensor) obj;
			}
		} catch (SiteException ex) {
			return false;
		}

		sensor.setHumidity(hum);

		return true;
	}
*/
	public Site getSite() {
		return ss;
	}

	public boolean setSite(Site sitePath) {
		// Needs to be solved...

		return true;
	}

	/*
	 * public boolean setRoomKey (String oldKey, String newKey) { Room room =
	 * ss.rooms.remove(oldKey);
	 * 
	 * ss.rooms.put(newKey, room);
	 * 
	 * return true; }
	 * 
	 * public boolean setSensorKey (String oldKey, String newKey) { Set<String>
	 * roomKeys = ss.rooms.keySet();
	 * 
	 * for (String roomKey : roomKeys){
	 * 
	 * try { //Room room = getRoom(roomKey); Room room = ss.rooms.get(roomKey);
	 * 
	 * if(room.sensors.containsKey(oldKey)){
	 * 
	 * Sensor sensor = room.sensors.remove(oldKey);
	 * 
	 * room.sensors.put(newKey, sensor); } } catch (Exception ex) {
	 * 
	 * } }
	 * 
	 * return true; }
	 */
	
	/*

	public void LoadXML(String path) {

		try {
			File inputFile = new File(path);
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(inputFile);
			doc.getDocumentElement().normalize();

			NodeList listFloor = doc.getElementsByTagName("floor");

			for (int i1 = 0; i1 < listFloor.getLength(); i1++) {
				Node nFloor = listFloor.item(i1);
				//System.out.println("\n+>Current Element:" + nFloor.getNodeName());

				if (nFloor.getNodeType() == Node.ELEMENT_NODE) {

					Element eFloor = (Element) nFloor;

					String keyFloor = eFloor.getAttribute("name");

					// System.out.println("\n+>" + keyFloor);

					// Create Floor
					addThing("floors/" + keyFloor);

					NodeList listRoom = eFloor.getElementsByTagName("room");

					for (int i2 = 0; i2 < listRoom.getLength(); i2++) {
						Node nRoom = listRoom.item(i2);

						if (nRoom.getNodeType() == Node.ELEMENT_NODE) {

							Element eRoom = (Element) nRoom;

							String keyRoom = eRoom.getAttribute("name");

							// System.out.println("\n+>" + keyRoom);

							// Create Room
							addThing("floors/" + keyFloor + "/rooms/" + keyRoom);

							NodeList listSensor = eRoom.getElementsByTagName("sensor");

							for (int i3 = 0; i3 < listSensor.getLength(); i3++) {
								Node nSensor = listSensor.item(i3);

								if (nSensor.getNodeType() == Node.ELEMENT_NODE) {

									Element eSensor = (Element) nSensor;

									String keySensor = eSensor.getAttribute("name");

									// System.out.println("\n++>" + keySensor);

									// Create Sensor
									addThing("floors/" + keyFloor + "/rooms/" + keyRoom + "/sensors/" + keySensor);
								}
							}
						}
					}
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
*/
/*	
	public void SaveXML(String path) {

		try {
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.newDocument();

			// root element
			Element rootElement = doc.createElement("site");
			doc.appendChild(rootElement);

			Site site = getSite();
			Set<String> keysF = site.floors.keySet();

			for (String keyF : keysF) {

				// floors element
				Element floor = doc.createElement("floor");
				rootElement.appendChild(floor);

				// setting attribute to element
				Attr attr = doc.createAttribute("name");
				attr.setValue(keyF);
				floor.setAttributeNode(attr);

				Floor m_floor = (Floor) getThing("floors/" + keyF);
				Set<String> keysR = m_floor.rooms.keySet();

				for (String keyR : keysR) {

					// room element
					Element room = doc.createElement("room");
					floor.appendChild(room);

					// setting attribute to element
					Attr attrR = doc.createAttribute("name");
					attrR.setValue(keyR);
					room.setAttributeNode(attrR);

					Room m_room = (Room) getThing("floors/" + keyF + "/rooms/" + keyR);
					Set<String> keysS = m_room.sensors.keySet();

					for (String keyS : keysS) {
						// sensor element
						Element sensor = doc.createElement("sensor");
						room.appendChild(sensor);

						// setting attribute to element
						Attr attrS = doc.createAttribute("name");
						attrS.setValue(keyS);
						sensor.setAttributeNode(attrS);
						
						// setting attribute to element
						Attr attrDp = doc.createAttribute("devicePath");
						attrDp.setValue("test path...");
						sensor.setAttributeNode(attrDp);						
					}
				}
			}

			// write the content into xml file
			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			Transformer transformer = transformerFactory.newTransformer();
			transformer.setOutputProperty(OutputKeys.INDENT, "yes");
			DOMSource source = new DOMSource(doc);
			StreamResult result = new StreamResult(new File(path));
			transformer.transform(source, result);
			// Output to console for testing
			// StreamResult consoleResult = new StreamResult(System.out);
			// transformer.transform(source, consoleResult);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	*/
	
	
	public void SaveXML(String path) {

		try {
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.newDocument();

			// root element
			Element rootElement = doc.createElement("site");
			doc.appendChild(rootElement);

			Site site = getSite();
			Set<String> sitePaths = site.things.keySet();

			for (String sitePath : sitePaths) {

				Thing thing = (Thing) getThing(sitePath);
				
				// Element thing
				Element element = doc.createElement("thing");
				rootElement.appendChild(element);

				// Type attribute
				Attr type = doc.createAttribute("type");
				type.setValue(thing.getClass().getSimpleName());
				element.setAttributeNode(type);
				
				// Name attribute
				Attr name = doc.createAttribute("name");
				name.setValue(thing.getName());
				element.setAttributeNode(name);		
				
				// SitePath attribute
				Attr sitePathAttr = doc.createAttribute("sitePath");
				sitePathAttr.setValue(sitePath);
				element.setAttributeNode(sitePathAttr);	
				
				if (thing instanceof TemperatureSensor) {
					// devicePath attribute
					
					Attr devicePathAttr = doc.createAttribute("devicePath");
					devicePathAttr.setValue(this.getDevicePath(sitePath));
					element.setAttributeNode(devicePathAttr);	
				}
			}

			// write the content into xml file
			TransformerFactory transformerFactory = TransformerFactory.newInstance();
			Transformer transformer = transformerFactory.newTransformer();
			transformer.setOutputProperty(OutputKeys.INDENT, "yes");			
			DOMSource source = new DOMSource(doc);
			StreamResult result = new StreamResult(new File(path));
			transformer.transform(source, result);
			// Output to console for testing
			// StreamResult consoleResult = new StreamResult(System.out);
			// transformer.transform(source, consoleResult);

		} catch (Exception e) {
			e.printStackTrace();
		}
	}	

	public void LoadXML(String path) {

		try {
			File inputFile = new File(path);
			DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
			Document doc = dBuilder.parse(inputFile);
			doc.getDocumentElement().normalize();

			NodeList listSitePath = doc.getElementsByTagName("thing");

			for (int i = 0; i < listSitePath.getLength(); i++) {
				Node nodeSitePath = listSitePath.item(i);
				//System.out.println("\n+>Current Element:" + nFloor.getNodeName());

				if (nodeSitePath.getNodeType() == Node.ELEMENT_NODE) {

					Element elementSitePath = (Element) nodeSitePath;

					String type = elementSitePath.getAttribute("type");
															
					String className = "org.openhs.core.commons." + type;
					Thing obj = (Thing) Class.forName(className).newInstance();					
					
					if (obj != null) {
										
						//System.out.println("\n+class>" + obj.getClass().getSimpleName());
						
						//Name attribute...
						String name = elementSitePath.getAttribute("name");
						obj.setName(name);
						
						//Name attribute...
						String sitePath = elementSitePath.getAttribute("sitePath");
						ss.things.put(sitePath, obj);
						
						if (obj instanceof TemperatureSensor) {
							String devicePath = elementSitePath.getAttribute("devicePath");
							ss.devPaths.put(devicePath, sitePath);
							
							//System.out.println("\n+classXXX>" + devicePath + " : " + sitePath);
						}
					}
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
	}	
	
	
	/*
	 * Loads datastructure...
	 */
	private void loadData() {
		String loadXml = (String) m_properties.get("xmlLoadEnable");
		String xmlFileName = (String) m_properties.get("xmlFileName");
		String openhsHome = (String) m_properties.get("openhsHome");

		if (loadXml.equals("yes") && !(xmlFileName.isEmpty())) {

			String xmlFileNamePath = openhsHome + xmlFileName;

			File xml = new File(xmlFileNamePath);

			if (xml.exists()) {

				try {
					//System.out.println("\n++> LOADING XML...");

					LoadXML(xmlFileNamePath);
				} catch (Exception ex) {

				}
			} else {

				//System.out.println("\n++> LOADING XML... but file is not here :( -> create something");

				buildHouse(4); // build some house....

				try {
					SaveXML(xmlFileNamePath);
				} catch (Exception ex) {
					System.out
							.println("Site XML not found ---> Created basic config and ERROR saving: " + ex.toString());
				} finally {
					System.out.println("Site XML not found ---> Created basic config and saved: " + xmlFileNamePath);
				}
			}
			/*
			if (xml.delete()) {
				System.out.println(xml.getName() + " is deleted!");
				
				SaveXML(xmlFileNamePath);
			}
			*/
			
		} else {

			System.out.println("\n++> File disabled -> I create some house :)");

			buildHouse(6); // build some house....
		}
	}

}
