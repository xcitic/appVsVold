<template>
  <div>
    Log
  </div>
</template>

<script>

export default {
  name: 'Log',
  async created() {
    await this.$store.dispatch('getLogs');
  },
  computed: {
    logs() {
      return this.$store.state.logs
    }
  }
}
</script>
