<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            theme: this.$store.state.app.themeColor,
        };
    },
    mounted() {
    },
    created() { },
    beforeDestroy() {

    },
    methods: {

    },
    watch: {

    }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  background: #f0f0f0;
  overflow: hidden;
}

.app-main {
  width: 100%;
  height: 100%;
}
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
