import {Thing} from './Thing';
import {OhsInterface} from './OhsInterface';
import {postAjax} from './OhsInterface';

export class Window extends Thing {

        public image_open       = '/infores/servlets/kitchen/room_default.png';
        public image_close      = '/infores/servlets/kitchen/room_default.png'; 

        public open:       boolean; // Open
        public locked:     boolean; // Door lock

        constructor () {
            super();
            this.open = false;
            this.locked = false;

        }

        public getState () {
            if (!this.valid) { return 0; }
            if (this.open) { return 1; }
            if (this.locked) { return 3; }

            return 2;
        }
    }
