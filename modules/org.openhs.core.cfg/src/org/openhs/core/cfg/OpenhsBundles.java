package org.openhs.core.cfg;

import java.util.ArrayList;

import org.osgi.framework.Bundle;
import org.osgi.framework.BundleContext;
import org.osgi.framework.FrameworkUtil;

public class OpenhsBundles {
	
	
	public void startSerialComm(){						
		startBundleState ("org.openhs.comm.rxtx");
	}
	
	public void stopSerialComm(){		
		stopBundleState ("org.openhs.comm.rxtx");				
	}		
	
	public int getSerialCommState(){	
		return getBundleState ("org.openhs.comm.rxtx");
	}	
	
	public void startMqttComm(){		
		startBundleState ("org.eclipse.paho.client.mqttv3");
		startBundleState ("org.openhs.comm.mqtt");
	}
	
	public void stopMqttComm(){		
		stopBundleState ("org.eclipse.paho.client.mqttv3");
		stopBundleState ("org.openhs.comm.mqtt");	
	}	
	
	public int getMqttCommState(){	
		return getBundleState ("org.openhs.comm.mqtt");
	}	
	
    public ArrayList<String> getBundlesList (){
	   	
    	ArrayList<String> list = new ArrayList<String>();
    	
    	try{
    	
    		list = new ArrayList<String>();
    	
    		BundleContext bundlecontext = FrameworkUtil.getBundle(this.getClass()).getBundleContext();
    	    	
    		Bundle bundles [] = bundlecontext.getBundles();
    	
    		for (int i=0; i<bundles.length; i++){
    		
    			String name = bundles[i].getSymbolicName();
    			String state = transferBundleState (bundles[i].getState());
    		    		
    			list.add(name + " : " + state);	    		
    			}
    	
    		return list;
    	
	    } catch(Exception ex){
	    	
	    	System.out.println("\n>>>:" + ex.toString());
	    	
	    	return list;
	    } 
    }
    
    public int getBundleState (String symbolicName){
    	int ret = 0;
    	try{
    	
    		BundleContext bundlecontext = FrameworkUtil.getBundle(this.getClass()).getBundleContext();
    	    	
    		Bundle bundles [] = bundlecontext.getBundles();
    	
    		for (int i=0; i<bundles.length; i++){
    		
    			String name = bundles[i].getSymbolicName();
    			
    			if (name.equals(symbolicName)){
    				return bundles[i].getState();
    			}    		
    		}
    		    			    	
	    } catch(Exception ex){
	    	
	    	System.out.println("\n>>>:" + ex.toString());
	    	
	    	return ret;
	    }     	
    	
    	return ret;
    }
    
    public Bundle startBundleState (String symbolicName){

    	Bundle bnd = null;
    	
    	try{
    	
    		BundleContext bundlecontext = FrameworkUtil.getBundle(this.getClass()).getBundleContext();
    	    	
    		Bundle bundles [] = bundlecontext.getBundles();
    	
    		for (int i=0; i<bundles.length; i++){    		
    			String name = bundles[i].getSymbolicName();
    			
    			if (name.equals(symbolicName)){
    				if (bundles[i].getState() != Bundle.ACTIVE){
    					bundles[i].start();
    					
    					bnd=bundles[i];
    				}    				
    			}    		
    		}
    		    			    	
	    } catch(Exception ex){	    	
	    	System.out.println("\n>>>:" + ex.toString());
	    	return bnd;
	    }
    	
    	return bnd;
    }           
    
    public void stopBundleState (String symbolicName){

    	try{
    	
    		BundleContext bundlecontext = FrameworkUtil.getBundle(this.getClass()).getBundleContext();
    	    	
    		Bundle bundles [] = bundlecontext.getBundles();
    	
    		for (int i=0; i<bundles.length; i++){    		
    			String name = bundles[i].getSymbolicName();
    			
    			if (name.equals(symbolicName)){
    				if (bundles[i].getState() == Bundle.ACTIVE){
    					bundles[i].stop();   					
    				}    				
    			}    		
    		}
    		    			    	
	    } catch(Exception ex){	    	
	    	System.out.println("\n>>>:" + ex.toString());
	    }     	
    }  
    
    public String transferBundleState (int id){
    	String state = "";
    	
		switch(id)
		{
			case Bundle.ACTIVE:    				
				state = "ACTIVE";
				break;
				
			case Bundle.INSTALLED:    				
				state = "INSTALLED";
				break;    	
				
			case Bundle.RESOLVED:    				
				state = "RESOLVED";
				break;      					
		}    	
    	
    	
    	return state;
    }
}
