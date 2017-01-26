

module OhsWeatherData {
    
    export class WeatherDataForecast {
                       
        private forecasts: Array<WeatherForecast>;
        
        constructor () {            
            this.forecasts = new Array<WeatherForecast>(); 
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
                        
                this.img = new Image();
                this.img.src="/infores/servlets/kitchen/sunny.png";        
                this.images.push(this.img);
                
                this.img = new Image();
                this.img.src="/infores/servlets/kitchen/partcloudy.png";        
                this.images.push(this.img);
                
                this.img = new Image();
                this.img.src="/infores/servlets/kitchen/cloudy.png";        
                this.images.push(this.img);
                
                this.img = new Image();
                this.img.src="/infores/servlets/kitchen/cloudRain.png";        
                this.images.push(this.img);
                
                this.img = new Image();
                this.img.src="/infores/servlets/kitchen/cloudStorm.png";        
                this.images.push(this.img);
                
                this.img = new Image();
                this.img.src="/infores/servlets/kitchen/cloudSnow.png";        
                this.images.push(this.img);                          
            }    
            
            getImage() {                
                var index = this.weatherSymbol - 1;
                
                if (index <0 || index > 6) index = 0;
            
                this.img = this.images[index];
                
                return this.img;
            } 
        
        public setWeather (data:  string) {           
                 
            this.tempOut = parseFloat(data['temp']);
            this.weatherSymbol = JSON.parse(data['weatherSymbol']);
            this.windSpeed = parseFloat(data['windSpeed']);
            
            this.valid = true;
        }        
    }        
}