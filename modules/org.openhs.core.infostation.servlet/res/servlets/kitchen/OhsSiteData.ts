/**
 * Module with data structure...
 */

module OhsSiteData {
     
    export class SiteData {

        //---Timers---
        private fastTimerGetData;
        private slowTimerGetData;
        
        //---Site data---
        public floors: Array <Floor> = null;
        public rooms: Array <Room> = null;
        public tempSensors: Array <TemperatureSensor> = null;
        public switches: Array <Switch> = null;
        public doors: Array <Door> = null;
        
        //---Other data---
        public timeString: string = "---";
        public dateString: string = "---";
        
        constructor () {            
            this.floors = new Array<Floor>();
            this.rooms = new Array<Room>(); 
            this.tempSensors = new Array<TemperatureSensor>(); 
            this.switches = new Array<Switch>();
            this.doors = new Array<Door>();    
                        
            this.slowTimerGetDataEvent(5000);            
            this.fastTimerGetDataEvent(100);
        }
        
        private fastTimerGetDataEvent(step : number) {
            
            for (let id in this.rooms) {
                this.rooms[id].getServerData();
            }            
            
            for (let id in this.switches) {
                this.switches[id].getServerData();
            }
            
            for (let id in this.tempSensors) {
                this.tempSensors[id].getServerData();
            }      
            
            for (let id in this.doors) {
                this.doors[id].getServerData();
            }             
                      
           window.clearTimeout(this.fastTimerGetData);
           this.fastTimerGetData = window.setTimeout(() => this.fastTimerGetDataEvent(step), step); 
        }           
        
        private slowTimerGetDataEvent(step : number) {
                                  
           this.getServerData();
             
           window.clearTimeout(this.slowTimerGetData);
           this.slowTimerGetData = window.setTimeout(() => this.slowTimerGetDataEvent(step), step); 
        }         
        /*
        public getNumberFloors () {
            return this.floors.length;
        }
        
        public getNumberRooms () {
            return this.rooms.length;
        }        
        */
        /*
        public getFloor (num:  number){
            if (num > this.floors.length || num < 1) {
                return null;
            }
            return this.floors[num - 1];
        }
       */
        public setNumber<T>(num:  number, arg: Array<T>, types: { new(): T ;}) {
            if (num > arg.length) {            
                for (var i = arg.length; i < num; i++) {                    
                    var ss = new types();
                    arg.push(ss);
                }
            } else if (num < arg.length) {            
                arg.length = num;             
            }   
        }
        /*
        public getNumber<T>(arg: Array<T>) {
            return arg.length;
        }        
         */ 
        /*
        public setNumberFloors (num: number) {         
            if (num > this.floors.length) {            
                for (var i = this.floors.length; i < num; i++) {
                    this.floors.push(new Floor());
                }
            } else if (num < this.floors.length) {            
                this.floors.length = num;             
            }
        }
        
        public setNumberRooms (num: number) {         
            if (num > this.rooms.length) {            
                for (var i = this.rooms.length; i < num; i++) {
                    this.rooms.push(new Room());
                }
            } else if (num < this.rooms.length) {            
                this.rooms.length = num;             
            }
        }   
        */
        /*
        public getNumberDoors () {
            return this.doors.length;
        }
        */
        /*
        public getDoor (num:  number){
            if (num > this.doors.length || num < 1) {
                return null;
            }
            return this.doors[num - 1];
        }    
        */    
        /*
        public setNumberTempSensors (num: number) {         
            if (num > this.tempSensors.length) {            
                for (var i = this.tempSensors.length; i < num; i++) {
                    this.tempSensors.push(new TemperatureSensor());
                }
            } else if (num < this.tempSensors.length) {            
                this.tempSensors.length = num;             
            }
        }    
        
        public setNumberDoors(num: number) {         
            if (num > this.doors.length) {            
                for (var i = this.doors.length; i < num; i++) {
                    this.doors.push(new Door());
                }
            } else if (num < this.doors.length) {            
                this.doors.length = num;             
            }
        }         
        
        public setNumberSwitches (num: number) {         
            if (num > this.switches.length) {            
                for (var i = this.switches.length; i < num; i++) {
                    this.switches.push(new Switch());
                }
            } else if (num < this.switches.length) {            
                this.switches.length = num;             
            }
        }      
        */
        /*
        public getSwitches() {
            return this.switches;
        }
        
        public getDoors() {
            return this.doors;
        }      
        
        public getTemperatureSensors() {
            return this.tempSensors;
        }    
        
        public getRooms() {
            return this.rooms;
        }    
        
        public getFloors() {
            return this.floors;
        }           
        */
        public getParentPath (thing: Thing) {                        
            if (thing == null) {
                return null;
                
            } else {
                                                
                var path: string = thing.getPath();                                                
                
                if (path == null) {
                    return null;
                }                                
                
                var path2 = path
                    .replace(/(^\s+|\s+$)/g,'') //remove leading and trailing whitespaces
                    .replace(/(^\/+|\/+$)/g,''); //remove leading and trailing slashes
                
               // window.alert("*** getParent ***, Path: " + path + "  \n\nPath2:" + path2 +"|");
                         
                var parts = path2.split('/'); //split string
                
                parts.pop();
                parts.pop();                
                
                let newPath: string = parts.join('/');
                
              //  window.alert("*** getParent ***, newPath: " + newPath);
                
                return newPath;                
            }            
        }
        
