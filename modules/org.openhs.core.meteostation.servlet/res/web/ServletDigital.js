// Copyright 2015 Christian d'Heureuse, Inventec Informatik AG, Zurich, Switzerland
// www.source-code.biz, www.inventec.ch/chdh
//
// This module is multi-licensed and may be used under the terms of any of the following licenses:
//
//  LGPL, GNU Lesser General Public License, V2.1 or later, http://www.gnu.org/licenses/lgpl.html
//  EPL, Eclipse Public License, V1.0 or later, http://www.eclipse.org/legal
//
// Please contact the author if you need another license.
// This module is provided "as is", without warranties of any kind.
//
// Home page: http://www.source-code.biz/snippets/typescript
/// <reference path="jquery.d.ts" />
var DigiMeteoStation;
(function (DigiMeteoStation) {
    //------------------------------------------------------------------------------
    var btnRect = {
        x: 0,
        y: 0,
        width: 200,
        heigth: 100
    };
    var Temperature = (function () {
        function Temperature(clockCanvas) {
            this.clockCanvas = clockCanvas;
            this.timerEvent();
            /*
           if (!Date.now) {
              Date.now = function() {
                 return new Date().getTime(); }; }
           this.timerEvent();
            */
            clockCanvas.addEventListener('click', function (evt) {
                var mousePos = getMousePos(clockCanvas, evt);
                if (isInside(mousePos, btnRect)) {
                    //alert('clicked inside rect');
                    //Go to next screen
                    $(document).ready(function () {
                        $.post("org.openhs.core.meteostation.digital", { orderId: "next" }, function (data) {
                            //alert("Data Loaded: " + data);
                        });
                    });
                }
                else {
                    alert('clicked outside rect');
                }
            }, false);
        }
        Temperature.prototype.timerEvent = function () {
            var _this = this;
            this.paintTemp();
            var t = 10000 - Date.now() % 1000;
            window.setTimeout(function () { return _this.timerEvent(); }, t);
        };
        Temperature.prototype.paintTemp = function () {
            if (!this.staticImageCanvas || this.staticImageCanvas.width != this.clockCanvas.width || this.staticImageCanvas.height != this.clockCanvas.height) {
                this.createStaticImageCanvas();
            }
            this.clockCanvas.getContext("2d").drawImage(this.staticImageCanvas, 0, 0);
            new ClockImagePainter(this.clockCanvas).paintDynamicImage();
        };
        Temperature.prototype.createStaticImageCanvas = function () {
            var canvas = document.createElement("canvas");
            canvas.width = this.clockCanvas.width;
            canvas.height = this.clockCanvas.height;
            new ClockImagePainter(canvas).paintStaticImage();
            this.staticImageCanvas = canvas;
        };
        return Temperature;
    }());
    DigiMeteoStation.Temperature = Temperature; // end class Temperature
    //------------------------------------------------------------------------------
    var clockLabel = "source-code.biz";
    var transparentColor = "rgba(0,0,0,0)";
    var whiteColor = "#FFFFFF";
    var blackColor = "#000000";
    var borderColor = "#C0C0C0";
    var secPtrColor = "#CC0000";
    var ni = 0;
    var tempIn = 0;
    var tempOut = 0;
    var timeString = "";
    var dateString = "";
    var frostOutside = false;
    var frostOutsideString = "false";
    var imgFrost = new Image();
    var imgFrostLoaded = false;
    imgFrost.src = 'ores/web/servletdigital/indicatorFrost.png';
    imgFrost.onload = function () {
        imgFrostLoaded = true;
    };
    var ClockImagePainter = (function () {
        function ClockImagePainter(canvas) {
            this.ctx = canvas.getContext("2d");
            this.width = canvas.width;
            this.height = canvas.height;
            this.r = Math.min(this.width, this.height) * 7 / 16;
            this.centerX = this.width / 2;
            this.centerY = this.height / 2;
            // ni = 0; 
        }
        ClockImagePainter.prototype.getData = function () {
            $(document).ready(function () {
                $.getJSON('org.openhs.core.meteostation.digital', { orderId: "John" }, function (data) {
                    ni = parseInt(data['order']);
                    tempIn = parseFloat(data['tempIn']);
                    tempOut = parseFloat(data['tempOut']);
                    timeString = data['time'];
                    dateString = data['date'];
                    frostOutside = JSON.parse(data['frostOutside']);
                    /*
                                
                                      $.each(data, function(key, val) {
                                         // alert(val);
                                          items.push(val);
                                      });
                                    
                                    //alert(items[0]);
                                    
                                    var day = data['order'];
                                    */
                });
            });
        };
        ClockImagePainter.prototype.paintStaticImage = function () {
            // Paint outer background.
            var ctx = this.ctx;
            ctx.save();
            ctx.fillStyle = transparentColor;
            ctx.fillRect(0, 0, this.width, this.height);
            ctx.restore();
            // Paint inner background and border.
            var width = 4;
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, this.width, this.height);
            ctx.fillStyle = blackColor;
            ctx.fill();
            ctx.lineWidth = width;
            ctx.strokeStyle = whiteColor;
            ctx.stroke();
            ctx.restore();
            ctx.save();
            var fontSize = 80;
            ctx.font = fontSize + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "white";
            ctx.fillText("In:", 20, 50);
            ctx.restore();
            ctx.save();
            ctx.font = fontSize + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "white";
            ctx.fillText("Out:", 20, 150);
            ctx.restore();
            btnRect.width = 40;
            btnRect.heigth = 100;
            btnRect.x = this.width - btnRect.width;
            btnRect.y = (this.height / 2) - (btnRect.heigth / 2);
            ctx.save();
            ctx.beginPath();
            ctx.rect(btnRect.x, btnRect.y, btnRect.width, btnRect.heigth);
            ctx.lineWidth = 2;
            ctx.strokeStyle = whiteColor;
            ctx.stroke();
            ctx.restore();
            /*
           const borderWidth = this.r / 54;
           ctx.save();
           ctx.beginPath();
           ctx.arc(this.centerX, this.centerY, this.r + borderWidth / 2, 0, 2 * Math.PI);
           ctx.fillStyle = whiteColor;
           ctx.fill();
           ctx.lineWidth = borderWidth;
           ctx.strokeStyle = borderColor;
           ctx.stroke();
           ctx.restore();
            
           // Draw 60 clock marks.
           for (let i = 0; i < 60; i++) {
              let big: boolean = i % 5 == 0;
              let rLength: number = big ? this.r * 10 / 44 : this.r * 3 / 44;
              let rWidth: number = big ? this.r * 3 / 44 : this.r / 44;
              let r2: number = this.r * 42 / 44;
              let angle: number = 2 * Math.PI / 60 * i;
              this.drawRadial(angle, r2 - rLength, r2, rWidth, rWidth, blackColor); }
           // Draw text.
           this.drawClockLabel();
            */
        };
        ClockImagePainter.prototype.paintDynamicImage = function () {
            /*
           let date: Date = new Date();
           let hour: number = date.getHours();
           let min:  number = date.getMinutes();
           let sec:  number = date.getSeconds();
           this.drawRadial(2 * Math.PI * ( (hour % 12) * 60 + min) / (12 * 60), -this.r * 10 / 44, this.r * 27 / 44, this.r * 5 / 44, this.r * 4 / 44, blackColor);
           this.drawRadial(2 * Math.PI * min / 60, -this.r * 10 / 44, this.r * 40 / 44, this.r * 9 / 88, this.r * 3 / 44, blackColor);
           this.drawRadial(2 * Math.PI * sec / 60, -this.r * 14 / 44, this.r * 27 / 44, this.r / 44, this.r / 44, secPtrColor);
           this.drawRadialFilledCircle(2 * Math.PI / 60 * sec, this.r * 27 / 44, this.r * 9 / 88, secPtrColor);
            */
            var ctx = this.ctx;
            this.getData();
            ctx.save();
            var fontSize = 80;
            ctx.font = fontSize + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "white";
            ctx.fillText(tempIn + " °C", 550, 50);
            ctx.restore();
            ctx.save();
            ctx.font = fontSize + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            ctx.textAlign = "right";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "white";
            ctx.fillText(tempOut + " °C", 550, 150);
            ctx.restore();
            ctx.save();
            ctx.font = 80 + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            ctx.textAlign = "left";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "white";
            ctx.fillText(timeString, 20, 350);
            ctx.restore();
            ctx.save();
            ctx.font = 27 + "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            ctx.textAlign = "right";
            ctx.textBaseline = "bottom";
            ctx.fillStyle = "white";
            ctx.fillText(dateString, 550, 380);
            ctx.restore();
            if (imgFrostLoaded && frostOutside) {
                ctx.save();
                ctx.drawImage(imgFrost, 20, 200, 50, 50);
                ctx.restore();
            }
            /*
           ctx.save();
           let fontSize: number = 62;
           ctx.font = fontSize + "px Helvetica, sans-serif";
           ctx.textAlign = "center";
           ctx.textBaseline = "middle";
           ctx.fillStyle = "blue";
        
           var txt = "N:" + ni;
            
           ctx.fillText(txt, 10, 150);
           ctx.restore();
            */
        };
        ClockImagePainter.prototype.drawRadial = function (alpha, r1, r2, width1, width2, color) {
            var sin = Math.sin(alpha);
            var cos = Math.cos(alpha);
            var pm1X = this.centerX + sin * r1;
            var pm1Y = this.centerY - cos * r1;
            var pm2X = this.centerX + sin * r2;
            var pm2Y = this.centerY - cos * r2;
            var px = [];
            var py = [];
            px[0] = pm1X - cos * width1 / 2;
            py[0] = pm1Y - sin * width1 / 2;
            px[3] = pm1X + cos * width1 / 2;
            py[3] = pm1Y + sin * width1 / 2;
            px[1] = pm2X - cos * width2 / 2;
            py[1] = pm2Y - sin * width2 / 2;
            px[2] = pm2X + cos * width2 / 2;
            py[2] = pm2Y + sin * width2 / 2;
            this.drawFilledPolygon(px, py, color);
        };
        ClockImagePainter.prototype.drawFilledPolygon = function (px, py, color) {
            var ctx = this.ctx;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(px[0], py[0]);
            for (var i = 1; i < px.length; i++) {
                ctx.lineTo(px[i], py[i]);
            }
            ctx.fillStyle = color;
            ctx.fill();
            ctx.restore();
        };
        ClockImagePainter.prototype.drawRadialFilledCircle = function (alpha, r1, circR, color) {
            var ctx = this.ctx;
            var p0X = this.centerX + Math.sin(alpha) * r1;
            var p0Y = this.centerY - Math.cos(alpha) * r1;
            ctx.save();
            ctx.beginPath();
            ctx.arc(p0X, p0Y, circR, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.restore();
        };
        ClockImagePainter.prototype.drawClockLabel = function () {
            var ctx = this.ctx;
            ctx.save();
            var fontSize = Math.round(this.r * 20 / 200);
            ctx.font = fontSize + "px Helvetica, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = borderColor;
            ctx.fillText(clockLabel, this.centerX, this.centerY + this.r / 2);
            ctx.restore();
        };
        return ClockImagePainter;
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
})(DigiMeteoStation || (DigiMeteoStation = {})); // end module DigiMeteoStation
