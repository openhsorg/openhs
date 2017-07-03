/**
 * Module with data structure...
 * This module communicates with: org.openhs.core.site.webservices
 */

module OhsSiteData {
    
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
                        
            this.slowTimerGetDataEvent(1000);
            //this.getServerData();            
       //     this.fastTimerGetDataEvent(250);
            
           // this.get_DateTime2();
            

            
            //this.getObjectArray(idFloorArr);
           // this.getObjectArray(idRoomArr);
            // this.getObjectArray(idDoorArr);
            // this.getObjectArray(idWindowArr);
            this.getObjectArray(idTempSensArr);
             //this.getObjectArray(idSwitchArr);
        }
        
        private slowTimerGetDataEvent(step : number) {
            
           this.getSlowData();
                                               
           window.clearTimeout(this.slowTimerGetData);
           this.slowTimerGetData = window.setTimeout(() => this.slowTimerGetDataEvent(step), step); 
        }          
        
        private fastTimerGetDataEvent(step : number) {
            
           this.getFastData();
                                               
           window.clearTimeout(this.fastTimerGetData);
           this.fastTimerGetData = window.setTimeout(() => this.fastTimerGetDataEvent(step), step); 
        }       
        
        public getSlowData () {
            
            //Date & Time
            this.get_DateTime2();          
            
       }
        
        public getFastData () {
            
         //   this.get_DateTime();
            
            if (this.getCount == 0) {            
                this.getFastData_TemperatureSensorArray();
                                         
            } else if (this.getCount == 1) {
                this.getFastData_ContactArray();
                
            } else if (this.getCount == 2) {
                this.getFastData_SwitchArray();
                
            } else if (this.getCount == 3) {
               // this.getFastData_DoorArray();
                
            } else if (this.getCount == 4) {
               // this.getFastData_WindowArray();
                
            } else if (this.getCount == 5) {
           //     this.getFastData_RoomArray();
                
            } else if (this.getCount == 6) {
       //         this.getObjectArray(idFloorArr);
                
            }
                        
            if (this.getCount == 6) {
                this.getCount = 0;
                
            } else {
                 this.getCount ++;                    
            }
         
        }
        
        public get_DateTime2 (){
                        /*
            //Date & Time
            var req = JSON.stringify({                             
                idPost : idTimeDate           
            });
            
         //   window.alert(req);
            
            var data: string = postAjax(url, req); 
            
            if (data != null) {         
            
                this.dateString = data['date'];
                this.timeString = data['time'];                
            }          
                 */
            
            var js = JSON.stringify({
            idPost : idTimeDate
            });               
            
            var ret = postAjax(url, js);        
            
            if (JSON.parse(ret['return'])){
               // this.stateInt = parseInt(ret['state_int']);  
                this.dateString = ret['date'];
                this.timeString = ret['time'];             
            } 
                       
            
        }        
        
        public getFastData_TemperatureSensorArray (){
                        
            var req = JSON.stringify({                                 
                idGet : idTempSensArr        
            });
            
            var data: string = getAjax2(url, req); 
            
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
                        
            var req = JSON.stringify({                                
                idGet : idContactSensArr        
            });
            
            var data: string = getAjax2(url, req); 
            
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
                        
            var req = JSON.stringify({                                 
                idGet : idSwitchArr         
            });
            
            var data: string = getAjax2(url, req); 
            
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
        /*
        public getFastData_DoorArray (){
                        
            var req = JSON.stringify({                                 
                idGet : idDoorArr         
            });
            
            var data: string = getAjax2(url, req); 
            
            if (data != null) {         
                
                var valid: boolean = JSON.parse(data['Array_validity']);
                
                if (valid) {                
                    for (let id in this.m_doorArray) {                    
                        this.m_doorArray[id].parseServerData(data);                    
                    } 
                }
            }            
        } 
        */
        /*
        public getFastData_WindowArray (){
                        
            var req = JSON.stringify({                                 
                idGet : idWindowArr         
            });
            
            var data: string = getAjax2(url, req); 
            
            if (data != null) {         
                
                var valid: boolean = JSON.parse(data['Array_validity']);
                
                if (valid) {                
                    for (let id in this.m_windowArray) {                    
                        this.m_windowArray[id].parseServerData(data);                    
                    } 
                }
            }            
        } 
        */
        /*
        public getFastData_RoomArray (){
                        
            var req = JSON.stringify({                                 
                idGet : idRoomArr         
            });
            
            var data: string = getAjax2(url, req); 

            if (data != null) {         
                var valid: boolean = JSON.parse(data['Array_validity']);
                
                if (valid) {                
                    for (let id in this.m_roomArray) {                                 
                        this.m_roomArray[id].parseServerData(data);       
                   
                    } 
                }
            }            
        }  
        */
        public getObjectArray (idObjArray:  string){

            var js = JSON.stringify({
            idPost : idObjArray
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
                                                        
                            //this.m_floorArray[i].setData(object);
                            this.m_floorArray[i].fillFromJSON(object);
                        }
                        
                    } else if (idObjArray == idRoomArr) {
                        
                        this.setNumber(parsedJSON.length, this.m_roomArray, Room);
                        
                        for (var i = 0; i < parsedJSON.length; i++) {                    
                            var object = parsedJSON[i];
                                                        
                            //this.m_floorArray[i].setData(object);
                            this.m_roomArray[i].fillFromJSON(object);
                        }
                    }  else if (idObjArray == idDoorArr) {
                        
                        this.setNumber(parsedJSON.length, this.m_doorArray, Door);
                        
                        for (var i = 0; i < parsedJSON.length; i++) {                    
                            var object = parsedJSON[i];
                                                        
                            //this.m_floorArray[i].setData(object);
                            this.m_doorArray[i].fillFromJSON(object);
                        }
                    }  else if (idObjArray == idWindowArr) {
                        
                        this.setNumber(parsedJSON.length, this.m_windowArray, Window);
                        
                        for (var i = 0; i < parsedJSON.length; i++) {                    
                            var object = parsedJSON[i];
                                                        
                            //this.m_floorArray[i].setData(object);
                            this.m_windowArray[i].fillFromJSON(object);
                        }
                    }  else if (idObjArray == idSwitchArr) {
                        
                        this.setNumber(parsedJSON.length, this.m_switchArray, Switch);
                        
                        for (var i = 0; i < parsedJSON.length; i++) {                    
                            var object = parsedJSON[i];
                                                        
                            //this.m_floorArray[i].setData(object);
                            this.m_switchArray[i].fillFromJSON(object);
                        }
                    }  else if (idObjArray == idTempSensArr) {
                        
                        this.setNumber(parsedJSON.length, this.m_tempSensorArray, TemperatureSensor);
                        
                        for (var i = 0; i < parsedJSON.length; i++) {                    
                            var object = parsedJSON[i];
                                                        
                            //this.m_floorArray[i].setData(object);
                            this.m_tempSensorArray[i].fillFromJSON(object);
                        }
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
                     
                     return thing.getSitePath().indexOf(filterPath) >= 0;                                              
                 });                               
             }
        }     
        
        public getFilteredThingsNoContains<T>(arg: Array<T>, filterPath: string):T[] {
            
            if (filterPath == null) {
                return arg;
                
            } else {
   
                 return arg.filter(function(element){                     
                     var thing: Thing = (<Thing><any>element);
                     
                     return !(thing.getSitePath().indexOf(filterPath) >= 0);                                              
                 });                               
             }
        }        
  
        public getParentPath (thing: Thing) {                        
            if (thing == null) {
                return null;
                
            } else {
                                                
                var path: string = thing.getSitePath();                                                
                
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
                if (this.m_floorArray[id].getSitePath() == path) {
                    return <Thing>this.m_floorArray[id];
                }                    
            }
            
            for (let id in this.m_roomArray) {                
                if (this.m_roomArray[id].getSitePath() == path) {
                    return <Thing>this.m_roomArray[id];
                }                    
            }  
            
            for (let id in this.m_tempSensorArray) {                
                if (this.m_tempSensorArray[id].getSitePath() == path) {
                    return <Thing>this.m_tempSensorArray[id];
                }                    
            } 
            
            for (let id in this.m_switchArray) {                
                if (this.m_switchArray[id].getSitePath() == path) {
                    return <Thing>this.m_switchArray[id];
                }                    
            }   
            
            for (let id in this.m_doorArray) {                
                if (this.m_doorArray[id].getSitePath() == path) {
                    return <Thing>this.m_doorArray[id];
                }                    
            } 
            
            for (let id in this.m_windowArray) {                
                if (this.m_windowArray[id].getSitePath() == path) {
                    return <Thing>this.m_windowArray[id];
                }                    
            }             
            
            for (let id in this.m_contactSensorArray) {                
                if (this.m_contactSensorArray[id].getSitePath() == path) {
                    return <Thing>this.m_contactSensorArray[id];
                }                    
            }               
        
            return null;
        }
        
        public getServerData () {       
             
            var req = JSON.stringify({                
                idPost : idSiteData            
            });
            
            var data: string = postAjax(url, req); 
            
            if (data != null) {
                
                this.dateString = data['date'];
                this.timeString = data['time'];
            
                // Floors                  
                this.setNumber(parseInt(data['number_floors']), this.m_floorArray, Floor);                                
                                        
                for (let id in this.m_floorArray) {                    
                    this.m_floorArray[id].setSitePath(data['floorPath_' + id]);
                }           
                
                // Rooms            
                this.setNumber(parseInt(data['number_rooms']), this.m_roomArray, Room);
                
                for (var id = 0; id < this.m_roomArray.length; id ++) {                    
                    this.m_roomArray[id].setSitePath(data['roomPath_' + id]);
                }             
                
                // TempSensors                                             
                this.setNumber(parseInt(data['number_tempsensors']), this.m_tempSensorArray, TemperatureSensor);
                
                for (let id in this.m_tempSensorArray) {                                
                    this.m_tempSensorArray[id].setSitePath(data['tempSensorPath_' + id]);  
                   // this.m_tempSensorArray[id].x = 6;                 
                }     
                
                // Switches                                     
                this.setNumber(parseInt(data['number_switches']), this.m_switchArray, Switch);
                
              //  window.alert("ns: " + this.m_switchArray.length);
                
                for (let id in this.m_switchArray) {                      
                    this.m_switchArray[id].setSitePath(data['switchPath_' + id]);
                } 
                
                // ContactSensors                                                     
                this.setNumber(parseInt(data['number_contactSensors']), this.m_contactSensorArray, ContactSensor);
                //window.alert("Num:" + parseInt(data['number_contactSensors']));
                for (let id in this.m_contactSensorArray) {                      
                    this.m_contactSensorArray[id].setSitePath(data['contactSensorPath_' + id]);                    
                }
                
                // Door                                     
                this.setNumber(parseInt(data['number_doors']), this.m_doorArray, Door);
                            
                for (let id in this.m_doorArray) {           
                    this.m_doorArray[id].setSitePath(data['doorPath_' + id]);
                    
                //    window.alert("Path:" + this.m_doorArray[id].getSitePath());
                }     
                
                // Window          
                                           
                this.setNumber(parseInt(data['number_windows']), this.m_windowArray, Window);
                            
                for (let id in this.m_windowArray) {           
                    this.m_windowArray[id].setSitePath(data['windowPath_' + id]);
                    
                //    window.alert("Path:" + this.m_doorArray[id].getSitePath());
                } 
                               
            }      
        }   
