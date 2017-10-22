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

/***/ "../../../../../src/app/OhsAdmin/FrameMain.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FrameMain; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__OhsSiteData_SiteData__ = __webpack_require__("../../../../../src/app/OhsSiteData/SiteData.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__OhsGuiFramework_Frame__ = __webpack_require__("../../../../../src/app/OhsGuiFramework/Frame.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__OhsWifiAdmin_OhsWifiAdmin__ = __webpack_require__("../../../../../src/app/OhsWifiAdmin/OhsWifiAdmin.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ScreenMain__ = __webpack_require__("../../../../../src/app/OhsAdmin/ScreenMain.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ScreenTemps__ = __webpack_require__("../../../../../src/app/OhsAdmin/ScreenTemps.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ScreenSwitches__ = __webpack_require__("../../../../../src/app/OhsAdmin/ScreenSwitches.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ScreenDoors__ = __webpack_require__("../../../../../src/app/OhsAdmin/ScreenDoors.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ScreenRooms__ = __webpack_require__("../../../../../src/app/OhsAdmin/ScreenRooms.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ScreenFloors__ = __webpack_require__("../../../../../src/app/OhsAdmin/ScreenFloors.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ScreenWifi__ = __webpack_require__("../../../../../src/app/OhsAdmin/ScreenWifi.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();










var FrameMain = (function (_super) {
    __extends(FrameMain, _super);
    function FrameMain(canvas) {
        var _this = _super.call(this, canvas) || this;
        // Site data
        _this.m_siteData = null;
        _this.m_wifiAdmin = null;
        // Screen pointers...
        _this.m_screenMain = null;
        _this.m_screenTemps = null;
        _this.m_screenSwitches = null;
        _this.m_screenDoors = null;
        _this.m_screenRooms = null;
        _this.m_screenFloors = null;
        _this.m_screenWifi = null;
        // Data
        _this.m_siteData = new __WEBPACK_IMPORTED_MODULE_0__OhsSiteData_SiteData__["a" /* SiteData */]();
        _this.m_wifiAdmin = new __WEBPACK_IMPORTED_MODULE_2__OhsWifiAdmin_OhsWifiAdmin__["a" /* OhsWifiAdmin */]();
        // Create screens...
        _this.m_screenMain = new __WEBPACK_IMPORTED_MODULE_3__ScreenMain__["a" /* ScreenMain */](_this.m_siteData, canvas, _this.m_wifiAdmin);
        _this.addItem(_this.m_screenMain);
        _this.m_screenTemps = new __WEBPACK_IMPORTED_MODULE_4__ScreenTemps__["a" /* ScreenTemps */](_this.m_siteData, canvas);
        _this.addItem(_this.m_screenTemps);
        _this.m_screenSwitches = new __WEBPACK_IMPORTED_MODULE_5__ScreenSwitches__["a" /* ScreenSwitches */](_this.m_siteData, canvas);
        _this.addItem(_this.m_screenSwitches);
        _this.m_screenDoors = new __WEBPACK_IMPORTED_MODULE_6__ScreenDoors__["a" /* ScreenDoors */](_this.m_siteData, canvas);
        _this.addItem(_this.m_screenDoors);
        _this.m_screenRooms = new __WEBPACK_IMPORTED_MODULE_7__ScreenRooms__["a" /* ScreenRooms */](_this.m_siteData, canvas);
        _this.addItem(_this.m_screenRooms);
        _this.m_screenFloors = new __WEBPACK_IMPORTED_MODULE_8__ScreenFloors__["a" /* ScreenFloors */](_this.m_siteData, canvas);
        _this.addItem(_this.m_screenFloors);
        _this.m_screenWifi = new __WEBPACK_IMPORTED_MODULE_9__ScreenWifi__["a" /* ScreenWifi */](_this.m_siteData, canvas, _this.m_wifiAdmin);
        _this.addItem(_this.m_screenWifi);
        // Set current screen...
        _this.m_curScreen = _this.m_screenMain;
        return _this;
    }
    FrameMain.prototype.MouseDownHandler = function (event) {
        var ret = _super.prototype.MouseDownHandler.call(this, event);
        return null;
    };
    FrameMain.prototype.MouseUpHandler = function (event) {
        var ret = _super.prototype.MouseUpHandler.call(this, event);
        if (ret != null) {
            if (ret === this.m_screenMain.icons[0]) {
                this.SwitchScreen(this.m_screenTemps);
            }
            else if (ret === this.m_screenTemps.btnLeave) {
                this.SwitchScreen(this.m_screenMain);
            }
            else if (ret === this.m_screenMain.icons[1]) {
                this.SwitchScreen(this.m_screenSwitches);
            }
            else if (ret === this.m_screenSwitches.btnLeave) {
                this.SwitchScreen(this.m_screenMain);
            }
            else if (ret === this.m_screenMain.icons[2]) {
                this.SwitchScreen(this.m_screenDoors);
            }
            else if (ret === this.m_screenDoors.btnLeave) {
                this.SwitchScreen(this.m_screenMain);
            }
            else if (ret === this.m_screenMain.icons[3]) {
                this.SwitchScreen(this.m_screenRooms);
            }
            else if (ret === this.m_screenRooms.btnLeave) {
                this.SwitchScreen(this.m_screenMain);
            }
            else if (ret === this.m_screenMain.icons[4]) {
                this.SwitchScreen(this.m_screenFloors);
            }
            else if (ret === this.m_screenMain.icons[5]) {
                this.SwitchScreen(this.m_screenWifi);
            }
            else if (ret === this.m_screenFloors.btnLeave) {
                this.SwitchScreen(this.m_screenMain);
            }
            else if (ret === this.m_screenWifi.btnLeave) {
                this.SwitchScreen(this.m_screenMain);
            }
        }
        return null;
    };
    FrameMain.prototype.SwitchScreen = function (newScreen) {
        if (newScreen != null) {
            this.m_curScreen = newScreen;
        }
    };
    return FrameMain;
}(__WEBPACK_IMPORTED_MODULE_1__OhsGuiFramework_Frame__["a" /* Frame */]));

//# sourceMappingURL=FrameMain.js.map

/***/ }),

/***/ "../../../../../src/app/OhsAdmin/OhsAdminSettings.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OhsAdminSettings; });
/* unused harmony export postAjax */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
// import $ from 'jquery';

var OhsAdminSettings = (function () {
    function OhsAdminSettings() {
    }
    return OhsAdminSettings;
}());

OhsAdminSettings.ICON_TEMP = 'adminres/images/tempIcon.png';
OhsAdminSettings.ICON_SWITCH = 'adminres/images/switchIcon.png';
OhsAdminSettings.ICON_FLOOR = 'adminres/images/floorIcon.png';
OhsAdminSettings.ICON_DOOR = 'adminres/images/doorIcon.png';
OhsAdminSettings.ICON_ROOM = 'adminres/images/roomIcon.png';
OhsAdminSettings.ICON_LEAVE = 'adminres/images/leave.png';
OhsAdminSettings.ICON_WIFI = 'adminres/images/wifiIcon.png';
OhsAdminSettings.ICON_IQRF = 'adminres/images/iqrfIcon.png';
OhsAdminSettings.ICON_SENSOR = 'adminres/images/no_sensor.png';
OhsAdminSettings.ICON_UNKNOWNSENSOR = 'adminres/images/wemos_unknown.png';
OhsAdminSettings.ICON_RELAYSENSOR = 'adminres/images/wemos_relay.png';
function postAjax(urlAdr, jsonDat) {
    var result = null;
    __WEBPACK_IMPORTED_MODULE_0_jquery__["ajaxSetup"]({
        // Disable caching of AJAX responses
        cache: false
    });
    __WEBPACK_IMPORTED_MODULE_0_jquery__["ajax"]({
        async: false,
        type: 'POST',
        contentType: 'application/json',
        url: urlAdr,
        data: jsonDat,
        dataType: 'json',
        success: function (response) {
            result = response;
        }
    });
    return result;
}
//# sourceMappingURL=OhsAdminSettings.js.map

/***/ }),

/***/ "../../../../../src/app/OhsAdmin/ScreenDoors.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScreenDoors; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ScreenThings__ = __webpack_require__("../../../../../src/app/OhsAdmin/ScreenThings.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ScreenDoors = (function (_super) {
    __extends(ScreenDoors, _super);
    function ScreenDoors() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScreenDoors.prototype.updateData = function () {
        _super.prototype.updateData.call(this);
        this.m_textTitle.setText('Doors');
        // Update data....
        this.m_textTime.setText(this.m_siteData.timeString);
        var i = 0;
        for (var _i = 0, _a = this.m_siteData.m_doorArray; _i < _a.length; _i++) {
            var item = _a[_i];
            var txt = item.getName();
            this.m_list.setText((i + 1).toString() + '. ' + txt, i);
            i++;
        }
        // Text details:
        if (this.m_list.selectedRow !== 0) {
            var item_1 = this.m_siteData.m_doorArray[this.m_list.selectedRow - 1];
            this.m_propData.setText('Name:', item_1.getName(), 0);
            this.m_propData.setText('Site Path:', item_1.getSitePath(), 1);
            //  this.m_propData.setText("Device Path:", item.getDevicePath(), 2);
        }
    };
    ScreenDoors.prototype.MouseUpHandler = function (x, y) {
        var ret = _super.prototype.MouseUpHandler.call(this, x, y);
        if (ret == null) {
            return ret;
        }
        var thing = null;
        if (this.m_list.selectedRow >= 1) {
            thing = this.m_siteData.m_doorArray[this.m_list.selectedRow - 1];
        }
        if (ret === this.m_propData.m_data.m_items[0]) {
            this.setName(thing, ret.getText());
        }
        else if (ret === this.m_propData.m_data.m_items[1]) {
            this.setSitePath(thing, ret.getText());
        }
        else if (ret === this.m_propData.m_data.m_items[2]) {
            this.setDevicePath(thing, ret.getText());
        }
        return ret;
    };
    return ScreenDoors;
}(__WEBPACK_IMPORTED_MODULE_0__ScreenThings__["a" /* ScreenThings */])); // class end

//# sourceMappingURL=ScreenDoors.js.map

/***/ }),

/***/ "../../../../../src/app/OhsAdmin/ScreenFloors.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScreenFloors; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ScreenThings__ = __webpack_require__("../../../../../src/app/OhsAdmin/ScreenThings.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ScreenFloors = (function (_super) {
    __extends(ScreenFloors, _super);
    function ScreenFloors() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScreenFloors.prototype.updateData = function () {
        _super.prototype.updateData.call(this);
        this.m_textTitle.setText('Floors');
        // Update data....
        this.m_textTime.setText(this.m_siteData.timeString);
        var i = 0;
        for (var _i = 0, _a = this.m_siteData.m_floorArray; _i < _a.length; _i++) {
            var item = _a[_i];
            var txt = item.getName();
            this.m_list.setText((i + 1).toString() + '. ' + txt, i);
            i++;
        }
        // Text details:
        if (this.m_list.selectedRow !== 0) {
            var item_1 = this.m_siteData.m_floorArray[this.m_list.selectedRow - 1];
            this.m_propData.setText(this.strName + ':', item_1.getName(), 0);
            this.m_propData.setText(this.strSitePath, item_1.getSitePath(), 1);
        }
    };
    ScreenFloors.prototype.MouseUpHandler = function (x, y) {
        var ret = _super.prototype.MouseUpHandler.call(this, x, y);
        if (ret == null) {
            return ret;
        }
        var thing = null;
        if (this.m_list.selectedRow >= 1) {
            thing = this.m_siteData.m_floorArray[this.m_list.selectedRow - 1];
        }
        if (ret === this.m_propData.m_data.m_items[0]) {
            this.setName(thing, ret.getText());
        }
        else if (ret === this.m_propData.m_data.m_items[1]) {
            this.setSitePath(thing, ret.getText());
        }
        else if (ret === this.m_propData.m_data.m_items[2]) {
            this.setDevicePath(thing, ret.getText());
        }
        return ret;
    };
    return ScreenFloors;
}(__WEBPACK_IMPORTED_MODULE_0__ScreenThings__["a" /* ScreenThings */])); // class end

//# sourceMappingURL=ScreenFloors.js.map

/***/ }),

