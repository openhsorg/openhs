// Copyright 2016 
//
//
// Home page: ***
/// <reference path="jquery.d.ts" />
/// <reference path='OhsCanvasGraphics.ts'/>
/// <reference path='OhsWeatherData.ts'/>
/// <reference path='OhsSiteData.ts'/>
var KitchenInfoStation;
(function (KitchenInfoStation) {
    var Rect = OhsCanvasGraphics.Rect;
    var Text = OhsCanvasGraphics.Text;
    var TempMark = OhsCanvasGraphics.TempMark;
    var SwitchMark = OhsCanvasGraphics.SwitchMark;
    var WeatherDataForecast = OhsWeatherData.WeatherDataForecast;
    var SiteData = OhsSiteData.SiteData;
    var forecastRect = {
        x: 0,
        y: 0,
        width: 150,
        heigth: 150
    };
    var stopwatchRect = {
        x: 0,
        y: 0,
        width: 0,
        heigth: 0
    };
    var Application;
    (function (Application) {
        Application[Application["None"] = 0] = "None";
        Application[Application["Watch"] = 1] = "Watch";
        Application[Application["Floor"] = 2] = "Floor";
        Application[Application["WeatherForecast"] = 3] = "WeatherForecast";
        Application[Application["Room"] = 4] = "Room";
    })(Application || (Application = {}));
    function getAjax(urlAdr, id) {
        var result = null;
        $.ajaxSetup({
            // Disable caching of AJAX responses
            cache: false
        });
        $.ajax({ async: false, url: urlAdr, data: { orderId: id }, dataType: "json", success: function (data) {
                result = data;
            } });
        return result;
    }
    function postAjax(urlAdr, id, dataPost) {
        var result = null;
        $.ajax({ async: false, type: "POST", url: urlAdr, data: { postId: id, dataId: dataPost }, dataType: "json", success: function (response) {
                result = response;
            } });
        return result;
    }
    function sleep(ms) {
        var unixtime_ms = new Date().getTime();
        while (new Date().getTime() < unixtime_ms + ms) { }
    }
    var WeatherData = (function () {
        function WeatherData() {
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
        WeatherData.prototype.getImage = function () {
            var index = this.weatherSymbol - 1;
            if (index < 0 || index > 6)
                index = 0;
            this.img = this.images[index];
            return this.img;
        };
        return WeatherData;
    }());
    var appMode = Application.None; //Mode of application
    var roomNum = 1; //number of selected room for Application.Room       
    var BasicScreen = (function () {
        function BasicScreen(canvas) {
            this.weatherData = new WeatherDataForecast(); // General weather
            this.siteData = new SiteData(); //general Site Data
            this.weather = new WeatherData(); //current weather today    
            this.forecastScreen = null; //forecast screen      
            this.stopWatch = null;
            this.floor = null;
            this.room = new Array();
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
            this.width = canvas.width;
            this.height = canvas.height;
            this.r = Math.min(this.width, this.height) * 7 / 16;
            this.arcCenterX = this.width / 2;
            this.arcCenterY = this.height / 2 + 50;
            this.arcRadius = 120;
            this.stopWatch = new StopWatch(canvas);
            this.stopWatch.arcCenterX = this.arcCenterX;
            this.stopWatch.arcCenterY = this.arcCenterY;
            this.stopWatch.arcRadius = this.arcRadius;
            stopwatchRect.x = (this.width / 2) + 180;
            stopwatchRect.y = (this.height / 2) + 20;
            stopwatchRect.width = 60;
            stopwatchRect.heigth = 60;
            this.tmpInText = new Text(this.ctx, new Rect((this.width / 2) - 120, (this.height / 2) - 10, 220, 60));
            this.tmpOutText = new Text(this.ctx, new Rect((this.width / 2), (this.height / 2) + 50, 150, 60));
            this.timeText = new Text(this.ctx, new Rect((this.width) - 150, 5, 150, 60));
            this.dateText = new Text(this.ctx, new Rect((this.width) / 2 + 70, 80, 230, 40));
            this.windText = new Text(this.ctx, new Rect(160, 80, 140, 40));
            this.forecastScreen = new WeatherForecastScreen(canvas, this.weatherData);
            this.floor = new Floor(canvas);
            this.room.push(new Room(canvas, "/infores/servlets/kitchen/room0.png")); //0: Outside
            this.room.push(new Room(canvas, "/infores/servlets/kitchen/room1.png")); //1: Room1...
            this.room.push(new Room(canvas, "/infores/servlets/kitchen/room2.png"));
            this.room.push(new Room(canvas, "/infores/servlets/kitchen/room3.png"));
            this.timerGetSiteDataEvent(5000);
            this.timerGetWeatherDataEvent(5000);
            this.timerGetDataEvent(5000);
            this.timerPaintEvent(5000);
            var self = this;
            this.canvas.addEventListener('click', function (event) { self.MouseClickHandler(event); }, false);
        }
        BasicScreen.prototype.timerGetSiteDataEvent = function (step) {
            var _this = this;
            this.getSiteData('kitchen');
            window.clearTimeout(this.timerSiteData);
            this.timerSiteData = window.setTimeout(function () { return _this.timerGetSiteDataEvent(step); }, step);
        };
        BasicScreen.prototype.timerGetWeatherDataEvent = function (step) {
            var _this = this;
            this.getWeatherData('kitchen');
            window.clearTimeout(this.timerWeatherData);
            this.timerWeatherData = window.setTimeout(function () { return _this.timerGetWeatherDataEvent(step); }, step);
        };
        BasicScreen.prototype.timerGetDataEvent = function (step) {
            var _this = this;
            this.getData('kitchen');
            window.clearTimeout(this.timerData);
            this.timerData = window.setTimeout(function () { return _this.timerGetDataEvent(step); }, step);
        };
        BasicScreen.prototype.timerPaintEvent = function (step) {
            var _this = this;
            this.paint();
            window.clearTimeout(this.timerPaint);
            this.timerPaint = window.setTimeout(function () { return _this.timerPaintEvent(step); }, step);
        };
        BasicScreen.prototype.MouseClickHandler = function (event) {
            //window.alert("handler clicked !!" + event.clientX + " : " + event.clientY );
            var mousePos = getMousePos(this.canvas, event);
            if (appMode == Application.None) {
                if (isInside(mousePos, stopwatchRect)) {
                    appMode = Application.Watch;
                    this.stopWatch.start();
                    this.timerPaintEvent(40);
                }
                else if (this.tmpInText.isClicked(mousePos.x, mousePos.y)) {
                    appMode = Application.Floor;
                    this.timerPaintEvent(100);
                    this.timerGetDataEvent(100);
                }
                else if (isInside(mousePos, forecastRect)) {
                    appMode = Application.WeatherForecast;
                }
            }
            else if (appMode == Application.Watch) {
                if (this.stopWatch.getStatus()) {
                    if (this.stopWatch.stopwatchRect.isClicked(mousePos.x, mousePos.y)) {
                        this.stopWatch.stop();
                        this.timerPaintEvent(3000);
                    }
                }
                else {
                    appMode = Application.None;
                }
            }
            else if (appMode == Application.Floor) {
                var room = this.floor.clickedTempMark(mousePos.x, mousePos.y);
                var light = this.floor.clickedSwitchMark(mousePos.x, mousePos.y);
                if (room != -1) {
                    appMode = Application.Room;
                    roomNum = room;
                }
                else if (light != -1) {
                    //window.alert("switch clicked !!");            
                    postAjax('kitchen', "switchClicked", "switch1");
                    this.getData('kitchen');
                    this.paint();
                }
                else {
                    appMode = Application.None;
                    this.timerPaintEvent(5000);
                    this.timerGetDataEvent(5000);
                }
            }
            else if (appMode == Application.Room) {
                appMode = Application.Floor;
            }
            else if (appMode == Application.WeatherForecast) {
                appMode = Application.None;
            }
            this.paint();
        };
        BasicScreen.prototype.getSiteData = function (url) {
            var data = getAjax(url, "SiteData");
            if (data != null) {
                this.siteData.setSiteData(data);
            }
        };
        BasicScreen.prototype.getWeatherData = function (url) {
            var data = null;
            for (var i = 0; i < 4; i++) {
                var id = "WeatherForecast_" + i;
                data = getAjax(url, id);
                if (data != null) {
                    this.weatherData.setWeatherItem(i, data);
                }
            }
        };
        BasicScreen.prototype.getData = function (url) {
            var data = getAjax(url, 'InfoData');
            if (data != null) {
                timeString = data['time'];
                dateString = data['date'];
                this.weather.tempIn = parseFloat(data['tempIn']);
                this.weather.tempOut = parseFloat(data['tempOut']);
                this.weather.frostOutside = JSON.parse(data['frostOutside']);
                this.weather.weatherSymbol = JSON.parse(data['weatherSymbol']);
                this.weather.windSpeed = parseFloat(data['windSpeed']);
            }
            //Other objects...        
            this.floor.getData(url);
            /*
            //Weather data....
            data = null;
            
            for (var i = 0; i < 4; i++) {
                var id: string = "WeatherForecast_" + i;
                
                data = getAjax(url, id);
                if (data != null) {
                    this.weatherData.setWeatherItem(i, data);
                }
            }
            */
        };
        BasicScreen.prototype.postData = function (url) {
            var data = {
                switch1: "clicked",
                bar: "barValue",
                baz: "bazValue"
            };
            //var switch1 = "clicked";
            var dataSend = JSON.stringify(data);
            var send = postAjax(url, "mmm", dataSend);
        };
        BasicScreen.prototype.paintStaticImage = function () {
            var ctx = this.ctx;
            ctx.save();
            ctx.fillStyle = whiteColor;
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.restore();
        };
        BasicScreen.prototype.paint = function () {
            this.paintStaticImage();
            if (appMode == Application.None || appMode == Application.Watch) {
                this.paintBasic();
            }
            else if (appMode == Application.Floor) {
                this.floor.paint(this.weather);
            }
            else if (appMode == Application.Room) {
                this.room[roomNum].paint(this.weather);
            }
            else if (appMode == Application.WeatherForecast) {
                this.forecastScreen.paint();
            }
        };
        BasicScreen.prototype.paintBasic = function () {
            var ctx = this.ctx;
            //Draw image...
            var img = this.weather.getImage();
            ctx.save();
            ctx.drawImage(img, forecastRect.x, forecastRect.y, forecastRect.width, forecastRect.heigth);
            ctx.restore();
            //Wind
            if (imgWindLoaded) {
                ctx.save();
                ctx.drawImage(imgWind, 140, 70, 50, 50);
                ctx.restore();
            }
            //Hum
            if (imgHumLoaded) {
                ctx.save();
                ctx.drawImage(imgHum, (this.width / 2) + 10, (this.height / 2) + 70, 60, 60);
                ctx.restore();
            }
            //Voice message
            if (imgVoiceMessageLoaded) {
                ctx.save();
                ctx.drawImage(imgVoiceMessage, (this.width / 2) - 220, (this.height / 2) + 20, 60, 60);
                ctx.restore();
            }
            //Stopwatch
            if (imgStopwatchLoaded) {
                ctx.save();
                ctx.drawImage(imgStopwatch, (this.width / 2) + 180, (this.height / 2) + 20, 60, 60);
                ctx.restore();
            }
            //Wind outside
            /*
           ctx.save();
           ctx.font = fontSizeWind + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
           ctx.textAlign = "right";
           ctx.textBaseline = "middle";
           ctx.fillStyle = textColor;
           ctx.fillText(this.weather.windSpeed + " m/s", 320, 100);
           ctx.restore();
            */
            this.windText.fontSize = fontSizeWind;
            this.windText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.windText.fontColor = textColor;
            this.windText.textAlign = "right";
            this.windText.textBaseline = "middle";
            this.windText.paint(this.weather.windSpeed + " m/s");
            //Time          
            this.timeText.fontSize = fontSizeTime;
            this.timeText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.timeText.fontColor = textColor;
            this.timeText.textAlign = "right";
            this.timeText.textBaseline = "middle";
            this.timeText.paint(timeString);
            //Date
            this.dateText.fontSize = fontSizeDate;
            this.dateText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.dateText.fontColor = textColor;
            this.dateText.textAlign = "right";
            this.dateText.textBaseline = "middle";
            this.dateText.paint(dateString);
            //Inside temperature
            this.tmpInText.rect.y = 220;
            this.tmpInText.fontSize = fontSizeTempIn;
            this.tmpInText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.tmpInText.fontColor = textColor;
            this.tmpInText.textAlign = "right";
            this.tmpInText.textBaseline = "middle";
            this.tmpInText.paint(this.weather.tempIn.toPrecision(2) + " \u00B0C");
            //Outside temperature    
            this.tmpOutText.equals(this.tmpInText);
            this.tmpOutText.rect.x = 80;
            this.tmpOutText.rect.y = 5;
            this.tmpOutText.textAlign = "right";
            this.tmpOutText.paint(this.weather.tempOut.toPrecision(2) + " \u00B0C");
            //Humidity
            ctx.save();
            ctx.font = fontSizeHum + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            ctx.fillStyle = textColor;
            ctx.fillText("44", (this.width / 2), (this.height / 2) + 105);
            ctx.restore();
            //Draw arc...
            ctx.save();
            ctx.beginPath();
            ctx.arc(this.arcCenterX, this.arcCenterY, this.arcRadius, 0, 2 * Math.PI, false);
            ctx.lineWidth = 1;
            ctx.strokeStyle = circleColor;
            ctx.stroke();
            ctx.restore();
            if (appMode == Application.Watch) {
                this.stopWatch.paint();
            }
        };
        BasicScreen.prototype.roundRect = function (x, y, width, height, radius) {
            var ctx = this.ctx;
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
        };
        return BasicScreen;
    }());
    KitchenInfoStation.BasicScreen = BasicScreen; // end class Infoscreen
    var WeatherForecastScreen = (function () {
        function WeatherForecastScreen(canvas, weatherData) {
            this.forecastPanels = new Array();
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
            this.width = canvas.width;
            this.height = canvas.height;
            this.weatherData = weatherData;
            this.forecastPanels.push(new WeatherForecastPanel(this.ctx, this.weatherData, 0));
            this.forecastPanels.push(new WeatherForecastPanel(this.ctx, this.weatherData, 1));
            this.forecastPanels.push(new WeatherForecastPanel(this.ctx, this.weatherData, 2));
            this.forecastPanels.push(new WeatherForecastPanel(this.ctx, this.weatherData, 3));
        }
        WeatherForecastScreen.prototype.paint = function () {
            var ctx = this.ctx;
            var segment = this.width / 4;
            var seg = segment - (2 * this.forecastPanels[1].lineWidth);
            //var lineW = this.forecastPanels[1].lineWidth;
            this.forecastPanels[0].setSize(0, 0, seg, this.height);
            this.forecastPanels[1].setSize(segment, 0, seg, this.height);
            this.forecastPanels[2].setSize((2 * segment), 0, seg, this.height);
            this.forecastPanels[3].setSize((3 * segment), 0, seg, this.height);
            this.forecastPanels[0].paint(ctx);
            this.forecastPanels[1].paint(ctx);
            this.forecastPanels[2].paint(ctx);
            this.forecastPanels[3].paint(ctx);
        };
        return WeatherForecastScreen;
    }());
    //------------------------------------------------------------------------------
    var clockLabel = "source-code.biz";
    var transparentColor = "rgba(0,0,0,0)";
    var whiteColor = "#FFFFFF";
    var blackColor = "#000000";
    var borderColor = "#C0C0C0";
    var secPtrColor = "#CC0000";
    var textColor = "#000000";
    var circleColor = "#c0c0c0";
    var fontSizeTempIn = 54;
    var fontSizeTempOut = 50;
    var fontSizeWind = 24;
    var fontSizeHum = 27;
    var fontSizeTime = fontSizeTempOut;
    var fontSizeDate = fontSizeWind;
    //Meteorological data    
    var timeString = "";
    var dateString = "";
    //Wind image    
    var imgWind = new Image();
    imgWind.src = '/infores/servlets/kitchen/wind.png';
    var imgWindLoaded = false;
    imgWind.onload = function () {
        imgWindLoaded = true;
    };
    //Hum image    
    var imgHum = new Image();
    imgHum.src = '/infores/servlets/kitchen/drop.png';
    var imgHumLoaded = false;
    imgHum.onload = function () {
        imgHumLoaded = true;
    };
    //Voice message Image    
    var imgVoiceMessage = new Image();
    imgVoiceMessage.src = '/infores/servlets/kitchen/voicemessage.png';
    var imgVoiceMessageLoaded = false;
    imgVoiceMessage.onload = function () {
        imgVoiceMessageLoaded = true;
    };
    //Stop watch image    
    var imgStopwatch = new Image();
    imgStopwatch.src = '/infores/servlets/kitchen/stopwatch.png';
    var imgStopwatchLoaded = false;
    imgStopwatch.onload = function () {
        imgStopwatchLoaded = true;
    };
    //Fingerprint image    
    var imgFingerprint = new Image();
    imgFingerprint.src = '/infores/servlets/kitchen/fingerprint.png';
    var imgFingerprintLoaded = false;
    imgFingerprint.onload = function () {
        imgFingerprintLoaded = true;
    };
    var StopWatch = (function () {
        function StopWatch(canvas) {
            this.stopwatchRect = null;
            this.sec = 0;
            this.min = 0;
            this.hrs = 0;
            this.dotCounter = 0;
            this.angle = 0;
            this.ctx = canvas.getContext("2d");
            this.width = canvas.width;
            this.height = canvas.height;
            this.stopwatchRect = new Rect((this.width / 2) - (300 / 2) + 0, (this.height / 2) - (150 / 2) + 70, 300, 120);
            this.sec.toExponential(2);
            this.min.toFixed(2);
            this.hrs.toFixed(2);
            this.angle = 90 * (Math.PI / 180);
        }
        StopWatch.prototype.zeroPad = function (num, places) {
            var zero = places - num.toString().length + 1;
            return Array(+(zero > 0 && zero)).join("0") + num;
        };
        StopWatch.prototype.paint = function () {
            var ctx = this.ctx;
            if (this.getStatus()) {
                this.paintEffect();
            }
            ctx.save();
            ctx.beginPath();
            this.roundRect(this.stopwatchRect.x, this.stopwatchRect.y, this.stopwatchRect.w, this.stopwatchRect.h, 40);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.lineWidth = 1;
            if (this.getStatus()) {
                ctx.strokeStyle = "green";
            }
            else {
                ctx.strokeStyle = "grey";
            }
            ctx.stroke();
            ctx.font = 32 + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            if (this.getStatus()) {
                ctx.fillStyle = "green";
                ctx.fillText("running", this.stopwatchRect.x + 55, this.stopwatchRect.y + 30);
            }
            else {
                ctx.fillStyle = "grey";
                ctx.fillText("stopped", this.stopwatchRect.x + 55, this.stopwatchRect.y + 30);
            }
            var dots = "...........................";
            var str = dots.substring(0, this.dotCounter);
            ctx.fillText(str, this.stopwatchRect.x + 55, this.stopwatchRect.y + 43);
            var text = this.zeroPad(this.hrs, 2) + ":" + this.zeroPad(this.min, 2) + ":" + this.zeroPad(this.sec, 2);
            ctx.font = 42 + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            ctx.fillText(text, this.stopwatchRect.x + 50, this.stopwatchRect.y + 80);
            if (imgFingerprintLoaded) {
                ctx.save();
                ctx.drawImage(imgFingerprint, this.stopwatchRect.x + this.stopwatchRect.w - 60, this.stopwatchRect.y + 10, 50, 50);
                ctx.restore();
            }
        };
        StopWatch.prototype.paintEffect = function () {
            var ctx = this.ctx;
            var dx;
            var dy;
            var dAngle = 0.5 * (Math.PI / 180);
            this.angle = this.angle + dAngle;
            if (this.angle > 2 * Math.PI)
                this.angle = 0;
            dx = this.arcRadius * Math.cos(this.angle);
            dy = this.arcRadius * Math.sin(this.angle);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(this.arcCenterX, this.arcCenterY);
            ctx.lineTo(this.arcCenterX + dx, this.arcCenterY + dy);
            ctx.moveTo(this.arcCenterX, this.arcCenterY);
            ctx.lineTo(this.arcCenterX - dx, this.arcCenterY - dy);
            ctx.strokeStyle = 'grey';
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
        };
        StopWatch.prototype.roundRect = function (x, y, width, height, radius) {
            var ctx = this.ctx;
            ctx.beginPath();
            ctx.moveTo(x + radius, y);
            ctx.lineTo(x + width - radius, y);
            ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
            ctx.lineTo(x + width, y + height - radius);
            ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
            ctx.lineTo(x + radius, y + height);
            ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
            ctx.lineTo(x, y + radius);
            ctx.quadraticCurveTo(x, y, x + radius, y);
            ctx.closePath();
        };
        StopWatch.prototype.stop = function () {
            clearTimeout(this.timer);
            this.timer = 0;
            this.dotCounter = 0;
        };
        StopWatch.prototype.start = function () {
            this.sec = 0;
            this.min = 0;
            this.hrs = 0;
            this.stop();
            this.add();
        };
        StopWatch.prototype.add = function () {
            var _this = this;
            this.sec++;
            if (this.sec >= 60) {
                this.sec = 0;
                this.min++;
                if (this.min >= 60) {
                    this.min = 0;
                    this.hrs++;
                }
            }
            this.dotCounter++;
            if (this.dotCounter > 17)
                this.dotCounter = 1;
            this.timer = setTimeout(function () { return _this.add(); }, 1000);
        };
        StopWatch.prototype.getStatus = function () {
            if (this.timer != 0)
                return true;
            else
                return false;
        };
        return StopWatch;
    }());
    var WeatherForecastPanel = (function () {
        function WeatherForecastPanel(ctx, weatherData, numForecast) {
            this.x = 0.0;
            this.y = 0.0;
            this.width = 0.0;
            this.height = 0.0;
            this.lineWidth = 2.0;
            this.weatherData = null; //weather data source        
            this.numForecast = 0;
            this.imgWind = null;
            this.txtValid = new Text(ctx, new Rect(10, 10, 60, 10));
            this.txtValid.textAlign = "left";
            this.txtValid.textBaseline = "top";
            this.txtValid.fontSize = 20;
            this.txtWind = new Text(ctx, new Rect(0, 0, 0, 0));
            this.txt = new Text(ctx, new Rect(0, 0, 0, 0));
            this.txt.textAlign = "left";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            imgWind = new Image();
            imgWind.src = "/infores/servlets/kitchen/wind.png";
            this.weatherData = weatherData;
            this.numForecast = numForecast;
        }
        WeatherForecastPanel.prototype.setSize = function (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.txt.rect.x = x;
            this.txt.rect.y = y;
            this.txt.rect.w = width;
            this.txt.rect.h = height;
        };
        /*
        setForecast(fcs: WeatherData) {
            this.forecast = fcs;
        }
        */
        WeatherForecastPanel.prototype.paint = function (ctx) {
            //Draw rectangle...               
            ctx.save();
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.fillStyle = 'white';
            ctx.fill();
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = 'black';
            ctx.stroke();
            ctx.restore();
            var weatherForecast = this.weatherData.getForecast(this.numForecast);
            if (!weatherForecast.valid) {
                this.txtValid.setSize(new Rect(this.x + 5, this.y + 1, 20, 10));
                this.txtValid.paint("Not valid...");
            }
            else {
                //Draw forecast image
                var img = weatherForecast.getImage();
                ctx.save();
                ctx.drawImage(img, this.x + this.lineWidth, this.y + this.lineWidth, this.width - (2 * this.lineWidth), this.width - (2 * this.lineWidth));
                ctx.restore();
                //Draw temperature...
                //this.txt.rect.x = this.x + ((this.width - (2 * this.lineWidth)) / 2);
                this.txt.rect.x = this.x + (this.width - 110);
                this.txt.rect.y = this.height * 0.8;
                this.txt.rect.w = 100;
                this.txt.rect.h = 30;
                this.txt.textAlign = "right";
                this.txt.paint(weatherForecast.tempOut + " \u00B0C");
                //wind image
                ctx.save();
                ctx.drawImage(imgWind, this.x + (this.width * 0.1), this.width * 1.5, 40, 40);
                ctx.restore();
                //wind text
                this.txtWind.rect.x = this.x + (this.width - 70);
                this.txtWind.rect.y = this.width * 1.6 - 10;
                this.txtWind.rect.w = 60;
                this.txtWind.rect.h = 30;
                this.txtWind.textAlign = "right";
                this.txtWind.fontSize = 15;
                this.txtWind.textBaseline = "middle";
                this.txtWind.paint(weatherForecast.windSpeed + " \u00B0C");
            }
        };
        return WeatherForecastPanel;
    }());
    var Floor = (function () {
        function Floor(canvas) {
            this.TempMarks = new Array();
            this.SwitchMarks = new Array();
            this.imgFloor = null;
            this.imgFloorLoaded = false;
            this.numRooms = 0;
            this.ctx = canvas.getContext("2d");
            this.width = canvas.width;
            this.height = canvas.height;
            this.imgFloor = new Image();
            this.imgFloor.src = "/infores/servlets/kitchen/floor1.jpg";
            // this.imgFloor.onload = function(){
            //    this.imgFloorLoaded = true;
            //   }          
            this.TempMarks.push(new TempMark(this.ctx, new Rect(0, 0, 0, 0), "/infores/servlets/kitchen/tempSymbol.png"));
            this.TempMarks.push(new TempMark(this.ctx, new Rect(0, 0, 0, 0), "/infores/servlets/kitchen/tempSymbol.png"));
            this.SwitchMarks.push(new SwitchMark(this.ctx, new Rect(0, 0, 0, 0), "/infores/servlets/kitchen/BulbSymbol.png"));
            this.txtNumRooms = new Text(this.ctx, new Rect(0, 0, 250, 100));
            this.txtNumRooms.textAlign = "left";
            this.txtNumRooms.textBaseline = "middle";
            this.txtNumRooms.fontSize = 40;
        }
        Floor.prototype.paint = function (weatherToday) {
            var ctx = this.ctx;
            //Draw image...
            //   if (this.imgFloorLoaded) {     
            ctx.save();
            ctx.drawImage(this.imgFloor, 0, 0, this.width, this.height);
            ctx.restore();
            //   }      
            //Outside mark
            this.TempMarks[0].setSize(new Rect(250, 320, 80, 80));
            this.TempMarks[0].paint(weatherToday.tempOut + " \u00B0C");
            //Inside mark
            this.TempMarks[1].setSize(new Rect(300, 200, 80, 80));
            this.TempMarks[1].paint(weatherToday.tempIn + " \u00B0C");
            //Inner switch
            this.SwitchMarks[0].setSize(new Rect(220, 150, 80, 80));
            this.SwitchMarks[0].paint();
            //Number rooms
            this.txtNumRooms.rect.x = this.width - 10;
            this.txtNumRooms.rect.y = this.height - 10;
            this.txtNumRooms.rect.w = this.width * 0.4;
            this.txtNumRooms.textAlign = "right";
            this.txtNumRooms.fontSize = 26;
            this.txtNumRooms.textBaseline = "bottom";
            this.txtNumRooms.paint("Number Rooms:" + this.numRooms);
        };
        Floor.prototype.clickedTempMark = function (clx, cly) {
            var cId = -1;
            var n = -1;
            for (var id in this.TempMarks) {
                n++;
                if (this.TempMarks[id].isClicked(clx, cly)) {
                    cId = n;
                }
            }
            return cId;
        };
        Floor.prototype.clickedSwitchMark = function (clx, cly) {
            var cId = -1;
            var n = -1;
            for (var id in this.SwitchMarks) {
                n++;
                if (this.SwitchMarks[id].isClicked(clx, cly)) {
                    cId = n;
                }
            }
            return cId;
        };
        Floor.prototype.getData = function (url) {
            var id = "floor1";
            //window.alert("floor clicked !!");
            var data = getAjax(url, id);
            if (data != null) {
                this.numRooms = parseFloat(data['nRooms']);
            }
            var id2 = "switch1";
            var data2 = getAjax(url, id2);
            if (data2 != null) {
                this.SwitchMarks[0].state = parseFloat(data2['switchState']);
            }
        };
        return Floor;
    }());
    var Room = (function () {
        function Room(canvas, imgSrc) {
            this.TempMarks = new Array();
            this.imgRoom = null;
            this.imgRoomLoaded = false;
            this.ctx = canvas.getContext("2d");
            this.width = canvas.width;
            this.height = canvas.height;
            this.imgRoom = new Image();
            this.imgRoom.src = imgSrc; //"/infores/servlets/kitchen/room1.png";  
            this.imgRoom.onload = function () {
                this.imgRoomLoaded = true;
            };
            this.TempMarks.push(new TempMark(this.ctx, new Rect(0, 0, 0, 0), "/infores/servlets/kitchen/tempSymbol.png"));
            this.TempMarks.push(new TempMark(this.ctx, new Rect(0, 0, 0, 0), "/infores/servlets/kitchen/tempSymbol.png"));
        }
        Room.prototype.paint = function (weatherToday) {
            var ctx = this.ctx;
            //Draw image...
            //  if (this.imgRoomLoaded) {     
            ctx.save();
            ctx.drawImage(this.imgRoom, 0, 0, this.width, this.height);
            ctx.restore();
            //   }      
            //Outside mark
            this.TempMarks[0].setSize(new Rect(250, 350, 80, 80));
            this.TempMarks[0].paint(weatherToday.tempOut + " \u00B0C");
            //Inside mark
            this.TempMarks[1].setSize(new Rect(280, 200, 80, 80));
            this.TempMarks[1].paint(weatherToday.tempIn + " \u00B0C");
        };
        Room.prototype.clickedTempMark = function (clx, cly) {
            var cId = -1;
            var n = 0;
            for (var id in this.TempMarks) {
                n++;
                if (this.TempMarks[id].isClicked(clx, cly)) {
                    cId = n;
                }
            }
            return cId;
        };
        return Room;
    }());
    //Function to get the mouse position
    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
    //Function to check whether a point is inside a rectangle
    function isInside(pos, rect) {
        return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.heigth && pos.y > rect.y;
    }
})(KitchenInfoStation || (KitchenInfoStation = {})); // end module KitchenInfoStation
