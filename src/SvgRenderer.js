﻿/**
 * Jdenticon
 * https://github.com/dmester/jdenticon
 * Copyright © Daniel Mester Pirttijärvi
 */

define(["./SvgPath"], function (SvgPath) {
    "use strict";
    
    /**
     * A wrapper around a context for building paths.
     * @private
     * @constructor
     */
    function SvgRenderer(width, height) {
        this._pathsByColor = { };
        this._size = { w: width, h: height };
    }
    SvgRenderer.prototype = {
        beginShape: function (color) {
            this._path = this._pathsByColor[color] || (this._pathsByColor[color] = new SvgPath());
        },
        endShape: function () { },
        addPolygon: function (points) {
            this._path.addPolygon(points);
        },
        addCircle: function (point, size, counterClockwise) {
            this._path.addCircle(point, size, counterClockwise);
        },
        toSvg: function (fragment) {
            var svg = fragment ? '' : 
                '<svg xmlns="http://www.w3.org/2000/svg" width="' + 
                this._size.w + '" height="' + this._size.h + '" viewBox="0 0 ' + 
                this._size.w + ' ' + this._size.h + '" preserveAspectRatio="xMidYMid meet">';
            
            for (var color in this._pathsByColor) {
                svg += '<path fill="' + color + '" d="' + this._pathsByColor[color].toSvg() + '"/>';
            }

            return fragment ? svg : 
                svg + '</svg>';
        }
    };
    
    return SvgRenderer;
});