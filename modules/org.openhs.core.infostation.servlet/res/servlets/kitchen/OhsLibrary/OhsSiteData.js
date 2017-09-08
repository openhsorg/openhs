/**
 * Module with data structure...
 * Author: Michal Valny
 * Date: July-4-2017
 * This module communicates with: org.openhs.core.site.webservices
 */
var OhsSiteData;
(function (OhsSiteData) {
    const servletUrl = 'kitchen';
    const url = 'services/ohs_site_data';
    const switchId = 'SwitchS';
    const idCcontactSensor = 'ContactSensor';
    const allDoorsId = 'AllDoors';
    const idTimeDate = 'idTimeDate';
    const idSiteData = 'idSiteData';
    const idContactSensArr = 'idContactSensArr';
    const idTempSensArr = 'idTempSensArr';
    const idSwitchArr = 'idSwitchArr';
    const idDoorArr = 'idDoorArr';
    const idWindowArr = 'idWindowArr';
    const idRoomArr = 'idRoomArr';
    const idFloorArr = 'idFloorArr';
    const idThingCommand = 'idThingCommand';
    const idThingGet = 'idThingGet';
    /*
    function sleep(ms) {
        var unixtime_ms = new Date().getTime();
        while(new Date().getTime() < unixtime_ms + ms) {}
    }
    */
    class SiteData {
        constructor() {
            //---Site data---
            this.m_floorArray = null;
            this.m_roomArray = null;
            this.m_tempSensorArray = null;
            this.m_switchArray = null;
            this.m_doorArray = null;
            this.m_windowArray = null;
            this.m_contactSensorArray = null;
            this.getCount = 0;
            //---Other data---
            this.timeString = "---";
            this.dateString = "---";
            this.m_floorArray = new Array();
            this.m_roomArray = new Array();
            this.m_tempSensorArray = new Array();
            this.m_switchArray = new Array();
            this.m_doorArray = new Array();
            this.m_windowArray = new Array();
            this.m_contactSensorArray = new Array();
            //Initial load
            this.getObjectArray(idFloorArr);
            this.getObjectArray(idRoomArr);
            this.getObjectArray(idDoorArr);
            this.getObjectArray(idWindowArr);
            this.getObjectArray(idTempSensArr);
            this.getObjectArray(idSwitchArr);
            this.getObjectArray(idContactSensArr);
            //Timers
            this.fastTimerGetDataEvent(500);
            this.slowTimerGetDataEvent(5000);
        }
        slowTimerGetDataEvent(step) {
            this.getSlowData();
            window.clearTimeout(this.slowTimerGetData);
            this.slowTimerGetData = window.setTimeout(() => this.slowTimerGetDataEvent(step), step);
        }
        fastTimerGetDataEvent(step) {
            this.getFastData();
            window.clearTimeout(this.fastTimerGetData);
            this.fastTimerGetData = window.setTimeout(() => this.fastTimerGetDataEvent(step), step);
        }
        getFastData() {
            //Date & Time
            this.get_DateTime();
            //Switch 
            //    this.getObjectArray(idSwitchArr);            
        }
        getSlowData() {
            //   this.get_DateTime();
            if (this.getCount == 0) {
                this.getObjectArray(idFloorArr);
            }
            else if (this.getCount == 1) {
                this.getObjectArray(idRoomArr);
            }
            else if (this.getCount == 2) {
                this.getObjectArray(idDoorArr);
            }
            else if (this.getCount == 3) {
                this.getObjectArray(idWindowArr);
            }
            else if (this.getCount == 4) {
                this.getObjectArray(idSwitchArr);
            }
            else if (this.getCount == 5) {
                this.getObjectArray(idTempSensArr);
            }
            else if (this.getCount == 6) {
                this.getObjectArray(idContactSensArr);
            }
            if (this.getCount == 6) {
                this.getCount = 0;
            }
            else {
                this.getCount++;
            }
        }
        get_DateTime() {
            var js = JSON.stringify({
                idPost: idTimeDate
            });
            var ret = postAjax(url, js);
            if (ret != null) {
                if (JSON.parse(ret['return'])) {
                    // this.stateInt = parseInt(ret['state_int']);  
                    this.dateString = ret['date'];
                    this.timeString = ret['time'];
                }
            }
        }
        getObjectArray(idObjArray) {
            var js = JSON.stringify({
                idPost: idObjArray
            });
            var ret = postAjax(url, js);
            if (ret != null) {
                if (JSON.parse(ret['return'])) {
                    var str = JSON.stringify(ret[idObjArray]);
                    var parsedJSON = JSON.parse(str);
                    //Floors
                    if (idObjArray == idFloorArr) {
                        this.setNumber(parsedJSON.length, this.m_floorArray, Floor);
                        for (var i = 0; i < parsedJSON.length; i++) {
                            var object = parsedJSON[i];
                            this.m_floorArray[i].fillFromJSON(object);
                        }
                    }
                    else if (idObjArray == idRoomArr) {
                        this.setNumber(parsedJSON.length, this.m_roomArray, Room);
                        for (var i = 0; i < parsedJSON.length; i++) {
                            var object = parsedJSON[i];
                            this.m_roomArray[i].fillFromJSON(object);
                        }
                    }
                    else if (idObjArray == idDoorArr) {
                        this.setNumber(parsedJSON.length, this.m_doorArray, Door);
                        for (var i = 0; i < parsedJSON.length; i++) {
                            var object = parsedJSON[i];
                            this.m_doorArray[i].fillFromJSON(object);
                        }
                    }
                    else if (idObjArray == idWindowArr) {
                        this.setNumber(parsedJSON.length, this.m_windowArray, Window);
                        for (var i = 0; i < parsedJSON.length; i++) {
                            var object = parsedJSON[i];
                            this.m_windowArray[i].fillFromJSON(object);
                        }
                    }
                    else if (idObjArray == idSwitchArr) {
                        this.setNumber(parsedJSON.length, this.m_switchArray, Switch);
                        for (var i = 0; i < parsedJSON.length; i++) {
                            var object = parsedJSON[i];
                            this.m_switchArray[i].fillFromJSON(object);
                        }
                    }
                    else if (idObjArray == idTempSensArr) {
                        this.setNumber(parsedJSON.length, this.m_tempSensorArray, TemperatureSensor);
                        for (var i = 0; i < parsedJSON.length; i++) {
                            var object = parsedJSON[i];
                            this.m_tempSensorArray[i].fillFromJSON(object);
                        }
                    }
                    else if (idObjArray == idContactSensArr) {
                        this.setNumber(parsedJSON.length, this.m_contactSensorArray, ContactSensor);
                        for (var i = 0; i < parsedJSON.length; i++) {
                            var object = parsedJSON[i];
                            this.m_contactSensorArray[i].fillFromJSON(object);
                        }
                    }
                }
            }
        }
        setNumber(num, arg, types) {
            if (num > arg.length) {
                for (var i = arg.length; i < num; i++) {
                    var ss = new types();
                    arg.push(ss);
                }
            }
            else if (num < arg.length) {
                arg.length = num;
            }
        }
        getFilteredThings(arg, filterPath) {
            if (filterPath == null) {
                return arg;
            }
            else {
                return arg.filter(function (element) {
                    var thing = element;
                    return thing.getSitePath().indexOf(filterPath) >= 0;
                });
            }
        }
        getFilteredThingsNoContains(arg, filterPath) {
            if (filterPath == null) {
                return arg;
            }
            else {
                return arg.filter(function (element) {
                    var thing = element;
                    return !(thing.getSitePath().indexOf(filterPath) >= 0);
                });
            }
        }
        getParentPath(thing) {
            if (thing == null) {
                return null;
            }
            else {
                var path = thing.getSitePath();
                if (path == null) {
                    return null;
                }
                var path2 = path
                    .replace(/(^\s+|\s+$)/g, '') //remove leading and trailing whitespaces
                    .replace(/(^\/+|\/+$)/g, ''); //remove leading and trailing slashes
                // window.alert("*** getParent ***, Path: " + path + "  \n\nPath2:" + path2 +"|");
                var parts = path2.split('/'); //split string
                parts.pop();
                parts.pop();
                let newPath = parts.join('/');
                //  window.alert("*** getParent ***, newPath: " + newPath);
                return newPath;
            }
        }
        getThing(path) {
            for (let id in this.m_floorArray) {
                if (this.m_floorArray[id].getSitePath() == path) {
                    return this.m_floorArray[id];
                }
            }
            for (let id in this.m_roomArray) {
                if (this.m_roomArray[id].getSitePath() == path) {
                    return this.m_roomArray[id];
                }
            }
            for (let id in this.m_tempSensorArray) {
                if (this.m_tempSensorArray[id].getSitePath() == path) {
                    return this.m_tempSensorArray[id];
                }
            }
            for (let id in this.m_switchArray) {
                if (this.m_switchArray[id].getSitePath() == path) {
                    return this.m_switchArray[id];
                }
            }
            for (let id in this.m_doorArray) {
                if (this.m_doorArray[id].getSitePath() == path) {
                    return this.m_doorArray[id];
                }
            }
            for (let id in this.m_windowArray) {
                if (this.m_windowArray[id].getSitePath() == path) {
                    return this.m_windowArray[id];
                }
            }
            for (let id in this.m_contactSensorArray) {
                if (this.m_contactSensorArray[id].getSitePath() == path) {
                    return this.m_contactSensorArray[id];
                }
            }
            return null;
        }
    }
    OhsSiteData.SiteData = SiteData;
    class Thing {
        constructor() {
            this.valid = false; //content of the forecast is valid        
            this.sitePath = "*"; //OpenHS path     
            this.name = "no name";
            this.posX = 0.0;
            this.posY = 0.0;
            this.posZ = 0.0;
        }
        setSitePath(path) {
            this.sitePath = path;
        }
        getSitePath() {
            return this.sitePath;
        }
        isValid() {
            return this.valid;
        }
        update() {
        }
        updateDelayed(wait) {
            window.setTimeout(() => this.update(), wait);
        }
        fillFromJSON(json) {
            for (var propName in json) {
                this[propName] = json[propName];
            }
        }
    }
    OhsSiteData.Thing = Thing;
    class Floor extends Thing {
        constructor(...args) {
            super(...args);
            this.imagePath = "/infores/servlets/kitchen/room_default.png";
            this.dimX = 0;
            this.dimY = 0;
        }
    }
    OhsSiteData.Floor = Floor;
    class Room extends Thing {
        constructor() {
            super();
            this.imageBkgPath = "/infores/servlets/kitchen/room_default.png";
        }
    }
    OhsSiteData.Room = Room;
    class TemperatureSensor extends Thing {
        constructor() {
            super();
            this.temp = 0.0;
        }
    }
    OhsSiteData.TemperatureSensor = TemperatureSensor;
    class Supplier {
        constructor() {
            this.valid = false;
            this.name = "unknown";
            this.www = "unknown";
            this.address = "unknown address";
            this.phone = "unknown";
            this.logo = "unknown";
        }
    }
    OhsSiteData.Supplier = Supplier;
    class Switch extends Thing {
        constructor() {
            super();
            this.stateInt = 0;
        }
        getState() {
            return this.stateInt;
        }
        click() {
            if (this.getState() == 1 || this.getState() == 2) {
                this.on();
            }
            else {
                this.off();
            }
        }
        on() {
            var js = JSON.stringify({
                idPost: idThingCommand,
                path: this.sitePath,
                command: 'on'
            });
            var ret = postAjax(url, js);
            if (JSON.parse(ret['return'])) {
                this.stateInt = parseInt(ret['state_int']);
                this.updateDelayed(100);
            }
        }
        off() {
            var js = JSON.stringify({
                idPost: idThingCommand,
                path: this.sitePath,
                command: 'off'
            });
            var ret = postAjax(url, js);
            if (JSON.parse(ret['return'])) {
                this.stateInt = parseInt(ret['state_int']);
                this.updateDelayed(100);
            }
        }
        update() {
            var js = JSON.stringify({
                idPost: idThingCommand,
                path: this.sitePath,
                command: 'update'
            });
            var ret = postAjax(url, js);
            if (JSON.parse(ret['return'])) {
                this.stateInt = parseInt(ret['state_int']);
            }
        }
    }
    OhsSiteData.Switch = Switch;
    class ContactSensor extends Thing {
        constructor() {
            super();
            this.state = false;
        }
        setState(st) {
            this.state = st;
        }
        getState() {
            return this.state;
        }
    }
    OhsSiteData.ContactSensor = ContactSensor;
    class Door extends Thing {
        constructor() {
            super();
            this.image_open = "/infores/servlets/kitchen/room_default.png";
            this.image_close = "/infores/servlets/kitchen/room_default.png";
            this.supplier = new Supplier();
            this.open = false;
            this.locked = false;
            this.posX = 0;
            this.posY = 0;
        }
        getState() {
            if (!this.valid)
                return 0;
            if (this.open)
                return 1;
            if (this.locked)
                return 3;
            return 2;
        }
    }
    OhsSiteData.Door = Door;
    class Window extends Thing {
        constructor() {
            super();
            this.image_open = "/infores/servlets/kitchen/room_default.png";
            this.image_close = "/infores/servlets/kitchen/room_default.png";
            this.open = false;
            this.locked = false;
        }
        getState() {
            if (!this.valid)
                return 0;
            if (this.open)
                return 1;
            if (this.locked)
                return 3;
            return 2;
        }
    }
    OhsSiteData.Window = Window;
    function postAjax(urlAdr, jsonDat) {
        var result = null;
        $.ajaxSetup({
            // Disable caching of AJAX responses
            cache: false
        });
        $.ajax({
            async: false,
            type: "POST",
            contentType: 'application/json',
            url: urlAdr,
            data: jsonDat,
            dataType: "json",
            success: function (response) {
                result = response;
            } });
        return result;
    }
})(OhsSiteData || (OhsSiteData = {}));
