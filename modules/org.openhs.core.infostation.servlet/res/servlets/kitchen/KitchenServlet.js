// Copyright 2016 
//
//
// Home page: ***
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="jquery.d.ts" />
/// <reference path='OhsCanvasGraphics.ts'/>
/// <reference path='OhsWeatherData.ts'/>
/// <reference path='OhsSiteData.ts'/>
var KitchenInfoStation;
(function (KitchenInfoStation) {
    var Rect = OhsCanvasGraphics.Rect;
    var RectRounded = OhsCanvasGraphics.RectRounded;
    var ImageRect = OhsCanvasGraphics.ImageRect;
    var TextSimple = OhsCanvasGraphics.TextSimple;
    var TempMark = OhsCanvasGraphics.TempMark;
    var SwitchMark = OhsCanvasGraphics.SwitchMark;
    var SwitchLockMark = OhsCanvasGraphics.SwitchLockMark;
    var ContactSensorMark = OhsCanvasGraphics.ContactSensorMark;
    var DoorMark = OhsCanvasGraphics.DoorMark;
    var WindowMark = OhsCanvasGraphics.WindowMark;
    var ImageRectArray = OhsCanvasGraphics.ImageRectArray;
    var Graphics = OhsCanvasGraphics.Graphics;
    var Mark = OhsCanvasGraphics.Mark;
    var WeatherDataForecast = OhsWeatherData.WeatherDataForecast;
    var SiteData = OhsSiteData.SiteData;
    var Floor = OhsSiteData.Floor;
    var Room = OhsSiteData.Room;
    var Door = OhsSiteData.Door;
    var SwitchScreen;
    (function (SwitchScreen) {
        SwitchScreen[SwitchScreen["Main"] = 0] = "Main";
        SwitchScreen[SwitchScreen["Watch"] = 1] = "Watch";
        SwitchScreen[SwitchScreen["Floor"] = 2] = "Floor";
        SwitchScreen[SwitchScreen["WeatherForecast"] = 3] = "WeatherForecast";
        SwitchScreen[SwitchScreen["Room"] = 4] = "Room";
        SwitchScreen[SwitchScreen["DoorList"] = 5] = "DoorList";
        SwitchScreen[SwitchScreen["DoorScreen"] = 6] = "DoorScreen";
    })(SwitchScreen || (SwitchScreen = {}));
    var imagePaths = [
        "/infores/servlets/kitchen/sunny.png",
        "/infores/servlets/kitchen/partcloudy.png",
        "/infores/servlets/kitchen/cloudy.png",
        "/infores/servlets/kitchen/cloudRain.png",
        "/infores/servlets/kitchen/cloudStorm.png",
        "/infores/servlets/kitchen/cloudSnow.png"
    ];
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
            this.url = "kitchen";
            // Data
            this.m_weatherData = new WeatherDataForecast(); // General weather
            this.m_siteData = null; //general Site Data      
            // Screens
            this.m_screenMain = null;
            this.m_forecastScreen = null; //forecast screen            
            this.m_room = null;
            this.m_floor = null;
            this.m_screenDoorList = null;
            this.m_screenDoor = null;
            //Graphics
            this.m_graphics = null;
            // Handlers
            this.currPage = null;
            this.refreshRateMain = 5000;
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
            //---Data---
            this.m_siteData = new SiteData();
            this.m_weatherData = new WeatherDataForecast();
            //---Graphics---
            this.m_graphics = new Graphics(this.canvas);
            //---Screens---
            this.m_screenMain = new ScreenMain(this.canvas, this.m_siteData, this.m_weatherData);
            this.m_floor = new ScreenFloor(this.canvas, this.m_siteData, this.m_graphics);
            this.m_room = new ScreenRoom(this.canvas, this.m_siteData, this.m_graphics);
            this.m_forecastScreen = new ScreenWeatherForecast(this.canvas, this.m_weatherData);
            this.m_screenDoorList = new ScreenDoorList(this.canvas, this.m_siteData, this.m_graphics);
            this.m_screenDoor = new ScreenDoor(this.canvas, this.m_siteData, this.m_graphics);
            //---Mouse Handler---
            var self = this;
            this.canvas.addEventListener('click', function (event) { self.MouseClickHandler(event); }, false);
            //---Timer Setup---
            //    this.timerGetServerDataEvent(this.refreshRateMain);  
            //---Set current displayed page---
            this.openPage(this.m_screenMain, this.refreshRateMain);
        }
        ApplicationKitchen.prototype.MouseClickHandler = function (event) {
            var mousePos = getMousePos(this.canvas, event);
            /*
            * handling in current page...
            */
            var retVal = this.currPage.MouseClickHandler(event);
            var refresh = this.refreshRateMain;
            var screen = null;
            //window.alert(">>>" + retVal.nextScreen + "\n\n>>>" + retVal.nextThingPath);
            if (retVal.nextScreen == SwitchScreen.Floor) {
                refresh = 2000;
                screen = this.m_floor;
                this.m_floor.setThing(this.m_siteData.m_floorArray[1]);
            }
            else if (retVal.nextScreen == SwitchScreen.Main) {
                screen = this.m_screenMain;
            }
            else if (retVal.nextScreen == SwitchScreen.WeatherForecast) {
                screen = this.m_forecastScreen;
            }
            else if (retVal.nextScreen == SwitchScreen.Room) {
                refresh = 100;
                screen = this.m_room;
                this.m_room.setThing(this.m_siteData.getThing(retVal.nextThingPath));
            }
            else if (retVal.nextScreen == SwitchScreen.DoorList) {
                refresh = 100;
                screen = this.m_screenDoorList;
            }
            else if (retVal.nextScreen == SwitchScreen.DoorScreen) {
                refresh = 100;
                screen = this.m_screenDoor;
                this.m_screenDoor.setThing(this.m_siteData.getThing(retVal.nextThingPath));
            }
            // Switch screen
            this.openPage(screen, refresh);
        };
        ApplicationKitchen.prototype.openPage = function (next, refreshRate) {
            if (next != null) {
                next.prevPage = SwitchScreen.Main;
                if (this.currPage != null) {
                    this.currPage.close();
                    if (this.currPage instanceof ScreenFloor) {
                        next.prevPage = SwitchScreen.Floor;
                    }
                    else if (this.currPage instanceof ScreenDoorList) {
                        next.prevPage = SwitchScreen.DoorList;
                    }
                }
                //next.prevPage = this.currPage;
                this.currPage = next.open(refreshRate);
            }
        };
        ApplicationKitchen.prototype.getServerData = function () {
            if (this.currPage != null) {
                this.currPage.getServerData(this.url);
            }
        };
        ApplicationKitchen.prototype.timerGetServerDataEvent = function (step) {
            var _this = this;
            this.getServerData();
            window.clearTimeout(this.timerData);
            this.timerData = window.setTimeout(function () { return _this.timerGetServerDataEvent(step); }, step);
        };
        return ApplicationKitchen;
    }());
    KitchenInfoStation.ApplicationKitchen = ApplicationKitchen;
    var Screen = (function () {
        function Screen(canvas) {
            this.prevPage = SwitchScreen.Main;
            this.thing = null;
            this.returnVal = {
                nextScreen: null,
                nextThingPath: null
            };
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
            this.width = canvas.width;
            this.height = canvas.height;
        }
        Screen.prototype.MouseClickHandler = function (event) {
            return null;
        };
        Screen.prototype.paint = function () {
            this.ctx.save();
            this.ctx.fillStyle = whiteColor;
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.restore();
        };
        Screen.prototype.paintQuick = function () {
        };
        Screen.prototype.timerPaintEvent = function (step) {
            var _this = this;
            this.paint();
            window.clearTimeout(this.timerPaint);
            this.timerPaint = window.setTimeout(function () { return _this.timerPaintEvent(step); }, step);
        };
        Screen.prototype.timerPaintEventQuick = function (step) {
            var _this = this;
            this.paintQuick();
            window.clearTimeout(this.timerPaintQuick);
            this.timerPaintQuick = window.setTimeout(function () { return _this.timerPaintEventQuick(step); }, step);
        };
        Screen.prototype.open = function (refresh) {
            this.timerPaintEvent(refresh);
            this.timerPaintEventQuick(80);
            return this;
        };
        Screen.prototype.close = function () {
            window.clearTimeout(this.timerPaint);
            window.clearTimeout(this.timerPaintQuick);
        };
        Screen.prototype.getServerData = function (url) {
        };
        Screen.prototype.setThing = function (thing) {
            this.thing = thing;
        };
        Screen.prototype.getThing = function () {
            return this.thing;
        };
        Screen.prototype.getThingPath = function () {
            return this.thing.getPath();
        };
        return Screen;
    }());
    KitchenInfoStation.Screen = Screen;
    var ScreenMain = (function (_super) {
        __extends(ScreenMain, _super);
        function ScreenMain(canvas, m_siteData, m_weatherData) {
            _super.call(this, canvas);
            //Data
            this.m_siteData = null;
            this.m_weatherData = null;
            //Graphics
            this.stopWatch = null;
            this.appWatch = false;
            //---Data---
            this.m_siteData = m_siteData;
            this.m_weatherData = m_weatherData;
            //---Graphics---
            this.iconStopWatch = new ImageRect((this.width / 2) + 180, (this.height / 2) + 20, 60, 60, 0, '/infores/servlets/kitchen/stopwatch.png');
            this.iconVoiceMessage = new ImageRect((this.width / 2) - 220, (this.height / 2) + 20, 60, 60, 0, '/infores/servlets/kitchen/voicemessage.png');
            this.iconDoor = new ImageRect((this.width / 2) + 150, (this.height / 2) + 120, 60, 60, 0, '/infores/servlets/kitchen/door_icon.png');
            this.iconWeather = new ImageRectArray(0, 0, 150, 150, 0);
            this.iconWeather.setImages(imagePaths);
            this.iconWind = new ImageRect(140, 70, 50, 50, 0, '/infores/servlets/kitchen/wind.png');
            this.iconHum = new ImageRect((this.width / 2) + 10, (this.height / 2) + 70, 60, 60, 0, '/infores/servlets/kitchen/drop.png');
            this.tmpInText = new TextSimple((this.width / 2) - 120, (this.height / 2) - 10, 220, 60);
            this.tmpOutText = new TextSimple((this.width / 2), (this.height / 2) + 50, 150, 60);
            this.timeText = new TextSimple((this.width) - 150, 5, 150, 60);
            this.dateText = new TextSimple((this.width) / 2 + 70, 80, 230, 40);
            this.windText = new TextSimple(160, 80, 140, 40);
            this.stopWatch = new StopWatch(canvas);
            this.stopWatch.arcCenterX = this.width / 2;
            this.stopWatch.arcCenterY = this.height / 2 + 50;
            this.stopWatch.arcRadius = 120;
        }
        ScreenMain.prototype.MouseClickHandler = function (event) {
            var returnVal = {
                nextScreen: SwitchScreen.Main,
                nextThingPath: null
            };
            var mousePos = getMousePos(this.canvas, event);
            if (this.appWatch) {
                if (this.stopWatch.getStatus()) {
                    if (this.stopWatch.stopwatchRect.isClicked(mousePos.x, mousePos.y)) {
                        this.stopWatch.stop();
                        this.paint();
                    }
                }
                else {
                    this.appWatch = false;
                    this.open(5000);
                }
            }
            else {
                if (this.iconStopWatch.isClicked(mousePos.x, mousePos.y)) {
                    //window.alert("clicked....");
                    this.stopWatch.start();
                    this.appWatch = true;
                    this.open(30);
                }
                else if (this.iconDoor.isClicked(mousePos.x, mousePos.y)) {
                    returnVal.nextScreen = SwitchScreen.DoorList;
                    return returnVal;
                }
                else if (this.tmpInText.isClicked(mousePos.x, mousePos.y)) {
                    // return SwitchScreen.Floor;  
                    //window.clearTimeout(this.timerPaint);
                    returnVal.nextScreen = SwitchScreen.Floor;
                    return returnVal;
                }
                else if (this.iconWeather.isClicked(mousePos.x, mousePos.y)) {
                    // return SwitchScreen.WeatherForecast;  
                    returnVal.nextScreen = SwitchScreen.WeatherForecast;
                    return returnVal;
                }
            }
            //return null;
        };
        ScreenMain.prototype.paint = function () {
            // window.alert("sss");
            this.paintStaticImage();
            var ctx = this.ctx;
            //Weather outside...
            this.iconWeather.paintImage(this.ctx, this.m_weatherData.getCurrent().weatherSymbol);
            //Wind
            this.iconWind.paint(this.ctx);
            //Hum
            this.iconHum.paint(this.ctx);
            //Face icons
            this.iconStopWatch.paint(this.ctx);
            this.iconVoiceMessage.paint(this.ctx);
            this.iconDoor.paint(this.ctx);
            //Wind outside
            this.windText.fontSize = fontSizeWind;
            this.windText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.windText.fontColor = textColor;
            this.windText.textAlign = "right";
            this.windText.textBaseline = "middle";
            this.windText.paintText(this.ctx, this.m_weatherData.getCurrent().windSpeed + " m/s");
            //Time          
            this.timeText.fontSize = fontSizeTime;
            this.timeText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.timeText.fontColor = textColor;
            this.timeText.textAlign = "right";
            this.timeText.textBaseline = "middle";
            this.timeText.paintText(this.ctx, this.m_siteData.timeString);
            //Date
            this.dateText.fontSize = fontSizeDate;
            this.dateText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.dateText.fontColor = textColor;
            this.dateText.textAlign = "right";
            this.dateText.textBaseline = "middle";
            this.dateText.paintText(this.ctx, this.m_siteData.dateString);
            //Inside temperature
            this.tmpInText.y = 220;
            this.tmpInText.fontSize = fontSizeTempIn;
            this.tmpInText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.tmpInText.fontColor = textColor;
            this.tmpInText.textAlign = "right";
            this.tmpInText.textBaseline = "middle";
            //Temperature from sensor 1...            
            this.tmpInText.paintText(this.ctx, this.m_weatherData.getCurrent().tempIn.toPrecision(2) + " \u00B0C");
            //Outside temperature    
            this.tmpOutText.equals(this.tmpInText);
            this.tmpOutText.x = 80;
            this.tmpOutText.y = 5;
            this.tmpOutText.textAlign = "right";
            this.tmpOutText.paintText(this.ctx, this.m_weatherData.getCurrent().tempOut.toPrecision(2) + " \u00B0C");
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
            if (this.appWatch) {
                this.stopWatch.paint();
            }
        };
        ScreenMain.prototype.paintStaticImage = function () {
            var ctx = this.ctx;
            ctx.save();
            ctx.fillStyle = whiteColor;
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.restore();
        };
        return ScreenMain;
    }(Screen));
    KitchenInfoStation.ScreenMain = ScreenMain;
    var ScreenWeatherForecast = (function (_super) {
        __extends(ScreenWeatherForecast, _super);
        function ScreenWeatherForecast(canvas, weatherData) {
            _super.call(this, canvas);
            this.forecastPanels = new Array(); // Panels      
            this.weatherData = weatherData;
            this.forecastPanels.push(new WeatherForecastPanel(this.ctx, this.weatherData, 0));
            this.forecastPanels.push(new WeatherForecastPanel(this.ctx, this.weatherData, 1));
            this.forecastPanels.push(new WeatherForecastPanel(this.ctx, this.weatherData, 2));
            this.forecastPanels.push(new WeatherForecastPanel(this.ctx, this.weatherData, 3));
        }
        ScreenWeatherForecast.prototype.MouseClickHandler = function (event) {
            this.returnVal.nextScreen = SwitchScreen.Main;
            return this.returnVal;
        };
        ScreenWeatherForecast.prototype.paint = function () {
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
        return ScreenWeatherForecast;
    }(Screen));
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
            ctx.arc(this.arcCenterX, this.arcCenterY, this.arcRadius, 0, 2 * Math.PI, false);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = circleColor;
            ctx.stroke();
            ctx.restore();
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
            this.txtValid = new TextSimple(10, 10, 60, 10);
            this.txtValid.textAlign = "left";
            this.txtValid.textBaseline = "top";
            this.txtValid.fontSize = 20;
            this.txtWind = new TextSimple(0, 0, 0, 0);
            this.txt = new TextSimple(0, 0, 0, 0);
            this.txt.textAlign = "left";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            this.iconWind = new ImageRect(140, 70, 50, 50, 0, '/infores/servlets/kitchen/wind.png');
            this.weatherData = weatherData;
            this.numForecast = numForecast;
            this.iconWeather = new ImageRectArray(0, 0, 10, 10, 0);
            this.iconWeather.setImages(imagePaths);
        }
        WeatherForecastPanel.prototype.setSize = function (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.txt.x = x;
            this.txt.y = y;
            this.txt.w = width;
            this.txt.h = height;
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
                this.txtValid.size(this.x + 5, this.y + 1, 20, 10);
                this.txtValid.paintText(ctx, "Not valid...");
            }
            else {
                //Draw forecast image
                if (this.iconWeather != null) {
                    this.iconWeather.size(this.x + this.lineWidth, this.y + this.lineWidth, this.width - (2 * this.lineWidth), this.width - (2 * this.lineWidth));
                    this.iconWeather.paintImage(ctx, weatherForecast.weatherSymbol);
                }
                //Draw temperature...
                this.txt.x = this.x + (this.width - 110);
                this.txt.y = this.height * 0.8;
                this.txt.w = 100;
                this.txt.h = 30;
                this.txt.textAlign = "right";
                this.txt.paintText(ctx, weatherForecast.tempOut + " \u00B0C");
                //wind image
                this.iconWind.size(this.x + (this.width * 0.1), this.width * 1.5, 40, 40);
                this.iconWind.paint(this.ctx);
                //wind text
                this.txtWind.x = this.x + (this.width - 70);
                this.txtWind.y = this.width * 1.6 - 10;
                this.txtWind.w = 60;
                this.txtWind.h = 30;
                this.txtWind.textAlign = "right";
                this.txtWind.fontSize = 15;
                this.txtWind.textBaseline = "middle";
                this.txtWind.paintText(ctx, weatherForecast.windSpeed + " \u00B0C");
            }
        };
        return WeatherForecastPanel;
    }());
    var ScreenFloor = (function (_super) {
        __extends(ScreenFloor, _super);
        function ScreenFloor(canvas, siteData, m_graphics) {
            _super.call(this, canvas);
            this.siteData = null;
            this.thingPath = "";
            //Graphics
            this.m_graphics = null;
            this.imgFloor = null;
            this.imgFloorLoaded = false;
            //**********
            this.m_doorMarks = null; // Doors marks
            this.m_windowMarks = null; // Window marks
            this.m_tempMarks = null; // Temp marks
            this.m_switchMarks = null; // Switch marks
            this.m_contactSensorsMarks = null; // Switch marks
            this.siteData = siteData;
            this.m_graphics = m_graphics;
            this.imgFloor = new Image();
            this.imgFloor.src = "/infores/servlets/kitchen/floor1.jpg";
            this.txtNumRooms = new TextSimple(0, 0, 250, 100);
            this.txtNumRooms.textAlign = "left";
            this.txtNumRooms.textBaseline = "middle";
            this.txtNumRooms.fontSize = 40;
            this.m_doorMarks = new Array();
            this.m_windowMarks = new Array();
            this.m_tempMarks = new Array();
            this.m_switchMarks = new Array();
            this.m_contactSensorsMarks = new Array();
        }
        ScreenFloor.prototype.setThing = function (thing) {
            var oldThing = _super.prototype.getThing.call(this);
            _super.prototype.setThing.call(this, thing);
            //update other data
            if (thing != oldThing) {
                if (thing instanceof Floor) {
                    //Doors
                    var m_doorArray = this.siteData.getFilteredThings(this.siteData.m_doorArray, thing.getPath());
                    this.m_graphics.setNumber2(m_doorArray.length, this.m_doorMarks, DoorMark, 0, 0, 0, 0);
                    for (var id in this.m_doorMarks) {
                        this.m_doorMarks[id].setThing(m_doorArray[id]);
                        this.m_doorMarks[id].m_switchArray = this.siteData.getFilteredThings(this.siteData.m_switchArray, m_doorArray[id].getPath());
                        this.m_doorMarks[id].m_contactSensorArray = this.siteData.getFilteredThings(this.siteData.m_contactSensorArray, m_doorArray[id].getPath());
                    }
                    //Windows
                    var m_windowArray = this.siteData.getFilteredThings(this.siteData.m_windowArray, thing.getPath());
                    this.m_graphics.setNumber2(m_windowArray.length, this.m_windowMarks, WindowMark, 0, 0, 0, 0);
                    for (var id in this.m_windowMarks) {
                        this.m_windowMarks[id].setThing(m_windowArray[id]);
                    }
                    //Temperature Sensors
                    var temps = this.siteData.getFilteredThings(this.siteData.m_tempSensorArray, thing.getPath());
                    this.m_graphics.setNumber2(temps.length, this.m_tempMarks, TempMark, 0, 0, 0, 0);
                    for (var id in this.m_tempMarks) {
                        this.m_tempMarks[id].setThing(temps[id]);
                    }
                    //Switch
                    var m_switchArray = this.siteData.getFilteredThings(this.siteData.m_switchArray, thing.getPath());
                    var m_switchArray2 = this.siteData.getFilteredThingsNoContains(m_switchArray, 'doors');
                    var m_switchArray3 = this.siteData.getFilteredThingsNoContains(m_switchArray2, 'windows');
                    this.m_graphics.setNumber2(m_switchArray3.length, this.m_switchMarks, SwitchMark, 0, 0, 0, 0);
                    for (var id in this.m_switchMarks) {
                        this.m_switchMarks[id].setThing(m_switchArray3[id]);
                    }
                    //Contact Sensor
                    var m_contactSensorArray = this.siteData.getFilteredThings(this.siteData.m_contactSensorArray, thing.getPath());
                    var m_contactSensorArray2 = this.siteData.getFilteredThingsNoContains(m_contactSensorArray, 'doors');
                    m_contactSensorArray2 = this.siteData.getFilteredThingsNoContains(m_contactSensorArray2, 'windows');
                    this.m_graphics.setNumber2(m_contactSensorArray2.length, this.m_contactSensorsMarks, ContactSensorMark, 0, 0, 0, 0);
                    for (var id in this.m_contactSensorsMarks) {
                        this.m_contactSensorsMarks[id].setThing(m_contactSensorArray2[id]);
                    }
                }
            }
        };
        ScreenFloor.prototype.MouseClickHandler = function (event) {
            var returnVal = {
                nextScreen: SwitchScreen.Main,
                nextThingPath: null
            };
            var mousePos = getMousePos(this.canvas, event);
            this.returnVal.nextScreen = SwitchScreen.Main;
            for (var id in this.m_doorMarks) {
                if (this.m_doorMarks[id].isClicked(mousePos.x, mousePos.y)) {
                    this.returnVal.nextScreen = SwitchScreen.DoorScreen;
                    this.returnVal.nextThingPath = this.m_doorMarks[id].getThing().getPath();
                }
            }
            for (var id in this.m_tempMarks) {
                if (this.m_tempMarks[id].isClicked(mousePos.x, mousePos.y)) {
                    this.returnVal.nextScreen = SwitchScreen.Room;
                    this.returnVal.nextThingPath = this.siteData.getParentPath(this.m_tempMarks[id].getThing());
                }
            }
            for (var id in this.m_switchMarks) {
                if (this.m_switchMarks[id].isClicked(mousePos.x, mousePos.y)) {
                    var switchSensor = this.m_switchMarks[id].getSwitchThing();
                    switchSensor.postServerClick();
                    this.paint();
                    switchSensor.getServerData();
                    this.paint();
                    this.returnVal.nextScreen = null;
                }
            }
            for (var id in this.m_contactSensorsMarks) {
                if (this.m_contactSensorsMarks[id].isClicked(mousePos.x, mousePos.y)) {
                    this.returnVal.nextScreen = null;
                    window.alert("Clicked, SitePath: " + this.m_contactSensorsMarks[id].getThing().getPath());
                }
            }
            return this.returnVal;
        };
        ScreenFloor.prototype.paint = function () {
            var ctx = this.ctx;
            //Draw image...       
            ctx.save();
            ctx.drawImage(this.imgFloor, 0, 0, this.width, this.height);
            ctx.restore();
            this.paintQuick();
            //Number m_roomArray
            /*
            this.txtNumRooms.x = this.width - 10;
            this.txtNumRooms.y = this.height - 10;
            this.txtNumRooms.w = this.width * 0.4;
            this.txtNumRooms.textAlign = "right";
            this.txtNumRooms.fontSize = 26;
            this.txtNumRooms.textBaseline = "bottom";
            this.txtNumRooms.paintText(this.ctx, "Number Rooms:" + this.numRooms);
            */
        };
        ScreenFloor.prototype.paintQuick = function () {
            var ctx = this.ctx;
            //Doors...            
            for (var id in this.m_doorMarks) {
                this.m_doorMarks[id].paintByThing(this.ctx);
            }
            //Windows...            
            for (var id in this.m_windowMarks) {
                this.m_windowMarks[id].paintByThing(this.ctx);
            }
            //Temperature sensors
            for (var id in this.m_tempMarks) {
                this.m_tempMarks[id].paintByThing(this.ctx);
            }
            //m_switchArray
            for (var id in this.m_switchMarks) {
                this.m_switchMarks[id].paintByThing(this.ctx);
            }
            //Contact sensors
            for (var id in this.m_contactSensorsMarks) {
                this.m_contactSensorsMarks[id].paintByThing(this.ctx);
            }
        };
        return ScreenFloor;
    }(Screen));
    var ScreenRoom = (function (_super) {
        __extends(ScreenRoom, _super);
        function ScreenRoom(canvas, siteData, m_graphics) {
            _super.call(this, canvas);
            this.m_siteData = null;
            this.m_doorMarks = null; // Doors marks
            this.m_tempMarks = null; // Temps marks
            this.m_switchMarks = null; // Switch marks
            //Graphics
            this.m_graphics = null;
            //Images
            this.m_imgRoomDefault = null; //Array of images
            this.m_imgRoom2Array = null; //Array of images
            this.m_imgRoom2 = null; //Selected image
            this.m_graphics = m_graphics;
            this.m_siteData = siteData;
            this.m_doorMarks = new Array();
            this.m_tempMarks = new Array();
            this.m_switchMarks = new Array();
            this.m_imgRoomDefault = new ImageRect(0, 0, 0, 0, 0, '/infores/servlets/kitchen/room_default.png');
            this.m_imgRoom2Array = new Array();
            for (var id in this.m_siteData.m_roomArray) {
                var img = new ImageRect(0, 0, this.width, this.height, 0, this.m_siteData.m_roomArray[id].imageBkgPath);
                /*
                if (!img.getImage().onload) {
                    window.alert("Path:" + this.m_siteData.m_roomArray[id].imageBkgPath);
                }
       */
                this.m_imgRoom2Array.push(img);
            }
            // this..TempMarks.push(new TempMark (this.ctx, new Rect (0, 0, 0, 0), "/infores/servlets/kitchen/tempSymbol.png"));
            //this.TempMarks.push(new TempMark (this.ctx, new Rect (0, 0, 0, 0), "/infores/servlets/kitchen/tempSymbol.png"));               
        }
        ScreenRoom.prototype.MouseClickHandler = function (event) {
            this.returnVal.nextScreen = SwitchScreen.Main;
            var mousePos = getMousePos(this.canvas, event);
            for (var id in this.m_doorMarks) {
                if (this.m_doorMarks[id].isClicked(mousePos.x, mousePos.y)) {
                    this.returnVal.nextScreen = SwitchScreen.DoorScreen;
                    this.returnVal.nextThingPath = this.m_doorMarks[id].getThing().getPath();
                }
            }
            for (var id in this.m_tempMarks) {
                if (this.m_tempMarks[id].isClicked(mousePos.x, mousePos.y)) {
                    // this.returnVal.nextScreen = SwitchScreen.Room;                   
                    //  this.returnVal.nextThingPath = this.siteData.getParentPath(this.m_tempMarks[id].getThing());
                    this.returnVal.nextScreen = null;
                }
            }
            for (var id in this.m_switchMarks) {
                if (this.m_switchMarks[id].isClicked(mousePos.x, mousePos.y)) {
                    var switchSensor = this.m_switchMarks[id].getSwitchThing();
                    switchSensor.postServerClick();
                    switchSensor.getServerData();
                    this.paint();
                    this.returnVal.nextScreen = null;
                }
            }
            return this.returnVal;
        };
        ScreenRoom.prototype.setThing = function (thing) {
            var oldThing = _super.prototype.getThing.call(this);
            _super.prototype.setThing.call(this, thing);
            //update other data
            if (thing != oldThing) {
                if (thing instanceof Room) {
                    var room = thing;
                    //Images
                    var img = this.m_graphics.getFilteredImage(this.m_imgRoom2Array, room.imageBkgPath);
                    if (img == null) {
                        img = new ImageRect(0, 0, this.width, this.height, 0, room.imageBkgPath);
                        this.m_imgRoom2Array.push(img);
                        this.m_imgRoom2 = img;
                        window.alert('nnnnn');
                    }
                    else {
                        this.m_imgRoom2 = img;
                    }
                    //Doors
                    var m_doorArray = this.m_siteData.getFilteredThings(this.m_siteData.m_doorArray, thing.getPath());
                    this.m_graphics.setNumber2(m_doorArray.length, this.m_doorMarks, DoorMark, 0, 0, 0, 0);
                    for (var id in this.m_doorMarks) {
                        this.m_doorMarks[id].setThing(m_doorArray[id]);
                    }
                    //Temp marks
                    var temps = this.m_siteData.getFilteredThings(this.m_siteData.m_tempSensorArray, thing.getPath());
                    this.m_graphics.setNumber2(temps.length, this.m_tempMarks, TempMark, 0, 0, 0, 0);
                    for (var id in this.m_tempMarks) {
                        this.m_tempMarks[id].setThing(temps[id]);
                    }
                    //Switch marks
                    var m_switchArray = this.m_siteData.getFilteredThings(this.m_siteData.m_switchArray, thing.getPath());
                    this.m_graphics.setNumber2(m_switchArray.length, this.m_switchMarks, SwitchMark, 0, 0, 0, 0);
                    for (var id in this.m_switchMarks) {
                        this.m_switchMarks[id].setThing(m_switchArray[id]);
                    }
                }
            }
        };
        ScreenRoom.prototype.paint = function () {
            var ctx = this.ctx;
            // Repaint background
            ctx.save();
            ctx.fillStyle = whiteColor;
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.restore();
            if (this.m_imgRoom2 != null) {
                if (!this.m_imgRoom2.loaded) {
                    this.m_imgRoomDefault.size(0, 0, this.width, this.height);
                    this.m_imgRoomDefault.paint(this.ctx);
                }
                else {
                    this.m_imgRoom2.size(0, 0, this.width, this.height);
                    this.m_imgRoom2.paint(this.ctx);
                }
            }
            //New door marks....
            for (var id in this.m_doorMarks) {
                this.m_doorMarks[id].paintByThing(this.ctx);
            }
            //New temp marks....
            for (var id in this.m_tempMarks) {
                this.m_tempMarks[id].paintByThing(this.ctx);
            }
            //New switch marks....
            for (var id in this.m_switchMarks) {
                this.m_switchMarks[id].paintByThing(this.ctx);
            }
        };
        return ScreenRoom;
    }(Screen));
    var ScreenDoor = (function (_super) {
        __extends(ScreenDoor, _super);
        function ScreenDoor(canvas, m_siteData, m_graphics) {
            _super.call(this, canvas);
            this.m_graphics = null;
            this.m_siteData = null;
            this.m_switchMarks = null; // Switch marks
            this.m_contactSensorsMarks = null; // Switch marks        
            this.m_imgOpenArray = null; //Array of images
            this.m_imgDoors = null; //Selected image        
            this.m_rectData = null;
            this.m_siteData = m_siteData;
            this.m_graphics = m_graphics;
            this.m_imgOpenArray = new Array();
            this.m_switchMarks = new Array();
            this.m_contactSensorsMarks = new Array();
            this.m_rectData = new RectRounded(0, 0, 0, 0, 40);
            this.m_textDoorName = new TextSimple(0, 0, 0, 0);
        }
        ScreenDoor.prototype.paint = function () {
            _super.prototype.paint.call(this);
            this.m_imgDoors = null;
            var state = false;
            var door = this.getThing();
            // window.alert("paint: " + door.image_open);
            if (this.m_contactSensorsMarks.length > 0) {
                state = this.m_contactSensorsMarks[0].getState();
                if (state) {
                    this.m_imgDoors = this.m_graphics.getFilteredImage(this.m_imgOpenArray, door.image_open);
                }
                else {
                    this.m_imgDoors = this.m_graphics.getFilteredImage(this.m_imgOpenArray, door.image_close);
                }
            }
            else {
                this.m_imgDoors = this.m_graphics.getFilteredImage(this.m_imgOpenArray, door.image_close);
            }
            if (this.m_imgDoors != null) {
                this.m_imgDoors.size(0, 0, this.width, this.height);
                this.m_imgDoors.paint(this.ctx);
            }
            //m_switchArray
            for (var i = 0; i < this.m_switchMarks.length; i++) {
                this.m_switchMarks[i].size(5 + (30 * i), 30, 60, 60);
                this.m_switchMarks[i].paint(this.ctx);
            }
            //Contact sensors
            for (var i = 0; i < this.m_contactSensorsMarks.length; i++) {
                this.m_contactSensorsMarks[i].size(5 + (30 * i), 100, 60, 60);
                this.m_contactSensorsMarks[i].paint(this.ctx);
            }
            //Doors name
            this.ctx.save();
            this.m_rectData.radius = 20;
            var dx = this.width - 50;
            var dy = 120;
            this.m_rectData.size((this.width - dx) / 2, this.height - dy - 5, dx, dy);
            this.m_rectData.paint(this.ctx);
            this.ctx.fillStyle = "white";
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = "gray";
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.restore();
            this.m_textDoorName.fontSize = 15;
            this.m_textDoorName.textAlign = 'left';
            this.m_textDoorName.textBaseline = 'bottom';
            this.m_textDoorName.size(this.m_rectData.x + 10, this.m_rectData.y + 10, dx, 26);
            this.m_textDoorName.paintText(this.ctx, "Door name: " + door.name);
            this.m_textDoorName.move(0, 20);
            this.m_textDoorName.paintText(this.ctx, "Door site path: " + door.getPath());
        };
        ScreenDoor.prototype.setThing = function (thing) {
            var oldThing = _super.prototype.getThing.call(this);
            _super.prototype.setThing.call(this, thing);
            var door1 = this.getThing();
            //window.alert("A: " + door1.image_close);
            //update other data
            if (thing != oldThing) {
                if (thing instanceof Door) {
                    //Reload pictures etc...?
                    var door = this.getThing();
                    //this.m_imgOpenArray.length = 2;
                    //  window.alert("A: " + door.image_open);
                    var imgOpen = this.m_graphics.getFilteredImage(this.m_imgOpenArray, door.image_open);
                    if (imgOpen == null) {
                        imgOpen = new ImageRect(0, 0, this.width, this.height, 0, door.image_open);
                        this.m_imgOpenArray.push(imgOpen);
                    }
                    var imgClose = this.m_graphics.getFilteredImage(this.m_imgOpenArray, door.image_close);
                    if (imgClose == null) {
                        //    window.alert("B: " + door.image_close);
                        imgClose = new ImageRect(0, 0, this.width, this.height, 0, door.image_close);
                        //  window.alert("B: " + door.image_close + "Ptr: " + imgClose);
                        this.m_imgOpenArray.push(imgClose);
                    }
                    //   this.m_doorMark2 = new DoorMark(0, 0, 0, 0);
                    //   this.m_doorMark2.setThing(thing);   
                    //Switch
                    var m_switchArray = this.m_siteData.getFilteredThings(this.m_siteData.m_switchArray, thing.getPath());
                    this.m_graphics.setNumber2(m_switchArray.length, this.m_switchMarks, SwitchLockMark, 0, 0, 0, 0);
                    for (var id in this.m_switchMarks) {
                        this.m_switchMarks[id].setThing(m_switchArray[id]);
                    }
                    //Contact Sensor
                    var m_contactSensorArray = this.m_siteData.getFilteredThings(this.m_siteData.m_contactSensorArray, thing.getPath());
                    this.m_graphics.setNumber2(m_contactSensorArray.length, this.m_contactSensorsMarks, ContactSensorMark, 0, 0, 0, 0);
                    for (var id in this.m_contactSensorsMarks) {
                        this.m_contactSensorsMarks[id].setThing(m_contactSensorArray[id]);
                    }
                }
            }
        };
        ScreenDoor.prototype.MouseClickHandler = function (event) {
            var mousePos = getMousePos(this.canvas, event);
            this.returnVal.nextScreen = this.prevPage;
            for (var id in this.m_switchMarks) {
                if (this.m_switchMarks[id].isClicked(mousePos.x, mousePos.y)) {
                    var switchSensor = this.m_switchMarks[id].getSwitchThing();
                    switchSensor.postServerClick();
                    this.paint();
                    switchSensor.getServerData();
                    this.paint();
                    this.returnVal.nextScreen = null;
                }
            }
            for (var id in this.m_contactSensorsMarks) {
                if (this.m_contactSensorsMarks[id].isClicked(mousePos.x, mousePos.y)) {
                    this.returnVal.nextScreen = null;
                }
            }
            return this.returnVal;
        };
        return ScreenDoor;
    }(Screen));
    var ScreenDoorList = (function (_super) {
        __extends(ScreenDoorList, _super);
        function ScreenDoorList(canvas, m_siteData, m_graphics) {
            _super.call(this, canvas);
            this.m_graphics = null;
            this.m_siteData = null;
            this.m_iconBkgImage = null;
            this.imgLock = null;
            this.imgUnLock = null;
            this.m_siteData = m_siteData;
            this.m_graphics = m_graphics;
            this.m_arrayViewDoor = new Array();
            this.setup();
            this.m_iconBkgImage = new ImageRect(0, 0, 0, 0, 0, '/infores/servlets/kitchen/bkgDoorsList3.jpg');
            this.imgLock = new ImageRect((this.width / 2) - 30, this.height - 120, 80, 80, 40, '/infores/servlets/kitchen/padlock_symbol.png');
            this.imgUnLock = new ImageRect((this.width / 2) + 15, this.height - 75, 80, 80, 40, '/infores/servlets/kitchen/padlockCrossed_symbol.png');
        }
        ScreenDoorList.prototype.setup = function () {
            //Setup view array ...
            for (var i = 0; i < this.m_siteData.m_doorArray.length; i++) {
                if (this.m_arrayViewDoor.length < i + 1) {
                    this.m_arrayViewDoor.push(new ViewDoor(this.ctx, this.m_siteData, this.m_graphics));
                }
                //Align data...
                this.m_arrayViewDoor[i].setThing(this.m_siteData.m_doorArray[i]);
            }
            //Cut over-remaining View parts
            if (this.m_arrayViewDoor.length > this.m_siteData.m_doorArray.length) {
                this.m_arrayViewDoor.length = this.m_siteData.m_doorArray.length;
            }
        };
        ScreenDoorList.prototype.paint = function () {
            var ctx = this.ctx;
            this.setup();
            this.setGrid(3, 2);
            // Repaint background
            ctx.save();
            ctx.fillStyle = whiteColor;
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            ctx.restore();
            this.m_iconBkgImage.size(0, 0, this.width, this.height);
            this.m_iconBkgImage.paint(this.ctx);
            for (var id in this.m_arrayViewDoor) {
                this.m_arrayViewDoor[id].paint();
            }
            //Paint buttons on panel
            ctx.save();
            this.imgLock.paint(this.ctx);
            this.imgUnLock.paint(this.ctx);
            ctx.restore();
        };
        ScreenDoorList.prototype.MouseClickHandler = function (event) {
            var mousePos = getMousePos(this.canvas, event);
            this.returnVal.nextScreen = SwitchScreen.Main;
            var viewDoorClicked = null;
            for (var i in this.m_arrayViewDoor) {
                /*
                if (this.m_arrayViewDoor[i].m_doorMark2.isClicked(mousePos.x, mousePos.y)){
                    
                    var door: Door = <Door> this.m_arrayViewDoor[i].m_doorMark2.getThing();
                    
                    window.alert('Door clicked: ' + door.getPath());
                    returnVal.nextScreen = null;
                } else {
                */
                if (this.m_arrayViewDoor[i].isClicked(mousePos.x, mousePos.y)) {
                    viewDoorClicked = this.m_arrayViewDoor[i];
                    break;
                }
            }
            if (viewDoorClicked != null) {
                this.returnVal.nextScreen = SwitchScreen.DoorScreen;
                this.returnVal.nextThingPath = viewDoorClicked.getThing().getPath();
            }
            /*
            if (this.panelBottom.isClicked(mousePos.x, mousePos.y) == true) {
                returnVal = null;
            }
            */
            if (this.imgLock.isClicked(mousePos.x, mousePos.y)) {
                // window.alert("All m_doorArray locked!");
                for (var id in this.m_arrayViewDoor) {
                    this.m_arrayViewDoor[id].m_doorMark2.m_switchArray[0].postServerSetOn();
                }
                this.returnVal.nextScreen = null;
            }
            if (this.imgUnLock.isClicked(mousePos.x, mousePos.y)) {
                for (var id in this.m_arrayViewDoor) {
                    this.m_arrayViewDoor[id].m_doorMark2.m_switchArray[0].postServerSetOff();
                }
                this.returnVal.nextScreen = null;
            }
            return this.returnVal;
        };
        ScreenDoorList.prototype.setGrid = function (numHorizontal, numVertical) {
            // Set number views...
            var maxItems = numHorizontal * numVertical;
            var spaceHor = 25.0;
            var spaceVer = 25.0;
            var belowStrip = 80;
            var widthView = (this.width - ((numHorizontal + 1) * spaceHor)) / numHorizontal;
            var heightView = ((this.height - belowStrip) - ((numVertical + 1) * spaceVer)) / numVertical;
            var nItem = 0;
            for (var j = 1; j <= numVertical; j++) {
                for (var i = 1; i <= numHorizontal; i++) {
                    if (nItem < this.m_arrayViewDoor.length) {
                        var x = ((i - 1) * widthView) + (i * spaceHor);
                        var y = ((j - 1) * heightView) + (j * spaceVer);
                        this.m_arrayViewDoor[nItem].size(x, y, widthView, heightView);
                    }
                    nItem++;
                }
            }
        };
        return ScreenDoorList;
    }(Screen));
    var ViewDoor = (function (_super) {
        __extends(ViewDoor, _super);
        function ViewDoor(ctx, m_siteData, m_graphics) {
            _super.call(this, 0, 0, 0, 0);
            this.m_doorMark2 = null; // Mark of m_doorArray
            this.m_siteData = null;
            this.m_graphics = null;
            this.rectName = null;
            this.m_imgDoorOpen = null;
            this.border = false;
            this.ctx = ctx;
            this.m_siteData = m_siteData;
            this.m_graphics = m_graphics;
            this.textDoorName = new TextSimple(0, 0, 0, 0);
        }
        ViewDoor.prototype.setThing = function (m_door) {
            var m_doorOld = this.thing;
            if (m_doorOld != m_door) {
                this.thing = m_door;
                //Reload pictures etc...?
                var door = this.thing;
                this.rectName = new RectRounded(0, 0, 0, 0, 0);
                this.m_imgDoorOpen = new ImageRect(this.x, this.y, this.w, this.h, 10, door.image_close);
                this.m_doorMark2 = new DoorMark(0, 0, 0, 0);
                this.m_doorMark2.setThing(this.thing);
                this.m_doorMark2.m_switchArray = this.m_siteData.getFilteredThings(this.m_siteData.m_switchArray, door.getPath());
                this.m_doorMark2.m_contactSensorArray = this.m_siteData.getFilteredThings(this.m_siteData.m_contactSensorArray, door.getPath());
            }
        };
        ViewDoor.prototype.size = function (x, y, w, h) {
            _super.prototype.size.call(this, x, y, w, h);
            // this.m_iconDoorOpen.setSize(rect);
            //this.m_iconDoorClose.setSize(rect);
            if (this.m_imgDoorOpen != null) {
                this.m_imgDoorOpen.size(x, y, w, h);
            }
            if (this.m_doorMark2 != null) {
                this.m_doorMark2.size(x + 5, y + 20, 60, 60);
            }
        };
        ViewDoor.prototype.paint = function () {
            var door = this.getThing();
            if (this.m_imgDoorOpen != null) {
                this.m_imgDoorOpen.paint(this.ctx);
            }
            if (this.m_doorMark2 != null) {
                //this.m_doorMark2.size(this.rect.x + 30, this.rect.y + 20, 80, 80);
                this.m_doorMark2.paint(this.ctx);
            }
            //Doors name
            this.ctx.save();
            this.rectName.radius = 10;
            var dx = 120;
            var dy = 30;
            this.rectName.size(this.x + 5, this.y + this.h - dy - 5, dx, dy);
            this.rectName.paint(this.ctx);
            this.ctx.fillStyle = "white";
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = "gray";
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.restore();
            this.textDoorName.fontSize = 15;
            this.textDoorName.textAlign = 'center';
            this.textDoorName.textBaseline = 'bottom';
            this.textDoorName.size(this.rectName.x + 5, this.rectName.y - 5, dx, dy);
            this.textDoorName.paintText(this.ctx, door.name);
            if (this.border) {
                this.ctx.save();
                this.ctx.beginPath();
                this.ctx.lineWidth = 2;
                this.ctx.strokeStyle = "blue";
                this.ctx.rect(this.x, this.y, this.w, this.h);
                this.ctx.stroke();
                this.ctx.restore();
            }
        };
        return ViewDoor;
    }(Mark));
    var retV = (function () {
        function retV() {
            this.cname = null;
            this.path = null;
        }
        return retV;
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
