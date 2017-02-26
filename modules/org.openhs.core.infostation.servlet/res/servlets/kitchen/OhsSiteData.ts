/**
 * Module with data structure...
 */

module OhsSiteData {
    
    const servletUrl = 'kitchen';
    const switchId = 'SwitchS';
    const contactSensorId = 'ContactSensor';
    const allDoorsId = 'AllDoors';
     
    export class SiteData {

        //---Timers---
        private fastTimerGetData;
        private slowTimerGetData;
        
        //---Site data---
        public m_floorArray:            Array <Floor> = null;
        public m_roomArray:             Array <Room> = null;
        public m_tempSensorArray:       Array <TemperatureSensor> = null;
        public m_switchArray:           Array <Switch> = null;
        public m_doorArray:             Array <Door> = null;
        public m_windowArray:           Array <Window> = null;
        public m_contactSensorArray:    Array <ContactSensor> = null;
        
        //---Other data---
        public timeString: string = "---";
        public dateString: string = "---";
        
        constructor () {            
            this.m_floorArray = new Array<Floor>();
            this.m_roomArray = new Array<Room>(); 
            this.m_tempSensorArray = new Array<TemperatureSensor>(); 
            this.m_switchArray = new Array<Switch>();
            this.m_doorArray = new Array<Door>();
            this.m_windowArray = new Array<Door>();
            this.m_contactSensorArray = new Array<ContactSensor>();    
                        
            this.slowTimerGetDataEvent(1000);            
            this.fastTimerGetDataEvent(100);
        }
        
        private fastTimerGetDataEvent(step : number) {
            
            this.getFastData();
                                               
           window.clearTimeout(this.fastTimerGetData);
           this.fastTimerGetData = window.setTimeout(() => this.fastTimerGetDataEvent(step), step); 
        }           
        
        public getFastData () {
            for (let id in this.m_roomArray) {
                this.m_roomArray[id].getServerData();
            }            
            
            for (let id in this.m_switchArray) {
                this.m_switchArray[id].getServerData();
            }
            
            for (let id in this.m_tempSensorArray) {
                this.m_tempSensorArray[id].getServerData();
            }      
            
            for (let id in this.m_doorArray) {
                this.m_doorArray[id].getServerData();
            }    
            
            for (let id in this.m_windowArray) {
                this.m_windowArray[id].getServerData();
            }             
            
            for (let id in this.m_contactSensorArray) {
                this.m_contactSensorArray[id].getServerData();
            }
        }
        
        private slowTimerGetDataEvent(step : number) {
                                  
           this.getServerData();
             
           window.clearTimeout(this.slowTimerGetData);
           this.slowTimerGetData = window.setTimeout(() => this.slowTimerGetDataEvent(step), step); 
        }         

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
        
        public getFilteredThings<T>(arg: Array<T>, filterPath: string):T[] {
            
            if (filterPath == null) {
                return arg;
                
            } else {
   
                 return arg.filter(function(element){                     
                     var thing: Thing = (<Thing><any>element);
                     
                     return thing.getPath().indexOf(filterPath) >= 0;                                              
                 });                               
             }
        }     
        
        public getFilteredThingsNoContains<T>(arg: Array<T>, filterPath: string):T[] {
            
            if (filterPath == null) {
                return arg;
                
            } else {
   
                 return arg.filter(function(element){                     
                     var thing: Thing = (<Thing><any>element);
                     
                     return !(thing.getPath().indexOf(filterPath) >= 0);                                              
                 });                               
             }
        }        
  
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
        
            for (let id in this.m_floorArray) {                
                if (this.m_floorArray[id].getPath() == path) {
                    return <Thing>this.m_floorArray[id];
                }                    
            }
            
            for (let id in this.m_roomArray) {                
                if (this.m_roomArray[id].getPath() == path) {
                    return <Thing>this.m_roomArray[id];
                }                    
            }  
            
            for (let id in this.m_tempSensorArray) {                
                if (this.m_tempSensorArray[id].getPath() == path) {
                    return <Thing>this.m_tempSensorArray[id];
                }                    
            } 
            
            for (let id in this.m_switchArray) {                
                if (this.m_switchArray[id].getPath() == path) {
                    return <Thing>this.m_switchArray[id];
                }                    
            }   
            
            for (let id in this.m_doorArray) {                
                if (this.m_doorArray[id].getPath() == path) {
                    return <Thing>this.m_doorArray[id];
                }                    
            } 
            
            for (let id in this.m_windowArray) {                
                if (this.m_windowArray[id].getPath() == path) {
                    return <Thing>this.m_windowArray[id];
                }                    
            }             
            
