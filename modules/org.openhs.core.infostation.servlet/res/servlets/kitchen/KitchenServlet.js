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
    var DoorMark = OhsCanvasGraphics.DoorMark;
    var Icon = OhsCanvasGraphics.Icon;
    var Iconset = OhsCanvasGraphics.Iconset;
    var WeatherDataForecast = OhsWeatherData.WeatherDataForecast;
    var SiteData = OhsSiteData.SiteData;
    var Application;
    (function (Application) {
        Application[Application["None"] = 0] = "None";
        Application[Application["Watch"] = 1] = "Watch";
        Application[Application["Floor"] = 2] = "Floor";
        Application[Application["WeatherForecast"] = 3] = "WeatherForecast";
        Application[Application["Room"] = 4] = "Room";
    })(Application || (Application = {}));
    var imagePaths = [
        "/infores/servlets/kitchen/sunny.png",
        "/infores/servlets/kitchen/partcloudy.png",
        "/infores/servlets/kitchen/cloudy.png",
        "/infores/servlets/kitchen/cloudRain.png",
        "/infores/servlets/kitchen/cloudStorm.png",
        "/infores/servlets/kitchen/cloudSnow.png"
    ];
    var appMode = Application.None; //Mode of application
    var roomNum = 1; //number of selected room for Application.Room       
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
    //Fingerprint image    
    var imgFingerprint = new Image();
    imgFingerprint.src = '/infores/servlets/kitchen/fingerprint.png';
    var imgFingerprintLoaded = false;
    imgFingerprint.onload = function () {
        imgFingerprintLoaded = true;
    };
    var ApplicationKitchen = (function () {
        function ApplicationKitchen(canvas) {
        }
        return ApplicationKitchen;
    }());
    KitchenInfoStation.ApplicationKitchen = ApplicationKitchen;
    var BasicScreen = (function () {
        function BasicScreen(canvas) {
            // Data
            this.weatherData = new WeatherDataForecast(); // General weather
            this.siteData = null; //general Site Data    
            // Screens
            this.forecastScreen = null; //forecast screen      
            this.stopWatch = null;
            this.room = new Array();
            this.floors = new Array();
            this.siteData = new SiteData();
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
            this.width = canvas.width;
            this.height = canvas.height;
            this.iconStopWatch = new Icon(this.ctx, new Rect((this.width / 2) + 180, (this.height / 2) + 20, 60, 60), '/infores/servlets/kitchen/stopwatch.png');
            this.iconVoiceMessage = new Icon(this.ctx, new Rect((this.width / 2) - 220, (this.height / 2) + 20, 60, 60), '/infores/servlets/kitchen/voicemessage.png');
            this.iconWeather = new Iconset(this.ctx, new Rect(0, 0, 150, 150), imagePaths);
            this.iconWind = new Icon(this.ctx, new Rect(140, 70, 50, 50), '/infores/servlets/kitchen/wind.png');
            this.iconHum = new Icon(this.ctx, new Rect((this.width / 2) + 10, (this.height / 2) + 70, 60, 60), '/infores/servlets/kitchen/drop.png');
            this.stopWatch = new StopWatch(canvas);
            this.stopWatch.arcCenterX = this.width / 2;
            this.stopWatch.arcCenterY = this.height / 2 + 50;
            this.stopWatch.arcRadius = 120;
            this.tmpInText = new Text(this.ctx, new Rect((this.width / 2) - 120, (this.height / 2) - 10, 220, 60));
            this.tmpOutText = new Text(this.ctx, new Rect((this.width / 2), (this.height / 2) + 50, 150, 60));
            this.timeText = new Text(this.ctx, new Rect((this.width) - 150, 5, 150, 60));
            this.dateText = new Text(this.ctx, new Rect((this.width) / 2 + 70, 80, 230, 40));
            this.windText = new Text(this.ctx, new Rect(160, 80, 140, 40));
            this.forecastScreen = new WeatherForecastScreen(canvas, this.weatherData);
            this.room.push(new RoomScreen(canvas, "/infores/servlets/kitchen/room0.png")); //0: Outside
            this.room.push(new RoomScreen(canvas, "/infores/servlets/kitchen/room1.png")); //1: Room1...
            this.room.push(new RoomScreen(canvas, "/infores/servlets/kitchen/room2.png"));
            this.room.push(new RoomScreen(canvas, "/infores/servlets/kitchen/room3.png"));
            this.timerLoadGraphicsEvent(2000);
            this.timerGetDataEvent(5000);
            this.timerPaintEvent(5000);
            var self = this;
            this.canvas.addEventListener('click', function (event) { self.MouseClickHandler(event); }, false);
        }
        BasicScreen.prototype.timerLoadGraphicsEvent = function (step) {
            var _this = this;
            this.loadGraphics();
            window.clearTimeout(this.timerLoadGraphics);
            this.timerLoadGraphics = window.setTimeout(function () { return _this.timerLoadGraphicsEvent(step); }, step);
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
                // if (isInside(mousePos, stopwatchRect)) {            
                if (this.iconStopWatch.isClicked(mousePos.x, mousePos.y)) {
                    appMode = Application.Watch;
                    this.stopWatch.start();
                    this.timerPaintEvent(40);
                }
                else if (this.tmpInText.isClicked(mousePos.x, mousePos.y)) {
                    appMode = Application.Floor;
                    this.timerPaintEvent(50);
                }
                else if (this.iconWeather.isClicked(mousePos.x, mousePos.y)) {
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
            else if (appMode == Application.Floor && this.floors.length > 0) {
                this.floors[0].MouseClickHandler(mousePos.x, mousePos.y);
            }
            else if (appMode == Application.Room) {
                appMode = Application.Floor;
            }
            else if (appMode == Application.WeatherForecast) {
                appMode = Application.None;
            }
            this.paint();
        };
        BasicScreen.prototype.getData = function (url) {
            var data = getAjax(url, 'InfoData');
            if (data != null) {
                timeString = data['time'];
                dateString = data['date'];
            }
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
        BasicScreen.prototype.loadGraphics = function () {
            this.setNumberFloors(this.siteData.getNumberFloors());
            for (var id in this.floors) {
                this.floors[id].loadGraphics();
            }
        };
        BasicScreen.prototype.setNumberFloors = function (num) {
            if (num > this.floors.length) {
                for (var i = this.floors.length; i < num; i++) {
                    this.floors.push(new FloorScreen(this.canvas, this.siteData));
                }
            }
            else if (num < this.floors.length) {
                this.floors.length = num;
            }
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
                if (this.floors.length > 0) {
                    this.floors[0].paint();
                }
            }
            else if (appMode == Application.Room) {
                this.room[roomNum].paint(this.weatherData.getCurrent());
            }
            else if (appMode == Application.WeatherForecast) {
                this.forecastScreen.paint();
            }
        };
        BasicScreen.prototype.paintBasic = function () {
            var ctx = this.ctx;
            //Weather outside...
            this.iconWeather.paint(this.weatherData.getCurrent().weatherSymbol);
            //Wind
            this.iconWind.paint();
            //Hum
            this.iconHum.paint();
            //Voice message
            this.iconVoiceMessage.paint();
            //Stopwatch
            this.iconStopWatch.paint();
            //Wind outside
            this.windText.fontSize = fontSizeWind;
            this.windText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.windText.fontColor = textColor;
            this.windText.textAlign = "right";
            this.windText.textBaseline = "middle";
            this.windText.paint(this.weatherData.getCurrent().windSpeed + " m/s");
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
            this.tmpInText.paint(this.weatherData.getCurrent().tempIn.toPrecision(2) + " \u00B0C");
            //Outside temperature    
            this.tmpOutText.equals(this.tmpInText);
            this.tmpOutText.rect.x = 80;
            this.tmpOutText.rect.y = 5;
            this.tmpOutText.textAlign = "right";
            this.tmpOutText.paint(this.weatherData.getCurrent().tempOut.toPrecision(2) + " \u00B0C");
            //Humidity
            ctx.save();
            ctx.font = fontSizeHum + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            ctx.fillStyle = textColor;
            ctx.fillText("44", (this.width / 2), (this.height / 2) + 105);
            ctx.restore();
            //Draw arc...
            var r = Math.min(this.width, this.height) * 7 / 16;
            var arcCenterX = this.width / 2;
            var arcCenterY = this.height / 2 + 50;
            var arcRadius = 120;
            ctx.save();
            ctx.beginPath();
            ctx.arc(arcCenterX, arcCenterY, arcRadius, 0, 2 * Math.PI, false);
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
            this.forecastPanels = new Array(); // Panels      
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
            this.iconWeather = null;
            this.ctx = ctx;
            this.txtValid = new Text(ctx, new Rect(10, 10, 60, 10));
            this.txtValid.textAlign = "left";
            this.txtValid.textBaseline = "top";
            this.txtValid.fontSize = 20;
            this.txtWind = new Text(ctx, new Rect(0, 0, 0, 0));
            this.txt = new Text(ctx, new Rect(0, 0, 0, 0));
            this.txt.textAlign = "left";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            this.iconWind = new Icon(this.ctx, new Rect(140, 70, 50, 50), '/infores/servlets/kitchen/wind.png');
            this.weatherData = weatherData;
            this.numForecast = numForecast;
            this.iconWeather = new Iconset(this.ctx, new Rect(0, 0, 10, 10), imagePaths);
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
                if (this.iconWeather != null) {
                    this.iconWeather.setSize(new Rect(this.x + this.lineWidth, this.y + this.lineWidth, this.width - (2 * this.lineWidth), this.width - (2 * this.lineWidth)));
                    this.iconWeather.paint(weatherForecast.weatherSymbol - 1);
                }
                //Draw temperature...
                this.txt.rect.x = this.x + (this.width - 110);
                this.txt.rect.y = this.height * 0.8;
                this.txt.rect.w = 100;
                this.txt.rect.h = 30;
                this.txt.textAlign = "right";
                this.txt.paint(weatherForecast.tempOut + " \u00B0C");
                //wind image
                this.iconWind.setSize(new Rect(this.x + (this.width * 0.1), this.width * 1.5, 40, 40));
                this.iconWind.paint();
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
    var FloorScreen = (function () {
        function FloorScreen(canvas, siteData) {
            this.siteData = null;
            this.tempMarks = new Array();
            this.switchMarks = new Array();
            this.doorMarks = new Array();
            this.imgFloor = null;
            this.imgFloorLoaded = false;
            this.numRooms = 0;
            this.ctx = canvas.getContext("2d");
            this.siteData = siteData;
            this.width = canvas.width;
            this.height = canvas.height;
            this.imgFloor = new Image();
            this.imgFloor.src = "/infores/servlets/kitchen/floor1.jpg";
            this.txtNumRooms = new Text(this.ctx, new Rect(0, 0, 250, 100));
            this.txtNumRooms.textAlign = "left";
            this.txtNumRooms.textBaseline = "middle";
            this.txtNumRooms.fontSize = 40;
        }
        FloorScreen.prototype.MouseClickHandler = function (x, y) {
            //let room: number = this.clickedTempMark(x, y);
            var switchData = this.clickedSwitchMark(x, y);
            if (switchData != null) {
                switchData.postServerClick();
                switchData.getServerData();
                this.paint();
            }
            else {
                appMode = Application.None;
            }
        };
        FloorScreen.prototype.paint = function () {
            var ctx = this.ctx;
            //Draw image...
            //   if (this.imgFloorLoaded) {     
            ctx.save();
            ctx.drawImage(this.imgFloor, 0, 0, this.width, this.height);
            ctx.restore();
            //   }      
            // Temperature sensors...
            for (var id in this.tempMarks) {
                this.tempMarks[id].paint();
            }
            // Switches...
            for (var id in this.switchMarks) {
                this.switchMarks[id].paint();
            }
            // Doors
            for (var id in this.doorMarks) {
                this.doorMarks[id].paint();
            }
            //Number rooms
            this.txtNumRooms.rect.x = this.width - 10;
            this.txtNumRooms.rect.y = this.height - 10;
            this.txtNumRooms.rect.w = this.width * 0.4;
            this.txtNumRooms.textAlign = "right";
            this.txtNumRooms.fontSize = 26;
            this.txtNumRooms.textBaseline = "bottom";
            this.txtNumRooms.paint("Number Rooms:" + this.numRooms);
        };
        FloorScreen.prototype.clickedTempMark = function (clx, cly) {
            var cId = -1;
            var n = -1;
            for (var id in this.tempMarks) {
                n++;
                if (this.tempMarks[id].isClicked(clx, cly)) {
                    cId = n;
                }
            }
            return cId;
        };
        FloorScreen.prototype.clickedSwitchMark = function (clx, cly) {
            for (var id in this.switchMarks) {
                if (this.switchMarks[id].isClicked(clx, cly)) {
                    return this.switchMarks[id].switch;
                }
            }
            return null;
        };
        FloorScreen.prototype.loadGraphics = function () {
            // Temperature
            if (this.tempMarks.length > this.siteData.tempSensors.length) {
                this.tempMarks.length = this.siteData.tempSensors.length;
            }
            else if (this.tempMarks.length < this.siteData.tempSensors.length) {
                for (var i = this.tempMarks.length; i < this.siteData.tempSensors.length; i++) {
                    this.tempMarks.push(new TempMark(this.ctx, new Rect(0, 0, 0, 0), "/infores/servlets/kitchen/tempSymbol.png"));
                }
            }
            for (var id in this.siteData.tempSensors) {
                this.tempMarks[id].setSize(new Rect(this.siteData.tempSensors[id].x, this.siteData.tempSensors[id].y, 80, 80));
                this.tempMarks[id].setTemp(this.siteData.tempSensors[id].temp);
            }
            // Switches
            if (this.switchMarks.length > this.siteData.switches.length) {
                this.switchMarks.length = this.siteData.switches.length;
            }
            else if (this.switchMarks.length < this.siteData.switches.length) {
                for (var i = this.switchMarks.length; i < this.siteData.switches.length; i++) {
                    this.switchMarks.push(new SwitchMark(this.ctx, new Rect(0, 0, 80, 80), "/infores/servlets/kitchen/BulbSymbol.png"));
                }
            }
            for (var id in this.siteData.switches) {
                this.switchMarks[id].switch = this.siteData.switches[id];
            }
            // Doors
            if (this.doorMarks.length > this.siteData.doors.length) {
                this.doorMarks.length = this.siteData.doors.length;
            }
            else if (this.doorMarks.length < this.siteData.doors.length) {
                for (var i = this.doorMarks.length; i < this.siteData.doors.length; i++) {
                    this.doorMarks.push(new DoorMark(this.ctx, new Rect(0, 0, 0, 0)));
                }
            }
            for (var id in this.siteData.doors) {
                this.doorMarks[id].setSize(new Rect(this.siteData.doors[id].x, this.siteData.doors[id].y, 80, 80));
                this.doorMarks[id].setState(this.siteData.doors[id].open, this.siteData.doors[id].locked);
            }
        };
        return FloorScreen;
    }());
    var RoomScreen = (function () {
        function RoomScreen(canvas, imgSrc) {
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
        RoomScreen.prototype.paint = function (weatherToday) {
            var ctx = this.ctx;
            //Draw image...
            //  if (this.imgRoomLoaded) {     
            ctx.save();
            ctx.drawImage(this.imgRoom, 0, 0, this.width, this.height);
            ctx.restore();
            //   }      
            /*
                //Outside mark
                this.TempMarks[0].setSize(new Rect (250, 350, 80, 80));
                this.TempMarks[0].paint(weatherToday.tempOut + " \u00B0C");
                    
                //Inside mark
                this.TempMarks[1].setSize(new Rect (280, 200, 80, 80));
                this.TempMarks[1].paint(weatherToday.tempIn + " \u00B0C");
                */
        };
        RoomScreen.prototype.clickedTempMark = function (clx, cly) {
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
        return RoomScreen;
    }());
    //Function to get the mouse position
    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
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
})(KitchenInfoStation || (KitchenInfoStation = {})); // end module KitchenInfoStation
