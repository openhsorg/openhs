webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\nh1 {\r\n\tfont: 15px arial, sans-serif;\r\n    font-size: 28px;color: #2c36c5;\r\n    text-align:center;\r\n}\r\n\r\nh2 {\r\n\tfont: 20px arial, sans-serif;\r\n\tcolor: #249151;\r\n}\r\n\r\n\r\nbody {\r\n    background-image: url(\"/web/welcome/bkg.png\");\r\n    background-color: #ffffff;\r\n    background-repeat: no-repeat;\r\n    background-attachment: fixed;\r\n    background-position: center;     \r\n}\r\n\r\n.button, .button1, .button2, .button3, .buttonKitchen {\r\n    height: 150px;\r\n    width: 150px;\r\n    padding: 0;\r\n    border: none;\r\n    color: transparent; \r\n    background-color: transparent;\r\n    outline: none;\r\n    display: block;\r\n    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);\r\n    border-radius: 10px;\r\n    position:absolute;\r\n    left: 50%;\r\n\ttop: 50%;\r\n\tbackground-position:center left, center left;\r\n}\r\n\r\n.button {\r\n    margin-left:-87px;\r\n\tmargin-top:175px;\r\n    background-image: url(/web/welcome/admin.png);\r\n\tbackground-repeat:no-repeat;\t\r\n}\r\n\r\n.button1 {\r\n    margin-top:-175px;\r\n    background-image: url(/web/welcome/meteo.png);\r\n\tbackground-repeat:no-repeat;    \r\n}\r\n\r\n.button2 {\r\n    margin-left:-175px;\r\n    background-image: url(/web/welcome/statistics.jpg);\r\n\tbackground-repeat:no-repeat;        \r\n}\r\n\r\n.button3 {\r\n    background-image: url(/web/welcome/clock.jpg);\r\n\tbackground-repeat:no-repeat;        \r\n}\r\n\r\n.buttonKitchen {\r\n    margin-left:-600px;\r\n\tmargin-top:-822px;\t    \t\r\n}\r\n\r\n#bg {\r\n\tposition: fixed; \r\n\ttop: -50%; \r\n\tleft: -50%; \r\n\twidth: 200%; \r\n\theight: 200%;\r\n  }\r\n  #bg img {\r\n\tposition: absolute; \r\n\ttop: 0; \r\n\tleft: 0; \r\n\tright: 0; \r\n\tbottom: 0; \r\n\tmargin: auto; \r\n\tmin-width: 50%;\r\n\tmin-height: 50%;\r\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n  <h1>{{title}}</h1>\n  <app-main-window></app-main-window>\n\n\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'Admin page';
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__main_window_main_window_component__ = __webpack_require__("../../../../../src/app/main-window/main-window.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__window1_window1_component__ = __webpack_require__("../../../../../src/app/window1/window1.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_3__main_window_main_window_component__["a" /* MainWindowComponent */],
            __WEBPACK_IMPORTED_MODULE_4__window1_window1_component__["a" /* Window1Component */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/main-window/main-window.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\r\nh1 {\r\n\tfont: 15px arial, sans-serif;\r\n\tfont-size: 28px;color: #ff6600;\r\n}\r\n\r\nh2 {\r\n\tfont: 20px arial, sans-serif;\r\n\tcolor: #ff6600;\r\n}\r\n\r\np.tn {\r\n\tfont: 20px arial, sans-serif;\r\n\tcolor: #aa4678;\r\n}\r\n\r\n\r\n.button, .button1, .button2, .button3, .buttonKitchen {\r\n    height: 150px;\r\n    width: 150px;\r\n    padding: 0;\r\n    border: none;\r\n    color: transparent; \r\n    background-color: transparent;\r\n    outline: none;\r\n    display: block;\r\n    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);\r\n    border-radius: 10px;\r\n    position:absolute;\r\n    left: 50%;\r\n\ttop: 50%;\r\n\tbackground-position:center left, center left;\r\n}\r\n\r\n.button {\r\n    margin-left:-87px;\r\n\tmargin-top:175px;\r\n    background-image: url(/web/welcome/admin.png);\r\n\tbackground-repeat:no-repeat;\t\r\n}\r\n\r\n.button1 {\r\n    margin-top:-175px;\r\n    background-image: url(/web/welcome/meteo.png);\r\n\tbackground-repeat:no-repeat;    \r\n}\r\n\r\n.button2 {\r\n    margin-left:-175px;\r\n    background-image: url(/web/welcome/statistics.jpg);\r\n\tbackground-repeat:no-repeat;        \r\n}\r\n\r\n.button3 {\r\n    background-image: url(/web/welcome/clock.jpg);\r\n\tbackground-repeat:no-repeat;        \r\n}\r\n\r\n.buttonKitchen {\r\n    margin-left:-175px;\r\n\tmargin-top:-175px;\t\r\n    background-image: url(/web/welcome/home.png);\r\n\tbackground-repeat:no-repeat;        \r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/main-window/main-window.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MainWindowComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MainWindowComponent = (function () {
    function MainWindowComponent() {
        this.plesk = 'Windstorm - 2xxx';
    }
    MainWindowComponent.prototype.ngOnInit = function () {
    };
    return MainWindowComponent;
}());
MainWindowComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-main-window',
        //templateUrl: './main-window.component.html',
        template: "<p class=\"tn\"><span>Version: {{plesk}}</span></p>  \n  <div> \n  <a href=\"/admin\">\n    <img src=\"assets/images/admin.png\" alt=\"\">\n  </a>\n  <a href=\"/meteo\">\n    <img src=\"assets/images/meteo.png\" alt =\"\">   \n  </a>\n  <a href=\"/ohsinfo\">   \n    <img src=\"assets/images/kitchen.png\" alt =\"\"> \n  </a>\n  <a href=\"/org.openhs.core.clock.servlet.ClockSimpleServlet\">      \n    <img src=\"assets/images/clock.png\" alt =\"\">\n  </a>\n</div>",
        styles: [__webpack_require__("../../../../../src/app/main-window/main-window.component.css")]
    }),
    __metadata("design:paramtypes", [])
], MainWindowComponent);

//# sourceMappingURL=main-window.component.js.map

/***/ }),

/***/ "../../../../../src/app/window1/window1.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/window1/window1.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  window1 works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/window1/window1.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Window1Component; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var Window1Component = (function () {
    function Window1Component() {
        window.alert('w1....');
    }
    Window1Component.prototype.ngOnInit = function () {
    };
    return Window1Component;
}());
Window1Component = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-window1',
        template: __webpack_require__("../../../../../src/app/window1/window1.component.html"),
        styles: [__webpack_require__("../../../../../src/app/window1/window1.component.css")]
    }),
    __metadata("design:paramtypes", [])
], Window1Component);

//# sourceMappingURL=window1.component.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_19" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map