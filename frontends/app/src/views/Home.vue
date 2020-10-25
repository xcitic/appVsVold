<template>
  <div>
    <NavBar />
    <div v-show="firstTimeVisit">
      <FirstTimeVisit />
    </div>
    
    <div class="log-container">
      <button class="btn-main" @click="goToLogg">Logg</button>
    </div>

    <div class="information-container">
      <button class="btn-main" @click="goToHelpLine">Les mer</button>
    </div>


  </div>
</template>

<script>
import FirstTimeVisit from '../components/FirstTimeVisit.vue';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'Home',
  components: {FirstTimeVisit, NavBar},
  computed: {
    firstTimeVisit() {
      return this.$store.state.firstTimeVisit;
    }
  },
  methods: {
    goToLogg() {
      this.$router.push({name: "Log"});
    },
    goToHelpLine() {
      this.$router.push({name: "HelpLine"});
    }
  }
}
</script>

<style lang="scss">
  .log-container {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid grey;
    height: 20vh;
  }
</style>