/***/ "../../../../../src/app/OhsAdmin/ScreenMain.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScreenMain; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__OhsGuiFramework_OhsScreen__ = __webpack_require__("../../../../../src/app/OhsGuiFramework/OhsScreen.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__OhsGuiFramework_TextSimple__ = __webpack_require__("../../../../../src/app/OhsGuiFramework/TextSimple.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__OhsGuiFramework_ImageButton__ = __webpack_require__("../../../../../src/app/OhsGuiFramework/ImageButton.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__OhsGuiFramework_NumberRounded__ = __webpack_require__("../../../../../src/app/OhsGuiFramework/NumberRounded.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__OhsAdminSettings__ = __webpack_require__("../../../../../src/app/OhsAdmin/OhsAdminSettings.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();





var ScreenMain = (function (_super) {
    __extends(ScreenMain, _super);
    function ScreenMain(siteData, canvas, wifiAdmin) {
        var _this = _super.call(this, canvas) || this;
        _this.m_siteData = null;
        _this.m_wifiAdmin = null;
        // Texts
        _this.m_textTime = null;
        _this.m_siteData = siteData;
        _this.m_wifiAdmin = wifiAdmin;
        _this.buildLayout();
        return _this;
    }
    ScreenMain.prototype.buildLayout = function () {
        // Time
        this.m_textTime = new __WEBPACK_IMPORTED_MODULE_1__OhsGuiFramework_TextSimple__["a" /* TextSimple */](this.ctx, 'Time', 730, 0, 250, 100);
        this.add(this.m_textTime);
        this.m_textTime.fontSize = 26;
        this.m_textTime.fontFamily = 'px Tahoma, sans-serif';
        this.m_textTime.fontColor = '#8c8c8c';
        this.m_textTime.textAlign = 'left';
        this.m_textTime.textBaseline = 'top';
        this.m_textTime.bold = false;
        // Icons
        this.icons = new Array();
        this.icons.push(new __WEBPACK_IMPORTED_MODULE_2__OhsGuiFramework_ImageButton__["a" /* ImageButton */](this.ctx, __WEBPACK_IMPORTED_MODULE_4__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_TEMP, __WEBPACK_IMPORTED_MODULE_4__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_TEMP, 30, 30, 150, 150));
        this.icons.push(new __WEBPACK_IMPORTED_MODULE_2__OhsGuiFramework_ImageButton__["a" /* ImageButton */](this.ctx, __WEBPACK_IMPORTED_MODULE_4__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_SWITCH, __WEBPACK_IMPORTED_MODULE_4__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_SWITCH, 200, 30, 150, 150));
        this.icons.push(new __WEBPACK_IMPORTED_MODULE_2__OhsGuiFramework_ImageButton__["a" /* ImageButton */](this.ctx, __WEBPACK_IMPORTED_MODULE_4__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_DOOR, __WEBPACK_IMPORTED_MODULE_4__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_DOOR, 400, 30, 150, 150));
        this.icons.push(new __WEBPACK_IMPORTED_MODULE_2__OhsGuiFramework_ImageButton__["a" /* ImageButton */](this.ctx, __WEBPACK_IMPORTED_MODULE_4__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_ROOM, __WEBPACK_IMPORTED_MODULE_4__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_ROOM, 400, 30, 150, 150));
        this.icons.push(new __WEBPACK_IMPORTED_MODULE_2__OhsGuiFramework_ImageButton__["a" /* ImageButton */](this.ctx, __WEBPACK_IMPORTED_MODULE_4__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_FLOOR, __WEBPACK_IMPORTED_MODULE_4__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_FLOOR, 400, 30, 150, 150));
        this.icons.push(new __WEBPACK_IMPORTED_MODULE_2__OhsGuiFramework_ImageButton__["a" /* ImageButton */](this.ctx, __WEBPACK_IMPORTED_MODULE_4__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_WIFI, __WEBPACK_IMPORTED_MODULE_4__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_WIFI, 400, 30, 150, 150));
        this.icons.push(new __WEBPACK_IMPORTED_MODULE_2__OhsGuiFramework_ImageButton__["a" /* ImageButton */](this.ctx, __WEBPACK_IMPORTED_MODULE_4__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_IQRF, __WEBPACK_IMPORTED_MODULE_4__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_IQRF, 400, 30, 150, 150));
        for (var _i = 0, _a = this.icons; _i < _a.length; _i++) {
            var icon = _a[_i];
            this.add(icon);
        }
        // Nums Rounded
        this.nums = new Array();
        this.nums.push(new __WEBPACK_IMPORTED_MODULE_3__OhsGuiFramework_NumberRounded__["a" /* NumberRounded */](this.ctx));
        this.nums.push(new __WEBPACK_IMPORTED_MODULE_3__OhsGuiFramework_NumberRounded__["a" /* NumberRounded */](this.ctx));
        this.nums.push(new __WEBPACK_IMPORTED_MODULE_3__OhsGuiFramework_NumberRounded__["a" /* NumberRounded */](this.ctx));
        this.nums.push(new __WEBPACK_IMPORTED_MODULE_3__OhsGuiFramework_NumberRounded__["a" /* NumberRounded */](this.ctx));
        this.nums.push(new __WEBPACK_IMPORTED_MODULE_3__OhsGuiFramework_NumberRounded__["a" /* NumberRounded */](this.ctx));
        this.nums.push(new __WEBPACK_IMPORTED_MODULE_3__OhsGuiFramework_NumberRounded__["a" /* NumberRounded */](this.ctx));
        this.nums[5].SetColorBkg('#ff6600');
        for (var _b = 0, _c = this.nums; _b < _c.length; _b++) {
            var num = _c[_b];
            this.add(num);
        }
        this.IconMatrix(this.GetSize().width - 150, this.GetSize().height, 4, 3, 150, 150);
    };
    // Arange icons to rectangle...
    ScreenMain.prototype.IconMatrix = function (w, h, numX, numY, iconSizeX, iconSizeY) {
        var dx = (w - (numX * iconSizeX)) / (numX + 1);
        var dy = (h - (numY * iconSizeY)) / (numY + 1);
        var id = 0;
        for (var i = 1; i <= numY; i++) {
            for (var j = 1; j <= numX; j++) {
                var dxa = (j * dx) + ((j - 1) * iconSizeX);
                var dya = (i * dy) + ((i - 1) * iconSizeY);
                if (this.icons.length > id) {
                    this.icons[id].Size(dxa, dya, 150, 150);
                }
                if (this.nums.length > id) {
                    this.nums[id].center(dxa + 150 - 5, dya + 150 - 5, 50, 50);
                }
                id++;
            }
        }
    };
    ScreenMain.prototype.updateData = function () {
        _super.prototype.updateData.call(this);
        // Update data....
        this.m_textTime.setText(this.m_siteData.timeString);
        // Numbers
        this.nums[0].SetNumber(this.m_siteData.m_tempSensorArray.length);
        this.nums[1].SetNumber(this.m_siteData.m_switchArray.length);
        this.nums[2].SetNumber(this.m_siteData.m_doorArray.length);
        this.nums[3].SetNumber(this.m_siteData.m_roomArray.length);
        this.nums[4].SetNumber(this.m_siteData.m_floorArray.length);
        this.nums[5].SetNumber(this.m_siteData.m_wifiNodeArray.length);
    };
    return ScreenMain;
}(__WEBPACK_IMPORTED_MODULE_0__OhsGuiFramework_OhsScreen__["a" /* OhsScreen */])); // class end

//# sourceMappingURL=ScreenMain.js.map

/***/ }),

/***/ "../../../../../src/app/OhsAdmin/ScreenRooms.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScreenRooms; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ScreenThings__ = __webpack_require__("../../../../../src/app/OhsAdmin/ScreenThings.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ScreenRooms = (function (_super) {
    __extends(ScreenRooms, _super);
    function ScreenRooms() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScreenRooms.prototype.updateData = function () {
        _super.prototype.updateData.call(this);
        this.m_textTitle.setText('Rooms');
        // Update data....
        this.m_textTime.setText(this.m_siteData.timeString);
        var i = 0;
        for (var _i = 0, _a = this.m_siteData.m_roomArray; _i < _a.length; _i++) {
            var item = _a[_i];
            var txt = item.getName();
            this.m_list.setText((i + 1).toString() + '. ' + txt, i);
            i++;
        }
        // Text details:
        if (this.m_list.selectedRow !== 0) {
            var item_1 = this.m_siteData.m_roomArray[this.m_list.selectedRow - 1];
            this.m_propData.setText(this.strName + ':', item_1.getName(), 0);
            this.m_propData.setText(this.strSitePath, item_1.getSitePath(), 1);
        }
    };
    ScreenRooms.prototype.MouseUpHandler = function (x, y) {
        var ret = _super.prototype.MouseUpHandler.call(this, x, y);
        if (ret == null) {
            return ret;
        }
        var thing = null;
        if (this.m_list.selectedRow >= 1) {
            thing = this.m_siteData.m_roomArray[this.m_list.selectedRow - 1];
        }
        if (ret === this.m_propData.m_data.m_items[0]) {
            this.setName(thing, ret.getText());
        }
        else if (ret === this.m_propData.m_data.m_items[1]) {
            this.setSitePath(thing, ret.getText());
        }
        else if (ret === this.m_propData.m_data.m_items[2]) {
            this.setDevicePath(thing, ret.getText());
        }
        return ret;
    };
    return ScreenRooms;
}(__WEBPACK_IMPORTED_MODULE_0__ScreenThings__["a" /* ScreenThings */])); // class end

//# sourceMappingURL=ScreenRooms.js.map

/***/ }),

/***/ "../../../../../src/app/OhsAdmin/ScreenSwitches.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScreenSwitches; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ScreenThings__ = __webpack_require__("../../../../../src/app/OhsAdmin/ScreenThings.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ScreenSwitches = (function (_super) {
    __extends(ScreenSwitches, _super);
    function ScreenSwitches() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScreenSwitches.prototype.updateData = function () {
        _super.prototype.updateData.call(this);
        this.m_textTitle.setText('Switches');
        // Update data....
        this.m_textTime.setText(this.m_siteData.timeString);
        var i = 0;
        for (var _i = 0, _a = this.m_siteData.m_switchArray; _i < _a.length; _i++) {
            var item = _a[_i];
            var txt = item.getName();
            this.m_list.setText((i + 1).toString() + '. ' + txt, i);
            i++;
        }
        // Text details:
        if (this.m_list.selectedRow !== 0) {
            var item = this.m_siteData.m_switchArray[this.m_list.selectedRow - 1];
            this.m_propData.setText(this.strName + ':', item.getName(), 0);
            this.m_propData.setText(this.strSitePath, item.getSitePath(), 1);
            this.m_propData.setText(this.strDevicePath, item.getDevicePath(), 2);
        }
    };
    ScreenSwitches.prototype.MouseUpHandler = function (x, y) {
        var ret = _super.prototype.MouseUpHandler.call(this, x, y);
        if (ret == null) {
            return ret;
        }
        var thing = null;
        if (this.m_list.selectedRow >= 1) {
            thing = this.m_siteData.m_switchArray[this.m_list.selectedRow - 1];
        }
        if (ret === this.m_propData.m_data.m_items[0]) {
            this.setName(thing, ret.getText());
        }
        else if (ret === this.m_propData.m_data.m_items[1]) {
            this.setSitePath(thing, ret.getText());
        }
        else if (ret === this.m_propData.m_data.m_items[2]) {
            this.setDevicePath(thing, ret.getText());
        }
        return ret;
    };
    return ScreenSwitches;
}(__WEBPACK_IMPORTED_MODULE_0__ScreenThings__["a" /* ScreenThings */])); // class end

//# sourceMappingURL=ScreenSwitches.js.map

/***/ }),

