import {Thing} from './Thing';
import {OhsInterface} from './OhsInterface';
import {postAjax} from './OhsInterface';

export class Site extends Thing {

    public name         = 'no name';

    public update () {
        var js = JSON.stringify({
            idPost : OhsInterface.ID_SITE_UPDATE
        });

        var ret = postAjax(OhsInterface.URL, js);

      //  window.alert('je:' + OhsInterface.URL + ' :: ' + ret)

        if (ret !== null) {
            if (JSON.parse(ret['validity'])) {
                this.name = ret['name'];
            }
        }
    }
}
