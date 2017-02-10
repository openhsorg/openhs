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

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.openhs.core.commons.Thing;
import org.openhs.core.commons.Floor;
import org.openhs.core.commons.Room;
import org.openhs.core.commons.Site;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Switch;
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
	public void buildHouse() {

		try {
			Floor floor = new Floor();
			floor.setName("My first floor");
			addThing("floors/Floor1", floor);
			
			floor = new Floor();
			floor.setName("My second floor");
			addThing("floors/Floor2", floor);

			Room room = new Room();
			room.setName("Outside");
			room.imagePath = "/infores/servlets/kitchen/room0.png";
			addThing("floors/Floor1/rooms/Room0", room);
			
			room = new Room();
			room.setName("Living room");
			room.imagePath = "/infores/servlets/kitchen/room1.png";			
			addThing("floors/Floor1/rooms/Room1", room);
			
			room = new Room();
			room.setName("Kid1");
			room.imagePath = "/infores/servlets/kitchen/room2.png";			
			addThing("floors/Floor1/rooms/Room2", room);			
						
			room = new Room();
			room.setName("Kid2");
			room.imagePath = "/infores/servlets/kitchen/room3.png";				
			addThing("floors/Floor2/rooms/Room1", room);
			
			TemperatureSensor sensor = new TemperatureSensor();
			sensor.setName("LivingTemp");
			sensor.x = 100;
			sensor.y = 200;
			sensor.z = 0;				
			addThing("floors/Floor1/rooms/Room1/sensors/Livin_Room", "DummyService/dummy/0/Thermometer", sensor);
						
			sensor = new TemperatureSensor();
			sensor.setName("Outside");
			sensor.x = 300;
			sensor.y = 250;
			sensor.z = 0;				
			addThing("floors/Floor1/rooms/Room0/sensors/SensorOut", "DummyService/dummy/1/Thermometer", sensor);
			
			Switch sw = new Switch();
			sw.setName("Kitchen_Switch");
			sw.x = 250;
			sw.y = 150;
			sw.z = 0;								
			addThing("floors/Floor1/rooms/Room1/sensors/Kitchen_Switch", "DummyService/dummy/0/Switch", sw);
			
			sw = new Switch();
			sw.setName("Bathroom Switch");
			sw.x = 420;
			sw.y = 150;
			sw.z = 0;								
			addThing("floors/Floor1/rooms/Room2/sensors/Kid1_Switch", "DummyService/dummy/1/Switch", sw);			

			
			
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

			return true;
		}

		return false;
	}	
	
	public Thing getThing (String sitePath) throws SiteException {		

		Thing obj = ss.things.get(sitePath);
		
		if (obj == null) {
			throw new SiteException("Object does not exist...");
		}		

		return obj;
	}	
	
	public Thing getThingDevice (String devicePath) throws SiteException {
				
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
	
	public Set<String> getAllThingsPath (Class<?>  t) throws SiteException {		
		Set<String> keySet = new HashSet <String> ();
		
		Set<String> keySetAll = ss.things.keySet();
		
		for (String item : keySetAll) {
			
			Thing thing = (Thing) getThing(item);													
			
			if (t.isInstance(thing)) {
			
				keySet.add(item);
			}						
		}
				
		return keySet;
	}
	

	public Site getSite() {
		return ss;
	}

	public boolean setSite(Site sitePath) {
		// Needs to be solved...

		return true;
	}
		
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
					
					//Element position
					Element position = doc.createElement("position");
					element.appendChild(position);

					// X-coord
					Attr xCoord = doc.createAttribute("xCoord");
					xCoord.setValue(String.format("%d", ((TemperatureSensor) thing).x));					
					position.setAttributeNode(xCoord);	
					
					// Y-coord
					Attr yCoord = doc.createAttribute("yCoord");
					yCoord.setValue(String.format("%d", ((TemperatureSensor) thing).y));					
					position.setAttributeNode(yCoord);	
					
					// Z-coord
					Attr zCoord = doc.createAttribute("zCoord");
					zCoord.setValue(String.format("%d", ((TemperatureSensor) thing).z));					
					position.setAttributeNode(zCoord);
					
					
				} else if (thing instanceof Switch) {
					// devicePath attribute
					
					Attr devicePathAttr = doc.createAttribute("devicePath");
					devicePathAttr.setValue(this.getDevicePath(sitePath));
					element.setAttributeNode(devicePathAttr);
					
					//Element position
					Element position = doc.createElement("position");
					element.appendChild(position);

					// X-coord
					Attr xCoord = doc.createAttribute("xCoord");
					xCoord.setValue(String.format("%d", ((Switch) thing).x));					
					position.setAttributeNode(xCoord);	
					
					// Y-coord
					Attr yCoord = doc.createAttribute("yCoord");
					yCoord.setValue(String.format("%d", ((Switch) thing).y));					
					position.setAttributeNode(yCoord);	
					
					// Z-coord
					Attr zCoord = doc.createAttribute("zCoord");
					zCoord.setValue(String.format("%d", ((Switch) thing).z));					
					position.setAttributeNode(zCoord);					
					
				} else if (thing instanceof Floor) {
					
					Element images = doc.createElement("images");
					element.appendChild(images);
					
					// Image path
					Attr imageBkg = doc.createAttribute("imageBkg");
					imageBkg.setValue(((Floor) thing).imagePath);
					images.setAttributeNode(imageBkg);	
					
				} else if (thing instanceof Room) {
					
					Element images = doc.createElement("images");
					element.appendChild(images);
					
					// Image path
					Attr imageBkg = doc.createAttribute("imageBkg");
					imageBkg.setValue(((Room) thing).imagePath);
					images.setAttributeNode(imageBkg);	
					
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
							
							//Element position
							Node positionNode = elementSitePath.getElementsByTagName("position").item(0);
							
							if(positionNode != null && positionNode.getNodeType() == Node.ELEMENT_NODE) {
								int x = 0, y = 0, z = 0;
								try {
									x = Integer.parseInt(((Element) positionNode).getAttribute("xCoord"));
									y = Integer.parseInt(((Element) positionNode).getAttribute("yCoord"));
									z = Integer.parseInt(((Element) positionNode).getAttribute("zCoord"));
									
									((TemperatureSensor) obj).x = x;
									((TemperatureSensor) obj).y = y;
									((TemperatureSensor) obj).z = z;
									
								} catch (Exception ex) {
								
								} 
							}														
						} else if (obj instanceof Switch) {
							String devicePath = elementSitePath.getAttribute("devicePath");
							ss.devPaths.put(devicePath, sitePath);
							
							//Element position
							Node positionNode = elementSitePath.getElementsByTagName("position").item(0);
							
							if(positionNode != null && positionNode.getNodeType() == Node.ELEMENT_NODE) {
								int x = 0, y = 0, z = 0;
								try {
									x = Integer.parseInt(((Element) positionNode).getAttribute("xCoord"));
									y = Integer.parseInt(((Element) positionNode).getAttribute("yCoord"));
									z = Integer.parseInt(((Element) positionNode).getAttribute("zCoord"));
									
									((Switch) obj).x = x;
									((Switch) obj).y = y;
									((Switch) obj).z = z;
									
								} catch (Exception ex) {
								
								} 
							}							
							
						} else if (obj instanceof Floor) {																					
							Node imagesNode = elementSitePath.getElementsByTagName("images").item(0);
							
							if(imagesNode != null && imagesNode.getNodeType() == Node.ELEMENT_NODE) {								
								((Floor) obj).imagePath = ((Element) imagesNode).getAttribute("imageBkg");
							}
							
						} else if (obj instanceof Room) {
							Node imagesNode = elementSitePath.getElementsByTagName("images").item(0);
							
							if(imagesNode != null && imagesNode.getNodeType() == Node.ELEMENT_NODE) {								
								((Room) obj).imagePath = ((Element) imagesNode).getAttribute("imageBkg");
							}
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

				buildHouse(); // build some house....

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

			buildHouse(); // build some house....
		}
	}

}