/***/ "../../../../../src/app/OhsAdmin/ScreenTemps.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScreenTemps; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__OhsSiteData_TemperatureSensor__ = __webpack_require__("../../../../../src/app/OhsSiteData/TemperatureSensor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ScreenThings__ = __webpack_require__("../../../../../src/app/OhsAdmin/ScreenThings.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var ScreenTemps = (function (_super) {
    __extends(ScreenTemps, _super);
    function ScreenTemps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ScreenTemps.prototype.updateData = function () {
        _super.prototype.updateData.call(this);
        this.m_textTitle.setText('Temperature sensors');
        // Update data....
        this.m_textTime.setText(this.m_siteData.timeString);
        var i = 0;
        for (var _i = 0, _a = this.m_siteData.m_tempSensorArray; _i < _a.length; _i++) {
            var item = _a[_i];
            var txt = item.getName();
            this.m_list.setText((i + 1).toString() + '. ' + txt, i);
            i++;
        }
        //Text details:
        if (this.m_list.selectedRow !== 0) {
            var item_1 = this.m_siteData.m_tempSensorArray[this.m_list.selectedRow - 1];
            this.m_propData.setText(this.strName + ':', item_1.getName(), 0);
            this.m_propData.setText(this.strSitePath, item_1.getSitePath(), 1);
            this.m_propData.setText(this.strDevicePath, item_1.getDevicePath(), 2);
        }
    };
    ScreenTemps.prototype.MouseUpHandler = function (x, y) {
        var ret = _super.prototype.MouseUpHandler.call(this, x, y);
        if (ret == null) {
            return ret;
        }
        var thing = null;
        if (this.m_list.selectedRow >= 1) {
            thing = this.m_siteData.m_tempSensorArray[this.m_list.selectedRow - 1];
        }
        if (ret === this.m_propData.m_data.m_items[0]) {
            this.setName(thing, ret.getText());
        }
        else if (ret === this.m_propData.m_data.m_items[1]) {
            this.setSitePath(thing, ret.getText());
        }
        else if (ret === this.m_propData.m_data.m_items[2]) {
            this.setDevicePath(thing, ret.getText());
        }
        return ret;
    };
    ScreenTemps.prototype.SetData = function (thing, dataName, data) {
        if (thing != null) {
            if (thing instanceof __WEBPACK_IMPORTED_MODULE_0__OhsSiteData_TemperatureSensor__["a" /* TemperatureSensor */]) {
                var ret = false;
                var sent = false;
                if (dataName === this.strName) {
                    sent = true;
                    ret = thing.setName(data);
                    if (ret) {
                        thing.update();
                    }
                }
                else if (dataName === this.strSitePath) {
                    sent = true;
                    ret = thing.setSitePath(data);
                    if (ret) {
                        this.m_siteData.updateObjectArray('idTempSensArr');
                    }
                }
                else if (dataName === this.strDevicePath) {
                    sent = true;
                    ret = thing.setDevicePath(data);
                    if (ret) {
                        thing.update();
                    }
                }
                if (sent) {
                    var tp = 'success';
                    if (ret) {
                        // thing.update();
                    }
                    else {
                        tp = 'error';
                    }
                    /*
                                    swal({ type: tp,
                                        title: 'Changed...' + data
                                    })
                                    */
                }
            }
        }
    };
    return ScreenTemps;
}(__WEBPACK_IMPORTED_MODULE_1__ScreenThings__["a" /* ScreenThings */])); // class end

//# sourceMappingURL=ScreenTemps.js.map

/***/ }),

/***/ "../../../../../src/app/OhsAdmin/ScreenThings.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScreenThings; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__OhsSiteData_TemperatureSensor__ = __webpack_require__("../../../../../src/app/OhsSiteData/TemperatureSensor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__OhsSiteData_Switch__ = __webpack_require__("../../../../../src/app/OhsSiteData/Switch.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__OhsSiteData_Door__ = __webpack_require__("../../../../../src/app/OhsSiteData/Door.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__OhsSiteData_Room__ = __webpack_require__("../../../../../src/app/OhsSiteData/Room.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__OhsSiteData_Floor__ = __webpack_require__("../../../../../src/app/OhsSiteData/Floor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__OhsGuiFramework_OhsScreen__ = __webpack_require__("../../../../../src/app/OhsGuiFramework/OhsScreen.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__OhsGuiFramework_TextSimple__ = __webpack_require__("../../../../../src/app/OhsGuiFramework/TextSimple.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__OhsGuiFramework_ImageButton__ = __webpack_require__("../../../../../src/app/OhsGuiFramework/ImageButton.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__OhsGuiFramework_ListBox__ = __webpack_require__("../../../../../src/app/OhsGuiFramework/ListBox.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__OhsGuiFramework_PropertyBox__ = __webpack_require__("../../../../../src/app/OhsGuiFramework/PropertyBox.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__OhsAdminSettings__ = __webpack_require__("../../../../../src/app/OhsAdmin/OhsAdminSettings.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_sweetalert2__ = __webpack_require__("../../../../sweetalert2/dist/sweetalert2.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_sweetalert2__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();












var ScreenThings = (function (_super) {
    __extends(ScreenThings, _super);
    function ScreenThings(siteData, canvas) {
        var _this = _super.call(this, canvas) || this;
        _this.strName = 'Name';
        _this.strSitePath = 'Site Path';
        _this.strDevicePath = 'Device Path';
        _this.m_siteData = null;
        // Texts
        _this.m_textTime = null;
        _this.m_textTitle = null;
        _this.m_siteData = siteData;
        _this.buildLayout();
        return _this;
    }
    ScreenThings.prototype.buildLayout = function () {
        // Time
        this.m_textTime = new __WEBPACK_IMPORTED_MODULE_6__OhsGuiFramework_TextSimple__["a" /* TextSimple */](this.ctx, 'Time', 730, 0, 250, 100);
        this.add(this.m_textTime);
        this.m_textTime.fontSize = 26;
        this.m_textTime.fontFamily = 'px Tahoma, sans-serif';
        this.m_textTime.fontColor = '#8c8c8c';
        this.m_textTime.textAlign = 'left';
        this.m_textTime.textBaseline = 'top';
        this.m_textTime.bold = false;
        this.m_textTitle = new __WEBPACK_IMPORTED_MODULE_6__OhsGuiFramework_TextSimple__["a" /* TextSimple */](this.ctx, '', 15, 40, 250, 40);
        this.add(this.m_textTitle);
        this.m_textTitle.fontSize = 26;
        this.m_textTitle.fontFamily = 'px Tahoma, sans-serif';
        this.m_textTitle.fontColor = '#8c8c8c';
        this.m_textTitle.textAlign = 'left';
        this.m_textTitle.textBaseline = 'top';
        this.m_textTitle.bold = false;
        // Leave button
        this.btnLeave = new __WEBPACK_IMPORTED_MODULE_7__OhsGuiFramework_ImageButton__["a" /* ImageButton */](this.ctx, __WEBPACK_IMPORTED_MODULE_10__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_LEAVE, __WEBPACK_IMPORTED_MODULE_10__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_LEAVE, 750, 450, 80, 80);
        this.add(this.btnLeave);
        // ListBox Select
        this.m_list = new __WEBPACK_IMPORTED_MODULE_8__OhsGuiFramework_ListBox__["a" /* ListBox */](this.ctx);
        this.add(this.m_list);
        this.m_list.Size(20, 100, 200, 350);
        this.m_list.selectedRow = 0;
        // Property box
        this.m_propData = new __WEBPACK_IMPORTED_MODULE_9__OhsGuiFramework_PropertyBox__["a" /* PropertyBox */](this.ctx);
        this.add(this.m_propData);
        this.m_propData.Size(230, 100, 600, 350);
    };
    ScreenThings.prototype.changeDlg = function (thing, dataName, data) {
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
    };
    ScreenThings.prototype.SetData = function (thing, dataName, data) {
    };
    ScreenThings.prototype.setName = function (thing, name) {
        __WEBPACK_IMPORTED_MODULE_11_sweetalert2___default()({
            title: this.strName.toString(),
            input: 'text',
            inputValue: name,
            inputPlaceholder: 'Please enter new ' + this.strName,
            showCancelButton: true
        }).then(function (name) {
            var ret = false;
            if (thing.setName(name)) {
                thing.update();
                ret = true;
            }
            if (ret) {
                __WEBPACK_IMPORTED_MODULE_11_sweetalert2___default()({
                    type: 'success',
                    title: 'Name changed...' + name
                });
            }
            else {
                __WEBPACK_IMPORTED_MODULE_11_sweetalert2___default()({
                    type: 'error',
                    title: 'Not changed...!'
                });
            }
        }, function (dismiss) {
            __WEBPACK_IMPORTED_MODULE_11_sweetalert2___default()({
                type: 'error',
                title: 'Canceled, nothing changed..!'
            });
        });
    };
    ScreenThings.prototype.setSitePath = function (thing, sitePath) {
        var m_siteData = this.m_siteData;
        __WEBPACK_IMPORTED_MODULE_11_sweetalert2___default()({
            title: 'name',
            input: 'text',
            inputValue: sitePath,
            inputPlaceholder: 'Please enter new ' + this.strSitePath,
            showCancelButton: true,
        }).then(function (name) {
            window.alert('je to: ' + name);
            var ret = false;
            if (thing.setSitePath(name)) {
                // thing.update();
                if (thing instanceof __WEBPACK_IMPORTED_MODULE_0__OhsSiteData_TemperatureSensor__["a" /* TemperatureSensor */]) {
                    m_siteData.updateObjectArray('idTempSensArr');
                }
                else if (thing instanceof __WEBPACK_IMPORTED_MODULE_1__OhsSiteData_Switch__["a" /* Switch */]) {
                    m_siteData.updateObjectArray('idSwitchArr');
                }
                else if (thing instanceof __WEBPACK_IMPORTED_MODULE_2__OhsSiteData_Door__["a" /* Door */]) {
                    m_siteData.updateObjectArray('idDoorArr');
                }
                else if (thing instanceof __WEBPACK_IMPORTED_MODULE_3__OhsSiteData_Room__["a" /* Room */]) {
                    m_siteData.updateObjectArray('idRoomArr');
                }
                else if (thing instanceof __WEBPACK_IMPORTED_MODULE_4__OhsSiteData_Floor__["a" /* Floor */]) {
                    m_siteData.updateObjectArray('idFloorArr');
                }
                ret = true;
            }
            if (ret) {
                __WEBPACK_IMPORTED_MODULE_11_sweetalert2___default()({
                    type: 'success',
                    title: 'Changed...' + name
                });
            }
            else {
                __WEBPACK_IMPORTED_MODULE_11_sweetalert2___default()({
                    type: 'error',
                    title: 'Not changed...!'
                });
            }
        }, function (dismiss) {
            __WEBPACK_IMPORTED_MODULE_11_sweetalert2___default()({
                type: 'error',
                title: 'Canceled, nothing changed..!'
            });
        });
    };
    ScreenThings.prototype.setDevicePath = function (thing, devicePath) {
        var m_siteData = this.m_siteData;
        __WEBPACK_IMPORTED_MODULE_11_sweetalert2___default()({
            title: this.strName.toString(),
            input: 'text',
            inputValue: devicePath,
            inputPlaceholder: 'Please enter new ' + this.strSitePath,
            showCancelButton: true
        }).then(function (name) {
            var ret = false;
            if (thing.setDevicePath(name)) {
                thing.update();
                ret = true;
            }
            if (ret) {
                __WEBPACK_IMPORTED_MODULE_11_sweetalert2___default()({
                    type: 'success',
                    title: 'Changed...' + name
                });
            }
            else {
                __WEBPACK_IMPORTED_MODULE_11_sweetalert2___default()({
                    type: 'error',
                    title: 'Not changed...!'
                });
            }
        }, function (dismiss) {
            __WEBPACK_IMPORTED_MODULE_11_sweetalert2___default()({
                type: 'error',
                title: 'Canceled, nothing changed..!'
            });
        });
    };
    return ScreenThings;
}(__WEBPACK_IMPORTED_MODULE_5__OhsGuiFramework_OhsScreen__["a" /* OhsScreen */])); // class end

//# sourceMappingURL=ScreenThings.js.map

/***/ }),

/***/ "../../../../../src/app/OhsAdmin/ScreenWifi.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScreenWifi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ScreenThings__ = __webpack_require__("../../../../../src/app/OhsAdmin/ScreenThings.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__OhsGuiFramework_ImageButton__ = __webpack_require__("../../../../../src/app/OhsGuiFramework/ImageButton.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__OhsAdminSettings__ = __webpack_require__("../../../../../src/app/OhsAdmin/OhsAdminSettings.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sweetalert2__ = __webpack_require__("../../../../sweetalert2/dist/sweetalert2.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_sweetalert2__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



//import {MatDialogModule} from '@angular/material';

var ScreenWifi = (function (_super) {
    __extends(ScreenWifi, _super);
    function ScreenWifi(siteData, canvas, wifiAdmin) {
        var _this = _super.call(this, siteData, canvas) || this;
        _this.m_wifiAdmin = null;
        _this.m_wifiAdmin = wifiAdmin;
        return _this;
    }
    ScreenWifi.prototype.buildLayout = function () {
        _super.prototype.buildLayout.call(this);
        this.btnNoSensor = new __WEBPACK_IMPORTED_MODULE_1__OhsGuiFramework_ImageButton__["a" /* ImageButton */](this.ctx, __WEBPACK_IMPORTED_MODULE_2__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_SENSOR, __WEBPACK_IMPORTED_MODULE_2__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_SENSOR, 380, 250, 300, 180);
        this.add(this.btnNoSensor);
        this.btnRelaySensor = new __WEBPACK_IMPORTED_MODULE_1__OhsGuiFramework_ImageButton__["a" /* ImageButton */](this.ctx, __WEBPACK_IMPORTED_MODULE_2__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_RELAYSENSOR, __WEBPACK_IMPORTED_MODULE_2__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_RELAYSENSOR, 380, 250, 300, 180);
        this.add(this.btnRelaySensor);
        this.btnRelaySensor.setVisibility(false);
        this.btnUnknownSensor = new __WEBPACK_IMPORTED_MODULE_1__OhsGuiFramework_ImageButton__["a" /* ImageButton */](this.ctx, __WEBPACK_IMPORTED_MODULE_2__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_UNKNOWNSENSOR, __WEBPACK_IMPORTED_MODULE_2__OhsAdminSettings__["a" /* OhsAdminSettings */].ICON_UNKNOWNSENSOR, 380, 250, 300, 180);
        this.add(this.btnUnknownSensor);
        this.btnUnknownSensor.setVisibility(false);
    };
    ScreenWifi.prototype.updateData = function () {
        _super.prototype.updateData.call(this);
        this.m_textTitle.setText('New wifi nodes...');
        // Update data....
        this.m_textTime.setText(this.m_siteData.timeString);
        var i = 0;
        //Set size...
        this.m_list.setNumber(this.m_siteData.m_wifiNodeArray.length);
        this.m_propData.setNumber(this.m_siteData.m_wifiNodeArray.length);
        // Update entries
        for (var _i = 0, _a = this.m_siteData.m_wifiNodeArray; _i < _a.length; _i++) {
            var item = _a[_i];
            var txt = item.getName();
            this.m_list.setText((i + 1).toString() + '. ' + txt, i);
            i++;
        }
        this.btnUnknownSensor.setVisibility(false);
        this.btnNoSensor.setVisibility(true);
        this.btnRelaySensor.setVisibility(false);
        // Text details:
        if (this.m_list.selectedRow !== 0 && (this.m_siteData.m_wifiNodeArray.length >= (this.m_list.selectedRow))) {
            var item_1 = this.m_siteData.m_wifiNodeArray[this.m_list.selectedRow - 1];
            this.m_propData.setText(this.strName + ':', item_1.getName(), 0);
            this.m_propData.setText(this.strSitePath, item_1.getSitePath(), 1);
            this.m_propData.setText(this.strDevicePath, item_1.getDevicePath(), 2);
            this.btnNoSensor.setVisibility(false);
            this.btnRelaySensor.setVisibility(true);
        }
    };
    ScreenWifi.prototype.MouseUpHandler = function (x, y) {
        var ret = _super.prototype.MouseUpHandler.call(this, x, y);
        if (ret == null) {
            return ret;
        }
        var thing = null;
        if (this.m_list.selectedRow >= 1) {
            thing = this.m_siteData.m_wifiNodeArray[this.m_list.selectedRow - 1];
        }
        if (ret === this.m_propData.m_data.m_items[0]) {
            // this.setName(thing, (<TextSimple> ret).getText());
        }
        else if (ret === this.m_propData.m_data.m_items[1]) {
            // this.setSitePath(thing, (<TextSimple> ret).getText());
        }
        else if (ret === this.m_propData.m_data.m_items[2]) {
            // this.setDevicePath(thing, (<TextSimple> ret).getText());
        }
        if (this.btnRelaySensor.MouseUpHandler(x, y) != null) {
            //window.alert('ok...');
            if (thing != null) {
                this.requestConnection(thing.getSitePath());
            }
        }
        else if (this.btnNoSensor.MouseUpHandler(x, y) != null) {
            /*
            let dialogRef = dialog.open(UserProfileComponent, {
                height: '400px',
                width: '600px',
              });
              */
        }
        return ret;
    };
    ScreenWifi.prototype.requestConnection = function (sitePath) {
        //this.m_wifiAdmin.connectNode('');
        var _this = this;
        var ret = false;
        __WEBPACK_IMPORTED_MODULE_3_sweetalert2___default()({
            title: 'Do You want to connect?',
            text: "We will include this sensor to your system...",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, please!',
            animation: true
        }).then(function () {
            // window.alert('ctn');
            ret = true;
            //window.alert('sss1ss');
            _this.m_wifiAdmin.connectNode(sitePath);
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
        });
        if (ret) {
            //this.m_wifiAdmin.connectNode(sitePath);
            window.alert('sssss');
        }
    };
    return ScreenWifi;
}(__WEBPACK_IMPORTED_MODULE_0__ScreenThings__["a" /* ScreenThings */])); // class end

//# sourceMappingURL=ScreenWifi.js.map

/***/ }),

/***/ "../../../../../src/app/OhsGuiFramework/Frame.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Frame; });
var Frame = (function () {
    function Frame(canvas) {
        var _this = this;
        // Pointer to current screen...
        this.m_curScreen = null;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.m_screens = new Array();
        var self = this;
        this.canvas.addEventListener('mousedown', function (event) { self.MouseDownHandler(event); }, false);
        this.canvas.addEventListener('mouseup', function (event) { self.MouseUpHandler(event); }, false);
        this.canvas.addEventListener('mousemove', function (event) { self.MouseMoveHandler(event); }, false);
        // window.addEventListener('keydown', function(event){self.KeyDownHandler(event);}, false);
        //    document.addEventListener("keydown", () => this.KeyDownHandler);
        requestAnimationFrame(function () { return _this.paint(); });
    }
    Frame.prototype.paint = function () {
        var _this = this;
        var benchmark = false;
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
        }
        else {
            this.m_curScreen.paint();
        }
        requestAnimationFrame(function () { return _this.paint(); });
    };
    Frame.prototype.MouseMoveHandler = function (event) {
        var mousePos = getMousePos(this.canvas, event);
        if (this.m_curScreen != null) {
            return this.m_curScreen.MouseMoveHandler(mousePos.x, mousePos.y);
        }
    };
    Frame.prototype.MouseDownHandler = function (event) {
        var mousePos = getMousePos(this.canvas, event);
        if (this.m_curScreen != null) {
            return this.m_curScreen.MouseDownHandler(mousePos.x, mousePos.y);
        }
    };
    Frame.prototype.MouseUpHandler = function (event) {
        var mousePos = getMousePos(this.canvas, event);
        if (this.m_curScreen != null) {
            return this.m_curScreen.MouseUpHandler(mousePos.x, mousePos.y);
        }
    };
    Frame.prototype.addItem = function (screen) {
        // screen.SetCanvas(this.canvas);
        this.m_screens.push(screen);
    };
    return Frame;
}());

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
    while (new Date().getTime() < unixtime_ms + ms) { }
}
//# sourceMappingURL=Frame.js.map

/***/ }),

