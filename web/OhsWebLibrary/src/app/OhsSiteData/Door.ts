import {Thing} from './Thing';
import {Supplier} from './Supplier';

export class Door extends Thing {

    public image_open       = '/infores/servlets/kitchen/room_default.png';
    public image_close      = '/infores/servlets/kitchen/room_default.png';

    public open:       boolean; // Open
    public locked:     boolean; // Door lock

    public supplier:  Supplier = new Supplier ();

    constructor () {
        super();
        this.open = false;
        this.locked = false;

        this.posX = 0;
        this.posY = 0;
    }

    public getState () {
        if (!this.valid) { return 0; }
        if (this.open) { return 1; }
        if (this.locked) { return 3; }

        return 2;
    }
}
