import {Thing} from './Thing';
import {OhsInterface} from './OhsInterface';
import {postAjax} from './OhsInterface';

export class Switch extends Thing {

        protected   stateInt:  number;

        constructor () {
            super ();

            this.stateInt = 0;
        }

        public getState () {
            return this.stateInt;
        }

        public click () {
            if (this.getState() === 1 || this.getState() === 2) {
                this.on();
            } else {
                this.off();
            }
        }

        public on () {
            var js = JSON.stringify({
            idPost : OhsInterface.ID_THING_COMMAND,
            path:   this.sitePath,
            command: 'on'
            });

            var ret = postAjax(OhsInterface.URL, js);

            if (JSON.parse(ret['return'])) {
                this.stateInt = parseInt (ret['state_int'], 10);

                this.updateDelayed(100);
            }
        }

        public off () {
            var js = JSON.stringify({
                idPost : OhsInterface.ID_THING_COMMAND,
                path:   this.sitePath,
                command: 'off'
            });

            var ret = postAjax(OhsInterface.URL, js);

            if (JSON.parse(ret['return'])) {
                this.stateInt = parseInt(ret['state_int'], 10);

                this.updateDelayed (100);
            }
        }
    }
