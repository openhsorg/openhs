// Copyright 2016 
//
//
// Home page: ***

/// <reference path="OhsLibrary/jquery.d.ts" />
/// <reference path='OhsLibrary/OhsSiteData.ts'/>
/// <reference path='OhsLibrary/CanvasGraphicsUI.ts'/>

module AdminApp {
    
    import Frame =              CanvasGraphicsUI.Frame;
    import Screen =             CanvasGraphicsUI.Screen;
    import TextSimple =         CanvasGraphicsUI.TextSimple;
    import ImageButton =        CanvasGraphicsUI.ImageButton;
    import NumberRounded =      CanvasGraphicsUI.NumberRounded;
    import ListBox =            CanvasGraphicsUI.ListBox;
    import PropertyBox =        CanvasGraphicsUI.PropertyBox;

    import SiteData =           OhsSiteData.SiteData;
    import Floor =              OhsSiteData.Floor;
    import Room =               OhsSiteData.Room;
    import TemperatureSensor =  OhsSiteData.TemperatureSensor;    
    import Door =               OhsSiteData.Door;
    import Window =             OhsSiteData.Window;
    import Switch =             OhsSiteData.Switch;
    import ContactSensor =      OhsSiteData.ContactSensor;
    import Thing =              OhsSiteData.Thing;               
    
    const iconTemp =          '/adminres/images/tempIcon.png';  
    const iconSwitch =        '/adminres/images/switchIcon.png';
    const iconFloor =         '/adminres/images/floorIcon.png';
    const iconDoor =          '/adminres/images/doorIcon.png';
    const iconRoom =          '/adminres/images/roomIcon.png';    
    const iconLeave =         '/adminres/images/leave.png';      
    
    export class Admin {
        
        private canvas:                HTMLCanvasElement;
        public m_frame:                FrameMain;// = null;        
        
        constructor (canvas: HTMLCanvasElement) {                  
            this.m_frame = new FrameMain(canvas);
        }                              
    }
    
    export class FrameMain extends Frame {
        
        //Site data
        public m_siteData:               SiteData = null;
        
        //Screen pointers...             
        private m_screenMain:            ScreenMain = null;
        private m_screenTemps:           ScreenTemps = null;
        private m_screenSwitches:        ScreenSwitches = null;
        private m_screenDoors:           ScreenDoors = null;
        private m_screenRooms:           ScreenRooms = null;
        private m_screenFloors:          ScreenFloors = null;

        constructor (canvas: HTMLCanvasElement) {                                    
            super(canvas);          

            //Data
            this.m_siteData = new SiteData ();

            //Create screens...
            this.m_screenMain = new ScreenMain(this.m_siteData, canvas);
            this.addItem(this.m_screenMain);    
            
            this.m_screenTemps = new ScreenTemps(this.m_siteData, canvas);
            this.addItem(this.m_screenTemps);      
            
            this.m_screenSwitches = new ScreenSwitches(this.m_siteData, canvas);
            this.addItem(this.m_screenSwitches);              
            
            this.m_screenDoors = new ScreenDoors(this.m_siteData, canvas);
            this.addItem(this.m_screenDoors);      
            
            this.m_screenRooms = new ScreenRooms(this.m_siteData, canvas);
            this.addItem(this.m_screenRooms);  
            
            this.m_screenFloors = new ScreenFloors(this.m_siteData, canvas);
            this.addItem(this.m_screenFloors);                
            
            //Set current screen...
            this.m_curScreen = this.m_screenMain;                  
       } 
        
        public MouseDownHandler (event){
            var ret = super.MouseDownHandler(event);

            return null;
        }  
        
        public MouseUpHandler(event) {            
             var ret = super.MouseUpHandler(event);                     
             
            if (ret != null) {                            
                if (ret == this.m_screenMain.icons[0]) {
                      this.SwitchScreen(this.m_screenTemps);         
                                                            
                } else if (ret == this.m_screenTemps.btnLeave) {
                      this.SwitchScreen(this.m_screenMain);
                    
                } else if (ret == this.m_screenMain.icons[1]) {
                      this.SwitchScreen(this.m_screenSwitches);
                    
                } else if (ret == this.m_screenSwitches.btnLeave) {
                      this.SwitchScreen(this.m_screenMain);
                    
                } else if (ret == this.m_screenMain.icons[2]) {
                      this.SwitchScreen(this.m_screenDoors);
                    
                } else if (ret == this.m_screenDoors.btnLeave) {
                      this.SwitchScreen(this.m_screenMain);
                    
                } else if (ret == this.m_screenMain.icons[3]) {
                      this.SwitchScreen(this.m_screenRooms);
                    
                } else if (ret == this.m_screenRooms.btnLeave) {
                      this.SwitchScreen(this.m_screenMain);
                    
                } else if (ret == this.m_screenMain.icons[4]) {
                      this.SwitchScreen(this.m_screenFloors);
                    
                } else if (ret == this.m_screenFloors.btnLeave) {
                      this.SwitchScreen(this.m_screenMain);
                    
                }                                                
            }  
            
            return null;
        }        
        
