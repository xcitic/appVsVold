<template>
  <div class="hello">
    First time your visiting, you'll see this :) 
    <button @click.prevent="hasVisited">Lukk</button>
  </div>
</template>

<script>
export default {
  name: 'FirstTimeVisit',
  methods: {
    hasVisited() {
      this.$store.dispatch('updateHasVisited');
    }
  }
}
</script>

<style scoped lang="scss">

</style>
