/*jslint node: true, nomen: true, vars: true */

'use strict';

var fs = require('fs'),
    path = require('path'),
    connect = require('connect'),
    browserify = require('browserify');

/**
 * Create the HTTP server.
 */
var server = connect.createServer();

/**
 * Browserify—bundles the client side JavaScript & templates
 */
server.use(browserify({
    mount: '/game.js',
    require: {
        //backbone: 'backbone',
        underscore: 'underscore'
        //jquery: 'jquery-browserify'
    },
    watch: true
}).addEntry(
    path.resolve(path.join('lib', 'index.js'))
));

/**
 * Load the static files.
 */
server.use(connect['static'](path.resolve('public')));

/**
 * Run the front end application.
 */
server.use(function (req, res) {
    res.end('not found');
});

/**
 * Start the HTTP server.
 */
server.listen(process.env.PORT || 1337);
