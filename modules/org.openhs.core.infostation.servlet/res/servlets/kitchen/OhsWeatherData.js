var OhsWeatherData;
(function (OhsWeatherData) {
    class WeatherDataForecast {
        constructor() {
            this.forecasts = new Array();
        }
        setNumberForecasts(num) {
            if (num > this.forecasts.length) {
                for (var i = this.forecasts.length; i < num; i++) {
                    this.forecasts.push(new WeatherForecast());
                }
            }
            else if (num < this.forecasts.length) {
                this.forecasts.length = num;
            }
        }
        setWeatherItem(num, data) {
            if (num + 1 > this.forecasts.length) {
                this.setNumberForecasts(num + 1);
            }
            this.forecasts[num].setWeather(data);
        }
        getForecast(num) {
            if (num + 1 <= this.forecasts.length) {
                return this.forecasts[num];
            }
            else {
                var fcs = new WeatherForecast();
                fcs.valid = false;
                return fcs;
            }
        }
    }
    OhsWeatherData.WeatherDataForecast = WeatherDataForecast;
    class WeatherForecast {
        constructor() {
            this.valid = false; //content of the forecast is valid
            this.tempIn = 0.0;
            this.tempOut = 0.0;
            this.timeString = "";
            this.dateString = "";
            this.frostOutside = false;
            this.frostOutsideString = "false";
            this.cloudPerc = 0.0;
            this.weatherSymbol = 0;
            this.windSpeed = 0;
            this.img = null;
            this.images = new Array();
            this.img = new Image();
            this.img.src = "/infores/servlets/kitchen/sunny.png";
            this.images.push(this.img);
            this.img = new Image();
            this.img.src = "/infores/servlets/kitchen/partcloudy.png";
            this.images.push(this.img);
            this.img = new Image();
            this.img.src = "/infores/servlets/kitchen/cloudy.png";
            this.images.push(this.img);
            this.img = new Image();
            this.img.src = "/infores/servlets/kitchen/cloudRain.png";
            this.images.push(this.img);
            this.img = new Image();
            this.img.src = "/infores/servlets/kitchen/cloudStorm.png";
            this.images.push(this.img);
            this.img = new Image();
            this.img.src = "/infores/servlets/kitchen/cloudSnow.png";
            this.images.push(this.img);
        }
        getImage() {
            var index = this.weatherSymbol - 1;
            if (index < 0 || index > 6)
                index = 0;
            this.img = this.images[index];
            return this.img;
        }
        setWeather(data) {
            this.tempOut = parseFloat(data['temp']);
            this.weatherSymbol = JSON.parse(data['weatherSymbol']);
            this.windSpeed = parseFloat(data['windSpeed']);
            this.valid = true;
        }
    }
    OhsWeatherData.WeatherForecast = WeatherForecast;
})(OhsWeatherData || (OhsWeatherData = {}));
