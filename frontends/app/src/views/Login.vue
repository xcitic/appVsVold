<template>
  <div class="container">
    <div class="logo">
      LOGO
    </div>

    <form>
      <input type="text" name="username" v-model="username"/>
      <input type="password" name="password" v-model="password" />
      <button type="submit" @click.prevent="submitForm" />
    </form>

  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  methods: {
    async submitForm() {
      const credentials = {
        username: this.username,
        password: this.password
      }
      try {
        await this.$store.dispatch('userLogin', credentials);
        this.$router.push({name: 'Home'});
      } catch (e) {
        alert(e);
      }
    }
  }
}
</script>

<style scoped>
  .container {
    display: flex;
    flex-direction: column;
  }
</style>