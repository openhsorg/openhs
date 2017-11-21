import {OhsScreen} from './OhsScreen';

export class Frame {

    public m_screens:           Array <OhsScreen>; // = new Array<Screen>();
    private canvas:             HTMLCanvasElement;
    private ctx:                CanvasRenderingContext2D;
    loop: number;

    // Pointer to current screen...
    public m_curScreen:         OhsScreen = null;

    constructor (canvas: HTMLCanvasElement) {

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.m_screens = new Array <OhsScreen> ();
        const self = this;
        this.canvas.addEventListener('mousedown', function(event){self.MouseDownHandler(event); } , false);                      
        this.canvas.addEventListener('mouseup', function(event){self.MouseUpHandler(event); }, false);
        this.canvas.addEventListener('mousemove', function(event){self.MouseMoveHandler(event); }, false);                               
       // window.addEventListener('keydown', function(event){self.KeyDownHandler(event);}, false);

     //    document.addEventListener("keydown", () => this.KeyDownHandler);

//        requestAnimationFrame(() => this.paint());

        //20Hz
        this.loop = window.setInterval(()=>{
            this.paint();
        }, 50);

    }

    public paint () {

        const benchmark = false;

        if (benchmark) {

            ///// **** Benchmark****
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            // Move registration point to the center of the canvas
            this.ctx.translate(this.canvas.width / 2, this.canvas.width / 2);

            // Rotate 1 degree
            this.ctx.rotate(Math.PI / 180);

            // Move registration point back to the top left corner of canvas
            this.ctx.translate(-this.canvas.width / 2, -this.canvas.width / 2);

            this.ctx.fillStyle = 'red';
            this.ctx.fillRect(this.canvas.width / 4, this.canvas.width / 4, this.canvas.width / 2, this.canvas.height / 4);
            this.ctx.fillStyle = 'blue';
            this.ctx.fillRect(this.canvas.width / 4, this.canvas.width / 2, this.canvas.width / 2, this.canvas.height / 4);

        } else {
            this.m_curScreen.paint();
        }

        requestAnimationFrame(() => this.paint());

   }

    public MouseMoveHandler (event) {
       var mousePos = getMousePos(this.canvas, event);

        if (this.m_curScreen != null) {
            return this.m_curScreen.MouseMoveHandler(mousePos.x, mousePos.y);
        }
    }

    public MouseDownHandler (event) {
        var mousePos = getMousePos(this.canvas, event);

        if (this.m_curScreen != null) {
            return this.m_curScreen.MouseDownHandler(mousePos.x, mousePos.y);
        }

    }

    public MouseUpHandler(event) {
        var mousePos = getMousePos(this.canvas, event);

        if (this.m_curScreen != null) {
            return this.m_curScreen.MouseUpHandler(mousePos.x, mousePos.y);
        }     }

    public addItem (screen: OhsScreen) {

       // screen.SetCanvas(this.canvas);
        this.m_screens.push(screen);
    }
}

    // Function to get the mouse position
    function getMousePos(canvas, event) {

            var rect = canvas.getBoundingClientRect();

            return {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
        }

        function sleep(ms) {
            var unixtime_ms = new Date().getTime();
            while (new Date().getTime() < unixtime_ms + ms) {}
        }
