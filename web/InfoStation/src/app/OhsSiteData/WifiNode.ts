import {Thing} from './Thing';

export class WifiNode extends Thing {

    //public imageBkgPath     = '/infores/servlets/kitchen/room_default.png';
    protected netType = '';
    protected sensorType = '';

    constructor () {
        super ();
    }
}
