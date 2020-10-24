<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "App",
    async mounted() {
      await this.$store.dispatch("checkAuthentication");
    }
  }
</script>

<style lang="scss">
@import './assets/styles.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
