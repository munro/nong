/*jslint newcap: true, nomen: true */

'use strict';

var _ = require('underscore'),
    Self = require('self'),
    EventEmitter = require('events').EventEmitter;

var util = require('./util'),
    Player = require('./Player');

module.exports = Self(EventEmitter, {
    /**
     * @param self
     * @param {Object} opts {
     *     {Engine} engine
     * }
     */
    initialize: function (self, opts) {
        EventEmitter.call(self);

        self.engine = opts.engine;
        //self.players = opts.players;

        var count = 10;
        self.players = _.range(count).map(function (index) {
            return new Player({
                engine: self.engine,
                game: self,
                start: Math.PI * 2 * index / count,
                end: Math.PI * 2 * (index + 1) / count
            });
        });

        console.log('player', self.players);

        //self.engine.on('render', _.bind(self.render, self));

        self.circle = util.arc({
            radius: 50,
            color: 0xff0000
        });

        self.engine.scene.add(self.circle);
    },
    render: function (self, delta) {
    }
});