/***/ "../../../../../src/app/OhsGuiFramework/ImageButton.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ImageButton; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item__ = __webpack_require__("../../../../../src/app/OhsGuiFramework/Item.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ImageButton = (function (_super) {
    __extends(ImageButton, _super);
    function ImageButton(ctx, imgSrc, imgPush, x, y, w, h) {
        var _this = _super.call(this, ctx) || this;
        _this.img = new Image();
        _this.imgPush = new Image();
        _this.border = false;
        _this.push = false;
        _this.int = null;
        _this.visible = true;
        _this.img.src = imgSrc;
        _this.imgPush.src = imgPush;
        //    this.border = false;
        _this.rect.size(x, y, w, h);
        return _this;
    }
    ImageButton.prototype.setVisibility = function (enable) {
        this.visible = enable;
    };
    ImageButton.prototype.MouseDownHandler = function (x, y) {
        if (this.visible) {
            return _super.prototype.MouseDownHandler.call(this, x, y);
        }
        else {
            return null;
        }
    };
    ImageButton.prototype.MouseUpHandler = function (x, y) {
        if (this.visible) {
            return _super.prototype.MouseUpHandler.call(this, x, y);
        }
        else {
            return null;
        }
    };
    ImageButton.prototype.MouseMoveHandler = function (x, y) {
        if (this.visible) {
            return _super.prototype.MouseMoveHandler.call(this, x, y);
        }
        else {
            return null;
        }
    };
    ImageButton.prototype.paint = function () {
        var ctx = this.ctx;
        if (this.visible) {
            ctx.save();
            if (this.push) {
                ctx.drawImage(this.imgPush, this.rect.x, this.rect.y, this.rect.w, this.rect.h);
            }
            else {
                ctx.drawImage(this.img, this.rect.x, this.rect.y, this.rect.w, this.rect.h);
            }
            ctx.restore();
            if (this.border) {
                ctx.save();
                ctx.beginPath();
                ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
                ctx.lineWidth = 2;
                ctx.strokeStyle = 'blue';
                ctx.stroke();
                ctx.closePath();
                ctx.restore();
            }
        }
    };
    return ImageButton;
}(__WEBPACK_IMPORTED_MODULE_0__Item__["a" /* Item */]));

//# sourceMappingURL=ImageButton.js.map

/***/ }),

/***/ "../../../../../src/app/OhsGuiFramework/Item.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Item; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Rect__ = __webpack_require__("../../../../../src/app/OhsGuiFramework/Rect.ts");

var Item = (function () {
    function Item(ctx) {
        // Basic Rectangle...
        this.rect = new __WEBPACK_IMPORTED_MODULE_0__Rect__["a" /* Rect */]();
        this.ctx = ctx;
    }
    Item.prototype.paint = function () {
    };
    Item.prototype.MouseDownHandler = function (x, y) {
        if (this.rect.isClicked(x, y)) {
            return this;
        }
        else {
            return null;
        }
    };
    Item.prototype.MouseUpHandler = function (x, y) {
        if (this.rect.isClicked(x, y)) {
            return this;
        }
        else {
            return null;
        }
    };
    Item.prototype.MouseMoveHandler = function (x, y) {
        if (this.rect.isClicked(x, y)) {
            return this;
        }
        else {
            return null;
        }
    };
    Item.prototype.Move = function (x, y) {
        this.rect.x = x;
        this.rect.y = y;
    };
    Item.prototype.Size = function (x, y, w, h) {
        this.rect.x = x;
        this.rect.y = y;
        this.rect.w = w;
        this.rect.h = h;
    };
    return Item;
}());

//# sourceMappingURL=Item.js.map

/***/ }),

/***/ "../../../../../src/app/OhsGuiFramework/ListBox.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListBox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item__ = __webpack_require__("../../../../../src/app/OhsGuiFramework/Item.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__TextSimple__ = __webpack_require__("../../../../../src/app/OhsGuiFramework/TextSimple.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var ListBox = (function (_super) {
    __extends(ListBox, _super);
    function ListBox(ctx) {
        var _this = _super.call(this, ctx) || this;
        _this.colorBkg = '#ffffff';
        _this.colorBorder = '#a6a6a6';
        _this.colorText = '#ffffff';
        _this.fontSize = 20;
        _this.bold = false;
        _this.num = 0;
        _this.row_height = 40;
        _this.selRow = 0;
        _this.selectedRow = 0;
        _this.editable = true;
        _this.selectable = true;
        _this.m_items = new Array();
        return _this;
    }
    ListBox.prototype.MouseMoveHandler = function (x, y) {
        if (_super.prototype.MouseMoveHandler.call(this, x, y) !== this) {
            return null;
        }
        var i = 1;
        this.selRow = 0;
        for (var _i = 0, _a = this.m_items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.rect.isClicked(x, y)) {
                if (this.selectable) {
                    this.selRow = i;
                }
                return item;
            }
            i++;
        }
        return this;
    };
    ListBox.prototype.MouseDownHandler = function (x, y) {
        if (_super.prototype.MouseDownHandler.call(this, x, y) !== this) {
            return null;
        }
        var i = 1;
        // this.selectedRow = 0;
        for (var _i = 0, _a = this.m_items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.MouseDownHandler(x, y) === item) {
                if (this.selectable) {
                    this.selectedRow = i;
                }
                return item;
            }
            i++;
        }
        return this;
    };
    ListBox.prototype.MouseUpHandler = function (x, y) {
        if (_super.prototype.MouseUpHandler.call(this, x, y) !== this) {
            return null;
        }
        var i = 1;
        // this.selectedRow = 0;
        for (var _i = 0, _a = this.m_items; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.MouseUpHandler(x, y) === item) {
                return item;
            }
            i++;
        }
        return this;
    };
    ListBox.prototype.add = function (item) {
        //   item.canvas = this.canvas;
        item.fontSize = this.fontSize;
        item.fontFamily = 'px Tahoma, sans-serif';
        item.fontColor = '#009ccc';
        item.textAlign = 'left';
        item.textBaseline = 'middle';
        item.bold = this.bold;
        item.editable = this.editable;
        this.m_items.push(item);
    };
    ListBox.prototype.addEntry = function (txt) {
        this.add(new __WEBPACK_IMPORTED_MODULE_1__TextSimple__["a" /* TextSimple */](this.ctx, txt, 0, 0, 10, 10));
    };
    ListBox.prototype.setNumber = function (num) {
        if (num > this.m_items.length) {
            for (var i = this.m_items.length; i < num; i++) {
                // let ss = new types();
                //arg.push(ss);
                this.add(new __WEBPACK_IMPORTED_MODULE_1__TextSimple__["a" /* TextSimple */](this.ctx, '', 0, 0, 10, 10));
            }
        }
        else if (num < this.m_items.length) {
            this.m_items.length = num;
        }
    };
    ListBox.prototype.setText = function (txt, n) {
        if (this.m_items.length < n + 1) {
            this.addEntry(txt);
        }
        else {
            this.m_items[n].setText(txt);
        }
    };
    ListBox.prototype.setEditable = function (editable) {
        this.editable = editable;
        for (var _i = 0, _a = this.m_items; _i < _a.length; _i++) {
            var item = _a[_i];
            item.editable = editable;
        }
    };
    ListBox.prototype.setSelectable = function (selectable) {
        this.selectable = selectable;
    };
    ListBox.prototype.order = function () {
        var high = this.row_height;
        var space_vertical = 2;
        var space_left = 2;
        var i = 0;
        for (var _i = 0, _a = this.m_items; _i < _a.length; _i++) {
            var item = _a[_i];
            item.Size(this.rect.x + space_left, this.rect.y, this.rect.w - (2 * space_left), high);
            item.Move(this.rect.x + space_left, this.rect.y + space_vertical + (i * (high + space_vertical)));
            i++;
        }
    };
    ListBox.prototype.paint = function () {
        var ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        this.rect.paint(ctx);
        ctx.fillStyle = this.colorBkg;
        ctx.fill();
        ctx.lineWidth = 2;
        if (this.colorBorder === '') {
            ctx.strokeStyle = this.colorBkg;
        }
        else {
            ctx.strokeStyle = this.colorBorder;
        }
        ctx.stroke();
        ctx.closePath();
        ctx.rect(this.rect.x, this.rect.y, this.rect.w, this.rect.h);
        ctx.stroke();
        ctx.clip();
        // Draw Items
        this.order();
        var i = 1;
        var cc = 0;
        for (var _i = 0, _a = this.m_items; _i < _a.length; _i++) {
            var item = _a[_i];
            ctx.beginPath();
            if (cc === 0) {
                ctx.fillStyle = '#e6f9ff';
            }
            else {
                ctx.fillStyle = '#ccf3ff';
            }
            if (this.selectedRow === i) {
                ctx.fillStyle = '#c180ff';
            }
            if (this.selRow === i) {
                ctx.fillStyle = '#dab3ff';
            }
            ctx.rect(item.rect.x, item.rect.y, item.rect.w, item.rect.h);
            ctx.fill();
            ctx.closePath();
            item.paint();
            if (cc === 0) {
                cc++;
            }
            else {
                cc = 0;
            }
            i++;
        }
        ctx.restore();
        _super.prototype.paint.call(this);
    };
    return ListBox;
}(__WEBPACK_IMPORTED_MODULE_0__Item__["a" /* Item */]));

