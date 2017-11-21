import {Thing} from './Thing';
import {Site} from './Site';
import {Floor} from './Floor';
import {Room} from './Room';
import {TemperatureSensor} from './TemperatureSensor';
import {Switch} from './Switch';
import {Door} from './Door';
import {Window} from './Window';
import {ContactSensor} from './ContactSensor';
import {WifiNode} from './WifiNode';
import {OhsInterface} from './OhsInterface';
import {postAjax} from './OhsInterface';

export class SiteData {

    // ---Timers---
    private fastTimerGetData;
    private normalTimerGetData;
    private slowTimerGetData;

    // ---Site data---
    public m_site:                  Site = null;
    public m_floorArray:            Array <Floor> = null;
    public m_roomArray:             Array <Room> = null;
    public m_tempSensorArray:       Array <TemperatureSensor> = null;
    public m_switchArray:           Array <Switch> = null;
    public m_doorArray:             Array <Door> = null;
    public m_windowArray:           Array <Window> = null;
    public m_contactSensorArray:    Array <ContactSensor> = null;
    public m_wifiNodeArray:         Array <WifiNode> = null;

    protected getCountNormal        = 0;
    protected getCountSlow          = 0;

    // ---Other data---
    public timeString       = '---';
    public dateString       = '---';

    constructor () {
        this.m_site = new Site();
        this.m_floorArray = new Array<Floor>();
        this.m_roomArray = new Array<Room>();
        this.m_tempSensorArray = new Array<TemperatureSensor>();
        this.m_switchArray = new Array<Switch>();
        this.m_doorArray = new Array<Door>();
        this.m_windowArray = new Array<Window>();
        this.m_contactSensorArray = new Array<ContactSensor>();
        this.m_wifiNodeArray = new Array<WifiNode>();

        // Initial update
        this.m_site.update();

        this.updateObjectArray(OhsInterface.ID_FLOOR_ARR);
        this.updateObjectArray(OhsInterface.ID_ROOM_ARR);
        this.updateObjectArray(OhsInterface.ID_DOOR_ARR);
        this.updateObjectArray(OhsInterface.ID_WINDOW_ARR);
        this.updateObjectArray(OhsInterface.ID_TEMP_SENS_ARR);
        this.updateObjectArray(OhsInterface.ID_SWITCH_ARR);
        this.updateObjectArray(OhsInterface.ID_CONTACTSENS_ARR);
        this.updateObjectArray(OhsInterface.ID_WIFINODE_ARR);

        // Timers
        this.fastTimerGetDataEvent(150);
        this.slowTimerGetDataEvent(10000);
        this.normalTimerGetDataEvent(2000);

    }

    private normalTimerGetDataEvent(step: number) {

        this.updateData();

        window.clearTimeout(this.normalTimerGetData);
        this.normalTimerGetData = window.setTimeout(() => this.normalTimerGetDataEvent(step), step);
    }

    private fastTimerGetDataEvent(step: number) {

        this.updateFastData();

        window.clearTimeout(this.fastTimerGetData);
        this.fastTimerGetData = window.setTimeout(() => this.fastTimerGetDataEvent(step), step);
    }

    private slowTimerGetDataEvent(step: number) {

        this.updateSlowData();

        window.clearTimeout(this.slowTimerGetData);
        this.slowTimerGetData = window.setTimeout(() => this.slowTimerGetDataEvent(step), step);
    }

    public updateFastData () {
        // Date & Time
        this.updateDateTime();
    }

    public updateData () {

        if (this.getCountNormal === 1) {
            this.updateObjectArray(OhsInterface.ID_SWITCH_ARR);

        } else if (this.getCountNormal === 2) {
            this.updateObjectArray(OhsInterface.ID_TEMP_SENS_ARR);

        } else if (this.getCountNormal === 3) {
            this.updateObjectArray(OhsInterface.ID_CONTACTSENS_ARR);

        }

        if (this.getCountNormal === 3) {
            this.getCountNormal = 1;

        } else {
                this.getCountNormal ++;
        }
    }