        public SwitchScreen(newScreen: Screen) {
            if (newScreen != null){
                this.m_curScreen = newScreen;
            }
        }
        
    }    
    
    export class ScreenMain extends Screen {
        
        public m_siteData:          SiteData = null;  
        
        //Texts
        protected m_textTime:       TextSimple = null;       
        
        //Icons
        protected btnTemp:          ImageButton;
        protected btnSwitch:        ImageButton;
        public icons:               Array <ImageButton>;
        protected nums:             Array <NumberRounded>;
        
        constructor (siteData: SiteData, canvas: HTMLCanvasElement) {
            super(canvas);        
            
            this.m_siteData = siteData;            
            this.buildLayout();
       }
        
        public buildLayout () {
                        
            //Time
            this.m_textTime = new TextSimple('Time', 750, 10, 250, 100);
            this.add(this.m_textTime);          
            
            //Icons
            this.icons = new Array <ImageButton> ();
            this.icons.push(new ImageButton(iconTemp, iconTemp, 30, 30, 150, 150));
            this.icons.push(new ImageButton(iconSwitch, iconSwitch, 200, 30, 150, 150));
            this.icons.push(new ImageButton(iconDoor, iconDoor, 400, 30, 150, 150));
            this.icons.push(new ImageButton(iconRoom, iconRoom, 400, 30, 150, 150));
            this.icons.push(new ImageButton(iconFloor, iconFloor, 400, 30, 150, 150));
                                         
            for (let icon of this.icons) {
                this.add(icon);
            }
            
            //Nums Rounded
            this.nums = new Array <NumberRounded> ();
            this.nums.push(new NumberRounded());
            this.nums.push(new NumberRounded());
            this.nums.push(new NumberRounded());
            this.nums.push(new NumberRounded());
            this.nums.push(new NumberRounded());
                                         
            for (let num of this.nums) {
                this.add(num);
            }            
                        
            this.IconMatrix (this.GetSize().width - 150, this.GetSize().height, 4, 3, 150, 150);
            
        }
        
        //Arange icons to rectangle...
        public IconMatrix (w: number, h: number, numX: number, numY: number, iconSizeX: number, iconSizeY: number) {
            
            var dx = (w - (numX * iconSizeX)) / (numX + 1);
            var dy = (h - (numY * iconSizeY)) / (numY + 1); 
            
            var id = 0;
            
            for (var i = 1; i <= numY; i++) {
                for (var j = 1; j <= numX; j++) {
                    
                    var dxa = (j * dx) + ((j - 1) * iconSizeX);
                    var dya = (i * dy) + ((i - 1) * iconSizeY);
                    
                    if (this.icons.length > id) {
                        this.icons[id].Size(dxa, dya, 150, 150);
                    }
                    
                    if (this.nums.length > id) {
                        this.nums[id].center(dxa + 150 - 5, dya + 150 - 5, 50, 50);
                    }                    
                    
                    id ++;                    
                }                            
            }                    
        }

        
        protected updateData () {
            super.updateData();      
        /*
            const ctx = this.canvas.getContext('2d');
            ctx.rect(50,20,200,120);
            ctx.stroke();
            ctx.clip();
            */
            //Update data....
            this.m_textTime.setText(this.m_siteData.timeString);
            
            //Numbers
            this.nums[0].SetNumber(this.m_siteData.m_tempSensorArray.length);
            this.nums[1].SetNumber(this.m_siteData.m_switchArray.length);
            this.nums[2].SetNumber(this.m_siteData.m_doorArray.length);
            this.nums[3].SetNumber(this.m_siteData.m_roomArray.length);
            this.nums[4].SetNumber(this.m_siteData.m_floorArray.length);
            
            //Redraw...
          //  super.paint();                       
        }         
    } //class end
    
    export class ScreenThings extends Screen {
        
        public m_siteData:          SiteData = null;  
        
        //Texts
        protected m_textTime:       TextSimple = null;
        protected m_textTitle:      TextSimple = null;
        
        //Buttons
        public btnLeave:            ImageButton;
        
        //List box - sensors
        public m_list:              ListBox;
        
        //Property box - data
        public m_propData:          PropertyBox;        
 
        constructor (siteData: SiteData, canvas: HTMLCanvasElement) {
            super(canvas);        
            
            this.m_siteData = siteData;            
            this.buildLayout();
       }

        
        public buildLayout () {
   
            //Time
            this.m_textTime = new TextSimple('Time', 750, 10, 250, 100);
            this.add(this.m_textTime);          
            
            this.m_textTitle = new TextSimple('', 20, 20, 250, 40);
            this.add(this.m_textTitle);  
    
            //Leave button
            this.btnLeave = new ImageButton(iconLeave, iconLeave, 750, 450, 80, 80);
            this.add(this.btnLeave);
            
            //ListBox Select
            this.m_list = new ListBox();
            this.add(this.m_list);
            this.m_list.Size(20, 100, 200, 350);  
            this.m_list.selectedRow = 0;         
            
            //Property box
            this.m_propData = new PropertyBox();
            this.add(this.m_propData);
            this.m_propData.Size(230, 100, 600, 350);                   
        }                        
    }//class end   
     
