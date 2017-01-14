package org.openhs.comm.rxtx;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import org.openhs.core.commons.api.ICommService;
import org.openhs.core.commons.api.IMessageHandler;
import org.openhs.core.commons.api.Message;
import org.osgi.service.component.ComponentContext;

import gnu.io.CommPort;
import gnu.io.CommPortIdentifier;
import gnu.io.SerialPort;

public class RxTxService implements ICommService{
	
	final String m_name = "RxTx";
    Map<String, Object> m_properties = null;
	
	SerialPort serialPort = null;
	  /*
	      private static final String PORT_NAMES[] = { 
	      //    "/dev/tty.usbmodem", // Mac OS X
//	          "/dev/usbdev", // Linux
	          "/dev/ttyS33", // Linux
//	          "/dev/serial", // Linux
//	          "COM3", // Windows
	      };
	      */
	      private String appName;
	      private BufferedReader input;
	      private OutputStream output;
	      
	      private static final int TIME_OUT = 1000; // Port open timeout
	      private static final int DATA_RATE = 9600; // Arduino serial port

	      CommPortIdentifier portIdentifier;
	  	
	      static void listPorts()
	      {
	          java.util.Enumeration<CommPortIdentifier> portEnum = CommPortIdentifier.getPortIdentifiers();
	          while ( portEnum.hasMoreElements() ) 
	          {
	              CommPortIdentifier portIdentifier = portEnum.nextElement();
	              System.out.println(portIdentifier.getName()  +  " - " +  getPortTypeName(portIdentifier.getPortType()) );
	          }        
	      }
	      
	      
	      static String getPortTypeName ( int portType )
	      {
	          switch ( portType )
	          {
	              case CommPortIdentifier.PORT_I2C:
	                  return "I2C";
	              case CommPortIdentifier.PORT_PARALLEL:
	                  return "Parallel";
	              case CommPortIdentifier.PORT_RAW:
	                  return "Raw";
	              case CommPortIdentifier.PORT_RS485:
	                  return "RS485";
	              case CommPortIdentifier.PORT_SERIAL:
	                  return "Serial";
	              default:
	                  return "unknown type";
	          }
	      }
	      
	      public void connect ( String portName ) throws Exception
	      {
	      	listPorts();
	      	
	      	try {
	          portIdentifier = CommPortIdentifier.getPortIdentifier(portName);
	      	}
	      	catch (Exception e){
	      		System.out.println("Error: No port!!!");
	      		
	      		return;
	      	}
	          if ( portIdentifier.isCurrentlyOwned() )
	          {
	              System.out.println("Error: Port is currently in use");
	          }
	          else
	          {
	              CommPort commPort = portIdentifier.open(this.getClass().getName(),2000);
	              
	              if ( commPort instanceof SerialPort )
	              {
	                  SerialPort serialPort = (SerialPort) commPort;
	                  serialPort.setSerialPortParams(DATA_RATE,SerialPort.DATABITS_8,SerialPort.STOPBITS_1,SerialPort.PARITY_NONE);
	                  
	                  InputStream in = serialPort.getInputStream();
	                  OutputStream out = serialPort.getOutputStream();
	                  
	                  (new Thread(new SerialReader(in))).start();
	                  (new Thread(new SerialWriter(out))).start();

	              }
	              else
	              {
	                  System.out.println("Error: Only serial ports are handled by this example.");
	              }
	          }     
	      }
	      
	      /** */
	      public static class SerialReader implements Runnable 
	      {
	       	
	          InputStream in;
	          
	          public SerialReader (InputStream in)
	          {
	              this.in = in;
	          }
	          
	          public void run ()
	          {
	          	String s = "";
	          	
	              byte[] buffer = new byte[1024];
	              int len = -1;
	              try
	              {            	            	
	                  while ( ( len = this.in.read(buffer)) > -1 )
	                  {                	
	                      //System.out.print(new String(buffer,0,len));   
	                      
	                      s = s + new String(buffer,0,len);
	                      
	                      if (s.contains("\n"))
	                      {                    	
	                      //	m_command.setCommand(s);
	                    	  
	                    	System.out.println("--> Arduino: " + s);
	                      	s = "";
	                      }     
	                      
	                      try
	                      {
	                      	Thread.sleep (500);
	                      }
	                      catch (Exception ex)
	                      {
	                      	
	                      }
	                  }                                
	                  
	              }
	              catch ( IOException e )
	              {
	                  e.printStackTrace();
	              }                  
	          }                      
	      }

	      /** */
	      public static class SerialWriter implements Runnable 
	      {
	          OutputStream out;
	          
	          public SerialWriter ( OutputStream out)
	          {
	              this.out = out;
	          }
	          
	          public void run ()
	          {
	              try
	              {                
	                  int c = 0;
	                  while ( ( c = System.in.read()) > -1 )
	                  {
	                      this.out.write(c);
	                  }                
	              }
	              catch ( IOException e )
	              {
	                  e.printStackTrace();
	              }           
	          }
	      }

//		@Override
//		public void registerMessageHandler(IMessageHandler mh) {
//			// TODO Auto-generated method stub
//		}
//
//
//		@Override
//		public void unregisterMessageHandler(IMessageHandler mh) {
//			// TODO Auto-generated method stub
//		}


		@Override
		public void sendMessage(Message m) {
			// TODO Auto-generated method stub
			
		}


		@Override
		public String getName() {
			return m_name;
		} 	
	
		public synchronized void activate(ComponentContext componentContext, Map<String, Object> properties) {
	        System.out.println("RxTxService: Activated");

	        updated(properties);
	        
			try {
				connect("/dev/ttyS33");
			}
	        catch ( Exception e )
	        {
	            // TODO Auto-generated catch block
	            e.printStackTrace();
	        }	
	    }

	    public void updated(Map<String, Object> properties) {
	        //TODO read cfg from props
	        m_properties = properties;
	        if(properties != null && !properties.isEmpty()) {
	            Iterator<Entry<String, Object>> it = m_properties.entrySet().iterator();
	            while (it.hasNext()) {
	                Entry<String, Object> entry = it.next();
	                //logger.info("New property - " + entry.getKey() + " = " +
	                //entry.getValue() + " of type " + entry.getValue().getClass().toString());
	                if (entry.getKey().compareTo("todoProps") == 0) {
	                	System.out.println((String) entry.getValue());
	                }
	            }
	        }
	    }
		
}
