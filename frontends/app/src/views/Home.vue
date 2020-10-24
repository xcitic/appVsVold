<template>
  <div>
    <div v-show="isFirstTimeVisit">
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
  data() {
    return {
      isFirstTimeVisit: false,
    }
  },
  mounted() {
    console.log(this.$store.state)
      this.isFirstTimeVisit = this.$store.state.isFirstTimeVisit
  },
  computed: {
    // isFirstTimeVisit() {
    //   return this.$store.state.isFirstTimeVisit
    // }
  }
}
</script>
