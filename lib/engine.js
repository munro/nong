/*jslint browser: true, newcap: true, nomen: true, vars: true */
/*global THREE, requestAnimationFrame */

'use strict';

var _ = require('underscore'),
    EventEmitter = require('events').EventEmitter;

module.exports = (function (engine) {
    var container = document.getElementById('rwar');

    //var renderer = new THREE.WebGLRenderer();
    var renderer = new THREE.CanvasRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    var camera = new THREE.PerspectiveCamera(45,
        window.innerWidth / window.innerHeight, 1, 500);

    camera.position.set(0, 0, 140);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    var scene = new THREE.Scene();

    scene.add(camera);

    var material = new THREE.LineBasicMaterial({
        color: 0x00ffff
    });

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
    geometry.vertices.push(new THREE.Vector3(0, 10, 0));
    geometry.vertices.push(new THREE.Vector3(10, 0, 0));

    var line = new THREE.Line(geometry, material);

    scene.add(line);

    var lastTime = (new Date()).getTime();

    function render() {
        var time = (new Date()).getTime();
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);

        engine.emit('render', (time - lastTime) / 1000);
        lastTime = time;

        renderer.render(scene, camera);
    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    animate();

    return _.extend(engine, {
        scene: scene
    });
}(new EventEmitter()));