    export class ScreenTemps extends ScreenThings {        
        
        protected updateData() {                                
            super.updateData();
            
            this.m_textTitle.setText('Temperature sensors');

            //Update data....
            this.m_textTime.setText(this.m_siteData.timeString);
            
            var i = 0;
            
            for (var item of this.m_siteData.m_tempSensorArray) {                
                var txt = item.name;
                
                this.m_list.setText((i + 1).toString() + '. ' + txt, i);
                
                i ++;
            }
            
            //Text details:
            if (this.m_list.selectedRow != 0) {
                
                let item = this.m_siteData.m_tempSensorArray[this.m_list.selectedRow - 1];
                
                this.m_propData.setText("Name:", item.name, 0);
                this.m_propData.setText("Site Path:", item.getSitePath(), 1);
                this.m_propData.setText("Device Path:", item.getDevicePath(), 2); 
            }                        
        }                 
    } //class end
    
    export class ScreenSwitches extends ScreenThings {        
        
        protected updateData() {                                
            super.updateData();
            
            this.m_textTitle.setText('Switches');

            //Update data....
            this.m_textTime.setText(this.m_siteData.timeString);
            
            var i = 0;
            
            for (var item of this.m_siteData.m_switchArray) {                
                var txt = item.name;
                
                this.m_list.setText((i + 1).toString() + '. ' + txt, i);
                
                i ++;
            }
            
            //Text details:
            if (this.m_list.selectedRow != 0) {
                
                let item = this.m_siteData.m_switchArray[this.m_list.selectedRow - 1];
                
                this.m_propData.setText("Name:", item.name, 0);
                this.m_propData.setText("Site Path:", item.getSitePath(), 1);
                this.m_propData.setText("Device Path:", item.getDevicePath(), 2); 
            }                        
        }                 
    } //class end    
    
    export class ScreenDoors extends ScreenThings {        
        
        protected updateData() {                                
            super.updateData();
            
            this.m_textTitle.setText('Doors');

            //Update data....
            this.m_textTime.setText(this.m_siteData.timeString);
            
            var i = 0;
            
            for (var item of this.m_siteData.m_doorArray) {                
                var txt = item.name;
                
                this.m_list.setText((i + 1).toString() + '. ' + txt, i);
                
                i ++;
            }
            
            //Text details:
            if (this.m_list.selectedRow != 0) {
                
                let item = this.m_siteData.m_doorArray[this.m_list.selectedRow - 1];
                
                this.m_propData.setText("Name:", item.name, 0);
                this.m_propData.setText("Site Path:", item.getSitePath(), 1);
              //  this.m_propData.setText("Device Path:", item.getDevicePath(), 2); 
            }                        
        }                 
    } //class end   
    
    export class ScreenRooms extends ScreenThings {        
        
        protected updateData() {                                
            super.updateData();
            
            this.m_textTitle.setText('Rooms');

            //Update data....
            this.m_textTime.setText(this.m_siteData.timeString);
            
            var i = 0;
            
            for (var item of this.m_siteData.m_roomArray) {                
                var txt = item.name;
                
                this.m_list.setText((i + 1).toString() + '. ' + txt, i);
                
                i ++;
            }
            
            //Text details:
            if (this.m_list.selectedRow != 0) {
                
                let item = this.m_siteData.m_roomArray[this.m_list.selectedRow - 1];
                
                this.m_propData.setText("Name:", item.name, 0);
                this.m_propData.setText("Site Path:", item.getSitePath(), 1);
            //    this.m_propData.setText("Device Path:", item.getDevicePath(), 2); 
            }                        
        }                 
    } //class end  
    
    
    export class ScreenFloors extends ScreenThings {        
        
        protected updateData() {                                
            super.updateData();
            
            this.m_textTitle.setText('Floors');

            //Update data....
            this.m_textTime.setText(this.m_siteData.timeString);
            
            var i = 0;
            
            for (var item of this.m_siteData.m_floorArray) {                
                var txt = item.name;
                
                this.m_list.setText((i + 1).toString() + '. ' + txt, i);
                
                i ++;
            }
            
            //Text details:
            if (this.m_list.selectedRow != 0) {
                
                let item = this.m_siteData.m_floorArray[this.m_list.selectedRow - 1];
                
                this.m_propData.setText("Name:", item.name, 0);
                this.m_propData.setText("Site Path:", item.getSitePath(), 1);
               // this.m_propData.setText("Device Path:", item.getDevicePath(), 2); 
            }                        
        }                 
    } //class end     
} 



