var OhsWeatherData;
(function (OhsWeatherData) {
    var WeatherDataForecast = (function () {
        function WeatherDataForecast() {
            this.forecasts = new Array();
            this.currentForecast = new WeatherForecast();
            this.timerGetServerDataEvent(10000);
        }
        WeatherDataForecast.prototype.timerGetServerDataEvent = function (step) {
            var _this = this;
            this.getServerData();
            window.clearTimeout(this.timerGetData);
            this.timerGetData = window.setTimeout(function () { return _this.timerGetServerDataEvent(step); }, step);
        };
        WeatherDataForecast.prototype.setNumberForecasts = function (num) {
            if (num > this.forecasts.length) {
                for (var i = this.forecasts.length; i < num; i++) {
                    this.forecasts.push(new WeatherForecast());
                }
            }
            else if (num < this.forecasts.length) {
                this.forecasts.length = num;
            }
        };
        WeatherDataForecast.prototype.setWeatherItem = function (num, data) {
            if (num + 1 > this.forecasts.length) {
                this.setNumberForecasts(num + 1);
            }
            this.forecasts[num].setWeather(data);
        };
        WeatherDataForecast.prototype.getForecast = function (num) {
            if (num + 1 <= this.forecasts.length) {
                return this.forecasts[num];
            }
            else {
                var fcs = new WeatherForecast();
                fcs.valid = false;
                return fcs;
            }
        };
        WeatherDataForecast.prototype.getCurrent = function () {
            return this.currentForecast;
        };
        WeatherDataForecast.prototype.getServerData = function () {
            for (var i = 0; i < 4; i++) {
                var req = {
                    orderId: "WeatherForecast_" + i
                };
                var data = getAjax("kitchen", req);
                if (data != null) {
                    this.setWeatherItem(i, data);
                }
            }
            // Get current forecast
            var req = {
                orderId: "WeatherCurrent"
            };
            var data = getAjax("kitchen", req);
            if (data != null) {
                this.currentForecast.setWeather2(data);
            }
        };
        return WeatherDataForecast;
    }());
    OhsWeatherData.WeatherDataForecast = WeatherDataForecast;
    var WeatherForecast = (function () {
        function WeatherForecast() {
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
        }
        WeatherForecast.prototype.setWeather = function (data) {
            this.tempOut = parseFloat(data['temp']);
            this.weatherSymbol = JSON.parse(data['weatherSymbol']);
            this.windSpeed = parseFloat(data['windSpeed']);
            this.valid = true;
        };
        WeatherForecast.prototype.setWeather2 = function (data) {
            this.tempIn = parseFloat(data['tempIn']);
            this.tempOut = parseFloat(data['tempOut']);
            this.frostOutside = JSON.parse(data['frostOutside']);
            this.weatherSymbol = JSON.parse(data['weatherSymbol']);
            this.windSpeed = parseFloat(data['windSpeed']);
            this.valid = true;
        };
        return WeatherForecast;
    }());
    OhsWeatherData.WeatherForecast = WeatherForecast;
    function getAjax(urlAdr, dataIn) {
        var result = null;
        $.ajaxSetup({
            // Disable caching of AJAX responses
            cache: false
        });
        $.ajax({ async: false, url: urlAdr, data: dataIn, dataType: "json", success: function (data) {
                result = data;
            } });
        return result;
    }
    function postAjax(urlAdr, json) {
        var result = null;
        $.ajax({ async: false, type: "POST", url: urlAdr, data: json, dataType: "json", success: function (response) {
                result = response;
            } });
        return result;
    }
})(OhsWeatherData || (OhsWeatherData = {}));
