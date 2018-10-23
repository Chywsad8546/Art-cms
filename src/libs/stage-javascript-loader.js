module.exports = function (source, map) {
    this.callback(null, 'module.exports = function(Component) {Component.options.wys_stageJavascript = ' +
        JSON.stringify(source) +
        '}', map);
};
