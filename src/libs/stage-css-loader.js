var css = require('css');
module.exports = function (source, map) {
    // var ast = css.parse(source);
    var ast=css.parse(source);

    for(var i=0;i<ast.stylesheet.rules.length;i++){
        // console.log('ast',i,ast.stylesheet.rules[i])
        var selectors = ast.stylesheet.rules[i].selectors;
        for(var j=0;j<selectors.length;j++){
            selectors[j]='#wys_stageCss_hook '+selectors[j];
        }
    }
    var result = css.stringify(ast,{ sourcemap: true });
    this.callback(null, 'module.exports = function(Component) {Component.options.wys_stageCss = ' +
        JSON.stringify(result.code) +
        '}', map);
};