        public getThing (path: string){ 
        
            for (let id in this.floors) {                
                if (this.floors[id].getPath() == path) {
                    return <Thing>this.floors[id];
                }                    
            }
            
            for (let id in this.rooms) {                
                if (this.rooms[id].getPath() == path) {
                    return <Thing>this.rooms[id];
                }                    
            }  
            
            for (let id in this.tempSensors) {                
                if (this.tempSensors[id].getPath() == path) {
                    return <Thing>this.tempSensors[id];
                }                    
            } 
            
            for (let id in this.switches) {                
                if (this.switches[id].getPath() == path) {
                    return <Thing>this.switches[id];
                }                    
            }   
            
            for (let id in this.doors) {                
                if (this.doors[id].getPath() == path) {
                    return <Thing>this.doors[id];
                }                    
            }               
        
            return null;
        }
        
        public getServerData () {       
             
            var req: any = {                
                orderId : "SiteData"
//                path:   this.path                
            } 
            
            var data: string = getAjax("kitchen", req); 
            
            if (data != null) {
                
                this.dateString = data['date'];
                this.timeString = data['time'];
            
                // Floors                  
               // this.setNumberFloors (parseInt(data['number_floors']));
                
                //setNumber<T>(num:  number, arg: Array<T>, types: { new(): T ;})
                this.setNumber(parseInt(data['number_floors']), this.floors, Floor);
                
                //window.alert("floors:   " + this.getNumberFloors());
                                        
                for (let id in this.floors) {                    
                    this.floors[id].setPath(data['floorPath_' + id]);
                    
                //     window.alert("path:   " + this.floors[id].getPath() + "  id:" + id);
                }           
                
                // Rooms            
                //this.setNumberRooms (parseInt(data['number_rooms']));
                this.setNumber(parseInt(data['number_rooms']), this.rooms, Room);
                
                for (var id = 0; id < this.rooms.length; id ++) {                    
                    this.rooms[id].setPath(data['roomPath_' + id]);
                    
                    if (id == 0)  this.rooms[id].imageBkgPath = "/infores/servlets/kitchen/room0.png";                        
                    if (id == 1)  this.rooms[id].imageBkgPath = "/infores/servlets/kitchen/room1.png";
                    if (id == 2)  this.rooms[id].imageBkgPath = "/infores/servlets/kitchen/room2.png";
                    if (id == 3)  this.rooms[id].imageBkgPath = "/infores/servlets/kitchen/room3.png";
                }             
                
                // TempSensors                              
               // this.setNumberTempSensors (parseInt(data['number_tempsensors']));
                this.setNumber(parseInt(data['number_tempsensors']), this.tempSensors, TemperatureSensor);
                
                for (let id in this.tempSensors) {                                
                    this.tempSensors[id].setPath(data['tempSensorPath_' + id]);                   
                }     
                
                // Switches                     
                //this.setNumberSwitches (parseInt(data['number_switches']));
                this.setNumber(parseInt(data['number_switches']), this.switches, Switch);
                
                for (let id in this.switches) {                      
                    this.switches[id].setPath(data['switchPath_' + id]);
                }              
                
                // Door                     
                //this.setNumberDoors (parseInt(data['number_doors']));
                this.setNumber(parseInt(data['number_doors']), this.doors, Door);
                            
                for (let id in this.doors) {           
                    this.doors[id].setPath(data['doorPath_' + id]);
                }                   
            }      
        }                        
    }
    
    export class Thing {
        
