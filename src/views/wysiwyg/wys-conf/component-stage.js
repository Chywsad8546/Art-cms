import _ from 'lodash'
export default {
    components: [],
    render:function (data, wsytemplate) {

        var html = template.render(_.trim(wsytemplate), data);
        console.log('render',html)
    }
};