/*
        public postServerCommand (cmd: string) {            
            var req: any = {
                postId : 'GeneralCommand',
                command: cmd                
            }
            
            postAjax(servletUrl, req);
        }    
        */
        /*
        public postServerCommand (cmd: string) {            
            var req: any = {
                idPost : 'GeneralCommand'//,
              //  command: cmd                
            }
        //    window.alert('aa');
            postAjax(url, req);
        }    
        */      
    }
    
    export class Thing {
        
        protected valid: boolean = false; //content of the forecast is valid        
        protected sitePath:  string = "*"; //OpenHS path     
        
        constructor () {
        }
        
        public setSitePath (path: string) {
            this.sitePath = path;
        }   
        
        public getSitePath() {
            return this.sitePath;
        }
        
        public isValid() {
            return this.valid;
        } 
        
        public getServerData () {
        }          
        
        public getServerDataDelayed (wait: number) {                    
            window.setTimeout(() => this.getServerData(), wait);         
                                      
        }         
        
        
        fillFromJSON(json: any) {

            for (var propName in json) {
                
                window.alert(propName + json[propName] + ' to: ' + this[propName]);
                
                this[propName] = json[propName]
            }
        }         
    }
        
    export class Floor extends Thing {
        
        public imagePath: string = "/infores/servlets/kitchen/room_default.png";
        
        public name:    string = 'no name';
        public dimX:   number = 0;
        public dimY:   number = 0;

        public getServerData () {       
             
            var req = JSON.stringify({                 
                orderId : "TempSensor",
                path:   this.sitePath                
            });
            
            var data: string = getAjax2(servletUrl, req); 
            
            this.parseServerData(data);                    
        }        
        
        public parseServerData (data: any) {                   
            if (data != null) {                
                this.valid = JSON.parse(data[this.sitePath + '__validity']);

                if (this.valid) {
                    this.name = data[this.sitePath + '__name'];
                    this.imagePath = data[this.sitePath + '__imagePath'];                    
                    this.dimX = parseFloat(data[this.sitePath + '__dim_x']);
                    this.dimY = parseFloat(data[this.sitePath + '__dim_y']);     
                    
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
             
            var req = JSON.stringify({                
                orderId : "Room",
                path:   this.sitePath                
            });
            
            var data: string = getAjax2(servletUrl, req); 
            
            this.parseServerData(data);                                 
        }              
        
        public parseServerData (data: any) {                   
            if (data != null) {                
                this.valid = JSON.parse(data[this.sitePath + '__validity']);

                if (this.valid) {
                    this.name = data[this.sitePath + '__name'];
                    this.imageBkgPath = data[this.sitePath + '__imagePath'];
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
             
            var req = JSON.stringify({                 
                orderId : "TempSensor",
                path:   this.sitePath                
            });
            
            var data: string = getAjax2(servletUrl, req); 
            
            this.parseServerData(data);                    
        }        
        
        public parseServerData (data: any) {                   
            if (data != null) {                
                this.valid = JSON.parse(data[this.sitePath + '__validity']);

                if (this.valid) {
                    this.x = parseFloat(data[this.sitePath + '__x']);
                    this.y = parseFloat(data[this.sitePath + '__y']);
                    //this.z = parseInt(data[this.sitePath + '__z']);
                    this.temp = parseFloat(data[this.sitePath + '__temperature']);  
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

        public getState () {
            return this.stateInt;
        }
        
        protected getStateServer() {            
            var js = JSON.stringify({
            idGet : idThingGet,
            path:   this.sitePath,
            command: 'state_int' 
            });                        
            
            var ret = postAjax(url, js);   
            
            if (JSON.parse(ret['return'])){
                this.stateInt = parseInt(ret['state_int']);            
            }                          
        }
        
        public getServerDataDelayed (wait: number) {                    
            window.setTimeout(() => this.getServerData(), wait);                                               
        }           
        
        public click () {                        
            if (this.getState() == 1 || this.getState() == 2) {
                this.on();            
            } else {
                this.off();            
            }            
        }
        
        public on () {            
            var js = JSON.stringify({
            idPost : idThingCommand,
            path:   this.sitePath,
            command: 'on' 
            });               
            
            var ret = postAjax(url, js);        
            
            if (JSON.parse(ret['return'])){
                this.stateInt = parseInt(ret['state_int']);
                
              //  this.getServerDataDelayed (250);
            }                           
        }
        
        public off () {
            var js = JSON.stringify({
            idPost : idThingCommand,
            path:   this.sitePath,
            command: 'off' 
            });               
            
            var ret = postAjax(url, js);     
            
            if (JSON.parse(ret['return'])){
                this.stateInt = parseInt(ret['state_int']);            
            }
        }                    
       
        public parseServerData (data: any) {                   
            if (data != null) {
                 this.valid = JSON.parse(data[this.sitePath + '__validity']);
                //window.alert("valid: " + this.sitePath);
                if (this.valid){                    
                 
                    this.stateInt = parseInt(data[this.sitePath + '__state_int']);
                    this.x = parseFloat(data[this.sitePath + '__x']);
                    this.y = parseFloat(data[this.sitePath + '__y']);
                    //this.z = parseInt(data[this.sitePath + '__z']);
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
             
            var req = JSON.stringify({               
                orderId : idCcontactSensor,
                path:   this.sitePath                
            });
            
            var data: string = getAjax2(servletUrl, req); 
            
            this.parseServerData (data); 
                    
        }
        
        public parseServerData (data: any) {                   
            if (data != null) {
                this.valid = JSON.parse(data[this.sitePath + '__validity']);
                
                if (this.valid){
                    this.state = JSON.parse(data[this.sitePath + '__state_int']);
                    this.x = parseFloat(data[this.sitePath + '__x']);
                    this.y = parseFloat(data[this.sitePath + '__y']);
                  //  this.z = parseInt(data[this.sitePath + '__z']);
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
        /*
        public postServerClick () {            
            var req: any = {
                postId : "DoorD",
                path:   this.sitePath                
            }
            
            postAjax(servletUrl, req);
        }                
        */
        public getServerData () {       
             
            var req = JSON.stringify({                 
                orderId : "DoorD",
                path:   this.sitePath                
            });
            
            var data: string = getAjax2(servletUrl, req); 
            
            this.parseServerData(data);                                            
        }       
        
        public parseServerData (data: any) {                   
            if (data != null) {                
                this.valid = JSON.parse(data[this.sitePath + '__validity']);

                if (this.valid) {
                    this.name = data[this.sitePath + '__name'];
                    this.x = parseFloat(data[this.sitePath + '__x']);
                    this.y = parseFloat(data[this.sitePath + '__y']);
                    //this.z = parseFloat(data[this.sitePath + '__z']);
                    this.open = JSON.parse(data[this.sitePath + '__open']);
                    this.locked = JSON.parse(data[this.sitePath + '__lock']);  
                    this.image_open = data[this.sitePath + '__imagePath_open'];
                    this.image_close = data[this.sitePath + '__imagePath_close'];
                    this.supplier.name = data[this.sitePath + '__supplierName']; 
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
        /*
        public postServerClick () {            
            var req: any = {
                postId : "Window",
                path:   this.sitePath                
            }
            
            postAjax(servletUrl, req);
        }                
        */
        public getServerData () {       
             
            var req = JSON.stringify({                 
                orderId : "Window",
                path:   this.sitePath                
            });
            
            var data: string = getAjax2(servletUrl, req); 
            
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
                this.valid = JSON.parse(data[this.sitePath + '__validity']);

                if (this.valid) {
                    this.name = data[this.sitePath + '__name'];
                    this.x = parseFloat(data[this.sitePath + '__x']);
                    this.y = parseFloat(data[this.sitePath + '__y']);
                    //this.z = parseFloat(data[this.sitePath + '__z']);
                    this.open = JSON.parse(data[this.sitePath + '__open']);
                    this.locked = JSON.parse(data[this.sitePath + '__lock']);  
                    this.image_open = data[this.sitePath + '__imagePath_open'];
                    this.image_close = data[this.sitePath + '__imagePath_close'];    
                }
            }                            
        }          
        
    }    
    
    
    function getAjax2(urlAdr: string, dataIn: string) {
       
        var result = null;
    
        $.ajaxSetup ({
            // Disable caching of AJAX responses
            cache: false
        });
            
           window.alert(dataIn);
        
        $.ajax({
            async: false,
            type: "GET",
            contentType: 'application/json',
            url: urlAdr,
            data: dataIn,
            dataType: "json",
            success: function(response) {
        
            result = response;
                                      
        }});
    
        return result;    
    }     

    function postAjax(urlAdr: string, jsonDat: string) {
       
        var result = null;
            
            $.ajax({
                async: false,
                type: "POST",
                contentType: 'application/json',
                url: urlAdr,                
                data: jsonDat,
                dataType: "json",
                success: function(response) {
        
                result = response;
                                      
             }});  
    
        return result;    
    }       
 
        
    
}