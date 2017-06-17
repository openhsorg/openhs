/**
 * Module with data structure...
 */
var OhsSiteData;
(function (OhsSiteData) {
    const servletUrl = 'kitchen';
    const switchId = 'SwitchS';
    const contactSensorId = 'ContactSensor';
    const allDoorsId = 'AllDoors';
    function sleep(ms) {
        var unixtime_ms = new Date().getTime();
        while (new Date().getTime() < unixtime_ms + ms) { }
    }
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
            //this.slowTimerGetDataEvent(1000);
            this.getServerData();
            this.fastTimerGetDataEvent(250);
        }
        fastTimerGetDataEvent(step) {
            this.getFastData();
            window.clearTimeout(this.fastTimerGetData);
            this.fastTimerGetData = window.setTimeout(() => this.fastTimerGetDataEvent(step), step);
        }
        getFastData() {
            this.getFastData_Time();
            if (this.getCount == 0) {
                this.getFastData_TemperatureSensorArray();
            }
            else if (this.getCount == 1) {
                this.getFastData_ContactArray();
            }
            else if (this.getCount == 2) {
                this.getFastData_SwitchArray();
            }
            else if (this.getCount == 3) {
                this.getFastData_DoorArray();
            }
            else if (this.getCount == 4) {
                this.getFastData_WindowArray();
            }
            else if (this.getCount == 5) {
                this.getFastData_RoomArray();
            }
            else if (this.getCount == 6) {
                this.getFastData_FloorArray();
            }
            if (this.getCount == 6) {
                this.getCount = 0;
            }
            else {
                this.getCount++;
            }
        }
        getFastData_Time() {
            var req = {
                orderId: "TimeDate"
            };
            var data = getAjax("kitchen", req);
            if (data != null) {
                this.dateString = data['date'];
                this.timeString = data['time'];
            }
        }
        getFastData_TemperatureSensorArray() {
            var req = {
                orderId: "TempSensors"
            };
            var data = getAjax("kitchen", req);
            if (data != null) {
                var valid = JSON.parse(data['Array_validity']);
                if (valid) {
                    for (let id in this.m_tempSensorArray) {
                        this.m_tempSensorArray[id].parseServerData(data);
                    }
                }
            }
        }
        getFastData_ContactArray() {
            var req = {
                orderId: "ContactSensors"
            };
            var data = getAjax("kitchen", req);
            if (data != null) {
                var valid = JSON.parse(data['Array_validity']);
                if (valid) {
                    for (let id in this.m_contactSensorArray) {
                        this.m_contactSensorArray[id].parseServerData(data);
                    }
                }
            }
        }
        getFastData_SwitchArray() {
            var req = {
                orderId: "SwitchSensors"
            };
            var data = getAjax("kitchen", req);
            if (data != null) {
                var valid = JSON.parse(data['Array_validity']);
                //   window.alert("SwitchSensors");
                if (valid) {
                    for (let id in this.m_switchArray) {
                        this.m_switchArray[id].parseServerData(data);
                    }
                }
            }
        }
        getFastData_DoorArray() {
            var req = {
                orderId: "DoorArray"
            };
            var data = getAjax("kitchen", req);
            if (data != null) {
                var valid = JSON.parse(data['Array_validity']);
                if (valid) {
                    for (let id in this.m_doorArray) {
                        this.m_doorArray[id].parseServerData(data);
                    }
                }
            }
        }
        getFastData_WindowArray() {
            var req = {
                orderId: "WindowArray"
            };
            var data = getAjax("kitchen", req);
            if (data != null) {
                var valid = JSON.parse(data['Array_validity']);
                if (valid) {
                    for (let id in this.m_windowArray) {
                        this.m_windowArray[id].parseServerData(data);
                    }
                }
            }
        }
        getFastData_RoomArray() {
            var req = {
                orderId: "RoomArray"
            };
            var data = getAjax("kitchen", req);
            if (data != null) {
                var valid = JSON.parse(data['Array_validity']);
                if (valid) {
                    for (let id in this.m_roomArray) {
                        this.m_roomArray[id].parseServerData(data);
                    }
                }
            }
        }
        getFastData_FloorArray() {
            var req = {
                orderId: "FloorArray"
            };
            var data = getAjax("kitchen", req);
            if (data != null) {
                var valid = JSON.parse(data['Array_validity']);
                if (valid) {
                    for (let id in this.m_floorArray) {
                        this.m_floorArray[id].parseServerData(data);
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
                    return thing.getPath().indexOf(filterPath) >= 0;
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
                    return !(thing.getPath().indexOf(filterPath) >= 0);
                });
            }
        }
        getParentPath(thing) {
            if (thing == null) {
                return null;
            }
            else {
                var path = thing.getPath();
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
                if (this.m_floorArray[id].getPath() == path) {
                    return this.m_floorArray[id];
                }
            }
            for (let id in this.m_roomArray) {
                if (this.m_roomArray[id].getPath() == path) {
                    return this.m_roomArray[id];
                }
            }
            for (let id in this.m_tempSensorArray) {
                if (this.m_tempSensorArray[id].getPath() == path) {
                    return this.m_tempSensorArray[id];
                }
            }
            for (let id in this.m_switchArray) {
                if (this.m_switchArray[id].getPath() == path) {
                    return this.m_switchArray[id];
                }
            }
            for (let id in this.m_doorArray) {
                if (this.m_doorArray[id].getPath() == path) {
                    return this.m_doorArray[id];
                }
            }
            for (let id in this.m_windowArray) {
                if (this.m_windowArray[id].getPath() == path) {
                    return this.m_windowArray[id];
                }
            }
            for (let id in this.m_contactSensorArray) {
                if (this.m_contactSensorArray[id].getPath() == path) {
                    return this.m_contactSensorArray[id];
                }
            }
            return null;
        }
        getServerData() {
            var req = {
                orderId: "SiteData"
            };
            var data = getAjax("kitchen", req);
            if (data != null) {
                this.dateString = data['date'];
                this.timeString = data['time'];
                // Floors                  
                this.setNumber(parseInt(data['number_floors']), this.m_floorArray, Floor);
                for (let id in this.m_floorArray) {
                    this.m_floorArray[id].setPath(data['floorPath_' + id]);
                }
                // Rooms            
                this.setNumber(parseInt(data['number_rooms']), this.m_roomArray, Room);
                for (var id = 0; id < this.m_roomArray.length; id++) {
                    this.m_roomArray[id].setPath(data['roomPath_' + id]);
                }
                // TempSensors                                             
                this.setNumber(parseInt(data['number_tempsensors']), this.m_tempSensorArray, TemperatureSensor);
                for (let id in this.m_tempSensorArray) {
                    this.m_tempSensorArray[id].setPath(data['tempSensorPath_' + id]);
                }
                // Switches                                     
                this.setNumber(parseInt(data['number_switches']), this.m_switchArray, Switch);
                // window.alert("ns: " + this.m_switchArray.length);
                for (let id in this.m_switchArray) {
                    this.m_switchArray[id].setPath(data['switchPath_' + id]);
                }
                // ContactSensors                                                     
                this.setNumber(parseInt(data['number_contactSensors']), this.m_contactSensorArray, ContactSensor);
                //window.alert("Num:" + parseInt(data['number_contactSensors']));
                for (let id in this.m_contactSensorArray) {
                    this.m_contactSensorArray[id].setPath(data['contactSensorPath_' + id]);
                }
                // Door                                     
                this.setNumber(parseInt(data['number_doors']), this.m_doorArray, Door);
                for (let id in this.m_doorArray) {
                    this.m_doorArray[id].setPath(data['doorPath_' + id]);
                }
                // Window          
                this.setNumber(parseInt(data['number_windows']), this.m_windowArray, Window);
                for (let id in this.m_windowArray) {
                    this.m_windowArray[id].setPath(data['windowPath_' + id]);
                }
            }
        }
        postServerCommand(cmd) {
            var req = {
                postId: 'GeneralCommand',
                command: cmd
            };
            postAjax(servletUrl, req);
        }
    }
    OhsSiteData.SiteData = SiteData;
    class Thing {
        constructor() {
            this.valid = false; //content of the forecast is valid        
            this.path = null; //OpenHS path     
        }
        setPath(path) {
            this.path = path;
        }
        getPath() {
            return this.path;
        }
        isValid() {
            return this.valid;
        }
        getServerData() {
        }
        getServerDataDelayed(wait) {
            window.setTimeout(() => this.getServerData(), wait);
        }
    }
    OhsSiteData.Thing = Thing;
    class Floor extends Thing {
        constructor(...args) {
            super(...args);
            this.imagePath = "/infores/servlets/kitchen/room_default.png";
            this.name = 'no name';
            this.dim_x = 0;
            this.dim_y = 0;
        }
        getServerData() {
            var req = {
                orderId: "TempSensor",
                path: this.path
            };
            var data = getAjax("kitchen", req);
            this.parseServerData(data);
        }
        parseServerData(data) {
            if (data != null) {
                this.valid = JSON.parse(data[this.path + '__validity']);
                if (this.valid) {
                    this.name = data[this.path + '__name'];
                    this.imagePath = data[this.path + '__imagePath'];
                    this.dim_x = parseFloat(data[this.path + '__dim_x']);
                    this.dim_y = parseFloat(data[this.path + '__dim_y']);
                }
            }
        }
    }
    OhsSiteData.Floor = Floor;
    class Room extends Thing {
        constructor() {
            super();
            this.imageBkgPath = "/infores/servlets/kitchen/room_default.png";
            this.name = "no name :(";
        }
        getServerData() {
            var req = {
                orderId: "Room",
                path: this.path
            };
            var data = getAjax("kitchen", req);
            this.parseServerData(data);
        }
        parseServerData(data) {
            if (data != null) {
                this.valid = JSON.parse(data[this.path + '__validity']);
                if (this.valid) {
                    this.name = data[this.path + '__name'];
                    this.imageBkgPath = data[this.path + '__imagePath'];
                }
            }
        }
    }
    OhsSiteData.Room = Room;
    class TemperatureSensor extends Thing {
        constructor() {
            super();
            this.x = 0;
            this.y = 0;
            this.temp = 0.0;
        }
        getServerData() {
            var req = {
                orderId: "TempSensor",
                path: this.path
            };
            var data = getAjax("kitchen", req);
            this.parseServerData(data);
        }
        parseServerData(data) {
            if (data != null) {
                this.valid = JSON.parse(data[this.path + '__validity']);
                if (this.valid) {
                    this.x = parseFloat(data[this.path + '__x']);
                    this.y = parseFloat(data[this.path + '__y']);
                    //this.z = parseInt(data[this.path + '__z']);
                    this.temp = parseFloat(data[this.path + '__temperature']);
                }
            }
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
        getServerData() {
            /*
           var req: any = {
               orderId : "Supplier",
               name:   this.name
           }
         //  window.alert("****" + this.name);
           var data: string = getAjax("kitchen", req);
           
           this.parseServerData(data);
           */
        }
    }
    OhsSiteData.Supplier = Supplier;
    class Switch extends Thing {
        constructor() {
            super();
            this.x = 0;
            this.y = 0;
            this.stateInt = 0;
        }
        setState(state) {
            this.stateInt = state;
        }
        getState() {
            return this.stateInt;
        }
        postServerClick() {
            var req = {
                postId: switchId,
                path: this.path,
                command: 'click'
            };
            postAjax(servletUrl, req);
        }
        postServerSetOn() {
            var req = {
                postId: switchId,
                path: this.path,
                command: 'on'
            };
            postAjax(servletUrl, req);
        }
        postServerSetOff() {
            var req = {
                postId: switchId,
                path: this.path,
                command: 'off'
            };
            postAjax(servletUrl, req);
        }
        getServerData() {
            var req = {
                orderId: switchId,
                path: this.path
            };
            var data = getAjax(servletUrl, req);
            this.parseServerData(data);
        }
        parseServerData(data) {
            if (data != null) {
                this.valid = JSON.parse(data[this.path + '__validity']);
                //window.alert("valid: " + this.path);
                if (this.valid) {
                    this.stateInt = parseInt(data[this.path + '__state_int']);
                    this.x = parseFloat(data[this.path + '__x']);
                    this.y = parseFloat(data[this.path + '__y']);
                }
            }
        }
    }
    OhsSiteData.Switch = Switch;
    class ContactSensor extends Thing {
        constructor() {
            super();
            this.x = 0;
            this.y = 0;
            this.state = false;
        }
        setState(st) {
            this.state = st;
        }
        getState() {
            return this.state;
        }
        getServerData() {
            var req = {
                orderId: contactSensorId,
                path: this.path
            };
            var data = getAjax(servletUrl, req);
            this.parseServerData(data);
        }
        parseServerData(data) {
            if (data != null) {
                this.valid = JSON.parse(data[this.path + '__validity']);
                if (this.valid) {
                    this.state = JSON.parse(data[this.path + '__state_int']);
                    this.x = parseFloat(data[this.path + '__x']);
                    this.y = parseFloat(data[this.path + '__y']);
                }
            }
        }
    }
    OhsSiteData.ContactSensor = ContactSensor;
    class Door extends Thing {
        constructor() {
            super();
            this.name = "no name";
            this.image_open = "/infores/servlets/kitchen/room_default.png";
            this.image_close = "/infores/servlets/kitchen/room_default.png";
            this.supplier = new Supplier();
            this.open = false;
            this.locked = false;
            this.x = 0;
            this.y = 0;
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
        postServerClick() {
            var req = {
                postId: "DoorD",
                path: this.path
            };
            postAjax(servletUrl, req);
        }
        getServerData() {
            var req = {
                orderId: "DoorD",
                path: this.path
            };
            var data = getAjax("kitchen", req);
            this.parseServerData(data);
        }
        parseServerData(data) {
            if (data != null) {
                this.valid = JSON.parse(data[this.path + '__validity']);
                if (this.valid) {
                    this.name = data[this.path + '__name'];
                    this.x = parseFloat(data[this.path + '__x']);
                    this.y = parseFloat(data[this.path + '__y']);
                    //this.z = parseFloat(data[this.path + '__z']);
                    this.open = JSON.parse(data[this.path + '__open']);
                    this.locked = JSON.parse(data[this.path + '__lock']);
                    this.image_open = data[this.path + '__imagePath_open'];
                    this.image_close = data[this.path + '__imagePath_close'];
                    this.supplier.name = data[this.path + '__supplierName'];
                }
            }
        }
    }
    OhsSiteData.Door = Door;
    class Window extends Thing {
        constructor() {
            super();
            this.name = "no name";
            this.image_open = "/infores/servlets/kitchen/room_default.png";
            this.image_close = "/infores/servlets/kitchen/room_default.png";
            this.open = false;
            this.locked = false;
            this.x = 0;
            this.y = 0;
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
        postServerClick() {
            var req = {
                postId: "Window",
                path: this.path
            };
            postAjax(servletUrl, req);
        }
        getServerData() {
            var req = {
                orderId: "Window",
                path: this.path
            };
            var data = getAjax("kitchen", req);
            this.parseServerData(data);
            /*
            if (data != null) {
                this.valid = JSON.parse(data['validity']);
                
                if (this.valid){
                    this.name = data['name'];
                    this.x = parseInt(data['x_coordinate']);
                    this.y = parseInt(data['y_coordinate']);
                    this.open = JSON.parse(data['open']);
                    this.locked = JSON.parse(data['lock']);
                    this.image_open = data['image_open'];
                    this.image_close = data['image_close'];
                }
            }
            */
        }
        parseServerData(data) {
            if (data != null) {
                this.valid = JSON.parse(data[this.path + '__validity']);
                if (this.valid) {
                    this.name = data[this.path + '__name'];
                    this.x = parseFloat(data[this.path + '__x']);
                    this.y = parseFloat(data[this.path + '__y']);
                    //this.z = parseFloat(data[this.path + '__z']);
                    this.open = JSON.parse(data[this.path + '__open']);
                    this.locked = JSON.parse(data[this.path + '__lock']);
                    this.image_open = data[this.path + '__imagePath_open'];
                    this.image_close = data[this.path + '__imagePath_close'];
                }
            }
        }
    }
    OhsSiteData.Window = Window;
    function getAjax(urlAdr, dataIn) {
        var result = null;
        $.ajaxSetup({
            // Disable caching of AJAX responses
            cache: false
        });
        $.ajax({ async: false, url: urlAdr, data: dataIn, dataType: "json", success: function (data) {
                result = data;
            } });
        return result;
    }
    function postAjax(urlAdr, json) {
        var result = null;
        $.ajax({ async: false, type: "POST", url: urlAdr, data: json, dataType: "json", success: function (response) {
                result = response;
            } });
        return result;
    }
})(OhsSiteData || (OhsSiteData = {}));
