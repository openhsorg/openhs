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

    import SiteData =           OhsSiteData.SiteData;
    import Floor =              OhsSiteData.Floor;
    import Room =               OhsSiteData.Room;
    import TemperatureSensor =  OhsSiteData.TemperatureSensor;    
    import Door =               OhsSiteData.Door;
    import Window =             OhsSiteData.Window;
    import Switch =             OhsSiteData.Switch;
    import ContactSensor =      OhsSiteData.ContactSensor;
    import Thing =              OhsSiteData.Thing;               
  /*            
    const whiteColor        = "#FFFFFF";
    const blackColor        = "#000000";
    const borderColor       = "#C0C0C0";
    const secPtrColor       = "#CC0000";
    const textColor         = "#000000";
    const circleColor       = "#c0c0c0";
    let fontSizeTempOut:    number = 50;    
    let fontSizeWind:       number = 24;      
    let fontSizeHum:        number = 27;
    let fontSizeTime:       number = fontSizeTempOut;
    let fontSizeDate:       number = fontSizeWind;        
    */
    /*
    const imageAdd           = '/adminres/images/add.png';
    const imageDestroy       = '/adminres/images/destroy.png';
    const imagePadlockOff           = '/adminres/images/add.png';
    const imagePadlockOffPushed     = '/adminres/images/add.png';
    const imageLeave            = '/adminres/images/leave.png';
    const imageFloor            = '/adminres/images/floor.png';
    const imageBkg            = '/adminres/images/config_bkg.png';
    const imageTempIcon          = '/adminres/images/tempIcon.png';
    const imageDoorIcon          = '/adminres/images/doorIcon.png';
    const imageSwitchIcon          = '/adminres/images/switchIcon.png';
    const imageRoomIcon          = '/adminres/images/roomIcon.png';
    const imageFloorIcon          = '/adminres/images/floorIcon.png';
    */
    
    const iconTemp          = '/adminres/images/tempIcon.png';  
    const iconSwitch        = '/adminres/images/switchIcon.png';  
    
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

        constructor (canvas: HTMLCanvasElement) {                                    
            super(canvas);          

            //Data
            this.m_siteData = new SiteData ();

            //Create screens...
            this.m_screenMain = new ScreenMain(this.m_siteData);
            this.addItem(this.m_screenMain);                  
            
            //Set current screen...
            this.m_curScreen = this.m_screenMain;                  
       }         
    }    
    
    export class ScreenMain extends Screen {
        
        public m_siteData:          SiteData = null;  
        
        //Texts
        protected m_textTime:       TextSimple = null;       
        
        //Icons
        protected btnTemp:          ImageButton;
        protected btnSwitch:        ImageButton;
        
        constructor (siteData: SiteData) {
            super();        
            
            this.m_siteData = siteData;            
            this.buildLayout();
       }
        
        public buildLayout () {
                        
            //Time
            this.m_textTime = new TextSimple('Time', 550, 30, 250, 100);
            this.add(this.m_textTime);          
            
            //Icons
            this.btnTemp = new ImageButton(iconTemp, iconTemp, 30, 30, 150, 150);
            this.add(this.btnTemp);
            
            this.btnSwitch = new ImageButton(iconSwitch, iconSwitch, 200, 30, 150, 150);
            this.add(this.btnSwitch);            
        }

        
        public paint (canvas: HTMLCanvasElement) {          
            
            //Update data....
            this.m_textTime.setText(this.m_siteData.timeString);
            
            //Redraw...
            super.paint(canvas);                       
        }   
        
        public MouseDownHandler(x: number, y: number) {
            var ret = super.MouseDownHandler(x, y);
            
            //Analyse click..
            
            if (ret == null) {
                return null;
            }
                      
            if (ret == this.m_textTime) {
                window.alert('Clicked time...!');
                
            } else if (ret == this.btnTemp){
                window.alert('Clicked temp...!');
            }
            
            return null;
        }             
        
    }
     
} 



