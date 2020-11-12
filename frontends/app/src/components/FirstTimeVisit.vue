<template>
  <div class="first-time-visit">
    <p class="text">
      First time your visiting, you'll see this :)
    </p>
    <button @click.prevent="hasVisited" class="btn-main">Lukk</button>
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
  import '../assets/styles.scss';

  .first-time-visit {
    z-index: 99;
    display: flex;
    flex-direction: column;
    .text {
      font-weight: 500;
      font-size: 2rem;
    }


  }
</style>