            for (let id in this.m_contactSensorArray) {                
                if (this.m_contactSensorArray[id].getPath() == path) {
                    return <Thing>this.m_contactSensorArray[id];
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
                this.setNumber(parseInt(data['number_floors']), this.m_floorArray, Floor);                                
                                        
                for (let id in this.m_floorArray) {                    
                    this.m_floorArray[id].setPath(data['floorPath_' + id]);
                }           
                
                // Rooms            
                this.setNumber(parseInt(data['number_rooms']), this.m_roomArray, Room);
                
                for (var id = 0; id < this.m_roomArray.length; id ++) {                    
                    this.m_roomArray[id].setPath(data['roomPath_' + id]);
                }             
                
                // TempSensors                                             
                this.setNumber(parseInt(data['number_tempsensors']), this.m_tempSensorArray, TemperatureSensor);
                
                for (let id in this.m_tempSensorArray) {                                
                    this.m_tempSensorArray[id].setPath(data['tempSensorPath_' + id]);                   
                }     
                
                // Switches                                     
                this.setNumber(parseInt(data['number_switches']), this.m_switchArray, Switch);
                
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
                    
                //    window.alert("Path:" + this.m_doorArray[id].getPath());
                }     
                
                // Window          
                                           
                this.setNumber(parseInt(data['number_windows']), this.m_windowArray, Window);
                            
                for (let id in this.m_windowArray) {           
                    this.m_windowArray[id].setPath(data['windowPath_' + id]);
                    
                //    window.alert("Path:" + this.m_doorArray[id].getPath());
                } 
                               
            }      
        }   
        
        public postServerAllDoors (cmd: string) {            
            var req: any = {
                postId : allDoorsId,
              //  path:   this.path,
                command: cmd                
            }
            
            postAjax(servletUrl, req);
        }           
    }
    
    export class Thing {
        
        protected valid: boolean = false; //content of the forecast is valid        
        protected path:  string = null; //OpenHS path     
        
        constructor () {
        }
        
        public setPath (path: string) {
            this.path = path;
        }   
        
        public getPath() {
            return this.path;
        }
        
        public isValid() {
            return this.valid;
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
                this.valid = JSON.parse(data['validity']);
                
                if (this.valid) {
                    this.name = data['name'];
                    this.imageBkgPath = data['imgBkg'];
                }  
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
                this.valid = JSON.parse(data['validity']);

                if (this.valid) {
                    this.x = parseInt(data['x_coordinate']);
                    this.y = parseInt(data['y_coordinate']);
                    this.temp = parseFloat(data['temp']);  
                }
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
 
        public getState () {
            return this.stateInt;
        }
        
        public postServerClick () {            
            var req: any = {
                postId : switchId,
                path:   this.path,
                command: 'click'                
            }
            
            postAjax(servletUrl, req);
        }   
        
        public postServerSetOn () {            
            var req: any = {
                postId : switchId,
                path:   this.path,
                command: 'on'                
            }
            
            postAjax(servletUrl, req);
        }           
        
        public postServerSetOff () {            
            var req: any = {
                postId : switchId,
                path:   this.path,
                command: 'off'                
            }
            
            postAjax(servletUrl, req);
        }           
        
        public getServerData () {       
             
            var req: any = {                
                orderId : switchId,
                path:   this.path                
            } 
            
            var data: string = getAjax(servletUrl, req); 
            
            if (data != null) {
                this.valid = JSON.parse(data['validity']);
                
                if (this.valid){
                    this.stateInt = parseInt(data['state_sw']);
                    this.x = parseInt(data['x_coordinate']);
                    this.y = parseInt(data['y_coordinate']);
                }                                
            }                            
        }
    }  
    
    export class ContactSensor extends Thing {    
 
        protected   state:  boolean; //        
        
        public x:   number;
        public y:   number;        
        
        constructor () {     
            super ();       
            this.x = 0;
            this.y = 0;
            
            this.state = false;
        }            
 
        public getState () {
            return this.state;
        }            
        
        public getServerData () {       
             
            var req: any = {                
                orderId : contactSensorId,
                path:   this.path                
            } 
            
            var data: string = getAjax(servletUrl, req); 
            
            if (data != null) {
                this.valid = JSON.parse(data['validity']);
                
                if (this.valid){
                    this.state = JSON.parse(data['state']);
                    this.x = parseInt(data['x_coordinate']);
                    this.y = parseInt(data['y_coordinate']);
                }                                
            }                            
        }
    }       
    
    export class Door extends Thing {
        
        public name: string = "no name";
        public image_open: string = "/infores/servlets/kitchen/room_default.png";
        public image_close: string = "/infores/servlets/kitchen/room_default.png"; 
        
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
            
            postAjax(servletUrl, req);
        }                
        
        public getServerData () {       
             
            var req: any = {                
                orderId : "DoorD",
                path:   this.path                
            } 
            
            var data: string = getAjax("kitchen", req); 
            
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
        }        
    }    
    
    export class Window extends Thing {
    
        public name: string = "no name";
        public image_open: string = "/infores/servlets/kitchen/room_default.png";
        public image_close: string = "/infores/servlets/kitchen/room_default.png"; 
        
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
                postId : "Window",
                path:   this.path                
            }
            
            postAjax(servletUrl, req);
        }                
        
        public getServerData () {       
             
            var req: any = {                
                orderId : "Window",
                path:   this.path                
            } 
            
            var data: string = getAjax("kitchen", req); 
            
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