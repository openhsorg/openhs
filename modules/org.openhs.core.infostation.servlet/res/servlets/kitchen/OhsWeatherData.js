var OhsWeatherData;
(function (OhsWeatherData) {
    var WeatherDataForecast = (function () {
        function WeatherDataForecast() {
            this.forecasts = new Array();
            this.setNumberForecasts(4);
        }
        WeatherDataForecast.prototype.setNumberForecasts = function (num) {
            if (num > this.forecasts.length) {
                for (var i = this.forecasts.length; i < num; i++) {
                    this.forecasts.push(new Weather());
                }
            }
            else if (num < this.forecasts.length) {
                this.forecasts.length = num;
            }
        };
        WeatherDataForecast.prototype.setWeatherItem = function (num, data) {
            /*
            if (num >= this.forecasts.length) {
                this.setNumberForecasts (num);
            }
            */
            this.setWeather(this.forecasts[num], data);
            //this.setWeather (new Weather(), data);
        };
        WeatherDataForecast.prototype.setWeather = function (weather, data) {
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
        };
        return WeatherDataForecast;
    }());
    OhsWeatherData.WeatherDataForecast = WeatherDataForecast;
    var Weather = (function () {
        function Weather() {
            this.valid = false;
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
        Weather.prototype.getImage = function () {
            var index = this.weatherSymbol - 1;
            if (index < 0 || index > 6)
                index = 0;
            this.img = this.images[index];
            return this.img;
        };
        return Weather;
    }());
    OhsWeatherData.Weather = Weather;
})(OhsWeatherData || (OhsWeatherData = {}));
