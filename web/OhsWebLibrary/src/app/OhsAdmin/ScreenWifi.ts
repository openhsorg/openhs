import { SiteData } from '../OhsSiteData/SiteData';
import { Thing } from '../OhsSiteData/Thing';
import { TemperatureSensor } from '../OhsSiteData/TemperatureSensor';

import { ScreenThings } from './ScreenThings';
import { TextSimple } from '../OhsGuiFramework/TextSimple';
import { ImageButton } from '../OhsGuiFramework/ImageButton';
import { ListBox } from '../OhsGuiFramework/ListBox';
import { PropertyBox } from '../OhsGuiFramework/PropertyBox';

import { OhsWifiAdmin } from '../OhsWifiAdmin/OhsWifiAdmin';
import { OhsAdminSettings } from './OhsAdminSettings';

//import {MatDialogModule} from '@angular/material';

import swal from 'sweetalert2';

export class ScreenWifi extends ScreenThings {

    public btnNoSensor:             ImageButton;
    public btnRelaySensor:          ImageButton;
    public btnUnknownSensor:        ImageButton;
    public m_wifiAdmin:             OhsWifiAdmin = null;

    constructor (siteData: SiteData, canvas: HTMLCanvasElement, wifiAdmin: OhsWifiAdmin) {
        super (siteData, canvas);

        this.m_wifiAdmin = wifiAdmin;
        
    }

    public buildLayout () {
        super.buildLayout();

        this.btnNoSensor = new ImageButton(this.ctx, OhsAdminSettings.ICON_SENSOR, OhsAdminSettings.ICON_SENSOR, 380, 250, 300, 180);
        this.add(this.btnNoSensor);

        this.btnRelaySensor = new ImageButton(this.ctx, OhsAdminSettings.ICON_RELAYSENSOR, OhsAdminSettings.ICON_RELAYSENSOR, 380, 250, 300, 180);
        this.add(this.btnRelaySensor);
        this.btnRelaySensor.setVisibility(false);
        
        this.btnUnknownSensor = new ImageButton(this.ctx, OhsAdminSettings.ICON_UNKNOWNSENSOR, OhsAdminSettings.ICON_UNKNOWNSENSOR, 380, 250, 300, 180);
        this.add(this.btnUnknownSensor);        
        this.btnUnknownSensor.setVisibility(false);

    }
 
    protected updateData() {
        super.updateData();

        this.m_textTitle.setText('New wifi nodes...');

        // Update data....
        this.m_textTime.setText(this.m_siteData.timeString);

        var i = 0;

        //Set size...
        this.m_list.setNumber(this.m_siteData.m_wifiNodeArray.length);
        this.m_propData.setNumber(this.m_siteData.m_wifiNodeArray.length);

        // Update entries
        for (var item of this.m_siteData.m_wifiNodeArray) {
            var txt = item.getName();

            this.m_list.setText((i + 1).toString() + '. ' + txt, i);

            i ++;
        }
  
        this.btnUnknownSensor.setVisibility(false);
        this.btnNoSensor.setVisibility(true);
        this.btnRelaySensor.setVisibility(false);        

        // Text details:
        if (this.m_list.selectedRow !== 0 && (this.m_siteData.m_wifiNodeArray.length >= (this.m_list.selectedRow))) {

            let item = this.m_siteData.m_wifiNodeArray[this.m_list.selectedRow - 1];

            this.m_propData.setText(this.strName + ':', item.getName(), 0);
            this.m_propData.setText(this.strSitePath, item.getSitePath(), 1);
            this.m_propData.setText(this.strDevicePath, item.getDevicePath(), 2); 

            this.btnNoSensor.setVisibility(false);
            this.btnRelaySensor.setVisibility(true);
        }        
    }

    public MouseUpHandler(x: number, y: number) {
        var ret = super.MouseUpHandler(x, y);
        if (ret == null) { return ret; }

        var thing: Thing = null;

        if (this.m_list.selectedRow >= 1) {
            thing = this.m_siteData.m_wifiNodeArray[this.m_list.selectedRow - 1];
        }

        if (ret === this.m_propData.m_data.m_items[0]) {
            // this.setName(thing, (<TextSimple> ret).getText());

        } else if (ret === this.m_propData.m_data.m_items[1]) {
            // this.setSitePath(thing, (<TextSimple> ret).getText());

        } else if (ret === this.m_propData.m_data.m_items[2]) {
            // this.setDevicePath(thing, (<TextSimple> ret).getText());

        }

        if (this.btnRelaySensor.MouseUpHandler(x, y) != null){
            //window.alert('ok...');
            if (thing != null) {
                this.requestConnection(thing.getSitePath());
            }
        } else if (this.btnNoSensor.MouseUpHandler(x, y) != null) {
            /*
            let dialogRef = dialog.open(UserProfileComponent, {
                height: '400px',
                width: '600px',
              });
              */

        }

 
        return ret;
    }

    public requestConnection (sitePath: String) {

        //this.m_wifiAdmin.connectNode('');

        var ret = false;

        swal({
            title: 'Do You want to connect?',
            text: "We will include this sensor to your system...",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, please!',
            animation: true
          }).then( () => {           

           // window.alert('ctn');

           ret = true;
           //window.alert('sss1ss');
           this.m_wifiAdmin.connectNode(sitePath);
           
            
/*
            swal({
                title: 'Please wait!',
                text: 'I will close in 5 seconds.',
                timer: 5000,
                onOpen: function () {
                  swal.showLoading()
                }
              }).then(
                function () {},
                // handling the promise rejection
                function (dismiss) {
                  if (dismiss === 'timer') {
                    //console.log('I was closed by the timer')
                    swal(
                        'Connected!',
                        'Sensor has been connected...',
                        'success'
                      )                    
                  }
                }
              )
              */
          })

          if (ret) {
            //this.m_wifiAdmin.connectNode(sitePath);
            window.alert('sssss');
          }

    }

} // class end