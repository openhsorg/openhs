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
    /*
    function sleep(ms) {
        var unixtime_ms = new Date().getTime();
        while(new Date().getTime() < unixtime_ms + ms) {}
    }
    */      
     
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
            this.m_windowArray = new Array<Window>();
            this.m_contactSensorArray = new Array<ContactSensor>();    
            
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
        
        public getFastData () {
            
            //Date & Time
            this.get_DateTime();  
            
            //Switch 
            this.getObjectArray(idSwitchArr);            
       }
        
        public getSlowData () {
            
         //   this.get_DateTime();
            
            if (this.getCount == 0) {            
                this.getObjectArray(idFloorArr);
                                         
            } else if (this.getCount == 1) {
                this.getObjectArray(idRoomArr);
                
            } else if (this.getCount == 2) {
                this.getObjectArray(idDoorArr);
                
            } else if (this.getCount == 3) {
               this.getObjectArray(idWindowArr);
                
            } else if (this.getCount == 4) {
               this.getObjectArray(idSwitchArr);
                
            } else if (this.getCount == 5) {
               this.getObjectArray(idTempSensArr);
                
            } else if (this.getCount == 6) {
               this.getObjectArray(idContactSensArr);
                
            }
                        
            if (this.getCount == 6) {
                this.getCount = 0;
                
            } else {
                 this.getCount ++;                    
            }
         
        }
        
        public get_DateTime (){
            
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

                            this.m_floorArray[i].fillFromJSON(object);
                        }
                        
                    } else if (idObjArray == idRoomArr) {
                        
                        this.setNumber(parsedJSON.length, this.m_roomArray, Room);
                        
                        for (var i = 0; i < parsedJSON.length; i++) {                    
                            var object = parsedJSON[i];
                                                        
                            this.m_roomArray[i].fillFromJSON(object);
                        }
                    }  else if (idObjArray == idDoorArr) {
                        
                        this.setNumber(parsedJSON.length, this.m_doorArray, Door);
                        
                        for (var i = 0; i < parsedJSON.length; i++) {                    
                            var object = parsedJSON[i];
                                                        
                            this.m_doorArray[i].fillFromJSON(object);
                        }
                    }  else if (idObjArray == idWindowArr) {
                        
                        this.setNumber(parsedJSON.length, this.m_windowArray, Window);
                        
                        for (var i = 0; i < parsedJSON.length; i++) {                    
                            var object = parsedJSON[i];
                                                        
                            this.m_windowArray[i].fillFromJSON(object);
                        }
                    }  else if (idObjArray == idSwitchArr) {                                               
                        
                        this.setNumber(parsedJSON.length, this.m_switchArray, Switch);
                        
                        for (var i = 0; i < parsedJSON.length; i++) {                    
                            var object = parsedJSON[i];
                                 
                            this.m_switchArray[i].fillFromJSON(object);
                        }
                    }  else if (idObjArray == idTempSensArr) {
                        
                        this.setNumber(parsedJSON.length, this.m_tempSensorArray, TemperatureSensor);
                        
                        for (var i = 0; i < parsedJSON.length; i++) {                    
                            var object = parsedJSON[i];
                                                        
                            this.m_tempSensorArray[i].fillFromJSON(object);
                        }
                    }    else if (idObjArray == idContactSensArr) {
                        
                        this.setNumber(parsedJSON.length, this.m_contactSensorArray, ContactSensor);
                        
                        for (var i = 0; i < parsedJSON.length; i++) {                    
                            var object = parsedJSON[i];
                                                        
                            this.m_contactSensorArray[i].fillFromJSON(object);
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
     
    }
    
    export class Thing {
        
        protected valid: boolean = false; //content of the forecast is valid        
        protected sitePath:  string = "*"; //OpenHS path     
        public name: string = "no name";
        
        public posX:   number;
        public posY:   number;
        public posZ:   number;           
        
        constructor () {
            this.posX = 0.0;
            this.posY = 0.0;
            this.posZ = 0.0;
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
        
        public update () {
            
        }   
        
        public updateDelayed (wait: number) {                    
            window.setTimeout(() => this.update(), wait);                                               
        }          
        
        fillFromJSON(json: any) {

            for (var propName in json) {                                               
                this[propName] = json[propName];
                
              //   window.alert(propName + ' json:' + json[propName] + ' to: ' + this[propName]);
            }                      
        }                     
    }
        
    export class Floor extends Thing {
        
        public imagePath: string = "/infores/servlets/kitchen/room_default.png";
        
        public dimX:   number = 0;
        public dimY:   number = 0;

        
            
        
    }
    
    export class Room extends Thing{
        
        public imageBkgPath: string = "/infores/servlets/kitchen/room_default.png"; 
                
        constructor () {
            super ();
                                    
        }        
                       
    }    
    
    export class TemperatureSensor extends Thing {
        
        public temp:  number;        
 
        
        constructor () { 
            super();           
   
            this.temp = 0.0;
        }                     
    } 
    
    export class Supplier {
        
        public valid: boolean = false;  
        public name:  string = "unknown";
        public www:  string = "unknown";     
        public address:  string = "unknown address";
        public phone:  string = "unknown";
        public logo:  string = "unknown";
        
   
    }
    
    export class Switch extends Thing {
    
        protected   stateInt:  number; //                     
        
        constructor () {     
            super ();       
            
            this.stateInt = 0;
        }    

        public getState () {
            return this.stateInt;
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
                
                this.updateDelayed(100);
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
            
                this.updateDelayed (100);
            }
        }
    
        public update () {
        
            var js = JSON.stringify({
                idPost : idThingCommand,
                path:   this.sitePath,
                command: 'update' 
            });               
            
            var ret = postAjax(url, js);     
            
            if (JSON.parse(ret['return'])){
                this.stateInt = parseInt(ret['state_int']);      
            }        
        
        }                                 
    
    }  
    
    export class ContactSensor extends Thing {    
 
        protected   state:  boolean; //           
        
        constructor () {     
            super ();       
            
            this.state = false;
        }          
        
        public setState(st: boolean){
            this.state = st;
        }
 
        public getState () {
            return this.state;
        }            
        /*
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
        */
    }       
    
    export class Door extends Thing {
                
        public image_open: string = "/infores/servlets/kitchen/room_default.png";
        public image_close: string = "/infores/servlets/kitchen/room_default.png"; 
        
        public open:       boolean; //Open
        public locked:     boolean; //Door lock
        
        public supplier:  Supplier = new Supplier ();
        
        constructor () {
            super();
            this.open = false;
            this.locked = false;
            
            this.posX = 0;
            this.posY = 0;
        } 
        
        public getState () {                                   
            if (!this.valid) return 0;
            if (this.open) return 1;                        
            if (this.locked) return 3;
            
            return 2;                                    
        }
               
    }    
    
    export class Window extends Thing {
    
        public image_open: string = "/infores/servlets/kitchen/room_default.png";
        public image_close: string = "/infores/servlets/kitchen/room_default.png"; 
        
        public open:       boolean; //Open
        public locked:     boolean; //Door lock
          
        constructor () {
            super();
            this.open = false;
            this.locked = false;

        } 
        
        public getState () {                                   
            if (!this.valid) return 0;
            if (this.open) return 1;                        
            if (this.locked) return 3;
            
            return 2;                                    
        }        
    }    
    
    /*
    function getAjax(urlAdr: string, dataIn: string) {
       
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
*/
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