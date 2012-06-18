/*jslint nomen: true, vars: true */
/*global THREE */

'use strict';

var _ = require('underscore');

/**
 * @param {Object} opts {
 *     {Number} x
 *     {Number} y
 *     {Number} radius
 *     {Number} start
 *     {Number} end
 *     {String} color
 *     {Number} opacity
 *     {Boolean} clockwise
 * }
 */
exports.arc = function (opts) {
    opts = _.defaults(opts, {x: 0, y: 0, start: 0, end: Math.PI * 2,
                             clockwise: true});

    var geometry = new THREE.Geometry(),
        arc = new THREE.ArcCurve(opts.x, opts.y, opts.radius, opts.start,
                                 opts.end, opts.clockwise);

    // calculate circumfrence!
    var segments = Math.ceil((Math.PI * opts.radius * 2) *
                             (Math.abs(opts.start - opts.end) /
                             (Math.PI * 2)) / 3);

    geometry.vertices = arc.getPoints(segments).map(function (point) {
        return new THREE.Vector3(point.x, point.y, 0);
    });

    return new THREE.Line(geometry, new THREE.LineBasicMaterial({
        color: opts.color,
        opacity: opts.opacity
    }));
};

/* rewrite these functions */
function hueToRgb(m1, m2, hue) {
    if (hue < 0) {
        hue += 1;
    } else if (hue > 1) {
        hue -= 1;
    }

    var v = 6 * hue < 1 ? m1 + (m2 - m1) * hue * 6 :
            2 * hue < 1 ? m2 :
                    3 * hue < 2 ? m1 + (m2 - m1) * (2 / 3 - hue) * 6 :
                            m1;

    return 255 * v;
}

exports.hueToRgb = hueToRgb;

exports.hslToRgb = function (h, s, l) {
    var rgb, r, g, b, m1, m2, hue;

    s /= 100;
    l /= 100;

    if (s === 0) {
        r = g = b = (l * 255);
    } else {
        m2 = l <= 0.5 ? l * (s + 1) :
                l + s - l * s;
        m1 = l * 2 - m2;
        hue = h / 360;
        r = hueToRgb(m1, m2, hue + 1 / 3);
        g = hueToRgb(m1, m2, hue);
        b = hueToRgb(m1, m2, hue - 1 / 3);
    }

    /*jslint bitwise: true */
    rgb = b | (g << 8) | (r << 16);

    return rgb;
}
