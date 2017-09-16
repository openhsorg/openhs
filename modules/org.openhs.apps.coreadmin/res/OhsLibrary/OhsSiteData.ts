/**
 * Module with data structure...
 * Author: Michal Valny
 * Date: July-4-2017
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
    const idSiteUpdate = 'idSiteUpdate';
    const idSetFloors = 'idSetFloors';
    const idAddFloor = 'idAddFloor';
    const idDeleteFloor = 'idDeleteFloor';
    const idDeleteThing = 'idDeleteThing';
    const idAddThing = 'idAddThing';
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
        public m_site:                  Site = null;
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
            this.m_site = new Site();           
            this.m_floorArray = new Array<Floor>();
            this.m_roomArray = new Array<Room>(); 
            this.m_tempSensorArray = new Array<TemperatureSensor>(); 
            this.m_switchArray = new Array<Switch>();
            this.m_doorArray = new Array<Door>();
            this.m_windowArray = new Array<Window>();
            this.m_contactSensorArray = new Array<ContactSensor>();    
            
            //Initial update
            this.m_site.update();
            this.updateObjectArray(idFloorArr);            
            this.updateObjectArray(idRoomArr);
            this.updateObjectArray(idDoorArr);
            this.updateObjectArray(idWindowArr);
            this.updateObjectArray(idTempSensArr);
            this.updateObjectArray(idSwitchArr);
            this.updateObjectArray(idContactSensArr);
           
            //Timers
            this.fastTimerGetDataEvent(500);            
            this.slowTimerGetDataEvent(2000);            
        }
        
        private slowTimerGetDataEvent(step : number) {
            
           this.updateSlowData();
                                               
           window.clearTimeout(this.slowTimerGetData);
           this.slowTimerGetData = window.setTimeout(() => this.slowTimerGetDataEvent(step), step); 
        }          
        
        private fastTimerGetDataEvent(step : number) {
            
           this.updateFastData();
                                               
           window.clearTimeout(this.fastTimerGetData);
           this.fastTimerGetData = window.setTimeout(() => this.fastTimerGetDataEvent(step), step); 
        }       
        
        public updateFastData () {
            
            //Date & Time
            this.updateDateTime();  
            
            //Switch 
        //    this.getObjectArray(idSwitchArr);            
       }
        
        public updateSlowData () {
            
         //   this.get_DateTime();
            
            if (this.getCount == 0) {            
                this.updateObjectArray(idFloorArr);
                                         
            } else if (this.getCount == 1) {
                this.updateObjectArray(idRoomArr);
                
            } else if (this.getCount == 2) {
                this.updateObjectArray(idDoorArr);
                
            } else if (this.getCount == 3) {
               this.updateObjectArray(idWindowArr);
                
            } else if (this.getCount == 4) {
               this.updateObjectArray(idSwitchArr);
                
            } else if (this.getCount == 5) {
               this.updateObjectArray(idTempSensArr);
                
            } else if (this.getCount == 6) {
               this.updateObjectArray(idContactSensArr);
                                
            } else if (this.getCount == 7) {
               this.m_site.update();
                
            } else if (this.getCount == 8) {
                
                //Filter arrays
                
            }
                        
            if (this.getCount == 8) {
                this.getCount = 0;
                
            } else {
                 this.getCount ++;                    
            }         
        }
        
        public updateDateTime (){
            
            var js = JSON.stringify({
            idPost : idTimeDate
            });               
            
            var ret = postAjax(url, js);    
            
            if (ret != null) {
                
                if (JSON.parse(ret['return'])){
                   // this.stateInt = parseInt(ret['state_int']);  
                    this.dateString = ret['date'];
                    this.timeString = ret['time'];             
                } 
            }
        }        
 
        public updateObjectArray (idObjArray:  string){

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
        
        public getSitePaths<T> (arg: Array<T>) {
            
            var sitePaths: Array <String> = new Array<String>();            
                        
            for (var i = 0; i < arg.length; i++) {
                
                var thing: Thing = <Thing> <any>arg[i];
                
                //var ss = new types();
                
                sitePaths.push(thing.getSitePath());
                   
                   
            }            
            
            return sitePaths;
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
        
        public getNumberFloors () {
            return this.m_floorArray.length;
                
        }
        
        public setNumberFloors(n: number) {   
                 
            var js = JSON.stringify({
                idPost : idSetFloors,
                nmb:   n
            });               
            
            //window.alert('***');
            
            var ret = postAjax(url, js);     
            
            if (JSON.parse(ret['return'])){
                /*
                this.stateInt = parseInt(ret['state_int']);      
            
                this.updateDelayed (100);
                */
                
                this.updateObjectArray(idFloorArr);   
            }            
        
        }
        
        public addFloor() {   
                 
            var js = JSON.stringify({
                idPost : idAddFloor
            });               

            var ret = postAjax(url, js);     
            
            if (JSON.parse(ret['return'])){
                
                this.updateObjectArray(idFloorArr);   
            }                    
        }    
        
        public deleteFloor(floorPath : string) {   
                 
            var js = JSON.stringify({
                idPost : idDeleteFloor,
                sitePath  : floorPath
            });               

            var ret = postAjax(url, js);     
            
            if (JSON.parse(ret['return'])){
                
                this.updateObjectArray(idFloorArr);   
            }                    
        }        
        
        public deleteThing(thing : Thing) {   
        
            var idType : string  = idRoomArr; 
                        
            if (thing instanceof Floor) {
                idType = idFloorArr;
                            
            } else if (thing instanceof Room) {
                idType = idRoomArr;
            }
                 
            var js = JSON.stringify({
                idPost : idDeleteThing,
                sitePath  : thing.getSitePath()
            });               

            var ret = postAjax(url, js);     
            
            if (JSON.parse(ret['return'])){
                
                this.updateObjectArray(idType);   
            }                    
        }   
        
        public addThing(thingName : string) {   
        
            var idType : string  = idRoomArr; 
                        
            if (thingName == Floor.name) {
                idType = idFloorArr;
                            
            } else if (thingName == Room.name) {
                idType = idRoomArr;
            }
                 
            var js = JSON.stringify({
                idPost : idAddThing,
                thingType  : thingName
            });               

            var ret = postAjax(url, js);     
            
            if (JSON.parse(ret['return'])){
                
                this.updateObjectArray(idType);   
            }                    
        }         
    }
    
    export class Thing {
        
        protected valid:        boolean = false; //content of the forecast is valid        
        protected sitePath:     string = "*"; //OpenHS path
        protected devicePath:   string = "*"; //OpenHS path          
        public name:            string = "no name";
        
        public posX:            number;
        public posY:            number;
        public posZ:            number;           
        
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
        
        public getDevicePath() {
            return this.devicePath;
        }   
        
        public setDevicePath (path: string) {
            this.devicePath = path;
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
                
               //  window.alert(propName + ' json:' + json[propName] + ' to: ' + this[propName]);
            }                      
        }                     
    }
    
    export class Site extends Thing {
        
        public name: string = "no name";                
        
        public update () {       
            var js = JSON.stringify({
                idPost : idSiteUpdate
            });               
            
            var ret = postAjax(url, js);     
            
            if (JSON.parse(ret['validity'])){
                this.name = ret['name'];      
            }                
        }   
                            
        
    }    
        
    export class Floor extends Thing {
        
        public imagePath: string = "/infores/servlets/kitchen/room_default.png";
        
        public dimX:   number = 0;
        public dimY:   number = 0;
        
        //Rooms belongs to this floor...
        public m_roomArray:             Array <Room> = null;
                    
        
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

    function postAjax(urlAdr: string, jsonDat: string) {
       
        var result = null;
        
        $.ajaxSetup ({
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
                success: function(response) {
        
                result = response;
                                      
             }});  
    
        return result;    
    }       
 
        
    
}