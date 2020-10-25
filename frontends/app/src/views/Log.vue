<template>
  <div>
      <NavBar />
      Log
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'Log',
  components: {NavBar},
  methods: {
      goBack() {
          this.$router.push({name: "Home"});
      }
  }
}
</script>
