<template>
  <div>
    <div v-show="firstTimeVisit">
      <FirstTimeVisit />
    </div>
    
    Home


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
  }
}
</script>
