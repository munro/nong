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
