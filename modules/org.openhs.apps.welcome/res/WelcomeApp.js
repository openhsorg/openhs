// Copyright 2016 
//
//
// Home page: ***
/// <reference path='OhsLibrary/OhsCanvasGraphics.ts'/>
var WelcomeApp;
(function (WelcomeApp) {
    var ImageRect = OhsCanvasGraphics.ImageRect;
    var TextSimple = OhsCanvasGraphics.TextSimple;
    var Graphics = OhsCanvasGraphics.Graphics;
    var ImageButton = OhsCanvasGraphics.ImageButton;
    class Welcome {
        constructor(canvas, url, urlRes) {
            // Screens
            this.m_screenMain = null;
            //Graphics
            this.m_graphics = null;
            // Handlers
            this.currPage = null;
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
            this.url = '/' + url;
            this.urlRes = '/' + urlRes;
            //---Graphics---
            this.m_graphics = new Graphics(this.canvas);
            //---Screens---
            this.m_screenMain = new ScreenMain(this.m_graphics, this.url, this.urlRes);
            //---Mouse Handler---
            var self = this;
            this.canvas.addEventListener('mousedown', function (event) { self.MouseDownHandler(event); }, false);
            this.canvas.addEventListener('mouseup', function (event) { self.MouseUpHandler(event); }, false);
            this.canvas.addEventListener('mousemove', function (event) { self.MouseMoveHandler(event); }, false);
            //---Set current displayed page---
            this.currPage = this.m_screenMain;
            requestAnimationFrame(() => this.paint());
        }
        paint() {
            var benchmark = false;
            if (!benchmark) {
                if (this.currPage != null) {
                    var retVal = this.currPage.paint(this.canvas);
                }
            }
            else {
                /////**** Benchmark*****  
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                // Move registration point to the center of the canvas
                this.ctx.translate(this.canvas.width / 2, this.canvas.width / 2);
                // Rotate 1 degree
                this.ctx.rotate(Math.PI / 180);
                // Move registration point back to the top left corner of canvas
                this.ctx.translate(-this.canvas.width / 2, -this.canvas.width / 2);
                this.ctx.fillStyle = "red";
                this.ctx.fillRect(this.canvas.width / 4, this.canvas.width / 4, this.canvas.width / 2, this.canvas.height / 4);
                this.ctx.fillStyle = "blue";
                this.ctx.fillRect(this.canvas.width / 4, this.canvas.width / 2, this.canvas.width / 2, this.canvas.height / 4);
            }
            requestAnimationFrame(() => this.paint());
        }
        MouseMoveHandler(event) {
            var mousePos = getMousePos(this.canvas, event);
            /*
            * handling in current page...
            */
            if (this.currPage != null) {
                var retVal = this.currPage.MouseMoveHandler(mousePos.x, mousePos.y);
            }
        }
        MouseDownHandler(event) {
            var mousePos = getMousePos(this.canvas, event);
            /*
            * handling in current page...
            */
            if (this.currPage != null) {
                var retVal = this.currPage.MouseDownHandler(mousePos.x, mousePos.y);
            }
        }
        MouseUpHandler(event) {
            var mousePos = getMousePos(this.canvas, event);
            /*
            * handling in current page...
            */
            var mouseRet = null;
            if (this.currPage != null) {
                mouseRet = this.currPage.MouseUpHandler(mousePos.x, mousePos.y);
            }
            if (mouseRet != null) {
            }
        }
    }
    WelcomeApp.Welcome = Welcome;
    class MouseReturn {
        constructor() {
            this.nextScreen = '';
            this.nextSitePath = '';
        }
    }
    class Screen {
        constructor(m_graphics, url, urlRes) {
            this.className = "";
            // protected mouseRet:           MouseReturn             = new MouseReturn ();
            this.m_graphics = null;
            this.url = '';
            this.urlRes = '';
            this.wait = false;
            this.url = url;
            this.urlRes = urlRes;
            this.m_graphics = m_graphics;
        }
        CommandExecute(cmd) {
            return null;
        }
        MouseDownHandler(x, y) {
            return null;
        }
        MouseUpHandler(x, y) {
            return null;
        }
        MouseMoveHandler(x, y) {
            return null;
        }
        paint(canvas) {
            // this.paintDlgNumbers(canvas);
        }
        /*
        protected paintDlgNumbers (canvas: HTMLCanvasElement) {
        
            const ctx = canvas.getContext('2d');
            var width: number = canvas.width;
            var height: number = canvas.height;
            
            this.m_dlgNumbers.paint(ctx, 100, 100, 20, 20);

        }
*/
        //Called right away after entering page...       
        updateData() {
            //your code        
        }
    }
    WelcomeApp.Screen = Screen;
    class ScreenMain extends Screen {
        constructor(m_graphicsData, url, urlRes) {
            super(m_graphicsData, url, urlRes);
            this.timeText = new TextSimple();
            this.HouseNameText = new TextSimple();
            this.imgBkg = new ImageRect();
            this.imgBkg.setImage(urlRes + '/images/background.png');
            this.btnAdmin = new ImageButton(urlRes + '/images/admin.png', urlRes + '/images/admin.png');
            this.btnKitchen = new ImageButton(urlRes + '/images/kitchen.png', urlRes + '/images/kitchen.png');
            this.btnClock = new ImageButton(urlRes + '/images/clock.png', urlRes + '/images/clock.png');
            this.btnMeteo = new ImageButton(urlRes + '/images/meteo.png', urlRes + '/images/meteo.png');
        }
        MouseDownHandler(mx, my) {
        }
        MouseUpHandler(mx, my) {
            var mouseRet = new MouseReturn();
            if (this.btnAdmin.isClicked(mx, my)) {
                window.open("/admin", "_self");
            }
            else if (this.btnKitchen.isClicked(mx, my)) {
                window.open("/kitchen", "_self");
            }
            else if (this.btnClock.isClicked(mx, my)) {
                window.open("/org.openhs.core.clock.servlet.ClockSimpleServlet", "_self");
            }
            else if (this.btnMeteo.isClicked(mx, my)) {
                window.open("/org.openhs.core.meteostation.digital", "_self");
            }
            return mouseRet;
        }
        paint(canvas) {
            const ctx = canvas.getContext('2d');
            var width = canvas.width;
            var height = canvas.height;
            ctx.clearRect(0, 0, width, height);
            //Image Bkg
            this.imgBkg.size((width - 500) / 2, (height - 500) / 2, 500, 500);
            this.imgBkg.paint(ctx);
            //Border
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue';
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
            //Icons...        
            this.btnAdmin.size(200, (height - 100) / 2, 100, 100);
            this.btnAdmin.paint(ctx);
            this.btnKitchen.size(560, (height - 100) / 2, 100, 100);
            this.btnKitchen.paint(ctx);
            this.btnClock.size(500, ((height - 100) / 2) + 120, 100, 100);
            this.btnClock.paint(ctx);
            this.btnMeteo.size(((width - 100) / 2), ((height - 100) / 2) + 180, 100, 100);
            this.btnMeteo.paint(ctx);
        }
    }
    WelcomeApp.ScreenMain = ScreenMain;
    //Function to get the mouse position
    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
    function sleep(ms) {
        var unixtime_ms = new Date().getTime();
        while (new Date().getTime() < unixtime_ms + ms) { }
    }
})(WelcomeApp || (WelcomeApp = {}));
