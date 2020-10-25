<template>
  <div>
      <button @click="goBack">Back</button>
    HelpLine
  </div>
</template>

<script>

export default {
  name: 'HelpLine',
  methods: {
      goBack() {
          this.$router.push({name: "Home"});
      }
  }
}
</script>