//# sourceMappingURL=ListBox.js.map

/***/ }),

/***/ "../../../../../src/app/OhsGuiFramework/NumberRounded.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NumberRounded; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TextSimple__ = __webpack_require__("../../../../../src/app/OhsGuiFramework/TextSimple.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var NumberRounded = (function (_super) {
    __extends(NumberRounded, _super);
    function NumberRounded(ctx) {
        var _this = _super.call(this, ctx, '', 0, 0, 0, 0) || this;
        _this.colorBkg = '#003399';
        _this.colorZeroBkg = '#a6a6a6';
        _this.colorInside = _this.colorBkg;
        _this.colorText = '#ffffff';
        _this.num = 0;
        _this.fontSize = 26;
        _this.fontFamily = 'px Tahoma, sans-serif';
        _this.fontColor = _this.colorText;
        _this.textAlign = 'center';
        _this.textBaseline = 'middle';
        _this.bold = true;
        return _this;
    }
    NumberRounded.prototype.center = function (cx, cy, w, h) {
        this.rect.size(cx - (w / 2), cy - (h / 2), w, h);
    };
    NumberRounded.prototype.SetNumber = function (num) {
        this.num = num;
        this.setText(this.num.toString());
    };
    NumberRounded.prototype.SetColorBkg = function (color) {
        this.colorBkg = color.toString();
    };
    NumberRounded.prototype.paint = function () {
        var ctx = this.ctx;
        if (this.num <= 0) {
            this.colorInside = this.colorZeroBkg;
        }
        else {
            this.colorInside = this.colorBkg;
        }
        // Basic shape
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.rect.x + (this.rect.w / 2), this.rect.y + (this.rect.h / 2), this.rect.w / 2, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.colorInside;
        ctx.fill();
        ctx.lineWidth = 2;
        ctx.strokeStyle = this.colorInside;
        ctx.stroke();
        ctx.restore();
        _super.prototype.paint.call(this);
    };
    return NumberRounded;
}(__WEBPACK_IMPORTED_MODULE_0__TextSimple__["a" /* TextSimple */]));

//# sourceMappingURL=NumberRounded.js.map

/***/ }),

/***/ "../../../../../src/app/OhsGuiFramework/OhsScreen.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OhsScreen; });
var OhsScreen = (function () {
    //   private msg:                MessageBox = new MessageBox ();
    function OhsScreen(canvas) {
        this.m_item = null;
        this.canvas = null;
        this.ctx = null;
        this.message = false;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.m_item = new Array();
    }
    OhsScreen.prototype.add = function (item) {
        // item.canvas = this.canvas;
        this.m_item.push(item);
    };
    /*
    public SetCanvas (canvas: HTMLCanvasElement) {
        this.canvas = canvas;

    }
    */
    OhsScreen.prototype.GetSize = function () {
        return {
            width: this.canvas.width,
            height: this.canvas.height
        };
    };
    OhsScreen.prototype.MouseDownHandler = function (x, y) {
        for (var _i = 0, _a = this.m_item; _i < _a.length; _i++) {
            var item = _a[_i];
            var ret = item.MouseDownHandler(x, y);
            if (ret != null) {
                return ret;
            }
        }
        return null;
    };
    OhsScreen.prototype.MouseUpHandler = function (x, y) {
        for (var _i = 0, _a = this.m_item; _i < _a.length; _i++) {
            var item = _a[_i];
            var ret = item.MouseUpHandler(x, y);
            if (ret != null) {
                return ret;
            }
        }
        return null;
    };
    OhsScreen.prototype.MouseMoveHandler = function (x, y) {
        for (var _i = 0, _a = this.m_item; _i < _a.length; _i++) {
            var item = _a[_i];
            var ret = item.MouseMoveHandler(x, y);
            if (ret != null) {
                return ret;
            }
        }
        return null;
    };
    OhsScreen.prototype.MessagBox = function (text, type) {
        this.message = true;
    };
    OhsScreen.prototype.updateData = function () {
        // Any routines updating data...
    };
    OhsScreen.prototype.paint = function () {
        // Update data first
        this.updateData();
        // Paint
        var ctx = this.canvas.getContext('2d');
        var width = this.canvas.width;
        var height = this.canvas.height;
        ctx.clearRect(0, 0, width, height);
        ctx.save();
        for (var _i = 0, _a = this.m_item; _i < _a.length; _i++) {
            var item = _a[_i];
            item.paint();
        }
        ctx.restore();
    };
    return OhsScreen;
}());

//# sourceMappingURL=OhsScreen.js.map

/***/ }),

/***/ "../../../../../src/app/OhsGuiFramework/PropertyBox.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertyBox; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item__ = __webpack_require__("../../../../../src/app/OhsGuiFramework/Item.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ListBox__ = __webpack_require__("../../../../../src/app/OhsGuiFramework/ListBox.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var PropertyBox = (function (_super) {
    __extends(PropertyBox, _super);
    function PropertyBox(ctx) {
        var _this = _super.call(this, ctx) || this;
        _this.colorBkg = '#ffffff';
        _this.colorBorder = '#a6a6a6';
        _this.m_props = new __WEBPACK_IMPORTED_MODULE_1__ListBox__["a" /* ListBox */](_this.ctx);
        _this.m_data = new __WEBPACK_IMPORTED_MODULE_1__ListBox__["a" /* ListBox */](_this.ctx);
        // Set style...
        _this.m_props.fontSize = 20;
        _this.m_props.colorBorder = '';
        _this.m_props.bold = false;
        _this.m_props.setEditable(false);
        _this.m_props.setSelectable(false);
        _this.m_data.fontSize = 16;
        _this.m_data.colorBorder = '';
        _this.m_data.bold = false;
        _this.m_data.setEditable(true);
        _this.m_data.setSelectable(false);
        return _this;
    }
    PropertyBox.prototype.setNumber = function (num) {
        this.m_props.setNumber(num);
        this.m_data.setNumber(num);
    };
    PropertyBox.prototype.MouseMoveHandler = function (x, y) {
        if (_super.prototype.MouseMoveHandler.call(this, x, y) !== this) {
            return null;
        }
        return this;
    };
    PropertyBox.prototype.MouseDownHandler = function (x, y) {
        if (_super.prototype.MouseDownHandler.call(this, x, y) !== this) {
            return null;
        }
        /*
        if (this.canvas == null) {
            window.alert('canvas null...');
        }
        */
        var ret = this.m_props.MouseDownHandler(x, y);
        if (ret != null) {
            return ret;
        }
        ret = this.m_data.MouseDownHandler(x, y);
        if (ret != null) {
            return ret;
        }
        return this;
    };
    PropertyBox.prototype.MouseUpHandler = function (x, y) {
        if (_super.prototype.MouseUpHandler.call(this, x, y) !== this) {
            return null;
        }
        var ret = this.m_props.MouseUpHandler(x, y);
        if (ret != null) {
            return ret;
        }
        var ret = this.m_data.MouseUpHandler(x, y);
        if (ret != null) {
            return ret;
        }
        return this;
    };
    PropertyBox.prototype.addEntry = function (txtProp, txtData) {
        //      this.m_props.canvas = this.canvas;
        //    this.m_data.canvas = this.canvas;
        this.m_props.addEntry(txtProp);
        this.m_data.addEntry(txtData);
    };
    PropertyBox.prototype.setText = function (txtProp, txtData, n) {
        this.m_props.setText(txtProp, n);
        this.m_data.setText(txtData, n);
    };
    PropertyBox.prototype.order = function () {
        var widthPropPerc = 0.25; // percentage of property field
        var gapX = 4; // left/right gap
        var gapY = 4; // top/bottom gap
        var widthProp = (this.rect.w - (3 * gapX)) * widthPropPerc;
        var widthData = (this.rect.w - (3 * gapX)) - widthProp;
        this.m_props.Size(this.rect.x + gapX, this.rect.y + gapY, widthProp, this.rect.h - (2 * gapY));
        this.m_data.Size(this.rect.x + gapX + widthProp + gapX, this.rect.y + gapY, widthData, this.rect.h - (2 * gapY));
        this.m_props.order();
        this.m_data.order();
    };
    PropertyBox.prototype.paint = function () {
        var ctx = this.ctx;
        this.order();
        ctx.save();
        ctx.beginPath();
        this.rect.paint(ctx);
        ctx.fillStyle = this.colorBkg;
        ctx.fill();
        ctx.lineWidth = 2;
        if (this.colorBorder === '') {
            ctx.strokeStyle = this.colorBkg;
        }
        else {
            ctx.strokeStyle = this.colorBorder;
        }
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
        // ctx.save();
        this.m_props.paint();
        this.m_data.paint();
        //  ctx.restore();
        _super.prototype.paint.call(this);
    };
    return PropertyBox;
}(__WEBPACK_IMPORTED_MODULE_0__Item__["a" /* Item */]));

//# sourceMappingURL=PropertyBox.js.map

/***/ }),

/***/ "../../../../../src/app/OhsGuiFramework/Rect.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Rect; });
var Rect = (function () {
    function Rect() {
        //hh
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
    }
    Rect.prototype.isClicked = function (clx, cly) {
        if (!(clx > this.x && clx < this.x + this.w)) {
            return false;
        }
        if (!(cly < this.y + this.h && cly > this.y)) {
            return false;
        }
        return true;
    };
    Rect.prototype.equals = function (rectI) {
        this.x = rectI.x;
        this.y = rectI.y;
        this.w = rectI.w;
        this.h = rectI.h;
    };
    Rect.prototype.size = function (x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    };
    Rect.prototype.position = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Rect.prototype.sizeRect = function (rect) {
        this.x = rect.x;
        this.y = rect.y;
        this.w = rect.w;
        this.h = rect.h;
    };
    Rect.prototype.getSize = function () {
        var rect = new Rect();
        rect.x = this.x;
        rect.y = this.y;
        rect.w = this.w;
        rect.h = this.h;
        return rect;
    };
    Rect.prototype.move = function (dx, dy) {
        this.x = this.x + dx;
        this.y = this.y + dy;
    };
    Rect.prototype.scaleSize = function (perc) {
        var old_w = this.w;
        var old_h = this.h;
        this.w = this.w * perc;
        this.h = this.h * perc;
        this.x = this.x + ((old_w - this.w) / 2);
        this.y = this.y + ((old_h - this.h) / 2);
    };
    Rect.prototype.paint = function (ctx) {
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.w, this.h);
        ctx.closePath();
    };
    Rect.prototype.getRight = function () {
        return this.x + this.w;
    };
    Rect.prototype.getBottom = function () {
        return this.y + this.h;
    };
    return Rect;
}());

