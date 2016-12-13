// Copyright 2016 
//
//
// Home page: ***
/// <reference path="jquery.d.ts" />
var KitchenInfoStation;
(function (KitchenInfoStation) {
    //------------------------------------------------------------------------------
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
    var weatherForecast = new Array();
    weatherForecast.push(new WeatherData()); //today
    weatherForecast.push(new WeatherData()); //today + 1
    weatherForecast.push(new WeatherData()); //today + 2
    weatherForecast.push(new WeatherData()); //today + 3
    weatherForecast.push(new WeatherData()); //today + 4      
    var appMode = Application.None; //Mode of application
    var roomNum = 1; //number of selected room for Application.Room
    var nextServlet = "";
    var Infoscreen = (function () {
        //protected stopWatch: StopWatch = null;           
        //private timerStopWatch;   
        function Infoscreen(clockCanvas, next) {
            var _this = this;
            this.timerPaintStep = 3000;
            this.clockCanvas = clockCanvas;
            this.imPainter = new ImagePainter(this.clockCanvas);
            this.ns = "/org.openhs.core.meteostation"; //next;
            this.timerGetData();
            this.timerEvent();
            nextServlet = next; //next;
            clockCanvas.addEventListener('click', function () { return _this.MouseClickHandler(event); });
        }
        Infoscreen.prototype.timerGetData = function () {
            var _this = this;
            this.getData();
            // this.paintScreen();    
            this.timerData = window.setTimeout(function () { return _this.timerGetData(); }, 5000);
        };
        Infoscreen.prototype.timerEvent = function () {
            var _this = this;
            this.getData();
            this.paintScreen();
            this.timerPaint = window.setTimeout(function () { return _this.timerEvent(); }, this.timerPaintStep);
        };
        /*
     private timerEventStopWatch() {
             
         this.imPainter.stopWatch.paint();
         this.timerStopWatch = window.setTimeout(() => this.timerEventStopWatch(), 50);
     }
     */
        Infoscreen.prototype.paintScreen = function () {
            if (!this.staticImageCanvas || this.staticImageCanvas.width != this.clockCanvas.width || this.staticImageCanvas.height != this.clockCanvas.height) {
                this.createStaticImageCanvas();
            }
            this.clockCanvas.getContext("2d").drawImage(this.staticImageCanvas, 0, 0);
            this.imPainter.weatherToday = weatherForecast[0]; //.fillData(weatherForecast);
            this.imPainter.paint();
            //  this.imPainter.gameLoop();
        };
        Infoscreen.prototype.MouseClickHandler = function (event) {
            var mousePos = getMousePos(this.clockCanvas, event);
            if (appMode == Application.None) {
                if (isInside(mousePos, stopwatchRect)) {
                    appMode = Application.Watch;
                    this.imPainter.stopWatch.start();
                    // this.timerEventStopWatch();
                    window.clearTimeout(this.timerPaint);
                    this.timerPaintStep = 40;
                    this.timerEvent();
                }
                else if (isInside(mousePos, this.imPainter.tmpInText.getRect())) {
                    appMode = Application.Floor;
                }
                else if (isInside(mousePos, forecastRect)) {
                    appMode = Application.WeatherForecast;
                }
            }
            else if (appMode == Application.Watch) {
                if (this.imPainter.stopWatch.getStatus()) {
                    if (this.imPainter.stopWatch.stopwatchRect.isClicked(mousePos.x, mousePos.y)) {
                        this.imPainter.stopWatch.stop();
                        //clearTimeout(this.timerStopWatch);                 
                        //this.timerStopWatch = null;
                        window.clearTimeout(this.timerPaint);
                        this.timerPaintStep = 3000;
                        this.timerEvent();
                    }
                }
                else {
                    appMode = Application.None;
                }
            }
            else if (appMode == Application.Floor) {
                var room = this.imPainter.floor.clickedTempMark(mousePos.x, mousePos.y);
                if (room != -1) {
                    appMode = Application.Room;
                    roomNum = room;
                }
                else {
                    appMode = Application.None;
                }
            }
            else if (appMode == Application.Room) {
                appMode = Application.Floor;
            }
            else if (appMode == Application.WeatherForecast) {
                appMode = Application.None;
            }
            this.paintScreen();
        };
        Infoscreen.prototype.createStaticImageCanvas = function () {
            var canvas = document.createElement("canvas");
            canvas.width = this.clockCanvas.width;
            canvas.height = this.clockCanvas.height;
            new ImagePainter(canvas).paintStaticImage();
            this.staticImageCanvas = canvas;
        };
        //Get data from server...    
        Infoscreen.prototype.getData = function () {
            $(document).ready(function () {
                $.getJSON('kitchen', { orderId: "InfoData" }, function (data) {
                    timeString = data['time'];
                    dateString = data['date'];
                    weatherForecast[0].tempIn = parseFloat(data['tempIn']);
                    weatherForecast[0].tempOut = parseFloat(data['tempOut']);
                    weatherForecast[0].frostOutside = JSON.parse(data['frostOutside']);
                    weatherForecast[0].weatherSymbol = JSON.parse(data['weatherSymbol']);
                    weatherForecast[0].windSpeed = parseFloat(data['windSpeed']);
                });
            });
            $(document).ready(function () {
                $.getJSON('kitchen', { orderId: "Day1" }, function (data) {
                    weatherForecast[1].tempOut = parseFloat(data['temp']);
                    weatherForecast[1].weatherSymbol = JSON.parse(data['weatherSymbol']);
                    weatherForecast[1].windSpeed = parseFloat(data['windSpeed']);
                });
            });
            $(document).ready(function () {
                $.getJSON('kitchen', { orderId: "Day2" }, function (data) {
                    weatherForecast[2].tempOut = parseFloat(data['temp']);
                    weatherForecast[2].weatherSymbol = JSON.parse(data['weatherSymbol']);
                    weatherForecast[2].windSpeed = parseFloat(data['windSpeed']);
                });
            });
            $(document).ready(function () {
                $.getJSON('kitchen', { orderId: "Day3" }, function (data) {
                    weatherForecast[3].tempOut = parseFloat(data['temp']);
                    weatherForecast[3].weatherSymbol = JSON.parse(data['weatherSymbol']);
                    weatherForecast[3].windSpeed = parseFloat(data['windSpeed']);
                });
            });
        };
        return Infoscreen;
    }());
    KitchenInfoStation.Infoscreen = Infoscreen; // end class Temperature
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
    var Rect = (function () {
        function Rect(x, y, w, h) {
            this.x = 0;
            this.y = 0;
            this.w = 0;
            this.h = 0;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
        }
        Rect.prototype.width = function () {
            return this.w;
        };
        Rect.prototype.height = function () {
            return this.h;
        };
        Rect.prototype.setWidth = function (w) {
            this.w = w;
        };
        Rect.prototype.setHeight = function (h) {
            this.h = h;
        };
        Rect.prototype.isClicked = function (clx, cly) {
            return (clx > this.x && clx < this.x + this.w && cly < this.y + this.h && cly > this.y);
        };
        return Rect;
    }());
    var Text = (function () {
        function Text(ctx, x, y, width, height) {
            this.fontSize = 10;
            this.fontColor = "#000000";
            this.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.textAlign = "center";
            this.textBaseline = "middle";
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.ctx = ctx;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
        Text.prototype.paint = function (text) {
            this.ctx.save();
            this.ctx.font = this.fontSize + this.fontFamily;
            this.ctx.textAlign = this.textAlign;
            this.ctx.textBaseline = this.textBaseline;
            this.ctx.fillStyle = this.fontColor;
            this.ctx.fillText(text, this.x, this.y);
            this.ctx.restore();
        };
        Text.prototype.setSize = function (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        };
        Text.prototype.copyFrom = function (tx) {
            this.x = tx.x;
            this.y = tx.y;
            this.width = tx.width;
            this.height = tx.height;
            this.ctx = tx.ctx;
            this.fontSize = tx.fontSize;
            this.fontColor = tx.fontColor;
            this.fontFamily = tx.fontFamily;
            this.textAlign = tx.textAlign;
            this.textBaseline = tx.textBaseline;
        };
        Text.prototype.getRect = function () {
            var rect = {
                x: 0,
                y: 0,
                width: 0,
                heigth: 0
            };
            rect.x = this.x;
            rect.y = this.y;
            rect.width = this.width;
            rect.heigth = this.height;
            if (this.textAlign == "center") {
                rect.x = this.x - (this.width / 2);
            }
            else if (this.textAlign == "right" || this.textAlign == "end") {
                rect.x = this.x - this.width;
            }
            if (this.textBaseline == "bottom") {
                rect.y = this.y - this.height;
            }
            else if (this.textBaseline == "middle") {
                rect.y = this.y - (this.height / 2);
            }
            return rect;
        };
        return Text;
    }());
    var TempMark = (function () {
        function TempMark(ctx, x, y, width, height) {
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.img = null;
            this.ctx = ctx;
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.txt = new Text(ctx, x, y, width, height);
            this.txt.textAlign = "left";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            this.img = new Image();
            this.img.src = "/infores/servlets/kitchen/tempSymbol.png";
        }
        TempMark.prototype.setSize = function (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.txt.x = x;
            this.txt.y = y;
            this.txt.width = width;
            this.txt.height = height;
        };
        TempMark.prototype.paint = function (text) {
            this.ctx.save();
            this.ctx.beginPath();
            this.ctx.arc(this.x + (this.width / 2), this.y, this.width / 2, 0, 2 * Math.PI, false);
            this.ctx.fillStyle = '#ccffe6';
            this.ctx.fill();
            this.ctx.lineWidth = 2;
            this.ctx.strokeStyle = '#00cc69';
            this.ctx.stroke();
            this.ctx.restore();
            this.txt.x = this.x + 20;
            this.txt.paint(text);
            //Draw image...
            //   if (this.imgLoaded) {     
            this.ctx.save();
            this.ctx.drawImage(this.img, this.x - 8, this.y - 20, 40, 40);
            this.ctx.restore();
            // }         
        };
        TempMark.prototype.getRect = function () {
            var rect = {
                x: 0,
                y: 0,
                width: 0,
                heigth: 0
            };
            rect.x = this.x;
            rect.y = this.y;
            rect.width = this.width;
            rect.heigth = this.height;
            return rect;
        };
        TempMark.prototype.isClicked = function (clx, cly) {
            return (clx > this.x && clx < this.x + this.width && cly < this.y + this.height && cly > this.y);
        };
        return TempMark;
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
            this.paintEffect();
            ctx.save();
            ctx.beginPath();
            this.roundRect(this.stopwatchRect.x, this.stopwatchRect.y, this.stopwatchRect.width(), this.stopwatchRect.height(), 40);
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.lineWidth = 1;
            ctx.strokeStyle = "green";
            ctx.stroke();
            ctx.font = 32 + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "green";
            ctx.fillText("stopwatch", this.stopwatchRect.x + 55, this.stopwatchRect.y + 30);
            var dots = "........................";
            var str = dots.substring(0, this.dotCounter);
            ctx.fillText(str, this.stopwatchRect.x + 55, this.stopwatchRect.y + 43);
            var text = this.zeroPad(this.hrs, 2) + ":" + this.zeroPad(this.min, 2) + ":" + this.zeroPad(this.sec, 2);
            ctx.font = 42 + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            ctx.fillText(text, this.stopwatchRect.x + 50, this.stopwatchRect.y + 80);
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
            // alert("***stopping...");
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
    var ForecastPanel = (function () {
        function ForecastPanel(ctx, fcs) {
            this.x = 0.0;
            this.y = 0.0;
            this.width = 0.0;
            this.height = 0.0;
            this.lineWidth = 2.0;
            this.forecast = null;
            this.imgWind = null;
            this.forecast = fcs;
            this.txtWind = new Text(ctx, 0, 0, 0, 0);
            this.txt = new Text(ctx, 0, 0, 0, 0);
            this.txt.textAlign = "left";
            this.txt.textBaseline = "middle";
            this.txt.fontSize = 20;
            imgWind = new Image();
            imgWind.src = "/infores/servlets/kitchen/wind.png";
        }
        ForecastPanel.prototype.setSize = function (x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.txt.x = x;
            this.txt.y = y;
            this.txt.width = width;
            this.txt.height = height;
        };
        ForecastPanel.prototype.setForecast = function (fcs) {
            this.forecast = fcs;
        };
        ForecastPanel.prototype.paint = function (ctx) {
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
            //Draw forecast image
            var img = this.forecast.getImage();
            ctx.save();
            ctx.drawImage(img, this.x + this.lineWidth, this.y + this.lineWidth, this.width - (2 * this.lineWidth), this.width - (2 * this.lineWidth));
            ctx.restore();
            //Draw temperature...
            this.txt.x = this.x + ((this.width - (2 * this.lineWidth)) / 2);
            this.txt.y = this.width * 1.25;
            this.txt.textAlign = "center";
            this.txt.paint(this.forecast.tempOut + " \u00B0C");
            //wind image
            ctx.save();
            ctx.drawImage(imgWind, this.x + (this.width * 0.1), this.width * 1.5, 40, 40);
            ctx.restore();
            //wind text
            this.txtWind.x = this.x + (this.width * 0.9);
            this.txtWind.y = this.width * 1.6;
            this.txtWind.width = this.width * 0.4;
            this.txtWind.textAlign = "right";
            this.txtWind.fontSize = 15;
            this.txtWind.textBaseline = "hanging";
            this.txtWind.paint(this.forecast.windSpeed + " \u00B0C");
        };
        return ForecastPanel;
    }());
    var Floor = (function () {
        function Floor(canvas) {
            this.TempMarks = new Array();
            this.imgFloor = null;
            this.imgFloorLoaded = false;
            this.ctx = canvas.getContext("2d");
            this.width = canvas.width;
            this.height = canvas.height;
            this.imgFloor = new Image();
            this.imgFloor.src = "/infores/servlets/kitchen/floor1.jpg";
            // this.imgFloor.onload = function(){
            //    this.imgFloorLoaded = true;
            //   }          
            this.TempMarks.push(new TempMark(this.ctx, 0, 0, 0, 0));
            this.TempMarks.push(new TempMark(this.ctx, 0, 0, 0, 0));
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
            this.TempMarks[0].setSize(250, 350, 80, 40);
            this.TempMarks[0].paint(weatherToday.tempOut + " \u00B0C");
            //Inside mark
            this.TempMarks[1].setSize(280, 200, 80, 40);
            this.TempMarks[1].paint(weatherToday.tempIn + " \u00B0C");
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
            this.TempMarks.push(new TempMark(this.ctx, 0, 0, 0, 0));
            this.TempMarks.push(new TempMark(this.ctx, 0, 0, 0, 0));
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
            this.TempMarks[0].setSize(250, 350, 80, 40);
            this.TempMarks[0].paint(weatherToday.tempOut + " \u00B0C");
            //Inside mark
            this.TempMarks[1].setSize(280, 200, 80, 40);
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
            //alert("hello: "+cId);
            return cId;
        };
        return Room;
    }());
    var ImagePainter = (function () {
        function ImagePainter(canvas) {
            //  this.weatherForecast = new WeatherData();
            this.weatherToday = null;
            //private roomTmps: Array<Text> = new Array<Text>();
            //private TempMarks: Array<TempMark> = new Array<TempMark>();
            this.forecastPanels = new Array();
            this.stopWatch = null;
            this.floor = null;
            this.room = new Array();
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
            this.tmpInText = new Text(this.ctx, (this.width / 2), (this.height / 2) + 50, 150, 100);
            this.tmpOutText = new Text(this.ctx, (this.width / 2), (this.height / 2) + 50, 150, 100);
            this.forecastPanels.push(new ForecastPanel(this.ctx, weatherForecast[0]));
            this.forecastPanels.push(new ForecastPanel(this.ctx, weatherForecast[1]));
            this.forecastPanels.push(new ForecastPanel(this.ctx, weatherForecast[2]));
            this.forecastPanels.push(new ForecastPanel(this.ctx, weatherForecast[3]));
            this.floor = new Floor(canvas);
            this.room.push(new Room(canvas, "/infores/servlets/kitchen/room0.png")); //0: Outside
            this.room.push(new Room(canvas, "/infores/servlets/kitchen/room1.png")); //1: Room1...
            this.room.push(new Room(canvas, "/infores/servlets/kitchen/room2.png"));
            this.room.push(new Room(canvas, "/infores/servlets/kitchen/room3.png"));
        }
        ImagePainter.prototype.paintStaticImage = function () {
            // Paint outer background.
            var ctx = this.ctx;
            ctx.save();
            ctx.fillStyle = whiteColor;
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.restore();
        };
        ImagePainter.prototype.paint = function () {
            if (appMode == Application.None || appMode == Application.Watch) {
                this.paintBasic();
            }
            else if (appMode == Application.Floor) {
                this.floor.paint(this.weatherToday);
            }
            else if (appMode == Application.Room) {
                this.room[roomNum].paint(this.weatherToday);
            }
            else if (appMode == Application.WeatherForecast) {
                this.paintWeatherForecast();
            }
        };
        ImagePainter.prototype.paintWeatherForecast = function () {
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
        ImagePainter.prototype.paintBasic = function () {
            var ctx = this.ctx;
            //Draw image...
            var img = this.weatherToday.getImage();
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
            ctx.save();
            ctx.font = fontSizeWind + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            ctx.fillStyle = textColor;
            ctx.fillText(this.weatherToday.windSpeed + " m/s", 320, 100);
            ctx.restore();
            //Time
            //ctx.save();
            ctx.font = fontSizeTime + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            ctx.fillStyle = textColor;
            ctx.fillText(timeString, 580, 50);
            ctx.restore();
            //Date
            // ctx.save();
            ctx.font = fontSizeDate + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            ctx.fillStyle = textColor;
            ctx.fillText(dateString, 580, 100);
            ctx.restore();
            //Inside temperature
            this.tmpInText.fontSize = fontSizeTempIn;
            this.tmpInText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.tmpInText.fontColor = textColor;
            this.tmpInText.textAlign = "center";
            this.tmpInText.textBaseline = "middle";
            this.tmpInText.paint(this.weatherToday.tempIn + " \u00B0C");
            //Outside temperature    
            this.tmpOutText.copyFrom(this.tmpInText);
            this.tmpOutText.x = 320;
            this.tmpOutText.y = 50;
            this.tmpOutText.textAlign = "right";
            this.tmpOutText.paint(this.weatherToday.tempOut + " \u00B0C");
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
        ImagePainter.prototype.roundRect = function (x, y, width, height, radius) {
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
        return ImagePainter;
    }()); // end class ClockImagePainter
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
