/*jslint newcap: true, nomen: true, vars: true */
/*global THREE */

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

        var ball = new THREE.Geometry();
        var size = 1;
        ball.vertices.push(new THREE.Vector3(-size, -size, 0));
        ball.vertices.push(new THREE.Vector3(-size, size, 0));
        ball.vertices.push(new THREE.Vector3(size, size, 0));
        ball.vertices.push(new THREE.Vector3(size, -size, 0));
        ball.vertices.push(new THREE.Vector3(-size, -size, 0));

        self.ball = new THREE.Line(ball, new THREE.LineBasicMaterial({
            color: 0xffffff
        }));

        var circle_center = new THREE.Vector3(0, 0, 0),
            circle_move = new THREE.Vector3(0.5, 0.5, 0);

        self.engine.scene.add(self.circle);

        self.engine.scene.add(self.ball);
        var negate = false;

        self.engine.on('render', function (delta) {
            var move = circle_move.clone().multiplyScalar(delta);

            circle_center.addSelf(circle_move);

            if (circle_center.distanceTo(new THREE.Vector3(0, 0, 0)) >= (40 - size) && !negate) {
                circle_move.negate();
                negate = true;
                /* so lame */
                setTimeout(function () {
                    negate = false;
                }, 1000);
            }

            self.ball.applyMatrix((new THREE.Matrix4()).translate(circle_move));
        });
    }
});
