import {Thing} from './Thing';

export class ContactSensor extends Thing {

    protected   state:  boolean;

    constructor () {
        super ();
        this.state = false;
    }

    public setState(st: boolean) {
        this.state = st;
    }

    public getState () {
        return this.state;
    }
}
