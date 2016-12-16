/**
* @name		MySiteServiceImpl.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Site Interface implementation.
*
*/

package org.openhs.core.site.services;

import java.util.Set;
import java.util.TreeMap;
import java.io.*;

import org.openhs.core.site.data.ISiteService;
import org.openhs.core.commons.Temperature;
import org.openhs.core.commons.Humidity;
import org.openhs.core.commons.TextOutput;
import org.openhs.core.commons.Sensor;
import org.openhs.core.commons.Site;
import org.openhs.core.commons.Room;
import org.openhs.core.commons.Floor;
import org.openhs.core.commons.SiteException;

public class MySiteServiceImpl implements ISiteService {
	
	Site ss = new Site ();
	
	TextOutput msg = new TextOutput ();

    public void activate() {
    	msg.println("org.openhs.core.site.services: activate");
    }

    public void deactivate() {
    	msg.println("org.openhs.core.site.services: deactivate");
    }

    @Override
    public void buildHouse(int rooms) {
        
    	try {
	    	 addThing("floors/Floor1");
	    	 addThing("floors/Floor2");
	    		
	    	for (int i = 0; i <= rooms; i++) {
	    	
	    		addThing("floors/Floor1/rooms/Room" + i);    		
	    		addThing("floors/Floor1/rooms/Room" + i + "/sensors/" + "Room" + i + "_Sensor1");    		
	    	}    
	    	
	    	addThing("floors/Floor2/rooms/Room1/sensors/SensorWC");
    	
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
    
	public int getNumberThings (String keyPath) throws SiteException {			
    	
		Object item = getThing(keyPath);
		if (item == null) {
			throw new SiteException("Bad object specifications");
		}
		
		if (item instanceof TreeMap) {
			
	    	String key = keyPath.substring(keyPath.lastIndexOf("/") + 1, keyPath.length());
	    	
	    	//System.out.println("\n\nXXX: " + key + " : " + keyPath);
	    				
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
    
	public Object getThing (String keyPath) throws SiteException {
    	
    	if (keyPath.equals("")) {   
    		throw new SiteException("Bad keyPath");
    	}
    	
    	//Divide
    	String delim ="[/]+";    	
    	String [] parts = keyPath.split(delim);
    	
    	//Check for empty parts...
    	for (String str : parts) {
    		if (str.equals("")) {
    			System.out.println("\n\n eeeee");   
    			throw new SiteException("keyPath contaims empty strings...");    			 
    		}
    	}
    	
    	//System.out.println("\n\n------+++>: " + parts[0] + " : " + parts.length);    	    	    	
    	    	
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
    		}else if (item instanceof Site) {
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
	
	public Object addThing (String keyPath) throws SiteException {
    	
    	if (keyPath.equals("")) {   
    		throw new SiteException("Bad keyPath");
    	}
    	
    	//Divide
    	String delim ="[/]+";    	
    	String [] parts = keyPath.split(delim);
    	
    	//Check for empty parts...
    	for (String str : parts) {
    		if (str.equals("")) {
    			System.out.println("\n\n eeeee");   
    			throw new SiteException("keyPath contaims empty strings...");    			 
    		}
    	}

    	//System.out.println("\n\n------+++>: " + parts[0] + " : " + parts.length);    	    	    	
    	    	
    	Object item = ss;   	
    	String strItem = "";
    	
    	for (String str : parts) {
    		
    		if (item instanceof TreeMap) {        			
    			if (strItem.equals("floors")) {    				
    				TreeMap<String, Floor> floors =  (TreeMap<String, Floor>) item;
    				item = floors.get(str);
    				
    				if (item == null) {    					
    					Floor floor = new Floor();
    					floors.put(str, floor);    					
    					item = floor;
    					
    					System.out.println("\n>>>Floor created:" + str + " : " + strItem);
    				}
    			} else if (strItem.equals("rooms")) {
    				TreeMap<String, Room> rooms =  (TreeMap<String, Room>) item;
    				item = rooms.get(str);    
    				
    				if (item == null) {
    					Room room = new Room();
    					rooms.put(str, room);
    					item = room;
    				}
    				
    			} else if (strItem.equals("sensors")) {
    				TreeMap<String, Sensor> sensors =  (TreeMap<String, Sensor>) item;
    				item = sensors.get(str);    
    				
    				if (item == null) {
    					Sensor sensor = new Sensor ();
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

    @Override
    public Temperature getSensorTemperature(String keyPath) throws SiteException {
        Sensor sensor = null;
             //  keyPath = "rrr";
        try {
            Object obj = getThing(keyPath);
            
            if (obj == null) throw new SiteException("Cannot get thing!");
            
            if (!(obj instanceof Sensor)) {
            	throw new SiteException("Sensor path required!");
            } else {            
            	sensor = (Sensor) obj;
            }
            
        } catch (SiteException ex) {        	
        	
            throw ex;
        }

        return sensor.getTemperature();
    }  

    @Override
    public boolean setSensorTemperature(String keyPath, Temperature temp) throws SiteException{
        Sensor sensor = null;

        try {

            Object obj = getThing(keyPath);
            
            if (obj == null) {
            	System.out.println("Cannot find object...");
            	throw new SiteException("Cannot get thing!");
            	
            }
            
            if (!(obj instanceof Sensor)) {
            	throw new SiteException("Sensor path required!");
            } else {            
            	sensor = (Sensor) obj;
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
        Sensor sensor = null;

        try {
            Object obj = getThing(keyPath);
            
            if (obj == null) throw new SiteException("Cannot get thing!");
            
            if (!(obj instanceof Sensor)) {
            	throw new SiteException("Sensor path required!");
            } else {            
            	sensor = (Sensor) obj;
            }
        } catch (SiteException ex) {
            throw ex;
        }

        return sensor.getHumidity();
    }

    @Override
    public boolean setSensorHumidity(String keyPath, Humidity hum) {
        Sensor sensor = null;

        try {
            Object obj = getThing(keyPath);
            
            if (obj == null) throw new SiteException("Cannot get thing!");
            
            if (!(obj instanceof Sensor)) {
            	throw new SiteException("Sensor path required!");
            } else {            
            	sensor = (Sensor) obj;
            }
        } catch (SiteException ex) {
            return false;
        }

        sensor.setHumidity(hum);

        return true;
    }    
    
    public Site getSite () {
        return ss;    	
    }
    
    public boolean setSite (Site siteIn) {
     //Needs to be solved...
    	
    	ss = siteIn;
    	
    	return true;
    }
    
    /*
    public boolean setRoomKey (String oldKey, String newKey)
    {    	
    	Room room = ss.rooms.remove(oldKey);
    	
    	ss.rooms.put(newKey, room);
    	
    	return true;
    }
    
    public boolean setSensorKey (String oldKey, String newKey)
    {    	    	    	 	    	    	   	
    	Set<String> roomKeys = ss.rooms.keySet();
    	
    	for (String roomKey : roomKeys){

    		try {
	    		//Room room = getRoom(roomKey);
	    		Room room = ss.rooms.get(roomKey);
	    		
	    		if(room.sensors.containsKey(oldKey)){
	    			
	    	    	Sensor sensor = room.sensors.remove(oldKey);
	    	    	
	    	    	room.sensors.put(newKey, sensor);    			
	    		}
    		} catch (Exception ex) {
    			
    		}
    	}
    	
    	return true;
    }    
*/
}