    public updateDateTime () {

        var js = JSON.stringify({
        idPost : OhsInterface.ID_TIME_DATE
        });

        var ret = postAjax(OhsInterface.URL, js);

        if (ret != null) {

            if (JSON.parse(ret['return'])) {
                // this.stateInt = parseInt(ret['state_int']);
                this.dateString = ret['date'];
                this.timeString = ret['time'];
            }

          //  window.alert('update time:' + this.timeString);
        }
    }
    public updateSlowData () {

        if (this.getCountSlow === 0) {
            this.updateObjectArray(OhsInterface.ID_FLOOR_ARR);

        } else if (this.getCountSlow === 1) {
            this.updateObjectArray(OhsInterface.ID_ROOM_ARR);

        } else if (this.getCountSlow === 2) {
            this.updateObjectArray(OhsInterface.ID_DOOR_ARR);

        } else if (this.getCountSlow === 3) {
            this.updateObjectArray(OhsInterface.ID_WINDOW_ARR);

        } else if (this.getCountSlow === 4) {
            this.m_site.update();

        } else if (this.getCountSlow === 5) {
            this.updateObjectArray(OhsInterface.ID_WIFINODE_ARR);
        }

        if (this.getCountSlow === 5) {
            this.getCountSlow = 0;

        } else {
                this.getCountSlow ++;
        }
    }

    public updateObjectArray (idObjArray:  string) {

        var js = JSON.stringify({
        idPost : idObjArray
        });

        var ret = postAjax(OhsInterface.URL, js);

        if (ret != null) {
            if (JSON.parse(ret['return'])) {

                var str = JSON.stringify(ret[idObjArray]);

                var parsedJSON = JSON.parse(str);

                // Floors
                if (idObjArray === OhsInterface.ID_FLOOR_ARR) {

                    this.setNumber(parsedJSON.length, this.m_floorArray, Floor);

                    for (var i = 0; i < parsedJSON.length; i++) {
                        var object = parsedJSON[i];

                        this.m_floorArray[i].fillFromJSON(object);
                    }

                } else if (idObjArray === OhsInterface.ID_ROOM_ARR) {

                    this.setNumber(parsedJSON.length, this.m_roomArray, Room);

                    for (var i = 0; i < parsedJSON.length; i++) {
                        var object = parsedJSON[i];

                        this.m_roomArray[i].fillFromJSON(object);
                    }
                }  else if (idObjArray === OhsInterface.ID_DOOR_ARR) {

                    this.setNumber(parsedJSON.length, this.m_doorArray, Door);

                    for (var i = 0; i < parsedJSON.length; i++) {
                        var object = parsedJSON[i];

                        this.m_doorArray[i].fillFromJSON(object);
                    }
                }  else if (idObjArray === OhsInterface.ID_WINDOW_ARR) {

                    this.setNumber(parsedJSON.length, this.m_windowArray, Window);

                    for (var i = 0; i < parsedJSON.length; i++) {
                        var object = parsedJSON[i];

                        this.m_windowArray[i].fillFromJSON(object);
                    }
                }  else if (idObjArray === OhsInterface.ID_SWITCH_ARR) {

                    this.setNumber(parsedJSON.length, this.m_switchArray, Switch);

                    for (var i = 0; i < parsedJSON.length; i++) {
                        var object = parsedJSON[i];

                        this.m_switchArray[i].fillFromJSON(object);
                    }
                }  else if (idObjArray === OhsInterface.ID_TEMP_SENS_ARR) {

                    this.setNumber(parsedJSON.length, this.m_tempSensorArray, TemperatureSensor);

                    for (var i = 0; i < parsedJSON.length; i++) {
                        var object = parsedJSON[i];

                        this.m_tempSensorArray[i].fillFromJSON(object);
                    }
                }    else if (idObjArray === OhsInterface.ID_CONTACTSENS_ARR) {

                    this.setNumber(parsedJSON.length, this.m_contactSensorArray, ContactSensor);

                    for (var i = 0; i < parsedJSON.length; i++) {
                        var object = parsedJSON[i];

                        this.m_contactSensorArray[i].fillFromJSON(object);
                    }
                }    else if (idObjArray === OhsInterface.ID_WIFINODE_ARR) {
                    
                    this.setNumber(parsedJSON.length, this.m_wifiNodeArray, WifiNode);

                    for (var i = 0; i < parsedJSON.length; i++) {
                        var object = parsedJSON[i];

                        this.m_wifiNodeArray[i].fillFromJSON(object);
                    }
                }
            }
        }
    }

