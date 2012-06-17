/*jslint newcap: true */

'use strict';

var Self = require('self');

module.exports = Self({
    /**
     * @param self
     * @param {Object} opts {
     *     scene
     * }
     */
    initialize: function (self, opts) {
        self.scene = opts.scene;
        self.game = opts.game;
    }
});
