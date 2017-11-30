var OhsWeatherData;
(function (OhsWeatherData) {
    class WeatherDataForecast {
        constructor() {
            this.forecasts = new Array();
            this.currentForecast = new WeatherForecast();
            this.timerGetServerDataEvent(10000);
        }
        timerGetServerDataEvent(step) {
            this.getServerData();
            window.clearTimeout(this.timerGetData);
            this.timerGetData = window.setTimeout(() => this.timerGetServerDataEvent(step), step);
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
        getCurrent() {
            return this.currentForecast;
        }
        getServerData() {
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
        }
        setWeather(data) {
            this.tempOut = parseFloat(data['temp']);
            this.weatherSymbol = JSON.parse(data['weatherSymbol']);
            this.windSpeed = parseFloat(data['windSpeed']);
            this.valid = true;
        }
        setWeather2(data) {
            this.tempIn = parseFloat(data['tempIn']);
            this.tempOut = parseFloat(data['tempOut']);
            this.frostOutside = JSON.parse(data['frostOutside']);
            this.weatherSymbol = JSON.parse(data['weatherSymbol']);
            this.windSpeed = parseFloat(data['windSpeed']);
            this.valid = true;
        }
    }
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