    public setNumber<T>(num:  number, arg: Array<T>, types: { new(): T ;}) {
        if (num > arg.length) {
            for (var i = arg.length; i < num; i++) {
                let ss = new types();
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
                    const thing: Thing = (<Thing><any>element);

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

            // var ss = new types();

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
                .replace(/(^\s+|\s+$)/g, '') // remove leading and trailing whitespaces
                .replace(/(^\/+|\/+$)/g, ''); // remove leading and trailing slashes

            // window.alert("*** getParent ***, Path: " + path + "  \n\nPath2:" + path2 +"|");

            var parts = path2.split('/'); // split string

            parts.pop();
            parts.pop();

            let newPath: string = parts.join('/');

            //  window.alert("*** getParent ***, newPath: " + newPath);

            return newPath;
        }
    }

    public getThing (path: string) {

        for (let id in this.m_floorArray) {
            if (this.m_floorArray[id].getSitePath() === path) {
                return <Thing>this.m_floorArray[id];
            }
        }

        for (let id in this.m_roomArray) {
            if (this.m_roomArray[id].getSitePath() === path) {
                return <Thing>this.m_roomArray[id];
            }
        }

        for (let id in this.m_tempSensorArray) {
            if (this.m_tempSensorArray[id].getSitePath() === path) {
                return <Thing>this.m_tempSensorArray[id];
            }
        }

        for (let id in this.m_switchArray) {
            if (this.m_switchArray[id].getSitePath() === path) {
                return <Thing>this.m_switchArray[id];
            }
        }

        for (let id in this.m_doorArray) {
            if (this.m_doorArray[id].getSitePath() === path) {
                return <Thing>this.m_doorArray[id];
            }
        }

        for (let id in this.m_windowArray) {
            if (this.m_windowArray[id].getSitePath() === path) {
                return <Thing>this.m_windowArray[id];
            }
        }

        for (let id in this.m_contactSensorArray) {
            if (this.m_contactSensorArray[id].getSitePath() === path) {
                return <Thing>this.m_contactSensorArray[id];
            }
        }

        for (let id in this.m_wifiNodeArray) {
            if (this.m_wifiNodeArray[id].getSitePath() === path) {
                return <Thing>this.m_wifiNodeArray[id];
            }
        }        

        return null;
    }

    public getNumberFloors () {
        return this.m_floorArray.length;

    }

    public setNumberFloors(n: number) {

        var js = JSON.stringify({
            idPost : OhsInterface.ID_SET_FLOORS,
            nmb:   n
        });

        // window.alert('***');

        const ret = postAjax(OhsInterface.URL, js);

        if (JSON.parse(ret['return'])){
            /*
            this.stateInt = parseInt(ret['state_int']);

            this.updateDelayed (100);
            */

            this.updateObjectArray(OhsInterface.ID_FLOOR_ARR);
        }

    }

    public addFloor() {

        var js = JSON.stringify({
            idPost : OhsInterface.ID_ADD_FLOOR
        });

        var ret = postAjax(OhsInterface.URL, js);

        if (JSON.parse(ret['return'])) {

            this.updateObjectArray(OhsInterface.ID_FLOOR_ARR);
        }
    }

    public deleteFloor(floorPath: string) {

        var js = JSON.stringify({
            idPost : OhsInterface.ID_DELETE_FLOOR,
            sitePath  : floorPath
        });

        var ret = postAjax(OhsInterface.URL, js);

        if (JSON.parse(ret['return'])) {

            this.updateObjectArray(OhsInterface.ID_FLOOR_ARR);
        }
    }

    public deleteThing(thing: Thing) {

        let idType: string  = OhsInterface.ID_ROOM_ARR;

        if (thing instanceof Floor) {
            idType = OhsInterface.ID_FLOOR_ARR;

        } else if (thing instanceof Room) {
            idType = OhsInterface.ID_ROOM_ARR;
        }

        const js = JSON.stringify({
            idPost : OhsInterface.ID_DELETE_THING,
            sitePath  : thing.getSitePath()
        });

        const ret = postAjax(OhsInterface.URL, js);

        if (JSON.parse(ret['return'])) {

            this.updateObjectArray(idType);
        }
    }

    public addThing(thingName: string) {

        var idType: string  = OhsInterface.ID_ROOM_ARR;

        if (thingName === Floor.name) {
            idType = OhsInterface.ID_FLOOR_ARR;

        } else if (thingName === Room.name) {
            idType = OhsInterface.ID_ROOM_ARR;
        }

        var js = JSON.stringify({
            idPost : OhsInterface.ID_ADD_THING,
            thingType  : thingName
        });

        var ret = postAjax(OhsInterface.URL, js);

        if (JSON.parse(ret['return'])) {

            this.updateObjectArray(idType);
        }
    }
}