        public valid: boolean = false; //content of the forecast is valid        
        protected path:  string = null; //OpenHS path     
        
        constructor () {
        }
        
        public setPath (path: string) {
            this.path = path;
        }   
        
        public getPath() {
            return this.path;
        }
        
    }
        
    export class Floor extends Thing {
        
        public imageBkgPath: string = "/infores/servlets/kitchen/room_default.png"; 
                   
    }
    
    export class Room extends Thing{
        
        public imageBkgPath: string = "/infores/servlets/kitchen/room_default.png"; 
        
        public name: string = "no name :(";
        
        constructor () {
            super ();
                                    
        }        
        
        public getServerData () {       
             
            var req: any = {                
                orderId : "Room",
                path:   this.path                
            } 
            
            var data: string = getAjax("kitchen", req); 
            
            if (data != null) {
                this.name = data['name'];  
                this.valid = true;
            }                                      
        }                    
    }    
    
    export class TemperatureSensor extends Thing{
        
        public temp:  number;        
        public x:   number;
        public y:   number;      
        
        constructor () { 
            super();           
            this.x = 0;
            this.y = 0;
            this.temp = 0.0;
        }             
        
        public getServerData () {       
             
            var req: any = {                
                orderId : "TempSensor",
                path:   this.path                
            } 
            
            var data: string = getAjax("kitchen", req); 
            
            if (data != null) {
                this.x = parseInt(data['x_coordinate']);
                this.y = parseInt(data['y_coordinate']);
                this.temp = parseFloat(data['temp']);  
                this.valid = true;
            }                            
        }        
    } 
    
    export class Switch extends Thing{
    
 
        protected   stateInt:  number; //        
        
        public x:   number;
        public y:   number;        
        
        constructor () {     
            super ();       
            this.x = 0;
            this.y = 0;
            
            this.stateInt = 0;
        }        
        
        public isValid() {
            return this.valid;
        }       
 
        public getState () {
            return this.stateInt;
        }
        
        public postServerClick () {            
            var req: any = {
                postId : "SwitchS",
                path:   this.path                
            }
            
            postAjax("kitchen", req);
        }                
        
        public getServerData () {       
             
            var req: any = {                
                orderId : "SwitchS",
                path:   this.path                
            } 
            
            var data: string = getAjax("kitchen", req); 
            
            if (data != null) {
                this.stateInt = parseInt(data['state_sw']);
                this.x = parseInt(data['x_coordinate']);
                this.y = parseInt(data['y_coordinate']);
                
                this.valid = true;
            }                            
        }
    }   
    
    export class Door extends Thing {
        
        public open:       boolean; //Open
        public locked:     boolean; //Door lock
        
        public x:   number;
        public y:   number;
        
        constructor () {
            super();
            this.open = false;
            this.locked = false;
            
            this.x = 0;
            this.y = 0;
        } 
        
        public getState () {                                   
            if (!this.valid) return 0;
            if (this.open) return 1;                        
            if (this.locked) return 3;
            
            return 2;                                    
        }
        
        public postServerClick () {            
            var req: any = {
                postId : "DoorD",
                path:   this.path                
            }
            
            postAjax("kitchen", req);
        }                
        
        public getServerData () {       
             
            var req: any = {                
                orderId : "DoorD",
                path:   this.path                
            } 
            
            var data: string = getAjax("kitchen", req); 
            
            if (data != null) {
                this.x = parseInt(data['x_coordinate']);
                this.y = parseInt(data['y_coordinate']);
                this.open = JSON.parse(data['open']);
                this.locked = JSON.parse(data['lock']);
                
                this.valid = true;
            }                            
        }        
    }    
    
    export class Window {
    
        public valid: boolean = false; //content is valid       
        
        public path:        string; //OpenHS path        
        public open:        boolean; //Open
        
        public setPath (path: string) {
            this.path = path;
        }                
    }    
    
    
    function getAjax(urlAdr: string, dataIn: string) {
       
        var result = null;
    
        $.ajaxSetup ({
            // Disable caching of AJAX responses
            cache: false
        });
            
        $.ajax({async: false, url: urlAdr, data: dataIn, dataType: "json", success: function(data) {
        
            result = data;
                                      
        }});
    
        return result;    
    }     
    
    
    function postAjax(urlAdr: string, json: string) {
       
        var result = null;
            
        $.ajax({async: false, type: "POST", url: urlAdr, data: json, dataType: "json", success: function(response) {
        
            result = response;
                                      
        }});
    
        return result;    
    }      
        
    
}