/*jslint newcap: true, vars: true */
/*global THREE */

'use strict';

var Self = require('self');

var util = require('./util');

module.exports = Self({
    /**
     * @param self
     * @param {Object} opts {
     *     {Engine} engine
     * }
     */
    initialize: function (self, opts) {
        self.engine = opts.engine;
        self.game = opts.game;
        self.start = opts.start;
        self.end = opts.end;

        console.log('range', self.start, self.end);

        var len = Math.abs(opts.end - opts.start),
            offset = Math.random() * len * 3 / 4;

        offset = 0;

        self.paddle = util.arc({
            radius: 48, //Math.random() * 50 + 10,
            color: util.hslToRgb(Math.random() * 360, 100, 50),
            start: self.start + offset,
            end: self.start + offset + (len / 4)
        });

        var speed = Math.random() * 1.5 + 0.5;

        self.engine.scene.add(self.paddle);
        self.engine.on('render', function (delta) {
            self.paddle.applyMatrix(
                (new THREE.Matrix4()).makeRotationZ(delta * speed)
            );
        });
    }
});