//# sourceMappingURL=Rect.js.map

/***/ }),

/***/ "../../../../../src/app/OhsGuiFramework/TextSimple.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TextSimple; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Item__ = __webpack_require__("../../../../../src/app/OhsGuiFramework/Item.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TextSimple = (function (_super) {
    __extends(TextSimple, _super);
    //   protected ipt: any = null;
    function TextSimple(ctx, txt, x, y, w, h) {
        var _this = _super.call(this, ctx) || this;
        _this.fontSize = 20;
        _this.fontColor = '#000000';
        _this.fontFamily = 'px Lucida Sans Unicode, Lucida Grande, sans-serif';
        _this.textAlign = 'left';
        _this.textBaseline = 'middle';
        _this.bold = false;
        _this.border = false;
        _this.editable = true;
        _this.inp = null;
        _this.text = txt;
        _this.rect.x = x;
        _this.rect.y = y;
        _this.rect.w = w;
        _this.rect.h = h;
        return _this;
    }
    TextSimple.prototype.setText = function (txt) {
        this.text = txt.toString();
    };
    TextSimple.prototype.getText = function () {
        return this.text;
    };
    /*
    public MouseUpHandler(x: number, y: number) {
        if (super.MouseUpHandler(x, y) == null) return null;

        return <Item> this;
    }

    */
    TextSimple.prototype.paint = function () {
        var ctx = this.ctx;
        var x = this.rect.x;
        var y = this.rect.y;
        var align = this.textAlign.toString();
        var baseline = this.textBaseline.toString();
        if (align === 'right' || align === 'end') {
            x = this.rect.x + this.rect.w;
        }
        else if (align === 'center') {
            x = this.rect.x + (this.rect.w / 2);
        }
        if (baseline === 'bottom' || baseline === 'alphabetic') {
            y = this.rect.y + this.rect.h;
        }
        else if (baseline === 'middle') {
            y = this.rect.y + (this.rect.h / 2);
        }
        var boldString = '';
        if (this.bold) {
            boldString = 'bold ';
        }
        ctx.save();
        ctx.font = boldString + this.fontSize + this.fontFamily;
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;
        ctx.fillStyle = this.fontColor;
        ctx.fillText(this.text.toString(), x, y);
        ctx.restore();
    };
    TextSimple.prototype.copyStyle = function (origin) {
        this.fontSize = origin.fontSize;
        this.fontColor = origin.fontColor;
        this.fontFamily = origin.fontFamily;
        this.textAlign = origin.textAlign;
        this.textBaseline = origin.textBaseline;
        this.bold = origin.bold;
    };
    return TextSimple;
}(__WEBPACK_IMPORTED_MODULE_0__Item__["a" /* Item */]));

//# sourceMappingURL=TextSimple.js.map

/***/ }),

/***/ "../../../../../src/app/OhsSiteData/ContactSensor.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactSensor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Thing__ = __webpack_require__("../../../../../src/app/OhsSiteData/Thing.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var ContactSensor = (function (_super) {
    __extends(ContactSensor, _super);
    function ContactSensor() {
        var _this = _super.call(this) || this;
        _this.state = false;
        return _this;
    }
    ContactSensor.prototype.setState = function (st) {
        this.state = st;
    };
    ContactSensor.prototype.getState = function () {
        return this.state;
    };
    return ContactSensor;
}(__WEBPACK_IMPORTED_MODULE_0__Thing__["a" /* Thing */]));

//# sourceMappingURL=ContactSensor.js.map

/***/ }),

/***/ "../../../../../src/app/OhsSiteData/Door.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Door; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Thing__ = __webpack_require__("../../../../../src/app/OhsSiteData/Thing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Supplier__ = __webpack_require__("../../../../../src/app/OhsSiteData/Supplier.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Door = (function (_super) {
    __extends(Door, _super);
    function Door() {
        var _this = _super.call(this) || this;
        _this.image_open = '/infores/servlets/kitchen/room_default.png';
        _this.image_close = '/infores/servlets/kitchen/room_default.png';
        _this.supplier = new __WEBPACK_IMPORTED_MODULE_1__Supplier__["a" /* Supplier */]();
        _this.open = false;
        _this.locked = false;
        _this.posX = 0;
        _this.posY = 0;
        return _this;
    }
    Door.prototype.getState = function () {
        if (!this.valid) {
            return 0;
        }
        if (this.open) {
            return 1;
        }
        if (this.locked) {
            return 3;
        }
        return 2;
    };
    return Door;
}(__WEBPACK_IMPORTED_MODULE_0__Thing__["a" /* Thing */]));

//# sourceMappingURL=Door.js.map

/***/ }),

/***/ "../../../../../src/app/OhsSiteData/Floor.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Floor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Thing__ = __webpack_require__("../../../../../src/app/OhsSiteData/Thing.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Floor = (function (_super) {
    __extends(Floor, _super);
    function Floor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.imagePath = '/infores/servlets/kitchen/room_default.png';
        _this.dimX = 0.0;
        _this.dimY = 0.0;
        // Rooms belongs to this floor...
        _this.m_roomArray = null;
        return _this;
    }
    return Floor;
}(__WEBPACK_IMPORTED_MODULE_0__Thing__["a" /* Thing */]));

//# sourceMappingURL=Floor.js.map

/***/ }),

/***/ "../../../../../src/app/OhsSiteData/OhsInterface.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OhsInterface; });
/* harmony export (immutable) */ __webpack_exports__["b"] = postAjax;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__("../../../../jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
// import $ from 'jquery';

var OhsInterface = (function () {
    function OhsInterface() {
    }
    return OhsInterface;
}());

OhsInterface.SERVLET_URL = 'kitchen';
OhsInterface.URL = 'services/ohs_site_data';
OhsInterface.ID_SET_NAME = 'idSetName';
OhsInterface.ID_SET_SITE_PATH = 'idSetSitePath';
OhsInterface.ID_SET_DEVICE_PATH = 'idSetDevicePath';
OhsInterface.ID_THING_UPDATE = 'idThingUpdate';
OhsInterface.ID_SITE_UPDATE = 'idSiteUpdate';
OhsInterface.ID_THING_COMMAND = 'idThingCommand';
OhsInterface.ID_FLOOR_ARR = 'idFloorArr';
OhsInterface.ID_ROOM_ARR = 'idRoomArr';
OhsInterface.ID_DOOR_ARR = 'idDoorArr';
OhsInterface.ID_WINDOW_ARR = 'idWindowArr';
OhsInterface.ID_TEMP_SENS_ARR = 'idTempSensArr';
OhsInterface.ID_SWITCH_ARR = 'idSwitchArr';
OhsInterface.ID_CONTACTSENS_ARR = 'idContactSensArr';
OhsInterface.ID_WIFINODE_ARR = 'idWifiNodeArr';
OhsInterface.ID_TIME_DATE = 'idTimeDate';
OhsInterface.ID_SET_FLOORS = 'idSetFloors';
OhsInterface.ID_ADD_FLOOR = 'idAddFloor';
OhsInterface.ID_DELETE_FLOOR = 'idDeleteFloor';
OhsInterface.ID_DELETE_THING = 'idDeleteThing';
OhsInterface.ID_ADD_THING = 'idAddThing';
function postAjax(urlAdr, jsonDat) {
    var result = null;
    __WEBPACK_IMPORTED_MODULE_0_jquery__["ajaxSetup"]({
        // Disable caching of AJAX responses
        cache: false
    });
    __WEBPACK_IMPORTED_MODULE_0_jquery__["ajax"]({
        async: false,
        type: 'POST',
        contentType: 'application/json',
        url: urlAdr,
        data: jsonDat,
        dataType: 'json',
        success: function (response) {
            result = response;
        }
    });
    return result;
}
//# sourceMappingURL=OhsInterface.js.map

/***/ }),

/***/ "../../../../../src/app/OhsSiteData/Room.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Room; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Thing__ = __webpack_require__("../../../../../src/app/OhsSiteData/Thing.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Room = (function (_super) {
    __extends(Room, _super);
    function Room() {
        var _this = _super.call(this) || this;
        _this.imageBkgPath = '/infores/servlets/kitchen/room_default.png';
        return _this;
    }
    return Room;
}(__WEBPACK_IMPORTED_MODULE_0__Thing__["a" /* Thing */]));

//# sourceMappingURL=Room.js.map

/***/ }),

/***/ "../../../../../src/app/OhsSiteData/Site.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Site; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Thing__ = __webpack_require__("../../../../../src/app/OhsSiteData/Thing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__OhsInterface__ = __webpack_require__("../../../../../src/app/OhsSiteData/OhsInterface.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Site = (function (_super) {
    __extends(Site, _super);
    function Site() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'no name';
        return _this;
    }
    Site.prototype.update = function () {
        var js = JSON.stringify({
            idPost: __WEBPACK_IMPORTED_MODULE_1__OhsInterface__["a" /* OhsInterface */].ID_SITE_UPDATE
        });
        var ret = Object(__WEBPACK_IMPORTED_MODULE_1__OhsInterface__["b" /* postAjax */])(__WEBPACK_IMPORTED_MODULE_1__OhsInterface__["a" /* OhsInterface */].URL, js);
        //  window.alert('je:' + OhsInterface.URL + ' :: ' + ret)
        if (ret !== null) {
            if (JSON.parse(ret['validity'])) {
                this.name = ret['name'];
            }
        }
    };
    return Site;
}(__WEBPACK_IMPORTED_MODULE_0__Thing__["a" /* Thing */]));

//# sourceMappingURL=Site.js.map

/***/ }),

