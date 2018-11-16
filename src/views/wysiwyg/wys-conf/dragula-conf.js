export default {
    default: {
        isContainer: function (el) {
            if ($(el).is('[wys-container]')) {
                return true;
            }
            return false; // only elements in drake.containers will be taken into account
        },
        moves: function (el, source, handle, sibling) {
            // todo 判断是不是拖拽按钮
            // if($(source).attr('id') != 'wysiwyg_componentbox'){
            //     return $(handle).hasClass('wysiclose');
            // }
            return true; // elements are always draggable by default
        },
        accepts: function (el, target, source, sibling) {
            // console.log($(target).attr("id"))
            if ($(target).attr('id') == 'wysiwyg_componentbox') {
                return false;
            }
            // todo 子容器是否接受这个组件
            // if ($(target).attr('id') == 'qqq') {
            //     return $(el).attr('editorregid')=='wys_link';
            // }


            // console.log(el)
            return true; // elements can be dropped in any of the `containers` by default
        },
        invalid: function (el, handle) {
            return false; // don't prevent any drags from initiating by default
        },
        direction: 'vertical', // Y axis is considered when determining where an element would be dropped
        copy: function (el, source) {
            return $(source).attr('id') == 'wysiwyg_componentbox';
        }, // elements are moved by default, not copied
        copySortSource: false, // elements in copy-source containers can be reordered
        revertOnSpill: false, // spilling will put the element back where it was dragged from, if this is true
        removeOnSpill: false, // spilling will `.remove` the element, if this is true
        mirrorContainer: document.body, // set the element that gets mirror elements appended
        ignoreInputTextSelection: true // allows users to select input text, see details below
    }
};
