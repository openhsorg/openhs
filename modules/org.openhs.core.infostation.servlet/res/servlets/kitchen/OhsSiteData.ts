/**
 * Module with data structure...
 */

module OhsSiteData {
    
    const servletUrl = 'kitchen';
    const switchId = 'SwitchS';
    const contactSensorId = 'ContactSensor';
    const allDoorsId = 'AllDoors';
    
    function sleep(ms) {
        var unixtime_ms = new Date().getTime();
        while(new Date().getTime() < unixtime_ms + ms) {}
    }      
     
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
        
        protected getCount:  number = 0;
        
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
                        
            //this.slowTimerGetDataEvent(1000);
            this.getServerData();            
            this.fastTimerGetDataEvent(250);
        }
        
        private fastTimerGetDataEvent(step : number) {
            
           this.getFastData();
                                               
           window.clearTimeout(this.fastTimerGetData);
           this.fastTimerGetData = window.setTimeout(() => this.fastTimerGetDataEvent(step), step); 
        }           
        
        public getFastData () {
            
            this.getFastData_Time();
            
            if (this.getCount == 0) {            
                this.getFastData_TemperatureSensorArray();
                                         
            } else if (this.getCount == 1) {
                this.getFastData_ContactArray();
                
            } else if (this.getCount == 2) {
                this.getFastData_SwitchArray();
                
            } else if (this.getCount == 3) {
                this.getFastData_DoorArray();
                
            } else if (this.getCount == 4) {
                this.getFastData_WindowArray();
                
            } else if (this.getCount == 5) {
                this.getFastData_RoomArray();
                
            } else if (this.getCount == 6) {
                this.getFastData_FloorArray();                
            }
                        
            if (this.getCount == 6) {
                this.getCount = 0;
                
            } else {
                 this.getCount ++;                    
            }
         
        }
        
        public getFastData_Time (){
                        
            var req: any = {                                
                orderId : "TimeDate"
//                path:   this.path                
            } 
            
            var data: string = getAjax("kitchen", req); 
            
            if (data != null) {         
            
                this.dateString = data['date'];
                this.timeString = data['time'];                
            }            
        }        
        
        public getFastData_TemperatureSensorArray (){
                        
            var req: any = {                                
                orderId : "TempSensors"
//                path:   this.path                
            } 
            
            var data: string = getAjax("kitchen", req); 
            
            if (data != null) {         
                
                var valid: boolean = JSON.parse(data['Array_validity']);
                
                if (valid) {                
                    for (let id in this.m_tempSensorArray) {                    
                        this.m_tempSensorArray[id].parseServerData(data);                    
                    } 
                }
            }            
        }
        
        public getFastData_ContactArray (){
                        
            var req: any = {                                
                orderId : "ContactSensors"         
            } 
            
            var data: string = getAjax("kitchen", req); 
            
            if (data != null) {         
                
                var valid: boolean = JSON.parse(data['Array_validity']);
                
                if (valid) {                
                    for (let id in this.m_contactSensorArray) {                    
                        this.m_contactSensorArray[id].parseServerData(data);                    
                    } 
                }
            }            
        }        
        
        public getFastData_SwitchArray (){
                        
            var req: any = {                                
                orderId : "SwitchSensors"         
            } 
            
            var data: string = getAjax("kitchen", req); 
            
            if (data != null) {         
                            
                var valid: boolean = JSON.parse(data['Array_validity']);
            
             //   window.alert("SwitchSensors");
                
                if (valid) {                
                    for (let id in this.m_switchArray) {                    
                        this.m_switchArray[id].parseServerData(data);                    
                    } 
                }
            }            
        } 
        
        public getFastData_DoorArray (){
                        
            var req: any = {                                
                orderId : "DoorArray"         
            } 
            
            var data: string = getAjax("kitchen", req); 
            
            if (data != null) {         
                
                var valid: boolean = JSON.parse(data['Array_validity']);
                
                if (valid) {                
                    for (let id in this.m_doorArray) {                    
                        this.m_doorArray[id].parseServerData(data);                    
                    } 
                }
            }            
        } 
        
        public getFastData_WindowArray (){
                        
            var req: any = {                                
                orderId : "WindowArray"         
            } 
            
            var data: string = getAjax("kitchen", req); 
            
            if (data != null) {         
                
                var valid: boolean = JSON.parse(data['Array_validity']);
                
                if (valid) {                
                    for (let id in this.m_windowArray) {                    
                        this.m_windowArray[id].parseServerData(data);                    
                    } 
                }
            }            
        } 
        
        public getFastData_RoomArray (){
                        
            var req: any = {                                
                orderId : "RoomArray"         
            } 
            
            var data: string = getAjax("kitchen", req); 

            if (data != null) {         
                var valid: boolean = JSON.parse(data['Array_validity']);
                
                if (valid) {                
                    for (let id in this.m_roomArray) {                                 
                        this.m_roomArray[id].parseServerData(data);       
                   
                    } 
                }
            }            
        }  
        
        public getFastData_FloorArray (){
                        
            var req: any = {                                
                orderId : "FloorArray"         
            } 
            
            var data: string = getAjax("kitchen", req); 

            if (data != null) {         
                var valid: boolean = JSON.parse(data['Array_validity']);
                
                if (valid) {                
                    for (let id in this.m_floorArray) {                                 
                        this.m_floorArray[id].parseServerData(data);       
                   
                    } 
                }
            }            
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
                   // this.m_tempSensorArray[id].x = 6;                 
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

        public postServerCommand (cmd: string) {            
            var req: any = {
                postId : 'GeneralCommand',
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
        
        public getServerData () {
        }          
        
        public getServerDataDelayed (wait: number) {                    
            window.setTimeout(() => this.getServerData(), wait);         
                                      
        }          
    }
        
    export class Floor extends Thing {
        
        public imagePath: string = "/infores/servlets/kitchen/room_default.png";
        
        public name:    string = 'no name';
        public dim_x:   number = 0;
        public dim_y:   number = 0;
        
        public getServerData () {       
             
            var req: any = {                
                orderId : "TempSensor",
                path:   this.path                
            } 
            
            var data: string = getAjax("kitchen", req); 
            
            this.parseServerData(data);                    
        }        
        
        public parseServerData (data: any) {                   
            if (data != null) {                
                this.valid = JSON.parse(data[this.path + '__validity']);

                if (this.valid) {
                    this.name = data[this.path + '__name'];
                    this.imagePath = data[this.path + '__imagePath'];                    
                    this.dim_x = parseFloat(data[this.path + '__dim_x']);
                    this.dim_y = parseFloat(data[this.path + '__dim_y']);     
                    
                 //   window.alert("x: " + this.dim_x + " ; y: " + this.dim_y);
                }
            }                            
        }                        
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
            
            this.parseServerData(data);                                 
        }              
        
        public parseServerData (data: any) {                   
            if (data != null) {                
                this.valid = JSON.parse(data[this.path + '__validity']);

                if (this.valid) {
                    this.name = data[this.path + '__name'];
                    this.imageBkgPath = data[this.path + '__imagePath'];
                }
            }                            
        }         
    }    
    
    export class TemperatureSensor extends Thing {
        
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
            
            this.parseServerData(data);                    
        }        
        
        public parseServerData (data: any) {                   
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
    
    export class Supplier {
        
        public valid: boolean = false;  
        public name:  string = "unknown";
        public www:  string = "unknown";     
        public address:  string = "unknown address";
        public phone:  string = "unknown";
        public logo:  string = "unknown";
        
        public getServerData () {       
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
        /*
        public parseServerData (data: any) {                               
            if (data != null) {                
                this.valid = JSON.parse(data['__validity']);

                if (this.valid) {
                    this.www = data['www'];
                    this.address = data['address'];
                    this.phone = data['phone'];
                    this.logo = data['logo'];
  
                }
            }                            
        }         
        */
    }
    
    export class Switch extends Thing {
    
        protected   stateInt:  number; //        
        
        public x:   number;
        public y:   number;        
        
        constructor () {     
            super ();       
            this.x = 0;
            this.y = 0;
            
            this.stateInt = 0;
        }    
        
        public setState(state: number) {
            this.stateInt = state;
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
            
            this.parseServerData(data);           
                                      
        }              
        
        public parseServerData (data: any) {                   
            if (data != null) {
                 this.valid = JSON.parse(data[this.path + '__validity']);
                //window.alert("valid: " + this.path);
                if (this.valid){                    
                 
                    this.stateInt = parseInt(data[this.path + '__state_int']);
                    this.x = parseFloat(data[this.path + '__x']);
                    this.y = parseFloat(data[this.path + '__y']);
                    //this.z = parseInt(data[this.path + '__z']);
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
        
        public setState(st: boolean){
            this.state = st;
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
            
            this.parseServerData (data); 
                    
        }
        
        public parseServerData (data: any) {                   
            if (data != null) {
                this.valid = JSON.parse(data[this.path + '__validity']);
                
                if (this.valid){
                    this.state = JSON.parse(data[this.path + '__state_int']);
                    this.x = parseFloat(data[this.path + '__x']);
                    this.y = parseFloat(data[this.path + '__y']);
                  //  this.z = parseInt(data[this.path + '__z']);
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
        
        public supplier:  Supplier = new Supplier ();
        
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
            
            this.parseServerData(data);                                            
        }       
        
        public parseServerData (data: any) {                   
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
                   // window.alert("****" + this.supplier.name);     
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
        
        public parseServerData (data: any) {                   
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