/***/ "../../../../../src/app/OhsSiteData/SiteData.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SiteData; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Site__ = __webpack_require__("../../../../../src/app/OhsSiteData/Site.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Floor__ = __webpack_require__("../../../../../src/app/OhsSiteData/Floor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Room__ = __webpack_require__("../../../../../src/app/OhsSiteData/Room.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TemperatureSensor__ = __webpack_require__("../../../../../src/app/OhsSiteData/TemperatureSensor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Switch__ = __webpack_require__("../../../../../src/app/OhsSiteData/Switch.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Door__ = __webpack_require__("../../../../../src/app/OhsSiteData/Door.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Window__ = __webpack_require__("../../../../../src/app/OhsSiteData/Window.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ContactSensor__ = __webpack_require__("../../../../../src/app/OhsSiteData/ContactSensor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__WifiNode__ = __webpack_require__("../../../../../src/app/OhsSiteData/WifiNode.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__OhsInterface__ = __webpack_require__("../../../../../src/app/OhsSiteData/OhsInterface.ts");











var SiteData = (function () {
    function SiteData() {
        // ---Site data---
        this.m_site = null;
        this.m_floorArray = null;
        this.m_roomArray = null;
        this.m_tempSensorArray = null;
        this.m_switchArray = null;
        this.m_doorArray = null;
        this.m_windowArray = null;
        this.m_contactSensorArray = null;
        this.m_wifiNodeArray = null;
        this.getCount = 0;
        // ---Other data---
        this.timeString = '---';
        this.dateString = '---';
        this.m_site = new __WEBPACK_IMPORTED_MODULE_0__Site__["a" /* Site */]();
        this.m_floorArray = new Array();
        this.m_roomArray = new Array();
        this.m_tempSensorArray = new Array();
        this.m_switchArray = new Array();
        this.m_doorArray = new Array();
        this.m_windowArray = new Array();
        this.m_contactSensorArray = new Array();
        this.m_wifiNodeArray = new Array();
        // Initial update
        this.m_site.update();
        this.updateObjectArray(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_FLOOR_ARR);
        this.updateObjectArray(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_ROOM_ARR);
        this.updateObjectArray(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_DOOR_ARR);
        this.updateObjectArray(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_WINDOW_ARR);
        this.updateObjectArray(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_TEMP_SENS_ARR);
        this.updateObjectArray(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_SWITCH_ARR);
        this.updateObjectArray(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_CONTACTSENS_ARR);
        this.updateObjectArray(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_WIFINODE_ARR);
        // Timers
        this.fastTimerGetDataEvent(500);
        this.slowTimerGetDataEvent(2000);
    }
    SiteData.prototype.slowTimerGetDataEvent = function (step) {
        var _this = this;
        this.updateSlowData();
        window.clearTimeout(this.slowTimerGetData);
        this.slowTimerGetData = window.setTimeout(function () { return _this.slowTimerGetDataEvent(step); }, step);
    };
    SiteData.prototype.fastTimerGetDataEvent = function (step) {
        var _this = this;
        this.updateFastData();
        window.clearTimeout(this.fastTimerGetData);
        this.fastTimerGetData = window.setTimeout(function () { return _this.fastTimerGetDataEvent(step); }, step);
    };
    SiteData.prototype.updateFastData = function () {
        // Date & Time
        this.updateDateTime();
        // Switch
        //    this.getObjectArray(idSwitchArr);
    };
    SiteData.prototype.updateSlowData = function () {
        //   this.get_DateTime();
        if (this.getCount === 0) {
            this.updateObjectArray(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_FLOOR_ARR);
        }
        else if (this.getCount === 1) {
            this.updateObjectArray(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_ROOM_ARR);
        }
        else if (this.getCount === 2) {
            this.updateObjectArray(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_DOOR_ARR);
        }
        else if (this.getCount === 3) {
            this.updateObjectArray(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_WINDOW_ARR);
        }
        else if (this.getCount === 4) {
            this.updateObjectArray(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_SWITCH_ARR);
        }
        else if (this.getCount === 5) {
            this.updateObjectArray(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_TEMP_SENS_ARR);
        }
        else if (this.getCount === 6) {
            this.updateObjectArray(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_CONTACTSENS_ARR);
        }
        else if (this.getCount === 7) {
            this.m_site.update();
        }
        else if (this.getCount === 8) {
            this.updateObjectArray(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_WIFINODE_ARR);
        }
        if (this.getCount === 8) {
            this.getCount = 0;
        }
        else {
            this.getCount++;
        }
    };
    SiteData.prototype.updateDateTime = function () {
        var js = JSON.stringify({
            idPost: __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_TIME_DATE
        });
        var ret = Object(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["b" /* postAjax */])(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].URL, js);
        if (ret != null) {
            if (JSON.parse(ret['return'])) {
                // this.stateInt = parseInt(ret['state_int']);
                this.dateString = ret['date'];
                this.timeString = ret['time'];
            }
            //  window.alert('update time:' + this.timeString);
        }
    };
    SiteData.prototype.updateObjectArray = function (idObjArray) {
        var js = JSON.stringify({
            idPost: idObjArray
        });
        var ret = Object(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["b" /* postAjax */])(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].URL, js);
        if (ret != null) {
            if (JSON.parse(ret['return'])) {
                var str = JSON.stringify(ret[idObjArray]);
                var parsedJSON = JSON.parse(str);
                // Floors
                if (idObjArray === __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_FLOOR_ARR) {
                    this.setNumber(parsedJSON.length, this.m_floorArray, __WEBPACK_IMPORTED_MODULE_1__Floor__["a" /* Floor */]);
                    for (var i = 0; i < parsedJSON.length; i++) {
                        var object = parsedJSON[i];
                        this.m_floorArray[i].fillFromJSON(object);
                    }
                }
                else if (idObjArray === __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_ROOM_ARR) {
                    this.setNumber(parsedJSON.length, this.m_roomArray, __WEBPACK_IMPORTED_MODULE_2__Room__["a" /* Room */]);
                    for (var i = 0; i < parsedJSON.length; i++) {
                        var object = parsedJSON[i];
                        this.m_roomArray[i].fillFromJSON(object);
                    }
                }
                else if (idObjArray === __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_DOOR_ARR) {
                    this.setNumber(parsedJSON.length, this.m_doorArray, __WEBPACK_IMPORTED_MODULE_5__Door__["a" /* Door */]);
                    for (var i = 0; i < parsedJSON.length; i++) {
                        var object = parsedJSON[i];
                        this.m_doorArray[i].fillFromJSON(object);
                    }
                }
                else if (idObjArray === __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_WINDOW_ARR) {
                    this.setNumber(parsedJSON.length, this.m_windowArray, __WEBPACK_IMPORTED_MODULE_6__Window__["a" /* Window */]);
                    for (var i = 0; i < parsedJSON.length; i++) {
                        var object = parsedJSON[i];
                        this.m_windowArray[i].fillFromJSON(object);
                    }
                }
                else if (idObjArray === __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_SWITCH_ARR) {
                    this.setNumber(parsedJSON.length, this.m_switchArray, __WEBPACK_IMPORTED_MODULE_4__Switch__["a" /* Switch */]);
                    for (var i = 0; i < parsedJSON.length; i++) {
                        var object = parsedJSON[i];
                        this.m_switchArray[i].fillFromJSON(object);
                    }
                }
                else if (idObjArray === __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_TEMP_SENS_ARR) {
                    this.setNumber(parsedJSON.length, this.m_tempSensorArray, __WEBPACK_IMPORTED_MODULE_3__TemperatureSensor__["a" /* TemperatureSensor */]);
                    for (var i = 0; i < parsedJSON.length; i++) {
                        var object = parsedJSON[i];
                        this.m_tempSensorArray[i].fillFromJSON(object);
                    }
                }
                else if (idObjArray === __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_CONTACTSENS_ARR) {
                    this.setNumber(parsedJSON.length, this.m_contactSensorArray, __WEBPACK_IMPORTED_MODULE_7__ContactSensor__["a" /* ContactSensor */]);
                    for (var i = 0; i < parsedJSON.length; i++) {
                        var object = parsedJSON[i];
                        this.m_contactSensorArray[i].fillFromJSON(object);
                    }
                }
                else if (idObjArray === __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_WIFINODE_ARR) {
                    this.setNumber(parsedJSON.length, this.m_wifiNodeArray, __WEBPACK_IMPORTED_MODULE_8__WifiNode__["a" /* WifiNode */]);
                    for (var i = 0; i < parsedJSON.length; i++) {
                        var object = parsedJSON[i];
                        this.m_wifiNodeArray[i].fillFromJSON(object);
                    }
                }
            }
        }
    };
    SiteData.prototype.setNumber = function (num, arg, types) {
        if (num > arg.length) {
            for (var i = arg.length; i < num; i++) {
                var ss = new types();
                arg.push(ss);
            }
        }
        else if (num < arg.length) {
            arg.length = num;
        }
    };
    SiteData.prototype.getFilteredThings = function (arg, filterPath) {
        if (filterPath == null) {
            return arg;
        }
        else {
            return arg.filter(function (element) {
                var thing = element;
                return thing.getSitePath().indexOf(filterPath) >= 0;
            });
        }
    };
    SiteData.prototype.getFilteredThingsNoContains = function (arg, filterPath) {
        if (filterPath == null) {
            return arg;
        }
        else {
            return arg.filter(function (element) {
                var thing = element;
                return !(thing.getSitePath().indexOf(filterPath) >= 0);
            });
        }
    };
    SiteData.prototype.getSitePaths = function (arg) {
        var sitePaths = new Array();
        for (var i = 0; i < arg.length; i++) {
            var thing = arg[i];
            // var ss = new types();
            sitePaths.push(thing.getSitePath());
        }
        return sitePaths;
    };
    SiteData.prototype.getParentPath = function (thing) {
        if (thing == null) {
            return null;
        }
        else {
            var path = thing.getSitePath();
            if (path == null) {
                return null;
            }
            var path2 = path
                .replace(/(^\s+|\s+$)/g, '') // remove leading and trailing whitespaces
                .replace(/(^\/+|\/+$)/g, ''); // remove leading and trailing slashes
            // window.alert("*** getParent ***, Path: " + path + "  \n\nPath2:" + path2 +"|");
            var parts = path2.split('/'); // split string
            parts.pop();
            parts.pop();
            var newPath = parts.join('/');
            //  window.alert("*** getParent ***, newPath: " + newPath);
            return newPath;
        }
    };
    SiteData.prototype.getThing = function (path) {
        for (var id in this.m_floorArray) {
            if (this.m_floorArray[id].getSitePath() === path) {
                return this.m_floorArray[id];
            }
        }
        for (var id in this.m_roomArray) {
            if (this.m_roomArray[id].getSitePath() === path) {
                return this.m_roomArray[id];
            }
        }
        for (var id in this.m_tempSensorArray) {
            if (this.m_tempSensorArray[id].getSitePath() === path) {
                return this.m_tempSensorArray[id];
            }
        }
        for (var id in this.m_switchArray) {
            if (this.m_switchArray[id].getSitePath() === path) {
                return this.m_switchArray[id];
            }
        }
        for (var id in this.m_doorArray) {
            if (this.m_doorArray[id].getSitePath() === path) {
                return this.m_doorArray[id];
            }
        }
        for (var id in this.m_windowArray) {
            if (this.m_windowArray[id].getSitePath() === path) {
                return this.m_windowArray[id];
            }
        }
        for (var id in this.m_contactSensorArray) {
            if (this.m_contactSensorArray[id].getSitePath() === path) {
                return this.m_contactSensorArray[id];
            }
        }
        for (var id in this.m_wifiNodeArray) {
            if (this.m_wifiNodeArray[id].getSitePath() === path) {
                return this.m_wifiNodeArray[id];
            }
        }
        return null;
    };
    SiteData.prototype.getNumberFloors = function () {
        return this.m_floorArray.length;
    };
    SiteData.prototype.setNumberFloors = function (n) {
        var js = JSON.stringify({
            idPost: __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_SET_FLOORS,
            nmb: n
        });
        // window.alert('***');
        var ret = Object(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["b" /* postAjax */])(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].URL, js);
        if (JSON.parse(ret['return'])) {
            /*
            this.stateInt = parseInt(ret['state_int']);

            this.updateDelayed (100);
            */
            this.updateObjectArray(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_FLOOR_ARR);
        }
    };
    SiteData.prototype.addFloor = function () {
        var js = JSON.stringify({
            idPost: __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_ADD_FLOOR
        });
        var ret = Object(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["b" /* postAjax */])(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].URL, js);
        if (JSON.parse(ret['return'])) {
            this.updateObjectArray(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_FLOOR_ARR);
        }
    };
    SiteData.prototype.deleteFloor = function (floorPath) {
        var js = JSON.stringify({
            idPost: __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_DELETE_FLOOR,
            sitePath: floorPath
        });
        var ret = Object(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["b" /* postAjax */])(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].URL, js);
        if (JSON.parse(ret['return'])) {
            this.updateObjectArray(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_FLOOR_ARR);
        }
    };
    SiteData.prototype.deleteThing = function (thing) {
        var idType = __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_ROOM_ARR;
        if (thing instanceof __WEBPACK_IMPORTED_MODULE_1__Floor__["a" /* Floor */]) {
            idType = __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_FLOOR_ARR;
        }
        else if (thing instanceof __WEBPACK_IMPORTED_MODULE_2__Room__["a" /* Room */]) {
            idType = __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_ROOM_ARR;
        }
        var js = JSON.stringify({
            idPost: __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_DELETE_THING,
            sitePath: thing.getSitePath()
        });
        var ret = Object(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["b" /* postAjax */])(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].URL, js);
        if (JSON.parse(ret['return'])) {
            this.updateObjectArray(idType);
        }
    };
    SiteData.prototype.addThing = function (thingName) {
        var idType = __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_ROOM_ARR;
        if (thingName === __WEBPACK_IMPORTED_MODULE_1__Floor__["a" /* Floor */].name) {
            idType = __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_FLOOR_ARR;
        }
        else if (thingName === __WEBPACK_IMPORTED_MODULE_2__Room__["a" /* Room */].name) {
            idType = __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_ROOM_ARR;
        }
        var js = JSON.stringify({
            idPost: __WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].ID_ADD_THING,
            thingType: thingName
        });
        var ret = Object(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["b" /* postAjax */])(__WEBPACK_IMPORTED_MODULE_9__OhsInterface__["a" /* OhsInterface */].URL, js);
        if (JSON.parse(ret['return'])) {
            this.updateObjectArray(idType);
        }
    };
    return SiteData;
}());

//# sourceMappingURL=SiteData.js.map

/***/ }),

/***/ "../../../../../src/app/OhsSiteData/Supplier.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Supplier; });
var Supplier = (function () {
    function Supplier() {
        this.valid = false;
        this.name = 'unknown';
        this.www = 'unknown';
        this.address = 'unknown address';
        this.phone = 'unknown';
        this.logo = 'unknown';
    }
    return Supplier;
}());

//# sourceMappingURL=Supplier.js.map

/***/ }),

