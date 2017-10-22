

module OhsWeatherData {
    
    export class WeatherDataForecast {
                               
        private forecasts: Array<WeatherForecast>;
        private currentForecast: WeatherForecast;
        
        private timerGetData;
        
        constructor () {            
            this.forecasts = new Array<WeatherForecast>(); 
            this.currentForecast = new WeatherForecast();
            
            this.timerGetServerDataEvent(10000);
        }
        
        private timerGetServerDataEvent(step : number) {
                                  
           this.getServerData();
             
           window.clearTimeout(this.timerGetData);
           this.timerGetData = window.setTimeout(() => this.timerGetServerDataEvent(step), step); 
        }         
        
        public setNumberForecasts (num: number) {                     
            if (num > this.forecasts.length) {            
                for (var i = this.forecasts.length; i < num; i++) {
                    this.forecasts.push(new WeatherForecast());
                }
            } else if (num < this.forecasts.length) {            
                this.forecasts.length = num;             
            }
        }
        
        public setWeatherItem (num: number, data: string) {                    
            if (num + 1 > this.forecasts.length) {
                this.setNumberForecasts (num + 1);
            }
            
            this.forecasts[num].setWeather(data);
        }
        
        public getForecast (num: number) {        
            if (num + 1 <= this.forecasts.length) {
                return this.forecasts[num];
            } else {                
                var fcs: WeatherForecast = new WeatherForecast()
                 fcs.valid = false;
                                
                return fcs;
            }                
        }
        
        public getCurrent () {
            return this.currentForecast;
        }            
        
        public getServerData () {                        
            for (var i = 0; i < 4; i++) {                            
                var req: any = {                
                    orderId : "WeatherForecast_" + i
    //                path:   this.path                
                }                 
                
                var data: string = getAjax("kitchen", req);
                if (data != null) {
                    this.setWeatherItem(i, data);
                }            
            }      
            
            // Get current forecast
                var req: any = {                
                    orderId : "WeatherCurrent"
    //                path:   this.path                
                }  
            
                var data: string = getAjax("kitchen", req);
                if (data != null) {
                    this.currentForecast.setWeather2(data);
                }             
            
        }
    }
        
    export class WeatherForecast {
    
        public valid: boolean = false; //content of the forecast is valid
        
        public tempIn: number = 0.0;
        public tempOut: number = 0.0;
        public timeString: string = "";
        public dateString: string = "";
        public frostOutside: boolean = false;
        public frostOutsideString: string = "false"; 
        public cloudPerc: number = 0.0;   
        public weatherSymbol: number = 0; 
        public windSpeed: number = 0;      
            
        private img:HTMLImageElement = null;        
        private images: Array<HTMLImageElement> = new Array<HTMLImageElement>();    
            
        constructor() {
                 
        }    

        public setWeather (data:  string) {           
                 
            this.tempOut = parseFloat(data['temp']);
            this.weatherSymbol = JSON.parse(data['weatherSymbol']);
            this.windSpeed = parseFloat(data['windSpeed']);
            
            this.valid = true;
        }   
        
        public setWeather2 (data:  string) {           
                                                                  
            this.tempIn = parseFloat(data['tempIn']);
            this.tempOut = parseFloat(data['tempOut']);
            this.frostOutside = JSON.parse(data['frostOutside']);
            this.weatherSymbol = JSON.parse(data['weatherSymbol']);
            this.windSpeed = parseFloat(data['windSpeed']);            
            
            this.valid = true;
        }          
    }      
    
    function getAjax(urlAdr: string, dataIn: string) {
       
        var result = null;
    
        $.ajaxSetup ({
            // Disable caching of AJAX responses
            cache: false
        });
            
        $.ajax({async: false, url: urlAdr, data: dataIn, dataType: "json", success: function(data) {
        
            result = data;
                                      
        }});
    
        return result;    
    }     
    
    
    function postAjax(urlAdr: string, json: string) {
       
        var result = null;
            
        $.ajax({async: false, type: "POST", url: urlAdr, data: json, dataType: "json", success: function(response) {
        
            result = response;
                                      
        }});
    
        return result;    
    }      
}