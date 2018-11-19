const _ = require('lodash')
module.exports = function (source, map) {
    this.callback(null, 'module.exports = function(Component) {Component.options.wys_stageCss_import = Component.options.wys_stageCss_import || [];' +
        'Component.options.wys_stageCss_import.push(' +
        JSON.stringify(_.trim(source)) +
        ');}', map);
};
