/**
 * Copyright (C) 2011 Graham Breach
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * March 1.0
 * For more information, please contact <graham@goat1000.com>
 */
(function(){
function clock() {
	var c, ct, w, h, scaleX, scaleY, x, y, nextFrame, init, timer, images = {}, red = 'red', black = '#000', butt = 'butt',
		pi = Math.PI, sin = Math.sin, cos = Math.cos, options = {
		interval: 50,
		sLength: 20,
		sOverlap: 5,
		sColour: red,
		sCap: butt,
		sThickness: 0.75,
		sBlob: 1.5,
		mLength: 18,
		mOverlap: 1,
		mColour: black,
		mCap: butt,
		mThickness: 1.25,
		hLength: 12,
		hOverlap: 1,
		hColour: black,
		hCap: butt,
		hThickness: 1.5,
		diameter: 50,
		dRadius: 22,
		dHourR1: 16,
		dHourR2: 22,
		dMinuteR1: 20,
		dMinuteR2: 22,
		dThickness: 1,
		dColour: '#999',
		dCap: butt
	};
	function thickColourCap(t,c,p) {
		ct.lineWidth = t;
		ct.strokeStyle = c;
		ct.lineCap = p;
	}
	function pip(a,r1,r2) {
		var ca = cos(a), sa = sin(a);
		ct.moveTo(r1 * ca, r1 * sa);
		ct.lineTo(r2 * ca, r2 * sa);
	}
	function handImage(a,r1,r2,b,c,t,cp,im) {
		var h = im.height, w = im.width, l = r2 - r1, s = l / h,
			x = w / 2, y = h - (r2 == 0 ? 0 : h / Math.abs(l/r1));
		ct.save();
		ct.rotate(a);
		ct.scale(s,s);
		ct.translate(-x, -y);
		ct.drawImage(im,0,0);
		ct.restore();
	}
	function hand(a,r1,r2,b,c,t,cp,im) {
		var a1 = a - pi/2, cs = cos(a1), sn = sin(a1);
		ct.strokeStyle = ct.fillStyle = c;
		ct.lineCap = cp;
		ct.lineWidth = t;
		ct.beginPath();
		ct.moveTo(r1 * cs, r1 * sn);
		ct.lineTo(r2 * cs, r2 * sn);
		ct.stroke();
		ct.closePath();
		ct.beginPath();
		b && ct.arc(0,0,b,0,2*pi,true);
		ct.fill();
		ct.closePath();
	}
	function seconds(s) {
		var fn = images.s && images.s.complete ? handImage : hand;
		fn(s * pi / 30, -options.sOverlap, options.sLength, options.sBlob, 
			options.sColour, options.sThickness, options.sCap, images.s);
	}
	function minutes(m) {
		var fn = images.m && images.m.complete ? handImage : hand;
		fn(m * pi / 30, -options.mOverlap, options.mLength, options.mBlob,
			options.mColour, options.mThickness, options.mCap, images.m);
	}
	function hours(hr) {
		var fn = images.h && images.h.complete ? handImage : hand;
		fn(hr * pi / 6, -options.hOverlap, options.hLength, options.hBlob,
			options.hColour, options.hThickness, options.hCap, images.h);
	}
	function face() {
		var p = 60, p1 = pi / 30; 
		if(options.dThickness) {
			thickColourCap(options.dThickness, options.dColour, options.dCap);
			ct.fillStyle = options.dFill;
			ct.beginPath();
			ct.moveTo(options.dRadius,0);
			ct.arc(0,0,options.dRadius,0,2*pi,false);
			options.dFill && ct.fill();
			ct.stroke();
			ct.closePath();
		}
		if(options.dMinuteR2 && options.dMinuteR2 != options.dMinuteR1) {
			thickColourCap(options.dMThickness || options.dThickness,
				options.dMColour || options.dColour,
				options.dMCap || options.dCap);
			ct.beginPath();
			while(--p >= 0)
				p % 5 && pip(p * p1, options.dMinuteR1, options.dMinuteR2);
			ct.stroke();
			ct.closePath();
		}
		if(options.dHourR2 && options.dHourR2 != options.dHourR1) {
			thickColourCap(options.dHThickness || options.dThickness,
				options.dHColour || options.dColour,
				options.dHCap || options.dCap);
			ct.beginPath();
			for(p = 0; p < 12; ++p)
				pip(p * 5 * p1, options.dHourR1, options.dHourR2);
			ct.stroke();
			ct.closePath();
		}
	}
	function loadImage(u,i) {
		var e = new Image;
		e.onload = function() { images[i] = this };
		e.src = u;
	}
	function drawClock(d) {
		var hr, mn, ss;
		ss = d.getSeconds() + (options.tick ? 0 : d.getMilliseconds() * 0.001);
		mn = d.getMinutes() + (ss / 60);
		hr = d.getHours() + (mn / 60);

		options.noFace || face();
		hours(hr);
		minutes(mn);
		options.hideSeconds || seconds(ss);
	}
	function draw() {
		ct.setTransform(1,0,0,1,0,0);
		ct.clearRect(0,0,w,h);
		ct.setTransform(scaleX, 0, 0, scaleY, x, y);
		var d = new Date;
		init && d.setTime(d.valueOf() + init);
		options.tz != undefined && d.setTime(d.valueOf() + (d.getTimezoneOffset()*6e4) + (options.tz*3.6e6));
		options.offset && d.setTime(d.valueOf() + (options.offset * 1e3));
		drawClock(d);
	}
	function frame(e) {
		draw();
		nextFrame(frame);
	}
	function start(cid, opt) {
		var a;
		if(options) {
			for(a in opt) {
				options[a] = opt[a];
			}
		}
		if(options.interval) {
			c = document.getElementById(cid);
			w = c.width;
			h = c.height;
			a = (w > h ? h : w);
			scaleX = (options.width || options.height || a) / (options.diameter || 100);
			scaleY = (options.height || options.width || a) / (options.diameter || 100);
			x = options.x != undefined ? options.x : w/2;
			y = options.y != undefined ? options.y : h/2;
			ct = c.getContext('2d');
			options.sImage && loadImage(options.sImage,'s');
			options.mImage && loadImage(options.mImage,'m');
			options.hImage && loadImage(options.hImage,'h');
			stop();
			nextFrame = options.useRAF && (window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame);
			options.startTime != undefined && (init = (options.startTime * 1e3) - new Date().valueOf());
			draw();
			if(nextFrame)
				nextFrame(frame);
			else
				timer = setInterval(draw, options.interval);
		}
	}
	function stop() {
		nextFrame && (nextFrame = function() { });
		timer && clearInterval(timer);
		timer = null;
	}
	this.start = start;
	this.stop = stop;	
	
	
}
var clocks = {};
function startClock(cid, opt) {
	(clocks[cid] || (clocks[cid] = new clock)) && clocks[cid].start(cid,opt);
}
function stopClock(cid) {
	clocks[cid] && clocks[cid].stop();
}



window.startClock = startClock;
window.stopClock = stopClock;
}());
