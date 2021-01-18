<template>
  <div>
     <NavBar />
    HelpLine
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
  name: 'HelpLine',
  components: {NavBar},
  methods: {
      goBack() {
          this.$router.push({name: "Home"});
      }
  }
}
</script>
