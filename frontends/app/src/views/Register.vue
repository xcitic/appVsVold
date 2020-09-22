<template>
  <div class="container">
    <div class="heading">
      Lag ny bruker
    </div> 
    <form class="register-form">
      <input type="text" v-model="username" placeholder="Epost"/>
      <input type="password" v-model="password" placeholder="Passord" />
      <input type="password-repeat" placeholder="Gjenta passord" />

      <button class="btn-main" @click.prevent="submitForm">Lag ny bruker</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async submitForm() {
      const payload = {
        username: this.username,
        password: this.password
      }
      try {
        await this.$store.dispatch("userRegister", payload);
        this.$router.push({name: "Home"});
      } catch (e) {
        alert(e);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles.scss';

  .container {
    display: flex;
    flex-direction: column;
  }

  .register-form {
    flex: auto;
    display: flex;
    flex-direction: column;
  }
</style>
