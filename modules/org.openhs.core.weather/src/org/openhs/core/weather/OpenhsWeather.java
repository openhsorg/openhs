package org.openhs.core.weather;

//import static org.junit.Assert.assertNotNull;
//import static org.junit.Assert.assertTrue;

import java.io.IOException;

import org.json.JSONException;
import org.openhs.comm.api.IOpenhsWeather;

public class OpenhsWeather implements IOpenhsWeather {
	
	public void activate (){
		/*
		try {
			testForecastAtCityName ();
		}catch (Exception e){
			
		}
			*/			
		
		System.out.println("\n\n-------response--->  WEATHER" );
		
		try {
			test();
		}catch (Exception e){
			System.out.println("\nException" + e.toString() );
		}		
		
		
		
		System.out.println("\n\n-------response--->  /WEATHER" );
	}
	
	public void deactivate (){
		
	}
	
	public void test (){

        // declaring object of "OpenWeatherMap" class
        OpenWeatherMap owm = new OpenWeatherMap("152a8e3493c08a3bfa9eb3170ee23d6d");
		//OpenWeatherMap owm = new OpenWeatherMap("11111");

        try{
        	// getting current weather data for the "London" city
       	CurrentWeather cwd = owm.currentWeatherByCityName("Brno");

        //printing city name from the retrieved data
        System.out.println("\nCity: " + cwd.getCityName());
        
        float coef = 5.0f/9.0f;
        float c = 32f;
        
        float maxTemp = (cwd.getMainInstance().getMaxTemperature() - c) * coef;
        float minTemp = (cwd.getMainInstance().getMaxTemperature() - c) * coef;

        // printing the max./min. temperature
        System.out.println("\nTemperature: " + maxTemp + "/" + minTemp + "\'C");	
        
        System.out.println("Temperature: " + cwd.getMainInstance().getMaxTemperature()
                + "/" + cwd.getMainInstance().getMinTemperature() + "\'F");    
        
        
        }catch(Exception e){
        	
        }
        
	}
}
