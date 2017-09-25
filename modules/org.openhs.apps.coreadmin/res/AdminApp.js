// Copyright 2016 
//
//
// Home page: ***
"use strict";
var AdminApp;
(function (AdminApp) {
    var Frame = CanvasGraphicsUI.Frame;
    var Screen = CanvasGraphicsUI.Screen;
    var TextSimple = CanvasGraphicsUI.TextSimple;
    var ImageButton = CanvasGraphicsUI.ImageButton;
    var NumberRounded = CanvasGraphicsUI.NumberRounded;
    var ListBox = CanvasGraphicsUI.ListBox;
    var PropertyBox = CanvasGraphicsUI.PropertyBox;
    var SiteData = OhsSiteData.SiteData;
    var Floor = OhsSiteData.Floor;
    var Room = OhsSiteData.Room;
    var TemperatureSensor = OhsSiteData.TemperatureSensor;
    var Door = OhsSiteData.Door;
    var Switch = OhsSiteData.Switch;
    var WifiManager = OhsWifiAdmin.WifiManager;
    const iconTemp = '/adminres/images/tempIcon.png';
    const iconSwitch = '/adminres/images/switchIcon.png';
    const iconFloor = '/adminres/images/floorIcon.png';
    const iconDoor = '/adminres/images/doorIcon.png';
    const iconRoom = '/adminres/images/roomIcon.png';
    const iconLeave = '/adminres/images/leave.png';
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
            this.m_wifiManager = null;
            //Screen pointers...             
            this.m_screenMain = null;
            this.m_screenTemps = null;
            this.m_screenSwitches = null;
            this.m_screenDoors = null;
            this.m_screenRooms = null;
            this.m_screenFloors = null;
            //Data
            this.m_siteData = new SiteData();
            this.m_wifiManager = new WifiManager();
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
        MouseDownHandler(event) {
            var ret = super.MouseDownHandler(event);
            return null;
        }
        MouseUpHandler(event) {
            var ret = super.MouseUpHandler(event);
            if (ret != null) {
                if (ret == this.m_screenMain.icons[0]) {
                    this.SwitchScreen(this.m_screenTemps);
                }
                else if (ret == this.m_screenTemps.btnLeave) {
                    this.SwitchScreen(this.m_screenMain);
                }
                else if (ret == this.m_screenMain.icons[1]) {
                    this.SwitchScreen(this.m_screenSwitches);
                }
                else if (ret == this.m_screenSwitches.btnLeave) {
                    this.SwitchScreen(this.m_screenMain);
                }
                else if (ret == this.m_screenMain.icons[2]) {
                    this.SwitchScreen(this.m_screenDoors);
                }
                else if (ret == this.m_screenDoors.btnLeave) {
                    this.SwitchScreen(this.m_screenMain);
                }
                else if (ret == this.m_screenMain.icons[3]) {
                    this.SwitchScreen(this.m_screenRooms);
                }
                else if (ret == this.m_screenRooms.btnLeave) {
                    this.SwitchScreen(this.m_screenMain);
                }
                else if (ret == this.m_screenMain.icons[4]) {
                    this.SwitchScreen(this.m_screenFloors);
                }
                else if (ret == this.m_screenFloors.btnLeave) {
                    this.SwitchScreen(this.m_screenMain);
                }
            }
            return null;
        }
        SwitchScreen(newScreen) {
            if (newScreen != null) {
                this.m_curScreen = newScreen;
            }
        }
    }
    AdminApp.FrameMain = FrameMain;
    class ScreenMain extends Screen {
        constructor(siteData, canvas) {
            super(canvas);
            this.m_siteData = null;
            //Texts
            this.m_textTime = null;
            this.m_siteData = siteData;
            this.buildLayout();
        }
        buildLayout() {
            //Time
            this.m_textTime = new TextSimple(this.ctx, 'Time', 730, 0, 250, 100);
            this.add(this.m_textTime);
            this.m_textTime.fontSize = 26;
            this.m_textTime.fontFamily = "px Tahoma, sans-serif";
            this.m_textTime.fontColor = '#8c8c8c';
            this.m_textTime.textAlign = "left";
            this.m_textTime.textBaseline = "top";
            this.m_textTime.bold = false;
            //Icons
            this.icons = new Array();
            this.icons.push(new ImageButton(this.ctx, iconTemp, iconTemp, 30, 30, 150, 150));
            this.icons.push(new ImageButton(this.ctx, iconSwitch, iconSwitch, 200, 30, 150, 150));
            this.icons.push(new ImageButton(this.ctx, iconDoor, iconDoor, 400, 30, 150, 150));
            this.icons.push(new ImageButton(this.ctx, iconRoom, iconRoom, 400, 30, 150, 150));
            this.icons.push(new ImageButton(this.ctx, iconFloor, iconFloor, 400, 30, 150, 150));
            for (let icon of this.icons) {
                this.add(icon);
            }
            //Nums Rounded
            this.nums = new Array();
            this.nums.push(new NumberRounded(this.ctx));
            this.nums.push(new NumberRounded(this.ctx));
            this.nums.push(new NumberRounded(this.ctx));
            this.nums.push(new NumberRounded(this.ctx));
            this.nums.push(new NumberRounded(this.ctx));
            for (let num of this.nums) {
                this.add(num);
            }
            this.IconMatrix(this.GetSize().width - 150, this.GetSize().height, 4, 3, 150, 150);
        }
        //Arange icons to rectangle...
        IconMatrix(w, h, numX, numY, iconSizeX, iconSizeY) {
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
                    id++;
                }
            }
        }
        updateData() {
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
    }
    AdminApp.ScreenMain = ScreenMain; //class end
    class ScreenThings extends Screen {
        constructor(siteData, canvas) {
            super(canvas);
            this.strName = 'Name';
            this.strSitePath = 'Site Path';
            this.strDevicePath = 'Device Path';
            this.m_siteData = null;
            //Texts
            this.m_textTime = null;
            this.m_textTitle = null;
            this.m_siteData = siteData;
            this.buildLayout();
        }
        buildLayout() {
            //Time
            this.m_textTime = new TextSimple(this.ctx, 'Time', 730, 0, 250, 100);
            this.add(this.m_textTime);
            this.m_textTime.fontSize = 26;
            this.m_textTime.fontFamily = "px Tahoma, sans-serif";
            this.m_textTime.fontColor = '#8c8c8c';
            this.m_textTime.textAlign = "left";
            this.m_textTime.textBaseline = "top";
            this.m_textTime.bold = false;
            this.m_textTitle = new TextSimple(this.ctx, '', 15, 40, 250, 40);
            this.add(this.m_textTitle);
            this.m_textTitle.fontSize = 26;
            this.m_textTitle.fontFamily = "px Tahoma, sans-serif";
            this.m_textTitle.fontColor = '#8c8c8c';
            this.m_textTitle.textAlign = "left";
            this.m_textTitle.textBaseline = "top";
            this.m_textTitle.bold = false;
            //Leave button
            this.btnLeave = new ImageButton(this.ctx, iconLeave, iconLeave, 750, 450, 80, 80);
            this.add(this.btnLeave);
            //ListBox Select
            this.m_list = new ListBox(this.ctx);
            this.add(this.m_list);
            this.m_list.Size(20, 100, 200, 350);
            this.m_list.selectedRow = 0;
            //Property box
            this.m_propData = new PropertyBox(this.ctx);
            this.add(this.m_propData);
            this.m_propData.Size(230, 100, 600, 350);
        }
        changeDlg(thing, dataName, data) {
            var o = this;
            swal({
                title: dataName,
                input: 'text',
                inputValue: data,
                inputPlaceholder: 'Please enter new ' + dataName,
                showCancelButton: true,
                inputValidator: function (value) {
                    return new Promise(function (resolve, reject) {
                        if (value) {
                            resolve();
                        }
                        else {
                            reject('You need to write something!');
                        }
                    });
                }
            }).then(function (name) {
                o.SetData(thing, dataName, name);
            });
        }
        SetData(thing, dataName, data) {
        }
        setName(thing, name) {
            swal({
                title: this.strName,
                input: 'text',
                inputValue: name,
                inputPlaceholder: 'Please enter new ' + this.strName,
                showCancelButton: true,
                inputValidator: function (value) {
                    return new Promise(function (resolve, reject) {
                        if (value) {
                            resolve();
                        }
                        else {
                            reject('You need to write something!');
                        }
                    });
                }
            }).then(function (name) {
                var messType = 'error';
                if (thing.setName(name)) {
                    thing.update();
                    messType = 'success';
                }
                swal({
                    type: messType,
                    title: 'Changed...' + name
                });
            });
        }
        setSitePath(thing, sitePath) {
            var m_siteData = this.m_siteData;
            swal({
                title: this.strName,
                input: 'text',
                inputValue: sitePath,
                inputPlaceholder: 'Please enter new ' + this.strSitePath,
                showCancelButton: true,
                inputValidator: function (value) {
                    return new Promise(function (resolve, reject) {
                        if (value) {
                            resolve();
                        }
                        else {
                            reject('You need to write something!');
                        }
                    });
                }
            }).then(function (name) {
                var messType = 'error';
                if (thing.setSitePath(name)) {
                    //thing.update();     
                    if (thing instanceof TemperatureSensor) {
                        m_siteData.updateObjectArray('idTempSensArr');
                    }
                    else if (thing instanceof Switch) {
                        m_siteData.updateObjectArray('idSwitchArr');
                    }
                    else if (thing instanceof Door) {
                        m_siteData.updateObjectArray('idDoorArr');
                    }
                    else if (thing instanceof Room) {
                        m_siteData.updateObjectArray('idRoomArr');
                    }
                    else if (thing instanceof Floor) {
                        m_siteData.updateObjectArray('idFloorArr');
                    }
                    messType = 'success';
                }
                swal({
                    type: messType,
                    title: 'Changed...' + name
                });
            });
        }
        setDevicePath(thing, devicePath) {
            swal({
                title: this.strName,
                input: 'text',
                inputValue: devicePath,
                inputPlaceholder: 'Please enter new ' + this.strSitePath,
                showCancelButton: true,
                inputValidator: function (value) {
                    return new Promise(function (resolve, reject) {
                        if (value) {
                            resolve();
                        }
                        else {
                            reject('You need to write something!');
                        }
                    });
                }
            }).then(function (name) {
                var messType = 'error';
                if (thing.setDevicePath(name)) {
                    thing.update();
                    messType = 'success';
                }
                swal({
                    type: messType,
                    title: 'Changed...' + name
                });
            });
        }
    }
    AdminApp.ScreenThings = ScreenThings; //class end   
    class ScreenTemps extends ScreenThings {
        updateData() {
            super.updateData();
            this.m_textTitle.setText('Temperature sensors');
            //Update data....
            this.m_textTime.setText(this.m_siteData.timeString);
            var i = 0;
            for (var item of this.m_siteData.m_tempSensorArray) {
                var txt = item.getName();
                this.m_list.setText((i + 1).toString() + '. ' + txt, i);
                i++;
            }
            //Text details:
            if (this.m_list.selectedRow != 0) {
                let item = this.m_siteData.m_tempSensorArray[this.m_list.selectedRow - 1];
                this.m_propData.setText(this.strName + ':', item.getName(), 0);
                this.m_propData.setText(this.strSitePath, item.getSitePath(), 1);
                this.m_propData.setText(this.strDevicePath, item.getDevicePath(), 2);
            }
        }
        MouseUpHandler(x, y) {
            var ret = super.MouseUpHandler(x, y);
            if (ret == null)
                return ret;
            var thing = null;
            if (this.m_list.selectedRow >= 1) {
                thing = this.m_siteData.m_tempSensorArray[this.m_list.selectedRow - 1];
            }
            if (ret == this.m_propData.m_data.m_items[0]) {
                this.setName(thing, ret.getText());
            }
            else if (ret == this.m_propData.m_data.m_items[1]) {
                this.setSitePath(thing, ret.getText());
            }
            else if (ret == this.m_propData.m_data.m_items[2]) {
                this.setDevicePath(thing, ret.getText());
            }
            return ret;
        }
        SetData(thing, dataName, data) {
            if (thing != null) {
                if (thing instanceof TemperatureSensor) {
                    var ret = false;
                    var sent = false;
                    if (dataName === this.strName) {
                        sent = true;
                        ret = thing.setName(data);
                        if (ret)
                            thing.update();
                    }
                    else if (dataName === this.strSitePath) {
                        sent = true;
                        ret = thing.setSitePath(data);
                        if (ret)
                            this.m_siteData.updateObjectArray('idTempSensArr');
                    }
                    else if (dataName === this.strDevicePath) {
                        sent = true;
                        ret = thing.setDevicePath(data);
                        if (ret)
                            thing.update();
                    }
                    if (sent) {
                        var tp = 'success';
                        if (ret) {
                        }
                        else {
                            tp = 'error';
                        }
                        swal({
                            type: tp,
                            title: 'Changed...' + data
                        });
                    }
                }
            }
        }
    }
    AdminApp.ScreenTemps = ScreenTemps; //class end
    class ScreenSwitches extends ScreenThings {
        updateData() {
            super.updateData();
            this.m_textTitle.setText('Switches');
            //Update data....
            this.m_textTime.setText(this.m_siteData.timeString);
            var i = 0;
            for (var item of this.m_siteData.m_switchArray) {
                var txt = item.getName();
                this.m_list.setText((i + 1).toString() + '. ' + txt, i);
                i++;
            }
            //Text details:
            if (this.m_list.selectedRow != 0) {
                let item = this.m_siteData.m_switchArray[this.m_list.selectedRow - 1];
                this.m_propData.setText(this.strName + ':', item.getName(), 0);
                this.m_propData.setText(this.strSitePath, item.getSitePath(), 1);
                this.m_propData.setText(this.strDevicePath, item.getDevicePath(), 2);
            }
        }
        MouseUpHandler(x, y) {
            var ret = super.MouseUpHandler(x, y);
            if (ret == null)
                return ret;
            var thing = null;
            if (this.m_list.selectedRow >= 1) {
                thing = this.m_siteData.m_switchArray[this.m_list.selectedRow - 1];
            }
            if (ret == this.m_propData.m_data.m_items[0]) {
                this.setName(thing, ret.getText());
            }
            else if (ret == this.m_propData.m_data.m_items[1]) {
                this.setSitePath(thing, ret.getText());
            }
            else if (ret == this.m_propData.m_data.m_items[2]) {
                this.setDevicePath(thing, ret.getText());
            }
            return ret;
        }
    }
    AdminApp.ScreenSwitches = ScreenSwitches; //class end    
    class ScreenDoors extends ScreenThings {
        updateData() {
            super.updateData();
            this.m_textTitle.setText('Doors');
            //Update data....
            this.m_textTime.setText(this.m_siteData.timeString);
            var i = 0;
            for (var item of this.m_siteData.m_doorArray) {
                var txt = item.getName();
                this.m_list.setText((i + 1).toString() + '. ' + txt, i);
                i++;
            }
            //Text details:
            if (this.m_list.selectedRow != 0) {
                let item = this.m_siteData.m_doorArray[this.m_list.selectedRow - 1];
                this.m_propData.setText("Name:", item.getName(), 0);
                this.m_propData.setText("Site Path:", item.getSitePath(), 1);
            }
        }
        MouseUpHandler(x, y) {
            var ret = super.MouseUpHandler(x, y);
            if (ret == null)
                return ret;
            var thing = null;
            if (this.m_list.selectedRow >= 1) {
                thing = this.m_siteData.m_doorArray[this.m_list.selectedRow - 1];
            }
            if (ret == this.m_propData.m_data.m_items[0]) {
                this.setName(thing, ret.getText());
            }
            else if (ret == this.m_propData.m_data.m_items[1]) {
                this.setSitePath(thing, ret.getText());
            }
            else if (ret == this.m_propData.m_data.m_items[2]) {
                this.setDevicePath(thing, ret.getText());
            }
            return ret;
        }
    }
    AdminApp.ScreenDoors = ScreenDoors; //class end   
    class ScreenRooms extends ScreenThings {
        updateData() {
            super.updateData();
            this.m_textTitle.setText('Rooms');
            //Update data....
            this.m_textTime.setText(this.m_siteData.timeString);
            var i = 0;
            for (var item of this.m_siteData.m_roomArray) {
                var txt = item.getName();
                this.m_list.setText((i + 1).toString() + '. ' + txt, i);
                i++;
            }
            //Text details:
            if (this.m_list.selectedRow != 0) {
                let item = this.m_siteData.m_roomArray[this.m_list.selectedRow - 1];
                this.m_propData.setText(this.strName + ':', item.getName(), 0);
                this.m_propData.setText(this.strSitePath, item.getSitePath(), 1);
            }
        }
        MouseUpHandler(x, y) {
            var ret = super.MouseUpHandler(x, y);
            if (ret == null)
                return ret;
            var thing = null;
            if (this.m_list.selectedRow >= 1) {
                thing = this.m_siteData.m_roomArray[this.m_list.selectedRow - 1];
            }
            if (ret == this.m_propData.m_data.m_items[0]) {
                this.setName(thing, ret.getText());
            }
            else if (ret == this.m_propData.m_data.m_items[1]) {
                this.setSitePath(thing, ret.getText());
            }
            else if (ret == this.m_propData.m_data.m_items[2]) {
                this.setDevicePath(thing, ret.getText());
            }
            return ret;
        }
    }
    AdminApp.ScreenRooms = ScreenRooms; //class end  
    class ScreenFloors extends ScreenThings {
        updateData() {
            super.updateData();
            this.m_textTitle.setText('Floors');
            //Update data....
            this.m_textTime.setText(this.m_siteData.timeString);
            var i = 0;
            for (var item of this.m_siteData.m_floorArray) {
                var txt = item.getName();
                this.m_list.setText((i + 1).toString() + '. ' + txt, i);
                i++;
            }
            //Text details:
            if (this.m_list.selectedRow != 0) {
                let item = this.m_siteData.m_floorArray[this.m_list.selectedRow - 1];
                this.m_propData.setText(this.strName + ':', item.getName(), 0);
                this.m_propData.setText(this.strSitePath, item.getSitePath(), 1);
            }
        }
        MouseUpHandler(x, y) {
            var ret = super.MouseUpHandler(x, y);
            if (ret == null)
                return ret;
            var thing = null;
            if (this.m_list.selectedRow >= 1) {
                thing = this.m_siteData.m_floorArray[this.m_list.selectedRow - 1];
            }
            if (ret == this.m_propData.m_data.m_items[0]) {
                this.setName(thing, ret.getText());
            }
            else if (ret == this.m_propData.m_data.m_items[1]) {
                this.setSitePath(thing, ret.getText());
            }
            else if (ret == this.m_propData.m_data.m_items[2]) {
                this.setDevicePath(thing, ret.getText());
            }
            return ret;
        }
    }
    AdminApp.ScreenFloors = ScreenFloors; //class end     
})(AdminApp || (AdminApp = {}));