/***/ "../../../../../src/app/OhsSiteData/Switch.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Switch; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Thing__ = __webpack_require__("../../../../../src/app/OhsSiteData/Thing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__OhsInterface__ = __webpack_require__("../../../../../src/app/OhsSiteData/OhsInterface.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var Switch = (function (_super) {
    __extends(Switch, _super);
    function Switch() {
        var _this = _super.call(this) || this;
        _this.stateInt = 0;
        return _this;
    }
    Switch.prototype.getState = function () {
        return this.stateInt;
    };
    Switch.prototype.click = function () {
        if (this.getState() === 1 || this.getState() === 2) {
            this.on();
        }
        else {
            this.off();
        }
    };
    Switch.prototype.on = function () {
        var js = JSON.stringify({
            idPost: __WEBPACK_IMPORTED_MODULE_1__OhsInterface__["a" /* OhsInterface */].ID_THING_COMMAND,
            path: this.sitePath,
            command: 'on'
        });
        var ret = Object(__WEBPACK_IMPORTED_MODULE_1__OhsInterface__["b" /* postAjax */])(__WEBPACK_IMPORTED_MODULE_1__OhsInterface__["a" /* OhsInterface */].URL, js);
        if (JSON.parse(ret['return'])) {
            this.stateInt = parseInt(ret['state_int'], 10);
            this.updateDelayed(100);
        }
    };
    Switch.prototype.off = function () {
        var js = JSON.stringify({
            idPost: __WEBPACK_IMPORTED_MODULE_1__OhsInterface__["a" /* OhsInterface */].ID_THING_COMMAND,
            path: this.sitePath,
            command: 'off'
        });
        var ret = Object(__WEBPACK_IMPORTED_MODULE_1__OhsInterface__["b" /* postAjax */])(__WEBPACK_IMPORTED_MODULE_1__OhsInterface__["a" /* OhsInterface */].URL, js);
        if (JSON.parse(ret['return'])) {
            this.stateInt = parseInt(ret['state_int'], 10);
            this.updateDelayed(100);
        }
    };
    return Switch;
}(__WEBPACK_IMPORTED_MODULE_0__Thing__["a" /* Thing */]));

//# sourceMappingURL=Switch.js.map

/***/ }),

/***/ "../../../../../src/app/OhsSiteData/TemperatureSensor.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TemperatureSensor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Thing__ = __webpack_require__("../../../../../src/app/OhsSiteData/Thing.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var TemperatureSensor = (function (_super) {
    __extends(TemperatureSensor, _super);
    function TemperatureSensor() {
        var _this = _super.call(this) || this;
        _this.temp = 0.0;
        return _this;
    }
    return TemperatureSensor;
}(__WEBPACK_IMPORTED_MODULE_0__Thing__["a" /* Thing */]));

//# sourceMappingURL=TemperatureSensor.js.map

/***/ }),

/***/ "../../../../../src/app/OhsSiteData/Thing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Thing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__OhsInterface__ = __webpack_require__("../../../../../src/app/OhsSiteData/OhsInterface.ts");


var Thing = (function () {
    function Thing() {
        this.valid = false; // content of the forecast is valid        
        this.sitePath = '*'; // OpenHS path
        this.devicePath = '*'; // OpenHS path
        this.name = 'no name';
        this.posX = 0.0;
        this.posY = 0.0;
        this.posZ = 0.0;
    }
    Thing.prototype.getSitePath = function () {
        return this.sitePath;
    };
    Thing.prototype.getDevicePath = function () {
        return this.devicePath;
    };
    Thing.prototype.getName = function () {
        return this.name;
    };
    Thing.prototype.setName = function (name) {
        var js = JSON.stringify({
            idPost: __WEBPACK_IMPORTED_MODULE_0__OhsInterface__["a" /* OhsInterface */].ID_SET_NAME,
            sitePath: this.sitePath,
            idString: name
        });
        var ret = Object(__WEBPACK_IMPORTED_MODULE_0__OhsInterface__["b" /* postAjax */])(__WEBPACK_IMPORTED_MODULE_0__OhsInterface__["a" /* OhsInterface */].URL, js);
        if (JSON.parse(ret['return'])) {
            return true;
        }
        else {
            return false;
        }
    };
    Thing.prototype.setSitePath = function (sitePathNew) {
        var js = JSON.stringify({
            idPost: __WEBPACK_IMPORTED_MODULE_0__OhsInterface__["a" /* OhsInterface */].ID_SET_SITE_PATH,
            sitePath: this.sitePath,
            idString: sitePathNew
        });
        var ret = Object(__WEBPACK_IMPORTED_MODULE_0__OhsInterface__["b" /* postAjax */])(__WEBPACK_IMPORTED_MODULE_0__OhsInterface__["a" /* OhsInterface */].URL, js);
        if (JSON.parse(ret['return'])) {
            return true;
        }
        else {
            return false;
        }
    };
    Thing.prototype.setDevicePath = function (siteDevicePathNew) {
        var js = JSON.stringify({
            idPost: __WEBPACK_IMPORTED_MODULE_0__OhsInterface__["a" /* OhsInterface */].ID_SET_DEVICE_PATH,
            sitePath: this.sitePath,
            idString: siteDevicePathNew
        });
        var ret = Object(__WEBPACK_IMPORTED_MODULE_0__OhsInterface__["b" /* postAjax */])(__WEBPACK_IMPORTED_MODULE_0__OhsInterface__["a" /* OhsInterface */].URL, js);
        if (JSON.parse(ret['return'])) {
            return true;
        }
        else {
            return false;
        }
    };
    Thing.prototype.isValid = function () {
        return this.valid;
    };
    Thing.prototype.update = function () {
        var js = JSON.stringify({
            idPost: __WEBPACK_IMPORTED_MODULE_0__OhsInterface__["a" /* OhsInterface */].ID_THING_UPDATE,
            sitePath: this.sitePath
        });
        var ret = Object(__WEBPACK_IMPORTED_MODULE_0__OhsInterface__["b" /* postAjax */])(__WEBPACK_IMPORTED_MODULE_0__OhsInterface__["a" /* OhsInterface */].URL, js);
        if (JSON.parse(ret['return'])) {
            this.fillFromJSON(ret);
        }
        else {
        }
    };
    Thing.prototype.updateDelayed = function (wait) {
        var _this = this;
        window.setTimeout(function () { return _this.update(); }, wait);
    };
    Thing.prototype.fillFromJSON = function (json) {
        for (var propName in json) {
            this[propName] = json[propName];
        }
    };
    return Thing;
}());

//# sourceMappingURL=Thing.js.map

/***/ }),

/***/ "../../../../../src/app/OhsSiteData/WifiNode.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WifiNode; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Thing__ = __webpack_require__("../../../../../src/app/OhsSiteData/Thing.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var WifiNode = (function (_super) {
    __extends(WifiNode, _super);
    function WifiNode() {
        var _this = _super.call(this) || this;
        //public imageBkgPath     = '/infores/servlets/kitchen/room_default.png';
        _this.netType = '';
        _this.sensorType = '';
        return _this;
    }
    return WifiNode;
}(__WEBPACK_IMPORTED_MODULE_0__Thing__["a" /* Thing */]));

//# sourceMappingURL=WifiNode.js.map

/***/ }),

/***/ "../../../../../src/app/OhsSiteData/Window.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Window; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Thing__ = __webpack_require__("../../../../../src/app/OhsSiteData/Thing.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var Window = (function (_super) {
    __extends(Window, _super);
    function Window() {
        var _this = _super.call(this) || this;
        _this.image_open = '/infores/servlets/kitchen/room_default.png';
        _this.image_close = '/infores/servlets/kitchen/room_default.png';
        _this.open = false;
        _this.locked = false;
        return _this;
    }
    Window.prototype.getState = function () {
        if (!this.valid) {
            return 0;
        }
        if (this.open) {
            return 1;
        }
        if (this.locked) {
            return 3;
        }
        return 2;
    };
    return Window;
}(__WEBPACK_IMPORTED_MODULE_0__Thing__["a" /* Thing */]));

//# sourceMappingURL=Window.js.map

/***/ }),

/***/ "../../../../../src/app/OhsWifiAdmin/OhsWifiAdmin.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OhsWifiAdmin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__OhsWifiAdminSettings__ = __webpack_require__("../../../../../src/app/OhsWifiAdmin/OhsWifiAdminSettings.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sweetalert2__ = __webpack_require__("../../../../sweetalert2/dist/sweetalert2.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_sweetalert2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_sweetalert2__);



var OhsWifiAdmin = (function () {
    //public m_nodeArray:            Array <WifiNode> = null;
    function OhsWifiAdmin() {
        //  this.m_nodeArray = new Array <WifiNode> ();
        this.timerEvent(1000);
    }
    OhsWifiAdmin.prototype.timerEvent = function (step) {
        // this.updateData();
        var _this = this;
        window.clearTimeout(this.timer);
        this.timer = window.setTimeout(function () { return _this.timerEvent(step); }, step);
    };
    OhsWifiAdmin.prototype.updateData = function () {
        var js = JSON.stringify({
            idPost: __WEBPACK_IMPORTED_MODULE_0__OhsWifiAdminSettings__["a" /* OhsWifiAdminSettings */].ID_WIFI_ARR
        });
        var ret = Object(__WEBPACK_IMPORTED_MODULE_0__OhsWifiAdminSettings__["b" /* postAjax */])(__WEBPACK_IMPORTED_MODULE_0__OhsWifiAdminSettings__["a" /* OhsWifiAdminSettings */].URL, js);
        if (ret != null) {
            if (JSON.parse(ret['return'])) {
            }
        }
    };
    OhsWifiAdmin.prototype.setNumber = function (num, arg, types) {
        if (num > arg.length) {
            for (var i = arg.length; i < num; i++) {
                var ss = new types();
                arg.push(ss);
            }
        }
        else if (num < arg.length) {
            arg.length = num;
        }
    };
    OhsWifiAdmin.prototype.connectNode = function (sitePath) {
        //window.alert('connecting...:' + sitePath);
        var js = JSON.stringify({
            idPost: __WEBPACK_IMPORTED_MODULE_0__OhsWifiAdminSettings__["a" /* OhsWifiAdminSettings */].ID_CONECT_NODE,
            sitePath: sitePath
        });
        var ret = Object(__WEBPACK_IMPORTED_MODULE_0__OhsWifiAdminSettings__["b" /* postAjax */])(__WEBPACK_IMPORTED_MODULE_0__OhsWifiAdminSettings__["a" /* OhsWifiAdminSettings */].URL, js);
        if (ret != null) {
            if (JSON.parse(ret['return'])) {
                // this.fillFromJSON(ret);
                //window.alert('response...:' + sitePath + ' OK');
                __WEBPACK_IMPORTED_MODULE_1_sweetalert2___default()('Done!', 'We are working on it!', 'success');
            }
            else {
                __WEBPACK_IMPORTED_MODULE_1_sweetalert2___default()('Problem!', 'Cannot do that... :(', 'error');
            }
        }
    };
    return OhsWifiAdmin;
}());

//# sourceMappingURL=OhsWifiAdmin.js.map

/***/ }),

/***/ "../../../../../src/app/OhsWifiAdmin/OhsWifiAdminSettings.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OhsWifiAdminSettings; });
/* harmony export (immutable) */ __webpack_exports__["b"] = postAjax;
var OhsWifiAdminSettings = (function () {
    function OhsWifiAdminSettings() {
    }
    return OhsWifiAdminSettings;
}());

OhsWifiAdminSettings.URL = 'services/ohs_wifiadmin_ws';
OhsWifiAdminSettings.ID_SET_NAME = 'idSetName';
OhsWifiAdminSettings.ID_WIFI_ARR = 'idWifiArr';
OhsWifiAdminSettings.ID_CONECT_NODE = 'idConnectNode';
function postAjax(urlAdr, jsonDat) {
    var result = null;
    $.ajaxSetup({
        // Disable caching of AJAX responses
        cache: false
    });
    $.ajax({
        async: false,
        type: 'POST',
        contentType: 'application/json',
        url: urlAdr,
        data: jsonDat,
        dataType: 'json',
        success: function (response) {
            result = response;
        }
    });
    return result;
}
//# sourceMappingURL=OhsWifiAdminSettings.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__OhsAdmin_FrameMain__ = __webpack_require__("../../../../../src/app/OhsAdmin/FrameMain.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    // public m_siteData:                 SiteData = null;
    function AppComponent() {
        // this.m_siteData = new SiteData ();
        this.title = 'app';
        this.canvas = document.getElementById('infoCanvas');
        //  window.alert('aaaa');
        this.ctx = this.canvas.getContext('2d');
        this.m_frame = new __WEBPACK_IMPORTED_MODULE_1__OhsAdmin_FrameMain__["a" /* FrameMain */](this.canvas);
        //window.alert('AppComponent');
        // requestAnimationFrame(() => this.paint());
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.css")]
    }),
    __metadata("design:paramtypes", [])
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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



// import { OhsSiteDataModule } from './ohs-site-data/ohs-site-data.module';
// import { OhsAdminModule } from './ohs-admin/ohs-admin.module';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]
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