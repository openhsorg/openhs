// Copyright 2016 
//
//
// Home page: ***
/// <reference path="OhsLibrary/jquery.d.ts" />
/// <reference path='OhsLibrary/OhsCanvasGraphics.ts'/>
/// <reference path='OhsLibrary/OhsSiteData.ts'/>
var AdminApp;
(function (AdminApp) {
    var RectRounded = OhsCanvasGraphics.RectRounded;
    var ImageRect = OhsCanvasGraphics.ImageRect;
    var TextSimple = OhsCanvasGraphics.TextSimple;
    var Graphics = OhsCanvasGraphics.Graphics;
    var ImageButton = OhsCanvasGraphics.ImageButton;
    var SymbolHome = OhsCanvasGraphics.SymbolHome;
    var DlgNumbers = OhsCanvasGraphics.DlgNumbers;
    var SiteData = OhsSiteData.SiteData;
    /*
    enum SwitchScreen {
        Main,
        Floor,
        Room
    }
    */
    const whiteColor = "#FFFFFF";
    const blackColor = "#000000";
    const borderColor = "#C0C0C0";
    const secPtrColor = "#CC0000";
    const textColor = "#000000";
    const circleColor = "#c0c0c0";
    let fontSizeTempOut = 50;
    let fontSizeWind = 24;
    let fontSizeHum = 27;
    let fontSizeTime = fontSizeTempOut;
    let fontSizeDate = fontSizeWind;
    const imagePadlockOff = '/adminres/images/symbol_padlock_off.png';
    const imagePadlockOffPushed = '/adminres/images/symbol_padlock_off_pushed.png';
    class Admin {
        // private refreshRateMain: number = 5000; 
        constructor(canvas) {
            // Data        
            this.m_siteData = null; //general Site Data      
            // Timers
            //  private timerData;
            //   private timerPaint;
            //  private timerLoadGraphics;
            // Screens
            this.m_screenMain = null;
            this.m_screenRoom = null;
            this.m_screenFloor = null;
            //Graphics
            this.m_graphics = null;
            // Handlers
            this.currPage = null;
            this.canvas = canvas;
            this.ctx = canvas.getContext("2d");
            //---Data---
            this.m_siteData = new SiteData();
            //---Graphics---
            this.m_graphics = new Graphics(this.canvas);
            //---Screens---
            this.m_screenMain = new ScreenMain(this.m_siteData, this.m_graphics);
            this.m_screenFloor = new ScreenFloor(this.m_siteData, this.m_graphics);
            //   this.m_screenRoom = new ScreenRoom(this.m_siteData, this.m_graphics);      
            //---Mouse Handler---
            var self = this;
            this.canvas.addEventListener('mousedown', function (event) { self.MouseDownHandler(event); }, false);
            this.canvas.addEventListener('mouseup', function (event) { self.MouseUpHandler(event); }, false);
            this.canvas.addEventListener('mousemove', function (event) { self.MouseMoveHandler(event); }, false);
            //---Set current displayed page---
            //this.openPage(this.m_screenMain);
            //this.SwitchPage(ScreenMain.name);
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
                this.SwitchPage(mouseRet.nextScreen, mouseRet.nextSitePath);
            }
        }
        SwitchPage(page, thingPath) {
            if (page == ScreenMain.name) {
                this.currPage = this.m_screenMain;
            }
            else if (page == ScreenFloor.name) {
                this.currPage = this.m_screenFloor;
                this.currPage.m_thingPtr = this.m_siteData.getThing(thingPath);
            }
        }
        openPageold(next) {
            /*
                if (next != null) {
                    
                    next.m_prevPage = SwitchScreen.Main;
                    
                    if (this.currPage != null) {
                       //window.alert("curr page close");
                    //    this.currPage.close();
                        
                        if (this.currPage instanceof ScreenFloor) {
                            next.m_prevPage = SwitchScreen.Floor;
                           // window.alert("floor switch");
                            
                        }
                    }
     
                    this.currPage = next; //open(refreshRate);
                    this.currPage.updateData();
                }
                */
        }
    }
    AdminApp.Admin = Admin;
    class MouseReturn {
        constructor() {
            this.nextScreen = '';
            this.nextSitePath = '';
        }
    }
    class Screen {
        constructor(m_siteData, m_graphics) {
            // protected mouseRet:           MouseReturn             = new MouseReturn ();
            this.m_siteData = null;
            this.m_graphics = null;
            this.m_dlgNumbers = new DlgNumbers();
            this.m_thingPtr = null;
            this.wait = false;
            this.m_siteData = m_siteData;
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
        paintWait(canvas) {
            const ctx = canvas.getContext('2d');
            var width = canvas.width;
            var height = canvas.height;
            var rect = new RectRounded();
            var text = new TextSimple();
            ctx.save();
            rect.size((width / 2) - 100, (height / 2) - 25, 200, 60);
            rect.rad(10);
            rect.paint(ctx);
            ctx.fillStyle = "#b8b894";
            ctx.lineWidth = 2;
            ctx.strokeStyle = "gray";
            ctx.fill();
            ctx.stroke();
            text.size(rect.x + 5, rect.y + 5, 60, 30);
            text.fontColor = "#1a75ff";
            text.fontSize = 40;
            text.paintText(ctx, 'Wait...');
            ctx.restore();
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
    AdminApp.Screen = Screen;
    class ScreenMain extends Screen {
        constructor(m_siteData, m_graphicsData) {
            super(m_siteData, m_graphicsData);
            this.timeText = new TextSimple();
            this.HouseNameText = new TextSimple();
            this.textNumFloors = new TextSimple();
            this.m_symbolHome = new SymbolHome();
            this.btnDelete = new ImageButton(imagePadlockOff, imagePadlockOffPushed);
            this.enableDlgNumbers = false;
            //---Data---
            //Time & Date
            this.timeText.fontSize = 40;
            this.timeText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.timeText.fontColor = textColor;
            this.timeText.textAlign = "right";
            this.timeText.textBaseline = "middle";
            //House name
            this.HouseNameText.fontSize = 40;
            this.HouseNameText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.HouseNameText.fontColor = textColor;
            this.HouseNameText.textAlign = "left";
            this.HouseNameText.textBaseline = "middle";
            //Text number floors
            this.textNumFloors.fontSize = 18;
            this.textNumFloors.fontFamily = "px sans-serif";
            this.textNumFloors.fontColor = '#196619';
            this.textNumFloors.textAlign = "left";
            this.textNumFloors.textBaseline = "middle";
        }
        MouseDownHandler(mx, my) {
        }
        MouseUpHandler(mx, my) {
            var mouseRet = new MouseReturn();
            if (this.enableDlgNumbers) {
                var n = this.m_dlgNumbers.MouseUpHandler(mx, my);
                if (n != -1) {
                    this.enableDlgNumbers = false;
                    //  window.alert('Set number of floors: ' + n);
                    //Set number floors...
                    this.m_siteData.setNumberFloors(n);
                    return null;
                }
            }
            var ret = this.m_symbolHome.MouseUpHandler(mx, my);
            if (ret != null) {
                //window.alert('ret: ' + ret);
                mouseRet.nextScreen = ScreenFloor.name;
                mouseRet.nextSitePath = ret;
                return mouseRet;
            }
            if (this.textNumFloors.isClicked(mx, my)) {
                //  window.alert('changing num floors...');
                this.enableDlgNumbers = true;
            }
            if (this.btnDelete.isClicked(mx, my)) {
                // window.alert('Add floor');
                this.m_siteData.addFloor();
                //mouseRet.nextScreen = ScreenMain.name;
                //mouseRet.nextSitePath = null;
                return null;
            }
            return null;
        }
        paint(canvas) {
            const ctx = canvas.getContext('2d');
            var width = canvas.width;
            var height = canvas.height;
            ctx.clearRect(0, 0, width, height);
            //Border
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue';
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
            //Time          
            this.timeText.size(canvas.width - 260, 2, 250, 65);
            this.timeText.paintText(ctx, this.m_siteData.timeString);
            //House name  
            this.HouseNameText.size(30, 2, 250, 65);
            this.HouseNameText.paintText(ctx, this.m_siteData.m_site.name);
            //house symbol
            this.m_symbolHome.paint(ctx, 200, 100, 400, 300, this.m_siteData.m_floorArray);
            //Text num floors
            this.textNumFloors.size(10, 300, 100, 60);
            this.textNumFloors.paintText(ctx, 'Number floors is ' + this.m_siteData.m_floorArray.length);
            if (this.enableDlgNumbers) {
                this.m_dlgNumbers.paint(ctx, 100, 100, 60, 60);
            }
            //Add next floor
            this.btnDelete.size((width) * 0.77, height - 75, 60, 60);
            this.btnDelete.paint(ctx);
        }
    }
    AdminApp.ScreenMain = ScreenMain;
    class ScreenFloor extends Screen {
        constructor(siteData, m_graphics) {
            super(siteData, m_graphics);
            this.thingPath = "";
            this.imgFloor2 = new ImageRect();
            //private imgFloor:               HTMLImageElement            = null;        
            // private imgFloorLoaded:         boolean                     = false;        
            this.txtThingPath = new TextSimple();
            this.m_doorMarks = new Array(); // Doors marks
            this.m_windowMarks = new Array(); // Window marks
            this.m_tempMarks = new Array(); // Temp marks
            this.m_switchMarks = new Array(); // Switch marks
            this.m_contactSensorsMarks = new Array(); // Switch marks
            this.perc = 0.8;
            this.timeText = new TextSimple();
            this.btnDelete = new ImageButton(imagePadlockOff, imagePadlockOffPushed);
            /*
                        this.imgFloor = new Image();
                        this.imgFloor.src="/infores/servlets/kitchen/floor1.jpg";
                        this.imgFloor2.setImage('/infores/servlets/kitchen/floor1.jpg');
                     */
            this.txtThingPath.size(0, 0, 250, 100);
            this.txtThingPath.textAlign = "left";
            this.txtThingPath.textBaseline = "middle";
            this.txtThingPath.fontSize = 40;
            //Time & Date
            this.timeText.fontSize = 40;
            this.timeText.fontFamily = "px Lucida Sans Unicode, Lucida Grande, sans-serif";
            this.timeText.fontColor = textColor;
            this.timeText.textAlign = "right";
            this.timeText.textBaseline = "middle";
        }
        setThing(thing) {
            /*
            var oldThing: Thing = super.getThing();
            
            super.setThing(thing);
            
            //update other data
            if (thing != oldThing) {
                
                if (thing instanceof Floor) {
                    
                    //Doors
                    var m_doorArray: Array<Door> = this.m_siteData.getFilteredThings(this.m_siteData.m_doorArray, thing.getSitePath());
                    
                    this.m_graphics.setNumber3(m_doorArray.length, this.m_doorMarks, DoorMark);
                    
                    for (let id in this.m_doorMarks) {
                        this.m_doorMarks[id].setThing(<Thing>m_doorArray[id]);
                    }
                    
                    //Windows
                    var m_windowArray: Array<Window> = this.m_siteData.getFilteredThings(this.m_siteData.m_windowArray, thing.getSitePath());
                    
                    this.m_graphics.setNumber3(m_windowArray.length, this.m_windowMarks, WindowMark);
                    
                    for (let id in this.m_windowMarks) {
                        this.m_windowMarks[id].setThing(<Thing>m_windowArray[id]);
                    }
                    
                    //Temperature Sensors
                    var temps: Array<TemperatureSensor> = this.m_siteData.getFilteredThings(this.m_siteData.m_tempSensorArray, thing.getSitePath());
                    
                    this.m_graphics.setNumber3(temps.length, this.m_tempMarks, TempMark);
                    
                    for (let id in this.m_tempMarks) {
                        this.m_tempMarks[id].setThing(<Thing>temps[id]);
                    }
                    
                    //Switch
                    
                    var m_switchArray: Array<Switch> = this.m_siteData.getFilteredThings(this.m_siteData.m_switchArray, thing.getSitePath());
                 //   window.alert('Switch marks:' + m_switchArray.length + ' : ' + thing.getSitePath() + " :sa: " + this.m_siteData.m_switchArray.length);
                    var m_switchArray2: Array<Switch> = this.m_siteData.getFilteredThingsNoContains(m_switchArray, 'doors');
                    var m_switchArray3: Array<Switch> = this.m_siteData.getFilteredThingsNoContains(m_switchArray2, 'windows');
                    
                    //window.alert('Switch marks:' + m_switchArray.length + ' : ' + m_switchArray2.length + ' : ' + m_switchArray3.length + " :switches: " + this.m_siteData.m_switchArray.length + " :path: " + thing.getSitePath() + " :nFloors:" + this.m_siteData.m_floorArray.length);
                    
                    this.m_graphics.setNumber3(m_switchArray3.length, this.m_switchMarks, SwitchMark);
                    
                    for (let id in this.m_switchMarks) {
                        this.m_switchMarks[id].setThing(<Thing>m_switchArray3[id]);
                    }
                    
                    //Contact Sensor
                    var m_contactSensorArray: Array<ContactSensor> = this.m_siteData.getFilteredThings(this.m_siteData.m_contactSensorArray, thing.getSitePath());
                    var m_contactSensorArray2: Array<ContactSensor> = this.m_siteData.getFilteredThingsNoContains(m_contactSensorArray, 'doors');
                    m_contactSensorArray2= this.m_siteData.getFilteredThingsNoContains(m_contactSensorArray2, 'windows');
                    
                    this.m_graphics.setNumber3(m_contactSensorArray2.length, this.m_contactSensorsMarks, ContactSensorMark);
                    
                    for (let id in this.m_contactSensorsMarks) {
                        this.m_contactSensorsMarks[id].setThing(<Thing>m_contactSensorArray2[id]);
                    }
                }
            }
            */
        }
        MouseDownHandler(mx, my) {
            /*
            if (this.btnLock.PushEvent(mx, my)){
            
            } else if (this.btnUnLock.PushEvent(mx, my)){
            
            } else if (this.btnSwitchOn.PushEvent(mx, my)) {
                
            }else if (this.btnSwitchOff.PushEvent(mx, my)) {
                
            }
            */
        }
        MouseUpHandler(mx, my) {
            var mouseRet = new MouseReturn();
            // window.alert('go back...!!!');
            if (this.btnDelete.isClicked(mx, my)) {
                if (confirm('Do you want to delete this floor???')) {
                    mouseRet.nextScreen = ScreenMain.name;
                    mouseRet.nextSitePath = null;
                    return mouseRet;
                }
                else {
                    return null;
                }
            }
            /*
            else if (this.btnUnLock.UpEvent(mx, my)){
           //     this.m_siteData.postServerCommand('AllDoorSwitchesOff');
           //     this.m_siteData.getFastData_DoorArray();
                return null;
                
            } else if (this.btnSwitchOn.UpEvent(mx, my)){
          //      this.m_siteData.postServerCommand('AllRoomSwitchesOn');
          //      this.m_siteData.getFastData_SwitchArray();
                return null;
            } else if (this.btnSwitchOff.UpEvent(mx, my)){
           //     this.m_siteData.postServerCommand('AllRoomSwitchesOff');
           //     this.m_siteData.getFastData_SwitchArray();
                return null;
            }
            */
            /*
            var returnVal = {
                nextScreen: SwitchScreen.Main,
                nextThingPath: null
            };
                           

           this.returnVal.nextScreen = SwitchScreen.Main;
    
            
           for (let id in this.m_tempMarks) {
               if (this.m_tempMarks[id].isClicked(mx, my)) {
                   this.returnVal.nextScreen = SwitchScreen.Room;
                   
                   this.returnVal.nextThingPath = this.m_siteData.getParentPath(this.m_tempMarks[id].getThing());
              }
           }
            
           for (let id in this.m_switchMarks) {
               if (this.m_switchMarks[id].isClicked(mx, my)) {
                  
                var switchSensor: Switch = this.m_switchMarks[id].getSwitchThing();
                
                switchSensor.click();
              
                this.returnVal.nextScreen = null;
                   return this.returnVal;
                   
              }
           }
            
           for (let id in this.m_contactSensorsMarks) {
               if (this.m_contactSensorsMarks[id].isClicked(mx, my)) {
                   this.returnVal.nextScreen = null;
                   
                 //  window.alert("Clicked, SitePath: " + this.m_contactSensorsMarks[id].getThing().getSitePath());
                   
                   //this.returnVal.nextThingPath = this.siteData.getParentPath(this.m_tempMarks[id].getThing());
              }
           }
            
           return this.returnVal;
            */
        }
        paint(canvas) {
            // window.alert('Floor switch *');
            const ctx = canvas.getContext('2d');
            var width = canvas.width;
            var height = canvas.height;
            ctx.clearRect(0, 0, width, height);
            //Border
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue';
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
            //Time          
            this.timeText.size(canvas.width - 260, 2, 250, 65);
            this.timeText.paintText(ctx, this.m_siteData.timeString);
            //Name of floor          
            this.txtThingPath.size(30, 20, 250, 65);
            this.txtThingPath.paintText(ctx, this.m_thingPtr.getSitePath());
            //Delete this floor
            this.btnDelete.size((width) * 0.77, height - 75, 60, 60);
            this.btnDelete.paint(ctx);
            /*
            var thing: Thing = this.getThing();
                        
            if ((thing != null)) {
                
                if (thing instanceof Floor) {
                    
                    var floor: Floor = <Floor> thing;
                                    
                    if (floor.dimX != 0) {
                        scaleX = this.imgFloor2.w / (floor.dimX);
                    }
                    
                    if (floor.dimY != 0) {
                        scaleY = this.imgFloor2.h / (floor.dimY);
                    }
                }
            }
            */
            /*
            ctx.clearRect(0, 0, width, height);
            
            //Draw image...
            this.imgFloor2.paint(ctx);

           //    window.alert("" + scaleX + "" + scaleY + " marks:" +  this.m_doorMarks.length);
            
            //Doors...
            for (let id in this.m_doorMarks) {
                 //  window.alert("" + scaleX + " " + scaleY);
                this.m_doorMarks[id].paintByThing(ctx, this.imgFloor2.x, this.imgFloor2.y, scaleX, scaleY);
            }
            
            //Windows...
            for (let id in this.m_windowMarks) {
                this.m_windowMarks[id].paintByThing(ctx, this.imgFloor2.x, this.imgFloor2.y, scaleX, scaleY);
            }
            
            //Temperature sensors
            for (let id in this.m_tempMarks) {
                this.m_tempMarks[id].paintByThing(ctx, this.imgFloor2.x, this.imgFloor2.y, scaleX, scaleY);
            }
            
            //window.alert("Switch marks: " + this.m_switchMarks.length);
            
            //m_switchArray
            for (let id in this.m_switchMarks) {
                this.m_switchMarks[id].paintByThing(ctx, this.imgFloor2.x, this.imgFloor2.y, scaleX, scaleY);
            }
            
            //Contact sensors
            for (let id in this.m_contactSensorsMarks) {
                this.m_contactSensorsMarks[id].paintByThing(ctx, this.imgFloor2.x, this.imgFloor2.y, scaleX, scaleY);
            }
            */
        }
    }
    class ScreenRoom extends Screen {
        constructor(siteData, m_graphics) {
            super(siteData, m_graphics);
            this.m_doorMarks = new Array(); // Doors marks
            this.m_tempMarks = new Array(); // Temps marks
            this.m_switchMarks = new Array(); // Switch marks
            this.m_imgRoomDefault = new ImageRect();
            this.m_imgRoom = new ImageRect();
            this.m_imgRoomDefault.setImage('/infores/servlets/kitchen/room_default.png');
        }
        ;
        MouseUpHandler(mx, my) {
            //     this.returnVal.nextScreen = SwitchScreen.Floor;
            /*
            for (let id in this.m_doorMarks) {
               if (this.m_doorMarks[id].isClicked(mx, my)) {
                   this.returnVal.nextScreen = SwitchScreen.DoorScreen;
                   this.returnVal.nextThingPath = this.m_doorMarks[id].getThing().getSitePath();
                   return this.returnVal;
               }
           }
            */
            /*
           for (let id in this.m_tempMarks) {
               if (this.m_tempMarks[id].isClicked(mx, my)) {
                   this.returnVal.nextScreen = null;
                   return this.returnVal;
              }
           }
            
           for (let id in this.m_switchMarks) {
               if (this.m_switchMarks[id].isClicked(mx, my)) {
                  
                var switchSensor: Switch = this.m_switchMarks[id].getSwitchThing();
         //       switchSensor.postServerClick();
              //  switchSensor.getServerData();
                
                this.returnVal.nextScreen = null;
                return this.returnVal;
                   
              }
           }

            return this.returnVal;
            */
        }
        setThing(thing) {
            /*
            var oldThing: Thing = super.getThing();
            
            super.setThing(thing);
            
            //update other data
            if (thing != oldThing) {
                
                if (thing instanceof Room) {
                    
                    var room: Room = <Room> thing;
                    
                    //Images
                   
                    //Doors
                    var m_doorArray: Array<Door> = this.m_siteData.getFilteredThings(this.m_siteData.m_doorArray, thing.getSitePath());
                    
                    this.m_graphics.setNumber2(m_doorArray.length, this.m_doorMarks, DoorMark, 0, 0, 0, 0);
                    
                    for (let id in this.m_doorMarks) {
                        this.m_doorMarks[id].setThing(<Thing>m_doorArray[id]);
                    }
                    
                    //Temp marks
                    var temps: Array<TemperatureSensor> = this.m_siteData.getFilteredThings(this.m_siteData.m_tempSensorArray, thing.getSitePath());
                    
                    this.m_graphics.setNumber2(temps.length, this.m_tempMarks, TempMark, 0, 0, 0, 0);
                    
                    for (let id in this.m_tempMarks) {
                        this.m_tempMarks[id].setThing(<Thing>temps[id]);
                    }
                    
                    //Switch marks
                    var m_switchArray: Array<Switch> = this.m_siteData.getFilteredThings(this.m_siteData.m_switchArray, thing.getSitePath());
                    
                    this.m_graphics.setNumber2(m_switchArray.length, this.m_switchMarks, SwitchMark, 0, 0, 0, 0);
                    
                    for (let id in this.m_switchMarks) {
                        this.m_switchMarks[id].setThing(<Thing> m_switchArray[id]);
                    }
                }
            }
            */
        }
        paint(canvas) {
            const ctx = canvas.getContext('2d');
            var width = canvas.width;
            var height = canvas.height;
            ctx.clearRect(0, 0, width, height);
            /*
            var room: Room = <Room> this.getThing();
            
            if (room) {
                
                this.m_imgRoom.setImage(room.imageBkgPath);
                this.m_imgRoom.size(0, 0, width, height);
                this.m_imgRoom.paint(ctx);
                
            }
            */
            /*
            if (this.m_imgRoom2 != null){
                                
                if (!this.m_imgRoom2.loaded) {
                    this.m_imgRoomDefault.size(0, 0, width, height);
                    this.m_imgRoomDefault.paint(ctx);
                   
                } else {
                    this.m_imgRoom2.size(0, 0, width, height);
                    this.m_imgRoom2.paint(ctx);
                }
            }
            */
            //New door marks....
            for (let id in this.m_doorMarks) {
                this.m_doorMarks[id].size(10, 10, 50, 50);
                this.m_doorMarks[id].paint(ctx);
            }
            //New temp marks....
            for (let id in this.m_tempMarks) {
                this.m_tempMarks[id].size(10, 70, 50, 50);
                this.m_tempMarks[id].paint(ctx);
            }
            //New switch marks....
            for (let id in this.m_switchMarks) {
                this.m_switchMarks[id].size(10, 130, 50, 50);
                this.m_switchMarks[id].paint(ctx);
            }
        }
    }
    /*
    class retV {
        
        public name: any = null;
        public path: string = null;
        
    }
     */
    //Function to get the mouse position
    function getMousePos(canvas, event) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
    /*
function getAjax2(urlAdr: string, id: string) {
       
    var result = null;
    
    $.ajaxSetup ({
    // Disable caching of AJAX responses
    cache: false
    });
            
    $.ajax({async: false, url: urlAdr, data: {orderId: id}, dataType: "json", success: function(data) {
        
        result = data;
                                      
        }});
    
    return result;
    }
    
function postAjax2(urlAdr: string, id: string, dataPost: string) {
       
    var result = null;
            
    $.ajax({async: false, type: "POST", url: urlAdr, data: {postId: id, dataId: dataPost}, dataType: "json", success: function(response) {
        
        result = response;
                                      
        }});
    
    return result;
    }
    */
    function sleep(ms) {
        var unixtime_ms = new Date().getTime();
        while (new Date().getTime() < unixtime_ms + ms) { }
    }
})(AdminApp || (AdminApp = {})); // end module KitchenInfoStation
