// Copyright 2016 
//
//
// Home page: ***
/// <reference path="OhsLibrary/jquery.d.ts" />
/// <reference path='OhsLibrary/OhsSiteData.ts'/>
/// <reference path='OhsLibrary/CanvasGraphicsUI.ts'/>
var AdminApp;
(function (AdminApp) {
    var Frame = CanvasGraphicsUI.Frame;
    var Screen = CanvasGraphicsUI.Screen;
    var TextSimple = CanvasGraphicsUI.TextSimple;
    var ImageButton = CanvasGraphicsUI.ImageButton;
    var SiteData = OhsSiteData.SiteData;
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
    const iconTemp = '/adminres/images/tempIcon.png';
    const iconSwitch = '/adminres/images/switchIcon.png';
    class Admin {
        constructor(canvas) {
            this.m_frame = new FrameMain(canvas);
        }
    }
    AdminApp.Admin = Admin;
    class FrameMain extends Frame {
        constructor(canvas) {
            super(canvas);
            //Site data
            this.m_siteData = null;
            //Screen pointers...             
            this.m_screenMain = null;
            //Data
            this.m_siteData = new SiteData();
            //Create screens...
            this.m_screenMain = new ScreenMain(this.m_siteData);
            this.addItem(this.m_screenMain);
            //Set current screen...
            this.m_curScreen = this.m_screenMain;
        }
    }
    AdminApp.FrameMain = FrameMain;
    class ScreenMain extends Screen {
        constructor(siteData) {
            super();
            this.m_siteData = null;
            //Texts
            this.m_textTime = null;
            this.m_siteData = siteData;
            this.buildLayout();
        }
        buildLayout() {
            //Time
            this.m_textTime = new TextSimple('Time', 550, 30, 250, 100);
            this.add(this.m_textTime);
            //Icons
            this.btnTemp = new ImageButton(iconTemp, iconTemp, 30, 30, 150, 150);
            this.add(this.btnTemp);
            this.btnSwitch = new ImageButton(iconSwitch, iconSwitch, 200, 30, 150, 150);
            this.add(this.btnSwitch);
        }
        paint(canvas) {
            //Update data....
            this.m_textTime.setText(this.m_siteData.timeString);
            //Redraw...
            super.paint(canvas);
        }
        MouseDownHandler(x, y) {
            var ret = super.MouseDownHandler(x, y);
            //Analyse click..
            if (ret == null) {
                return null;
            }
            if (ret == this.m_textTime) {
                window.alert('Clicked time...!');
            }
            else if (ret == this.btnTemp) {
                window.alert('Clicked temp...!');
            }
            return null;
        }
    }
    AdminApp.ScreenMain = ScreenMain;
})(AdminApp || (AdminApp = {}));
