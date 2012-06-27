/*jslint browser: true, newcap: true, nomen: true, vars: true */
/*global THREE, requestAnimationFrame */

'use strict';

var _ = require('underscore'),
    EventEmitter = require('events').EventEmitter;

var engine = new EventEmitter();

var container = document.getElementById('rwar');

var renderer = new THREE.WebGLRenderer();
//var renderer = new THREE.CanvasRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(45,
    window.innerWidth / window.innerHeight, 1, 500);

camera.position.set(0, -80, 50);
camera.lookAt(new THREE.Vector3(0, -20, 0));
//camera.position.set(0, 0, 100);
//camera.lookAt(new THREE.Vector3(0, 0, 0));

var scene = new THREE.Scene();

scene.add(camera);

scene.add(new THREE.AmbientLight(0xff0000));

var lastTime = (new Date()).getTime();

function render() {
    var time = (new Date()).getTime();
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    var delta = (time - lastTime) / 1000;

    if (delta > 0.2) {
        delta = 0.2;
    }

    engine.emit('render', delta);
    lastTime = time;

    renderer.render(scene, camera);
}

function animate() {
    requestAnimationFrame(animate);
    render();
}

animate();

module.exports = _.extend(engine, {
    scene: scene
});
