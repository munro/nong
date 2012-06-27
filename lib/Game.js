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

        size = 5;
        ball = new THREE.CubeGeometry(size, size, size);


        var material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

        self.ball = new THREE.Mesh(ball, material);
        //scene.add( mesh );

//        self.ball = new THREE.Line(ball, new THREE.LineBasicMaterial({
//            color: 0xffffff
//        }));o


        self.engine.scene.add(self.circle);

        self.engine.scene.add(self.ball);
        var negate = false;


        var rotation_matrix = new THREE.Matrix4().rotateY(0.01).rotateX(0.01).rotateZ(0.02);
        //self.ball.matrix.multiplySelf(rotation_matrix);
        //self.ball.rotation.set(Math.PI/2, Math.PI/4, Math.PI/4);
        //self.ball.rotation.setRotationFromMatrix(self.mesh.matrix);


        var circle_move = new THREE.Vector3(0.5, 0.5, 0).multiplyScalar(35),
            circle_rotate = new THREE.Vector3(0, 0, 1).multiplyScalar(1.5);

        self.engine.on('render', function (delta) {
            var move = circle_move.clone().multiplyScalar(delta);

            if (self.ball.position.distanceTo(new THREE.Vector3(0, 0, 0)) >= (40 - size) && !negate) {
                circle_move.negate();
                negate = true;
                /* so lame */
                setTimeout(function () {
                    negate = false;
                }, 1000);
            }

            self.ball.position.addSelf(circle_move.clone().multiplyScalar(delta));
            self.ball.rotation.addSelf(circle_rotate.clone().multiplyScalar(delta));
        });
    }
});
