/**
* @name		MySiteServiceImpl.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Site Interface implementation.
*
*/

package org.openhs.core.site.services;

import java.awt.List;
import java.io.File;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
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
import org.openhs.core.commons.Window;
import org.json.JSONObject;
import org.openhs.core.commons.ContactSensor;
import org.openhs.core.commons.Door;
import org.openhs.core.commons.Floor;
import org.openhs.core.commons.Room;
import org.openhs.core.commons.Site;
import org.openhs.core.commons.SiteException;
import org.openhs.core.commons.Switch;
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

	/*
	 * (non-Javadoc)
	 * @see org.openhs.core.site.api.ISiteService#buildHouse()
	 * Function: Create simple example house structure.
	 */
	@Override
	public void buildHouse() {

		try {
			Floor floor = new Floor();
			floor.setName("My first floor");
			floor.setDimensions(22.450f, 13.700f);
			addThing("floors/Floor1", floor);		

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
			
			/*
			 * Doors
			 */
			Door door = new Door();
			door.setName("Main Entrance");
			door.x = 11.00f;
			door.y = 0.0f;
			door.z = 0.0f;
			door.imagePath_open = "/infores/servlets/kitchen/door1_open.JPG";
			door.imagePath_close = "/infores/servlets/kitchen/door1_close.JPG";
			door.supplier = "htdvere";
			addThing("floors/Floor1/doors/Door1", door);			
			
			door = new Door();
			door.setName("Back Entrance");
			door.x = 5.00f;
			door.y = 9.0f;
			door.z = 0.0f;
			door.imagePath_open = "/infores/servlets/kitchen/door2_open.JPG";
			door.imagePath_close = "/infores/servlets/kitchen/door2_close.JPG";
			addThing("floors/Floor1/doors/Door2", door);	
			
			door = new Door();
			door.setName("Back Garage");
			door.x = 3.50f;
			door.y = 12.50f;
			door.z = 0.0f;
			door.imagePath_open = "/infores/servlets/kitchen/door3_open.JPG";
			door.imagePath_close = "/infores/servlets/kitchen/door3_close.JPG";
			addThing("floors/Floor1/doors/Door3", door);	
			
			door = new Door();
			door.setName("Cellar");
			door.x = 3.50f;
			door.y = 10.00f;
			door.z = 0.0f;
			door.imagePath_open = "/infores/servlets/kitchen/door4_open.JPG";
			door.imagePath_close = "/infores/servlets/kitchen/door4_close.JPG";
			addThing("floors/Floor1/doors/Door4", door);	
			
			door = new Door();
			door.setName("To Garage");
			door.x = 3.50f;
			door.y = 6.50f;
			door.z = 0.0f;
			door.imagePath_open = "/infores/servlets/kitchen/door5_open.JPG";
			door.imagePath_close = "/infores/servlets/kitchen/door5_close.JPG";
			addThing("floors/Floor1/doors/Door5", door);			
			
			/*
			 * *****************************************************************
			 */			
			
			TemperatureSensor sensor = new TemperatureSensor();
			sensor.setName("LivingTemp");
			sensor.x = 7.00f;
			sensor.y = 5.0f;
			sensor.z = 0.0f;			
			addThing("floors/Floor1/rooms/Room1/sensors/Livin_Room", "DummyService/dummy/0/Thermometer", sensor);
						
			sensor = new TemperatureSensor();
			sensor.setName("Outside");
			sensor.x = 7.00f;
			sensor.y = 13.0f;
			sensor.z = 0.0f;			
			addThing("floors/Floor1/rooms/Room0/sensors/SensorOut", "DummyService/dummy/1/Thermometer", sensor);
			
			Switch sw = new Switch();
			sw.setName("Kitchen_Switch");
			sw.x = 10.00f;
			sw.y = 8.0f;
			sw.z = 0.0f;							
			addThing("floors/Floor1/rooms/Room1/sensors/Kitchen_Switch", "DummyService/dummy/0/Switch", sw);
			
			sw = new Switch();
			sw.setName("Bathroom Switch");
			sw.x = 15.00f;
			sw.y = 8.0f;
			sw.z = 0.0f;							
			addThing("floors/Floor1/rooms/Room2/sensors/Kid1_Switch", "DummyService/dummy/1/Switch", sw);		
			
			sw = new Switch();
			sw.setName("WC Switch");
			sw.x = 20.00f;
			sw.y = 8.0f;
			sw.z = 0.0f;							
			addThing("floors/Floor1/rooms/Room2/sensors/Kid2_Switch", "DummyService/dummy/4/Switch", sw);		
						
			//Doors sensors
			sw = new Switch();
			sw.setName("Main Door Lock");
			sw.x = 25.00f;
			sw.y = 8.0f;
			sw.z = 0.0f;							
			addThing("floors/Floor1/doors/Door1/sensors/Lock", "DummyService/dummy/2/Switch", sw);				

			sw = new Switch();
			sw.setName("Side Door Lock");
			sw.x = 10.00f;
			sw.y = 12.0f;
			sw.z = 0.0f;							
			addThing("floors/Floor1/doors/Door2/sensors/Lock", "DummyService/dummy/3/Switch", sw);	
			
			sw = new Switch();
			sw.setName("Back Garage Lock");
			sw.x = 15.00f;
			sw.y = 12.0f;
			sw.z = 0.0f;							
			addThing("floors/Floor1/doors/Door3/sensors/Lock", "DummyService/dummy/5/Switch", sw);
			
			sw = new Switch();
			sw.setName("Cellar Lock");
			sw.x = 20.00f;
			sw.y = 12.0f;
			sw.z = 0.0f;							
			addThing("floors/Floor1/doors/Door4/sensors/Lock", "DummyService/dummy/6/Switch", sw);			
			
			sw = new Switch();
			sw.setName("To Garage Lock");
			sw.x = 25.00f;
			sw.y = 12.0f;
			sw.z = 0.0f;							
			addThing("floors/Floor1/doors/Door5/sensors/Lock", "DummyService/dummy/7/Switch", sw);			
									
			ContactSensor contact = new ContactSensor();
			contact.setName("MainDoor Closed");
			contact.x = 15.00f;
			contact.y = 5.0f;
			contact.z = 0.0f;							
			addThing("floors/Floor1/doors/Door1/sensors/Contact", "DummyService/dummy/2/ContactSensor", contact);		
			
			contact = new ContactSensor();
			contact.setName("SideDoor Closed");
			contact.x = 15.00f;
			contact.y = 10.0f;
			contact.z = 0.0f;								
			addThing("floors/Floor1/doors/Door2/sensors/Contact", "DummyService/dummy/3/ContactSensor", contact);				
			
			contact = new ContactSensor();
			contact.setName("Back Garage Closed");
			contact.x = 15.00f;
			contact.y = 15.0f;
			contact.z = 0.0f;								
			addThing("floors/Floor1/doors/Door3/sensors/Contact", "DummyService/dummy/4/ContactSensor", contact);				
				
			contact = new ContactSensor();
			contact.setName("Cellar Closed");
			contact.x = 15.00f;
			contact.y = 20.0f;
			contact.z = 0.0f;								
			addThing("floors/Floor1/doors/Door4/sensors/Contact", "DummyService/dummy/5/ContactSensor", contact);				
			
			contact = new ContactSensor();
			contact.setName("To Garage Closed");
			contact.x = 15.00f;
			contact.y = 20.0f;
			contact.z = 0.0f;								
			addThing("floors/Floor1/doors/Door5/sensors/Contact", "DummyService/dummy/6/ContactSensor", contact);				
						
			
			/*
			 * Windows
			 */
			Window window = new Window();
			window.setName("Kitchen");
			window.x = 8.50f;
			window.y = 10.00f;
			window.z = 0.0f;
			window.imagePath_open = "/infores/servlets/kitchen/door2_open.JPG";
			window.imagePath_close = "/infores/servlets/kitchen/door2_close.JPG";
			addThing("floors/Floor1/rooms/Room1/windows/South Window1", window);
			
			window = new Window();
			window.setName("Living room");
			window.x = 12.50f;
			window.y = 10.00f;
			window.z = 0.0f;
			window.imagePath_open = "/infores/servlets/kitchen/door2_open.JPG";
			window.imagePath_close = "/infores/servlets/kitchen/door2_close.JPG";
			addThing("floors/Floor1/rooms/Room1/windows/South Window2", window);			
			
			window = new Window();
			window.setName("Kid1");
			window.x = 16.00f;
			window.y = 10.00f;
			window.z = 0.0f;
			window.imagePath_open = "/infores/servlets/kitchen/door2_open.JPG";
			window.imagePath_close = "/infores/servlets/kitchen/door2_close.JPG";
			addThing("floors/Floor1/rooms/Room1/windows/Kid1", window);			
			
			window = new Window();
			window.setName("Kid2");
			window.x = 20.00f;
			window.y = 10.00f;
			window.z = 0.0f;
			window.imagePath_open = "/infores/servlets/kitchen/door2_open.JPG";
			window.imagePath_close = "/infores/servlets/kitchen/door2_close.JPG";
			addThing("floors/Floor1/rooms/Room1/windows/Kid2", window);				
			
			window = new Window();
			window.setName("Sleeping Room");
			window.x = 22.450f;
			window.y = 2.50f;
			window.z = 0.0f;
			window.imagePath_open = "/infores/servlets/kitchen/door2_open.JPG";
			window.imagePath_close = "/infores/servlets/kitchen/door2_close.JPG";
			addThing("floors/Floor1/rooms/Room1/windows/Sleeping_Room", window);				
			
			window = new Window();
			window.setName("Bathroom");
			window.x = 17.00f;
			window.y = 0.00f;
			window.z = 0.0f;
			window.imagePath_open = "/infores/servlets/kitchen/door2_open.JPG";
			window.imagePath_close = "/infores/servlets/kitchen/door2_close.JPG";
			addThing("floors/Floor1/rooms/Room1/windows/Bathroom", window);				
						
			window = new Window();
			window.setName("Work room");
			window.x = 6.50f;
			window.y = 1.50f;
			window.z = 0.0f;
			window.imagePath_open = "/infores/servlets/kitchen/door2_open.JPG";
			window.imagePath_close = "/infores/servlets/kitchen/door2_close.JPG";
			addThing("floors/Floor1/rooms/Room1/windows/Work_room", window);				
			
			window = new Window();
			window.setName("Garden room1");
			window.x = 1.00f;
			window.y = 13.70f;
			window.z = 0.0f;
			window.imagePath_open = "/infores/servlets/kitchen/door2_open.JPG";
			window.imagePath_close = "/infores/servlets/kitchen/door2_close.JPG";
			addThing("floors/Floor1/rooms/Room1/windows/Garden_room1", window);				
			
			window = new Window();
			window.setName("Garden room2");
			window.x = 2.50f;
			window.y = 13.70f;
			window.z = 0.0f;
			window.imagePath_open = "/infores/servlets/kitchen/door2_open.JPG";
			window.imagePath_close = "/infores/servlets/kitchen/door2_close.JPG";
			addThing("floors/Floor1/rooms/Room1/windows/Garden_room2", window);							
			
			contact = new ContactSensor();
			contact.setName("South Window Closed");
			contact.x = 60;
			contact.y = 80;
			contact.z = 0;								
			addThing("floors/Floor1/rooms/Room1/windows/South Window/sensors/Contact", "DummyService/dummy/4/ContactSensor", contact);
			
			/*
			 * **********************
			 */
			
			
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
	 * (non-Javadoc)
	 * @see org.openhs.core.site.api.ISiteService#addThing(java.lang.String, org.openhs.core.commons.Thing)
	 * Adds new thing.
	 */
	public boolean addThing (String sitePath, Thing thing){
		
		if (ss.things.get(sitePath) == null) {
			thing.setSitePath(sitePath);
			ss.things.put(sitePath,  thing);
						
			return true;
		}

		return false;
	}
	
	/*
	 * (non-Javadoc)
	 * @see org.openhs.core.site.api.ISiteService#renameSitePath(java.lang.String, java.lang.String)
	 * Rename Site Path...
	 */
	public boolean renameSitePath (String sitePathOld, String sitePathNew) throws SiteException {
		
		Thing thing = ss.things.get(sitePathOld);
		
		if (thing != null) {						 			
			thing.setSitePath(sitePathNew);
			ss.things.put(sitePathNew, thing);
			ss.things.remove(sitePathOld);
			
			String devPath = getDevicePath (sitePathOld);
			
			if (!devPath.equals("")){
				
				ss.devPaths.put(devPath, sitePathNew);								
			}
						
			return true;
		}

		return false;
	}
	
	/*
	 * (non-Javadoc)
	 * @see org.openhs.core.site.api.ISiteService#renameDevicePath(java.lang.String, java.lang.String)
	 * Rename Device path...
	 */
	public boolean renameDevicePath (String sitePath, String devicePathNew){
		
		String devicePathOld = getDevicePath (sitePath);
		//String sitePath = ss.devPaths.get(devicePathOld);
		
		if (!devicePathOld.equals("")) {
			
			ss.devPaths.put(devicePathNew, sitePath);
			ss.devPaths.remove(devicePathOld);
						
			return true;
		}

		return false;
	}	
	
	/*
	 * (non-Javadoc)
	 * @see org.openhs.core.site.api.ISiteService#addThing(java.lang.String, java.lang.String, org.openhs.core.commons.Thing)
	 * Add new thing + pairs with device name.
	 */
	public boolean addThing (String sitePath, String devicePath, Thing thing){
		
		if (addThing(sitePath, thing)) {			
			ss.devPaths.put(devicePath, sitePath);

			return true;
		}

		return false;
	}
	
	public boolean removeThing(String sitePath) {
		
	//	logger.info("****Command:" + sitePath);
		
		if (ss.things.remove(sitePath) != null) {			
			//Remove also device path connection			
			/*
			Set<String> keySetAll = ss.devPaths.keySet();
			
			for (String item : keySetAll) {	
				
				String path = ss.devPaths.get(item);
				
				if (path.equals(sitePath)) {
					ss.devPaths.remove(item);
					
					return true;
				}
			}
				*/		
			return true;
		}
				
		return false;
	}
	
	/*
	 * (non-Javadoc)
	 * @see org.openhs.core.site.api.ISiteService#getThing(java.lang.String)
	 * Get thing by site path.
	 */
	public Thing getThing (String sitePath) throws SiteException {		

		Thing obj = ss.things.get(sitePath);
		
		if (obj == null) {
			throw new SiteException("Object does not exist...");
		}		

		return obj;
	}	
	
	/*
	 * (non-Javadoc)
	 * @see org.openhs.core.site.api.ISiteService#getThingDevice(java.lang.String)
	 * Get thing by device path.
	 */
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
	 * Returns list of sitePaths, children of included sitePath item.  Only first level of children.
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
	
	/*
	 * (non-Javadoc)
	 * @see org.openhs.core.site.api.ISiteService#getNumberThings(java.lang.String)
	 */
	public int getNumberThings (String sitePath) throws SiteException {
				
		Set<String> set = getChildren (sitePath);
		
		return set.size();				
	}
	
	public boolean setNumberThings (int number, Class<?>  t) throws SiteException, NoSuchMethodException, SecurityException, ClassNotFoundException, InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		
		Set<String> set = getThingPathSet (t);
		
		if (number > set.size()) {
			//Add items
			
			for (int i = set.size(); i <= number; i++) {	
												
				String className = "org.openhs.core.commons.Floor";
				Thing object = (Thing) Class.forName(className).newInstance();					
								
/*				Class<?> c = Class.forName(t.getName());					
				Constructor<?> cons = c.getConstructor(t);
				Object object = cons.newInstance();
				*/
				
			//	String sitePath = "";
				
				if (object instanceof Floor) {
										
					
				}
				
				addThing("floors/Floor" + i , (Thing) object);

			}
			
			
		} else if (number < set.size()) {
			//Remove items
			ArrayList<String> setList = new ArrayList<String>(set);
			
			logger.info("\n\nJE TO:" + number + "  AND:" + set.size());
			
			for (int i = number; i < set.size(); i++) {
				removeThing(setList.get(i));
			}
								
		}
		
		return true;				
	}
	
	/*
	 * (non-Javadoc)
	 * @see org.openhs.core.site.api.ISiteService#addNextThing(java.lang.Class)
	 * Creates next class...
	 */
	public boolean addNextThing (Class<?>  t) throws SiteException, NoSuchMethodException, SecurityException, ClassNotFoundException, InstantiationException, IllegalAccessException, IllegalArgumentException, InvocationTargetException {
		
		Set<String> set = getThingPathSet (t);
								
		String className = t.getName(); //"org.openhs.core.commons.Floor";
		Thing object = (Thing) Class.forName(className).newInstance();
		
		String basePath = "";
		String baseName = "";
		String newPath = "";
		String newName = "";				
				
		if (t == Floor.class) {
			basePath = "floors/";
			baseName = "Floor";
			
		} else if (t == Room.class) {
			basePath = "rooms/";
			baseName = "Room";
		}

		int n = 0;
		
		do {
		
			n++;
			
			newName = baseName + "_" + n;
			newPath = basePath + baseName + "_" + n;
			
		} while (ss.things.get(newPath) != null);
		
		logger.info("--------->:" + newPath);
		
		boolean ret = this.addThing(newPath, object);		
		
		if (ret) {
			Thing newThing = getThing(newPath);
			
			if (newThing != null) {			
				newThing.setName(newName);
			}
		}
				
		return ret;				
	}	
	

	/*
	 * (non-Javadoc)
	 * @see org.openhs.core.site.api.ISiteService#getDevicePath(java.lang.String)
	 * Returns device path of thing specified by sitePath.
	 */
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
	 * (non-Javadoc)
	 * @see org.openhs.core.site.api.ISiteService#getAllThingsPath(java.lang.Class)
	 * Return: Set of all things og given type.
	 */
	public Set<String> getThingPathSet (Class<?>  t) throws SiteException {		
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
	
	/*
	 * (non-Javadoc)
	 * @see org.openhs.core.site.api.ISiteService#getThingSet(java.lang.Class)
	 * Return: Set of all things og given type.
	 */
	public Set<Thing> getThingSet (Class<?>  t) throws SiteException {		
		Set<Thing> keySet = new HashSet <Thing> ();
		
		Set<String> keySetAll = getThingPathSet(t);
		
		for (String item : keySetAll) {
			
			Thing thing = (Thing) getThing(item);													
			
			keySet.add(thing);															
		}

		return keySet;
	}	
	
	/*
	 * (non-Javadoc)
	 * @see org.openhs.core.site.api.ISiteService#getChildThingsPaths(java.lang.String, java.lang.Class)
	 * Returns: All children of given type of given object.
	 */
	public Set<String> getThingChildrenPathSet (String parentPath, Class<?>  t) throws SiteException {	
		Set<String> keySet = new HashSet <String> ();				
		
		Set<String> keySetAll = ss.things.keySet();
		
		for (String item : keySetAll) {
			//System.out.println("Parent path:" + parentPath + " ;Item: " + item);
			if (item.contains(parentPath) && !item.equals(parentPath)){
				  //System.out.println("Parent path:" + parentPath + " ;Item: " + item);
				Thing thing = (Thing) getThing(item);													
				
				if (t.isInstance(thing)) {
				
					keySet.add(item);
				}			
			}			
		}		
						
		return keySet;
	}

	/*
	 * (non-Javadoc)
	 * @see org.openhs.core.site.api.ISiteService#getSite()
	 * Returns site object.
	 */
	public Site getSite() {
		return ss;
	}

	public boolean setSite(Site sitePath) {
		// Needs to be solved...

		return true;
	}
	
	/*
	 * (non-Javadoc)
	 * @see org.openhs.core.site.api.ISiteService#isClosed(org.openhs.core.commons.Thing)
	 * Return: True if closed, all sensors signal 1.0
	 */
	public boolean isClosed (Thing m_thing) throws SiteException {	
		
		if (m_thing instanceof Door) {
			
			Set<String> contactSensorsPath = getThingChildrenPathSet (m_thing.getSitePath(), ContactSensor.class); 
			
			boolean state = false;
			
			// All state must be true...
			for (String item : contactSensorsPath){
				ContactSensor contact = (ContactSensor) getThing(item);
				
				if (contact.getState()) {
					state = true;					
				} else {
					state = false;
					break;
				}
			}					
			return state;			
		}
		
		return false;
	}	
	
	public boolean isLocked (Thing m_thing) throws SiteException {	
		
		if (m_thing instanceof Door) {
			
			Set<String> switchPath = getThingChildrenPathSet (m_thing.getSitePath(), Switch.class); 
			
			boolean state = false;
			
			// All state must be true...
			for (String item : switchPath){
				//  System.out.println("path: " + item);
				Switch sw = (Switch) getThing(item);
				
				if (sw.getState()) {
					state = true;					
				} else {
					state = false;
					break;
				}
			}		
			
			return state;
			
		} else if (m_thing instanceof Window) {
			
			
		}
		
		return false;
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
					xCoord.setValue(String.format("%.3f", ((TemperatureSensor) thing).x));					
					position.setAttributeNode(xCoord);	
					
					// Y-coord
					Attr yCoord = doc.createAttribute("yCoord");
					yCoord.setValue(String.format("%.3f", ((TemperatureSensor) thing).y));					
					position.setAttributeNode(yCoord);	
					
					// Z-coord
					Attr zCoord = doc.createAttribute("zCoord");
					zCoord.setValue(String.format("%.3f", ((TemperatureSensor) thing).z));					
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
					xCoord.setValue(String.format("%.3f", ((Switch) thing).x));					
					position.setAttributeNode(xCoord);	
					
					// Y-coord
					Attr yCoord = doc.createAttribute("yCoord");
					yCoord.setValue(String.format("%.3f", ((Switch) thing).y));					
					position.setAttributeNode(yCoord);	
					
					// Z-coord
					Attr zCoord = doc.createAttribute("zCoord");
					zCoord.setValue(String.format("%.3f", ((Switch) thing).z));					
					position.setAttributeNode(zCoord);					
					
				} else if (thing instanceof ContactSensor) {
					// devicePath attribute
					
					Attr devicePathAttr = doc.createAttribute("devicePath");
					devicePathAttr.setValue(this.getDevicePath(sitePath));
					element.setAttributeNode(devicePathAttr);
					
					//Element position
					Element position = doc.createElement("position");
					element.appendChild(position);

					// X-coord
					Attr xCoord = doc.createAttribute("xCoord");
					xCoord.setValue(String.format("%.3f", ((ContactSensor) thing).x));					
					position.setAttributeNode(xCoord);	
					
					// Y-coord
					Attr yCoord = doc.createAttribute("yCoord");
					yCoord.setValue(String.format("%.3f", ((ContactSensor) thing).y));					
					position.setAttributeNode(yCoord);	
					
					// Z-coord
					Attr zCoord = doc.createAttribute("zCoord");
					zCoord.setValue(String.format("%.3f", ((ContactSensor) thing).z));					
					position.setAttributeNode(zCoord);					
					
				}else if (thing instanceof Floor) {
					
					Element images = doc.createElement("images");
					element.appendChild(images);
					
					// Image path
					Attr imageBkg = doc.createAttribute("imageBkg");
					imageBkg.setValue(((Floor) thing).imagePath);
					images.setAttributeNode(imageBkg);	
					
					//Dimensions
					Element dimensions = doc.createElement("dimensions");
					element.appendChild(dimensions);

					// dim X
					Attr dim_x = doc.createAttribute("dim_x");
					dim_x.setValue(String.format("%.3f", ((Floor) thing).dim_x));					
					dimensions.setAttributeNode(dim_x);	
					
					// dim Y
					Attr dim_y = doc.createAttribute("dim_y");
					dim_y.setValue(String.format("%.3f", ((Floor) thing).dim_y));					
					dimensions.setAttributeNode(dim_y);						
					
				} else if (thing instanceof Room) {
					
					Element images = doc.createElement("images");
					element.appendChild(images);
					
					// Image path
					Attr imageBkg = doc.createAttribute("imageBkg");
					imageBkg.setValue(((Room) thing).imagePath);
					images.setAttributeNode(imageBkg);	
					
				} else if (thing instanceof Door) {
					
					Element images = doc.createElement("images");
					element.appendChild(images);
					
					// Image path
					Attr imageOpen = doc.createAttribute("imageOpen");
					imageOpen.setValue(((Door) thing).imagePath_open);
					images.setAttributeNode(imageOpen);	
					
					// Image path
					Attr imageClose = doc.createAttribute("imageClose");
					imageClose.setValue(((Door) thing).imagePath_close);
					images.setAttributeNode(imageClose);						
					
					//Element position
					Element position = doc.createElement("position");
					element.appendChild(position);

					// X-coord
					Attr xCoord = doc.createAttribute("xCoord");
					xCoord.setValue(String.format("%.3f", ((Door) thing).x));					
					position.setAttributeNode(xCoord);	
					
					// Y-coord
					Attr yCoord = doc.createAttribute("yCoord");
					yCoord.setValue(String.format("%.3f", ((Door) thing).y));					
					position.setAttributeNode(yCoord);	
					
					// Z-coord
					Attr zCoord = doc.createAttribute("zCoord");
					zCoord.setValue(String.format("%.3f", ((Door) thing).z));					
					position.setAttributeNode(zCoord);		
					
					//Element supplier
					Element supplier = doc.createElement("supplier");
					element.appendChild(supplier);

					// Name
					Attr supplName = doc.createAttribute("name");
					supplName.setValue(String.format("" + ((Door) thing).supplier));					
					supplier.setAttributeNode(supplName);						
					
				} else if (thing instanceof Window) {
					
					Element images = doc.createElement("images");
					element.appendChild(images);
					
					// Image path
					Attr imageOpen = doc.createAttribute("imageOpen");
					imageOpen.setValue(((Window) thing).imagePath_open);
					images.setAttributeNode(imageOpen);	
					
					// Image path
					Attr imageClose = doc.createAttribute("imageClose");
					imageClose.setValue(((Window) thing).imagePath_close);
					images.setAttributeNode(imageClose);						
					
					//Element position
					Element position = doc.createElement("position");
					element.appendChild(position);

					// X-coord
					Attr xCoord = doc.createAttribute("xCoord");
					xCoord.setValue(String.format("%.3f", ((Window) thing).x));					
					position.setAttributeNode(xCoord);	
					
					// Y-coord
					Attr yCoord = doc.createAttribute("yCoord");
					yCoord.setValue(String.format("%.3f", ((Window) thing).y));					
					position.setAttributeNode(yCoord);	
					
					// Z-coord
					Attr zCoord = doc.createAttribute("zCoord");
					zCoord.setValue(String.format("%.3f", ((Window) thing).z));					
					position.setAttributeNode(zCoord);					
					
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
						obj.setSitePath(sitePath);

						//TODO use factory pattern

						if (obj instanceof TemperatureSensor) {							
							String devicePath = elementSitePath.getAttribute("devicePath");
							ss.devPaths.put(devicePath, sitePath);
							
							//Element position
							Node positionNode = elementSitePath.getElementsByTagName("position").item(0);
							
							if(positionNode != null && positionNode.getNodeType() == Node.ELEMENT_NODE) {
								float x = 0.0f, y = 0.0f, z = 0.0f;
								try {
									x = Float.parseFloat(((Element) positionNode).getAttribute("xCoord"));
									y = Float.parseFloat(((Element) positionNode).getAttribute("yCoord"));
									z = Float.parseFloat(((Element) positionNode).getAttribute("zCoord"));
									
									((TemperatureSensor) obj).x = x;
									((TemperatureSensor) obj).y = y;
									((TemperatureSensor) obj).z = z;
									
								} catch (Exception ex) {
								
								} 

							}
						}
						else if (obj instanceof ContactSensor) {
							String devicePath = elementSitePath.getAttribute("devicePath");
							ss.devPaths.put(devicePath, sitePath);
							
							//Element position
							Node positionNode = elementSitePath.getElementsByTagName("position").item(0);
							
							if(positionNode != null && positionNode.getNodeType() == Node.ELEMENT_NODE) {
								float x = 0.0f, y = 0.0f, z = 0.0f;
								try {
									x = Float.parseFloat(((Element) positionNode).getAttribute("xCoord"));
									y = Float.parseFloat(((Element) positionNode).getAttribute("yCoord"));
									z = Float.parseFloat(((Element) positionNode).getAttribute("zCoord"));
									
									((ContactSensor) obj).x = x;
									((ContactSensor) obj).y = y;
									((ContactSensor) obj).z = z;
									
								} catch (Exception ex) {
								
								} 
							}								
													
						} else if (obj instanceof Switch) {
							String devicePath = elementSitePath.getAttribute("devicePath");
							ss.devPaths.put(devicePath, sitePath);
							
							//Element position
							Node positionNode = elementSitePath.getElementsByTagName("position").item(0);
							
							if(positionNode != null && positionNode.getNodeType() == Node.ELEMENT_NODE) {
								float x = 0.0f, y = 0.0f, z = 0.0f;
								try {
									x = Float.parseFloat(((Element) positionNode).getAttribute("xCoord"));
									y = Float.parseFloat(((Element) positionNode).getAttribute("yCoord"));
									z = Float.parseFloat(((Element) positionNode).getAttribute("zCoord"));
									
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
							
							//Element position
							Node dimensionsNode = elementSitePath.getElementsByTagName("dimensions").item(0);
							
							if(dimensionsNode != null && dimensionsNode.getNodeType() == Node.ELEMENT_NODE) {
								float dim_x = 0, dim_y = 0;
								try {
									dim_x = Float.parseFloat(((Element) dimensionsNode).getAttribute("dim_x"));
									dim_y = Float.parseFloat(((Element) dimensionsNode).getAttribute("dim_y"));
									
									((Floor) obj).dim_x = dim_x;
									((Floor) obj).dim_y = dim_y;
									
								} catch (Exception ex) {
								
								} 
							}								
							
						} else if (obj instanceof Room) {
							Node imagesNode = elementSitePath.getElementsByTagName("images").item(0);
							
							if(imagesNode != null && imagesNode.getNodeType() == Node.ELEMENT_NODE) {								
								((Room) obj).imagePath = ((Element) imagesNode).getAttribute("imageBkg");
							}
							
						} else if (obj instanceof Door) {
							Node imagesNode = elementSitePath.getElementsByTagName("images").item(0);
							
							if(imagesNode != null && imagesNode.getNodeType() == Node.ELEMENT_NODE) {								
								((Door) obj).imagePath_open = ((Element) imagesNode).getAttribute("imageOpen");
							}
							
							if(imagesNode != null && imagesNode.getNodeType() == Node.ELEMENT_NODE) {								
								((Door) obj).imagePath_close = ((Element) imagesNode).getAttribute("imageClose");
							}							
							
							//Element position
							Node positionNode = elementSitePath.getElementsByTagName("position").item(0);
							
							if(positionNode != null && positionNode.getNodeType() == Node.ELEMENT_NODE) {
								float x = 0.0f, y = 0.0f, z = 0.0f;
								try {
									x = Float.parseFloat(((Element) positionNode).getAttribute("xCoord"));
									y = Float.parseFloat(((Element) positionNode).getAttribute("yCoord"));
									z = Float.parseFloat(((Element) positionNode).getAttribute("zCoord"));
									
									((Door) obj).x = x;
									((Door) obj).y = y;
									((Door) obj).z = z;
									
								} catch (Exception ex) {
								
								} 
							}		
							
							//Element position
							Node supplierNode = elementSitePath.getElementsByTagName("supplier").item(0);
							
							if(supplierNode != null && supplierNode.getNodeType() == Node.ELEMENT_NODE) {								
								String supplName =  ((Element) supplierNode).getAttribute("name");
								
								if (supplName != null) {
									((Door) obj).supplier = supplName;
								//	logger.info("\n\n\n" + supplName);
								}
							}							
							
						} else if (obj instanceof Window) {
							Node imagesNode = elementSitePath.getElementsByTagName("images").item(0);
							
							if(imagesNode != null && imagesNode.getNodeType() == Node.ELEMENT_NODE) {								
								((Window) obj).imagePath_open = ((Element) imagesNode).getAttribute("imageOpen");
							}
							
							if(imagesNode != null && imagesNode.getNodeType() == Node.ELEMENT_NODE) {								
								((Window) obj).imagePath_close = ((Element) imagesNode).getAttribute("imageClose");
							}							
							
							//Element position
							Node positionNode = elementSitePath.getElementsByTagName("position").item(0);
							
							if(positionNode != null && positionNode.getNodeType() == Node.ELEMENT_NODE) {
								float x = 0.0f, y = 0.0f, z = 0.0f;
								try {
									x = Float.parseFloat(((Element) positionNode).getAttribute("xCoord"));
									y = Float.parseFloat(((Element) positionNode).getAttribute("yCoord"));
									z = Float.parseFloat(((Element) positionNode).getAttribute("zCoord"));
									
									((Window) obj).x = x;
									((Window) obj).y = y;
									((Window) obj).z = z;
									
								} catch (Exception ex) {
								
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
					logger.info("loading: " + xmlFileNamePath);
					//System.out.println("\n++> LOADING XML...");

					LoadXML(xmlFileNamePath);
					//buildHouse();
				} catch (Exception ex) {
					logger.info("Caught exception: " + ex);

				}
			} else {
				logger.info("file doesn't exists: " + xmlFileNamePath);
				logger.info("callin buildHouse()");

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
	/*
	public JSONObject getThingJSON (String path) {
  	  
  	  JSONObject json = new JSONObject();
  	  
  	  Thing thing;
		  
		  try {
			  thing = this.getThing(path);			  			  
			  
			  if (thing instanceof Floor) {
				  Floor floor = (Floor) thing;		
				  
				  json.put(path + "__validity", new Boolean(true));
				  json.put(path + "__name", floor.getName());
				  json.put(path + "__imagePath", floor.imagePath);
				  json.put(path + "__dim_x", String.format("%.3f",  floor.dim_x));
				  json.put(path + "__dim_y", String.format("%.3f",  floor.dim_y));				  				
				  
			  } else if (thing instanceof Room) {
				  Room room = (Room) thing;		
				  
				  json.put(path + "__validity", new Boolean(true));
				  json.put(path + "__name", room.getName());
				  json.put(path + "__imagePath", room.imagePath);
				  
			  } else if (thing instanceof Door) {
				  Door door = (Door) thing;
				  
				  json.put(path + "__validity", new Boolean(true));
				  json.put(path + "__name", door.getName());
				  json.put(path + "__imagePath_open", door.imagePath_open);
				  json.put(path + "__imagePath_close", door.imagePath_close);
				  json.put(path + "__x", String.format("%.3f", door.x));
				  json.put(path + "__y", String.format("%.3f", door.y));
				  json.put(path + "__z", String.format("%.3f", door.z));	
				  json.put(path + "__open", new Boolean(this.isClosed(door)));
				  json.put(path + "__lock", new Boolean(this.isLocked(door)));
				  json.put(path + "__supplierName", door.supplier);
				  
				//  System.out.println("Door path:" + door.getSitePath());
				  
			  } else if (thing instanceof Window) {
				  Window window = (Window) thing;
				  
				  json.put(path + "__validity", new Boolean(true));
				  json.put(path + "__name", window.getName());
				  json.put(path + "__imagePath_open", window.imagePath_open);
				  json.put(path + "__imagePath_close", window.imagePath_close);
				  json.put(path + "__x", String.format("%.3f", window.x));
				  json.put(path + "__y", String.format("%.3f", window.y));
				  json.put(path + "__z", String.format("%.3f", window.z));	
				  json.put(path + "__open", new Boolean(this.isClosed(window)));
				  json.put(path + "__lock", new Boolean(this.isLocked(window)));					  
				  
			  } else if (thing instanceof TemperatureSensor) {
				  TemperatureSensor sensor = (TemperatureSensor) thing;
				  Temperature temp = sensor.getTemperature();
				  
				  json.put(path + "__validity", new Boolean(true));
				  json.put(path + "__name", sensor.getName());
				  json.put(path + "__temperature", String.format("%.2f",  temp.getCelsius()));
				  json.put(path + "__x", String.format("%.3f", sensor.x));
				  json.put(path + "__y", String.format("%.3f", sensor.y));
				  json.put(path + "__z", String.format("%.3f", sensor.z));				  
				  
			  } else if (thing instanceof ContactSensor) {
				  ContactSensor contact = (ContactSensor) thing;
				  
				  json.put(path + "__validity", new Boolean(true));
				  json.put(path + "__name", contact.getName());
				  json.put(path + "__state_int", new Boolean(contact.getState()));
				  json.put(path + "__x", String.format("%.3f", contact.x));
				  json.put(path + "__y", String.format("%.3f", contact.y));
				  json.put(path + "__z", String.format("%.3f", contact.z));				  
				  
			  } else if (thing instanceof Switch) {
				  Switch swt = (Switch) thing;
				  				  
				  json.put(path + "__validity", new Boolean(true));
				  json.put(path + "__name", swt.getName());
				  json.put(path + "__state_int", new Integer(swt.getStateInt()));
				  json.put(path + "__x", String.format("%.3f", swt.x));
				  json.put(path + "__y", String.format("%.3f", swt.y));
				  json.put(path + "__z", String.format("%.3f", swt.z));
				  
			  } else {
				  json.put(path + "__validity", new Boolean(false));
			  }
			  
		  } catch (SiteException e) {
			  e.printStackTrace();
			  json.put(path + "__validity", new Boolean(false));
		  }    	  
  	  
		  return json;
    }  	
	
	public JSONObject getThingArrayJSON (Class<?> t) {
  	  
  	  JSONObject json = new JSONObject();	
  	  
  	  Set<String> paths;
  	  try {
  		  paths = this.getThingPathSet(t);
  		  json.put("Array_validity", new Boolean(true));
  		  
  	  } catch (SiteException e) {    		  
  		  json.put("Array_validity", new Boolean(false));
  		  e.printStackTrace();    		  
  		  return json;
  	  }				
  	  
  	  for (String path: paths) {
  		  JSONObject jsonItem = getThingJSON (path);
  		  
  		  if (jsonItem.length() > 0){    			  
			      for(String key : JSONObject.getNames(jsonItem))
			      {
			    	  json.put(key, jsonItem.get(key));
			      }
  		 }	      		  
  	  }
  	  
  	  return json; 
    }	
	
    public JSONObject getTimeDateJSON() {	    		    	
	    Date curDate = new Date();
	    SimpleDateFormat format = new SimpleDateFormat("HH:mm");
	    String time = format.format(curDate); 	 		  
	    
	    SimpleDateFormat format2 = new SimpleDateFormat("MMM dd yyyy");
	    String date = format2.format(curDate); 	  	    	  		    		    	
    	
		JSONObject json = new JSONObject();	
		
		json.put("time", time);
		json.put("date", date);	
		
		return json;
    } 	
*/
}
