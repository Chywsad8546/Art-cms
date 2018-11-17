module.exports = function (source, map) {
    this.callback(null, 'module.exports = function(Component) {Component.options.wys_stageJsWys = ' +
        JSON.stringify(source) +
        '}', map);
};
