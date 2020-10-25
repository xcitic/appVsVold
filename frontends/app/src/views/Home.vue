<template>
  <div>
    <div v-show="firstTimeVisit">
      <FirstTimeVisit />
    </div>
    
    <div>
      <button @click="goToLogg">Logg</button>
    </div>

    <div>
      <button @click="goToHelpLine">Les mer</button>
    </div>


  </div>
</template>

<script>
import FirstTimeVisit from '../components/FirstTimeVisit.vue';

export default {
  name: 'Home',
  components: {FirstTimeVisit},
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
