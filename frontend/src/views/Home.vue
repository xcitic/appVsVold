<template>
  <div>
    <NavBar />
    <div v-show="firstTimeVisit">
      <FirstTimeVisit />
    </div>
    
    <div class="border-container log-container">
      <div class="log-button-main">
        <button class="btn-main" @click="goToLogg">Logg</button>
      </div>
    </div>

    <div class="border-container help-container">
      <h1 class="help-container-heading">Hjelpelinje og informasjon</h1>
      <p class="help-container-text">
        List over viktige nummer, relevante artikler og mer informasjon om ressurser man kan benytte seg av.
      </p>
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

<style scoped lang="scss">
  .log-container {
    height: 20vh;
  }

  .help-container {
    margin-top: 2rem;
    height: 50vh;
    justify-content: flex-start;
    padding-top: 2rem;

    &-heading {
      font-size: 2rem;
    }
    
  }
</style>
