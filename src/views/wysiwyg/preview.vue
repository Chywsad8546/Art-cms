<template>
   <div id="previewId"></div>
</template>
<script>
    import api from '../../api/wysiwyg/main.js';
    import dutil from '../../libs/util.js';
    export default {
        data() {
            return {
            };
        },
        methods: {
            init() {
                api.getDiyWebpages({
                    id:this.$route.query.id
                }).then(response => {
                    console.log(response.data.data[0].html);
                    $("#previewId").html(response.data.data[0].html);
                });
            },
        },
        created() {
            this.init();
        }
    };
</script>

