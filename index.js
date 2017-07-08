/**
 * Jdenticon
 * http://jdenticon.com
 * 
 * Copyright (c) 2014-2017 Daniel Mester Pirttij�rvi
 *
 * This software is provided 'as-is', without any express or implied
 * warranty.  In no event will the authors be held liable for any damages
 * arising from the use of this software.
 * 
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 * 
 * 1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 * 
 * 2. Altered source versions must be plainly marked as such, and must not be
 *    misrepresented as being the original software.
 * 
 * 3. This notice may not be removed or altered from any source distribution.
 * 
 */

"use strict";

if (typeof require !== "function" ||
    typeof module !== "object" ||
    typeof module.exports !== "object") {
    throw new Error(
        "Jdenticon: index.js is only intended for Node.js environments. " +
        "If you want to run Jdenticon in the browser, please add a reference " +
        "to 'dist/jdenticon.js' or 'dist/jdenticon.min.js' instead.");
}

var canvasRenderer = require("canvas-renderer");
var jdenticon = require("./dist/jdenticon");

/**
 * Draws an identicon as PNG.
 * @param {number=} padding Optional padding in percents. Extra padding might be added to center the rendered identicon.
 * @returns {Buffer}
 */
jdenticon.toPng = function (hash, size, padding) {
    var canvas = canvasRenderer.createCanvas(size, size);
    var ctx = canvas.getContext("2d");
    
    if (typeof padding !== "number") {
        padding = 0.08;
    }
    
    padding = (padding * size) | 0;
    size -= padding * 2;
    ctx.translate(padding, padding);
    
    jdenticon.drawIcon(ctx, hash, size);
    
    return canvas.toPng();
};

module.exports = jdenticon;