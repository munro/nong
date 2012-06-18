/*jslint newcap: true */

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

        self.paddle = util.arc({
            radius: 40, // Math.random() * 10 + 30,
            color: util.hslToRgb(Math.random() * 360, 100, 50),
            start: self.start,
            end: self.end
        });

        self.engine.scene.add(self.paddle);
    }
});
