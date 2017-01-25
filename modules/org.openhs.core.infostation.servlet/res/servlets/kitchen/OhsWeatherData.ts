

module OhsWeatherData {
    
    export class WeatherDataForecast {
                       
        private forecasts: Array<Weather>;
        
        constructor () {            
            this.forecasts = new Array<Weather>();
            
            this.setNumberForecasts (4);
                                    
        }
        
        public setNumberForecasts (num: number) {
         
            if (num > this.forecasts.length) {            
                for (var i = this.forecasts.length; i < num; i++) {
                    this.forecasts.push(new Weather());
                }
            } else if (num < this.forecasts.length) {
            
                this.forecasts.length = num;             
            }
        }
        
        public setWeatherItem (num: number, data: string) {
            /*
            if (num >= this.forecasts.length) {
                this.setNumberForecasts (num);
            }
            */
            this.setWeather (this.forecasts[num], data);
            
            //this.setWeather (new Weather(), data);
            
        }
        
        
        protected setWeather (weather: Weather, data:  string) {        
        
            weather.tempIn = parseFloat(data['tempIn']);
            weather.tempOut = parseFloat(data['tempOut']);
            /*
            weather.dateString = data['date'];           
            weather.tempIn = parseFloat(data['tempIn']);
            weather.tempOut = parseFloat(data['tempOut']);
            weather.frostOutside = JSON.parse(data['frostOutside']);
            weather.weatherSymbol = JSON.parse(data['weatherSymbol']);
            weather.windSpeed = parseFloat(data['windSpeed']);     
            */          
        }
    }
        
    export class Weather {
    
        public valid: boolean = false;
        
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
    }        
}