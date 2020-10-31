<template>
  <div class="container">
    <div class="logo">
      LOGO
    </div>

    <form class="login-form">
      <input type="text" name="username" v-model="username" placeholder="Brukernavn"/>
      <input type="password" name="password" v-model="password" placeholder="Passord" />
      <button class="btn-main" type="submit" @click.prevent="submitForm" :disabled="hasBeenSubmitted">
        Logg inn
      </button>
    </form>

      <router-link :to="{name: 'Register'}" class="register">Lag ny bruker</router-link>

  </div>
</template>

<script>

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      hasBeenSubmitted: false
    }
  },
  methods: {
    async submitForm() {
      this.hasBeenSubmitted = true;
      const credentials = {
        username: this.username,
        password: this.password
      }
      try {
        await this.$store.dispatch('userLogin', credentials);
        this.$router.push({name: 'Home'});
      } catch (e) {
        alert(e);
        this.hasBeenSubmitted = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .logo {
    flex: auto;
  }
  .login-form {
    flex: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.4rem;


    input {
      margin-top: 1rem;
      padding: .5rem .2rem .5rem 1rem;
      font-size: 1.4rem;
    }
  }
  .register{
    font-size: 1.5rem;
  }
  
</style>