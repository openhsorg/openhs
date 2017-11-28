import { OhsScreen } from '../OhsGuiFramework/OhsScreen';
import { TextSimple } from '../OhsGuiFramework/TextSimple';
import { ImageButton } from '../OhsGuiFramework/ImageButton';
import { ListBox } from '../OhsGuiFramework/ListBox';
import { PropertyBox } from '../OhsGuiFramework/PropertyBox';
import { ImageStatic } from '../OhsGuiFramework/ImageStatic';
import { NumberRounded } from '../OhsGuiFramework/NumberRounded';

import { OhsWeather } from '../OhsWeather/OhsWeather';

import { InfoStationSettings } from './InfoStationSettings';
import { PanelWeather } from './PanelWeather';

export class ScreenWeather extends OhsScreen {

        public m_weather:           OhsWeather = null;
        public m_panels:            Array<PanelWeather>    = new Array<PanelWeather>();

        constructor ( weather: OhsWeather, canvas: HTMLCanvasElement) {
            super(canvas);

            this.m_weather = weather;

           // window.alert('test');
          //  this.buildLayout();


       }

        public buildLayout () {
/*
            this.m_panels.push(new PanelWeather(this.ctx, this.m_weather.m_forecastWeather[0]));
            this.m_panels.push(new PanelWeather(this.ctx, this.m_weather.m_forecastWeather[1]));
            this.m_panels.push(new PanelWeather(this.ctx, this.m_weather.m_forecastWeather[2]));
            this.m_panels.push(new PanelWeather(this.ctx, this.m_weather.m_forecastWeather[3]));

            const dx = 5;
            let d_pan = (this.canvas.width - dx) / this.m_panels.length;

            var i = 0;

            for (let item of this.m_panels) {
                item.Size(dx + (i * (d_pan)), 0, d_pan - dx, this.canvas.height);

                i++;
            }
            */
        }

        protected updateData () {
           // super.updateData();

            if (this.m_panels.length < 5 && this.m_weather.m_forecastWeather.length > 1) {
                this.m_panels.length = 0;

                for (let item of this.m_weather.m_forecastWeather) {
                    const nl = this.m_panels.push(new PanelWeather(this.ctx, item));

                    if (nl === 5) {
                        break;
                    }
                }

                // Resize
                const dx = 5;
                let d_pan = (this.canvas.width - dx) / this.m_panels.length;

                var j = 0;

                for (let item2 of this.m_panels) {

                    let xx = dx + (j * (d_pan));

                    item2.Size(xx, 5, d_pan - dx, this.canvas.height);

                    item2.m_textTempOut.setText('j: ' + j);

                    j = j + 1;

                    //window.alert(' resize...: ' + xx + ' J: ' + j);

                    item2.visible = true;
                    this.add(item2);

                 //   window.alert(' resize...: ' + item2.m_textTempOut.getText());
                }
            }
        }
    }