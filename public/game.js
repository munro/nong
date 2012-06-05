/*jslint browser: true, newcap: true, nomen: true, newcap: true, vars: true */
/*global THREE, Self, _, StateGraph, EventEmitter, requestAnimationFrame */

(function () {
    'use strict';

    /**
     * @module screen
     */
    var engine = (function (engine) {
        var container = document.createElement('div');
        document.body.appendChild(container);

        var camera = new THREE.PerspectiveCamera(75,
            window.innerWidth / window.innerHeight, 1, 10000);

        camera.position.z = 100;

        var scene = new THREE.Scene();

        scene.add(camera);

        var renderer = new THREE.CanvasRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        window.addEventListener('resize', function () {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }, false);

        container.appendChild(renderer.domElement);

        // particles

        var geometry = new THREE.Geometry();

        //geometry.vertices.push(particle.position);

        // lines

        var line = new THREE.Line(geometry, new THREE.LineBasicMaterial({
            color: 0xffffff,
            opacity: 0.5
        }));

        scene.add(line);

        function render() {
            engine.emit('render');
            //camera.position.x += (-camera.position.x) * 0.05;
            //camera.position.y += (200 - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        }

        function animate() {

            requestAnimationFrame(animate);

            render();
        }

        animate();

        return engine;
    }(new EventEmitter()));

    /**
     * @constructor player Player
     * @inherit EventEmitter
     */
    var Game = Self(EventEmitter, {
        initialize: function (self) {
            engine.on('render', _.bind(self.draw, self));
        },
        draw: function (self) {
        }
    });

//    var Player = Self({
//        initialize: function (self, opts) {
//            _.extend(self, opts);
//        }
//    });
//
//    var CircleView = Self({
//        setPlayers: function (self, player) {
//            if (self.slots) {
//                self.slots.remove();
//            }
//
//            self.lines.remove();
//
//            _.each(players, function (player) {
//                player.on('move', function () {
//                }).addTo(self.slots);
//            });
//        }
//    });
//
//    var paper = Raphael(0, 0, 320, 200);
//
//    function getPoints(players) {
//        var step = (Math.PI * 2) / players.length, seg = 0;
//        return _.map(players, function (player) {
//            return _.extend({
//                seg: [
//                    [Math.cos(seg) * 90 + 100, Math.sin(seg) * 90 + 100],
//                    [Math.cos(seg += step) * 90 + 100, Math.sin(seg) * 90 + 100]
//                ]
//            }, player);
//        });
//    }
//    console.log(getPoints(players));
//
//
//    paper.createPath = function (a, b) {
//        return this.path('M' + a[0] + ',' + a[1] + 'L' + b[0] + ',' + b[1]);
//    };
//    function draw(players) {
//        paper.clear();
//
//        var count = 1;
//        _.each(getPoints(players), function (player) {
//            paper.createPath(player.seg[0], player.seg[1]).attr({
//                stroke: player.color,
//                'stroke-width': 5,
//                'stroke-linecap': 'round'
//            });
//            count += 1;
//        });
//    }
//
//    draw(players);
//
//
//    /**
//     * @constructor player Player
//     * @inherit EventEmitter
//     */
//    var Player = Self(EventEmitter, {
//        initialize: function (self) {
//            EventEmitter.call(self);
//
//            /**
//             * Logic for a player in a @stategraph{game}.
//             *
//             * @stategraph player Player
//             */
//            self.graph = StateGraph();
//
//            /**
//             * Waiting for the next round.
//             *
//             * @state player wait Wait
//             * @next alive
//             */
//            self.graph.state('wait', function (wait) {
//            }).on('leave', function (wait) {
//            });
//
//            self.graph.state('alive', function (alive) {
//            }).on('leave', function (alive) {
//            });
//
//            self.graph.state('dying', function (dying) {
//            }).on('leave', function (dying) {
//            });
//        }
//    });
}());
