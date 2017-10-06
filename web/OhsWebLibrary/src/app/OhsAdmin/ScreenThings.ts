import { SiteData } from '../OhsSiteData/SiteData';
import { Thing } from '../OhsSiteData/Thing';
import { TemperatureSensor } from '../OhsSiteData/TemperatureSensor';
import { Switch } from '../OhsSiteData/Switch';
import { Door } from '../OhsSiteData/Door';
import { Room } from '../OhsSiteData/Room';
import { Floor } from '../OhsSiteData/Floor';

import { OhsScreen } from '../OhsGuiFramework/OhsScreen';
import { TextSimple } from '../OhsGuiFramework/TextSimple';
import { ImageButton } from '../OhsGuiFramework/ImageButton';
import { ListBox } from '../OhsGuiFramework/ListBox';
import { PropertyBox } from '../OhsGuiFramework/PropertyBox';

import { OhsAdminSettings } from './OhsAdminSettings';

import swal from 'sweetalert2';

export class ScreenThings extends OhsScreen {

    public strName:            String = 'Name';
    public strSitePath:        String = 'Site Path';
    public strDevicePath:      String = 'Device Path';

    public m_siteData:          SiteData = null;

    // Texts
    protected m_textTime:       TextSimple = null;
    protected m_textTitle:      TextSimple = null;

    // Buttons
    public btnLeave:            ImageButton;

    // List box - sensors
    public m_list:              ListBox;

    // Property box - data
    public m_propData:          PropertyBox;


    constructor (siteData: SiteData, canvas: HTMLCanvasElement) {
        super(canvas);

        this.m_siteData = siteData;
        this.buildLayout();
   }

    public buildLayout () {

        // Time
        this.m_textTime = new TextSimple(this.ctx, 'Time', 730, 0, 250, 100);
        this.add(this.m_textTime);

        this.m_textTime.fontSize = 26;
        this.m_textTime.fontFamily = 'px Tahoma, sans-serif';
        this.m_textTime.fontColor = '#8c8c8c';
        this.m_textTime.textAlign = 'left';
        this.m_textTime.textBaseline = 'top';
        this.m_textTime.bold = false;

        this.m_textTitle = new TextSimple(this.ctx, '', 15, 40, 250, 40);
        this.add(this.m_textTitle);

        this.m_textTitle.fontSize = 26;
        this.m_textTitle.fontFamily = 'px Tahoma, sans-serif';
        this.m_textTitle.fontColor = '#8c8c8c';
        this.m_textTitle.textAlign = 'left';
        this.m_textTitle.textBaseline = 'top';
        this.m_textTitle.bold = false;

        // Leave button
        this.btnLeave = new ImageButton(this.ctx, OhsAdminSettings.ICON_LEAVE, OhsAdminSettings.ICON_LEAVE, 750, 450, 80, 80);
        this.add(this.btnLeave);

        // ListBox Select
        this.m_list = new ListBox(this.ctx);
        this.add(this.m_list);
        this.m_list.Size(20, 100, 200, 350);
        this.m_list.selectedRow = 0;

        // Property box
        this.m_propData = new PropertyBox(this.ctx);
        this.add(this.m_propData);
        this.m_propData.Size(230, 100, 600, 350);
    }

    public changeDlg (thing: Thing, dataName: String, data: String) {

        var o = this;
/*
        swal({
            title: 'aaaaaa',
            input: 'text',
            inputValue: data,
            inputPlaceholder: 'Please enter new ' + dataName,
            showCancelButton: true,
            inputValidator: function (value) {
                return new Promise(function (resolve, reject) {
                  if (value) {
                      resolve();
                  } else {
                      reject('You need to write something!');
                  }
                });
              }
            }).then(function (name) {
                o.SetData(thing, dataName, name);
         });
         */



    }

    public SetData(thing: Thing, dataName: String, data: String) {

    }

    public setName (thing: Thing, name: String) {
/*
        swal({
            title: this.strName,
            input: 'text',
            inputValue: name,
            inputPlaceholder: 'Please enter new ' + this.strName,
            showCancelButton: true,
            inputValidator: function (value) {
                return new Promise(function (resolve, reject) {
                  if (value) {
                      resolve()
                  } else {
                      reject('You need to write something!')
                  }
                })
              }
            }).then(function (name) {

                var messType = 'error';

                if (thing.setName(name)) {
                    thing.update();

                    messType = 'success';
                }

                swal({
                    type: messType,
                    title: 'Changed...' + name
                })
         });
         */
    }

    public setSitePath (thing: Thing, sitePath: String) {

        var m_siteData = this.m_siteData;

        swal({
            title: 'name',
            input: 'text',
            inputValue: sitePath,
            inputPlaceholder: 'Please enter new ' + this.strSitePath,
            showCancelButton: true,
          //  inputValidator: false

            }).then((name) => {

                window.alert('je to: ' + name);

                /*
                let messType = 'error';

                if (thing.setSitePath(name)) {
                    // thing.update();
                    if (thing instanceof TemperatureSensor) {
                        m_siteData.updateObjectArray('idTempSensArr');
                    } else if (thing instanceof Switch) {
                        m_siteData.updateObjectArray('idSwitchArr');
                    } else if (thing instanceof Door) {
                        m_siteData.updateObjectArray('idDoorArr');
                    } else if (thing instanceof Room) {
                        m_siteData.updateObjectArray('idRoomArr');
                    } else if (thing instanceof Floor) {
                        m_siteData.updateObjectArray('idFloorArr');
                    }

                    messType = 'success';
                }
                */

                const ax = 'success';

                swal({
                    type: ax,
                    title: 'Changed...' + name
                });
         });

/*
        swal({
            type: 'warning',
            title: 'Are you sure to Delete Staff?',
            text: 'You will not be able to recover the data of Staff',
            showCancelButton: true,
            confirmButtonColor: '#049F0C',
            cancelButtonColor: '#ff0000',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
          }).then(() => {
            window.alert('OK');
        
          }, (dismiss) => {
            // dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
            if (dismiss === 'cancel') {
              swal({
                type: 'info',
                title: 'Cancelled',
                text: 'Your Staff file is safe :)'
              });
            }
          });
*/

    }

    public setDevicePath (thing: Thing, devicePath: String) {
/*
        swal({
            title: this.strName,
            input: 'text',
            inputValue: devicePath,
            inputPlaceholder: 'Please enter new ' + this.strSitePath,
            showCancelButton: true,
            inputValidator: function (value) {
                return new Promise(function (resolve, reject) {
                  if (value) {
                      resolve()
                  } else {
                      reject('You need to write something!')
                  }
                })
              }
            }).then(function (name) {

                var messType = 'error';

                if (thing.setDevicePath(name)) {
                    thing.update();

                    messType = 'success';
                }

                swal({
                    type: messType,
                    title: 'Changed...' + name
            })
         });

         */
    }

}// class end
