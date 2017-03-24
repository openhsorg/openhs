/**
* @name		Email.java 03/01/2016
* @author	Michal Valny
* @version	1.0
* @description 	Email data
* 
*/

package org.openhs.core.email;

import java.io.*;
import java.net.InetAddress;
import java.util.Properties;
import java.util.Date;

import javax.mail.*;
import javax.mail.internet.*;
import java.security.Security;

import java.util.Date;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import javax.mail.*;
import javax.mail.internet.*;
import java.util.*;

public class Email {

	
    public void activate() {
        System.out.println("Starting Email");
        
	//	sendMessage("Ahojte!!!!");
		
		//sendMessage2("Ahojte!!!!2");		
    }

    public void deactivate() {
        System.out.println("Stopping Email");
    }
    
  //http://openhs.org:2095/cpsess7379522500/webmail/x3/mail/clientconf.html?domain=&redirectdomain=&acct=openhapz&archiving=0
	
  	public void sendMessage (String txtMessage)
  	{
  	    try{

  	        Properties props = new Properties();
  	     //   props.put("mail.smtp.host", "cp-11.webhostbox.net");//465
  	        props.put("mail.smtp.host", "smtp.gmail.com");//587
  	        props.put("mail.smtp.auth", "true");
  	        props.put("mail.debug", "true"); 
  	        props.put("mail.smtp.starttls.enable", "true");
  	        props.put("mail.smtp.port", "587");
  	    //    props.put("mail.smtp.socketFactory.port", "587");
  		//	props.put("mail.smtp.socketFactory.class",
  		//			"javax.net.ssl.SSLSocketFactory");	        			
  	        props.put("mail.smtp.socketFactory.fallback", "false");
  	        props.put("mail.smtps.quitwait", "false");
  	        props.put("mail.smtps.sender.address", "michal.valny@gmail.com");	       
  	//        props.put("mail.smtp.ssl.enable", "true");
  	          	

  	        Session mailSession = Session.getInstance(props, new javax.mail.Authenticator() {

  	            protected PasswordAuthentication getPasswordAuthentication() {
  	                return new PasswordAuthentication("michal.valny@gmail.com", "maverick27");
  	            }
  	        });

  	        mailSession.setDebug(true); // Enable the debug mode

  	        Message msg = new MimeMessage( mailSession );

  	        //--[ Set the FROM, TO, DATE and SUBJECT fields
  	        msg.setFrom( new InternetAddress( "openhapz@openhs.org" ) );
  	        msg.setRecipients( Message.RecipientType.TO,InternetAddress.parse("michal.valny@honeywell.com") );
  	        msg.setSentDate( new Date());
  	        msg.setSubject( "Hello World!" );

  	        //--[ Create the body of the mail
  	        msg.setText( "Hello from my first e-mail sent with JavaMail" );

  	        //--[ Ask the Transport class to send our mail message
  	        Transport.send( msg );

  	    }catch(Exception E){
  	        System.out.println( "Oops something has gone pearshaped!");
  	        System.out.println( E );
  	    }
  	}  	  	
  	
  	//non-secure
  	public void sendMessage2 (String txtMessage)
  	{
  		 

   	        Properties props = System.getProperties();//new Properties();
   	        props.put("mail.smtp.host", "cp-11.webhostbox.net");//465
   	   //     props.put("mail.smtp.host", "mail.openhs.org");//587
   	        props.put("mail.smtp.auth", "true");
   	        props.put("mail.debug", "true"); 
   	        props.put("mail.smtp.starttls.enable", "true");
   	        props.put("mail.smtp.port", "465");
   	       // props.put("protocol", "mail");
   	        
   	        props.put("mail.smtp.socketFactory.port", "465");
   			props.put("mail.smtp.socketFactory.class",
   					"javax.net.ssl.SSLSocketFactory");
   			
   	     //   props.put("mail.smtp.socketFactory.fallback", "false");
   	     //   props.put("mail.smtps.quitwait", "false");
   	        props.put("mail.smtps.sender.address", "openhapz@cp-11.webhostbox.net");	       
   	   //     props.put("mail.smtp.ssl.enable", "true");
   	        props.put("mail.smtp.timeout", 3000);   	        
   	        props.put("mail.smtp.transport.protocol", "smtp");
   	 //       props.put("mail.smtp.ssl.protocols", "SSLv3 TLSv1");
   	       props.put("mail.smtp.localhost", "openhapz@cp-11.webhostbox.net"); 

   	          	
   	        Session mailSession = Session.getDefaultInstance(props, new javax.mail.Authenticator() {

   	            protected PasswordAuthentication getPasswordAuthentication() {
   	                return new PasswordAuthentication("openhapz", "Michalv27!!");
   	            }
   	        });

   	        mailSession.setDebug(true); // Enable the debug mode
   	        
   	     try{
   	    	 
   	        Message msg = new MimeMessage( mailSession );

   	        //--[ Set the FROM, TO, DATE and SUBJECT fields
   	        msg.setFrom( new InternetAddress( "openhapz@openhs.org" ) );
   	        msg.setRecipients( Message.RecipientType.TO,InternetAddress.parse("michal.valny@honeywell.com") );
   	       // msg.setSentDate( new Date());
   	        msg.setSubject( "Hello World!" );

   	        //--[ Create the body of the mail
   	        msg.setText( "Hello from my first e-mail sent with JavaMail" );

   	        //--[ Ask the Transport class to send our mail message
   	        System.out.println( "\n\n\n\n TRANSPORT:........");
   	        Transport.send( msg);
   	        
   	    	 /*
   	    	Transport transport = mailSession.getTransport("smtp"); 
   	    	MimeMessage msg = new MimeMessage(mailSession); 
   	    	mailSession.setDebug(true); 

   	    	msg.setFrom(new InternetAddress("openhapz@openhs.org")); 

   	    	InternetAddress[] address = { new InternetAddress("michal.valny@honeywell.com") }; 

   	    	msg.addRecipients(Message.RecipientType.TO, address); 
   	    	msg.setSubject("Test"); 
   	    	msg.setText("This is a test", "text/plain"); 


   	    	transport.connect("cp-11.webhostbox.net", 465, "openhapz", "Michalv27!!"); 
   	    	transport.sendMessage(msg, msg.getRecipients(Message.RecipientType.TO)); 
   	    	transport.close(); 
   	    	*/

   	    }catch(Exception E){
   	        System.out.println( "Oops something has gone pearshaped!");
   	        System.out.println( E );
   	    }
  	}  	
	
}
