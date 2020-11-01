<template>
  <div class="container">
    <div class="border-container heading">
      Lag ny bruker
    </div> 
    <form class="register-form">
      <input type="text" v-model="username" placeholder="Epost"/>
      <input type="password" v-model="password" placeholder="Passord" />
      <input type="password" v-model="passwordRepeat" placeholder="Gjenta passord" />

      <button class="btn-main" @click.prevent="submitForm" :disabled="hasBeenSubmitted">Lag ny bruker</button>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      passwordRepeat: '',
      hasBeenSubmitted: false
    }
  },
  methods: {
    async submitForm() {
      this.hasBeenSubmitted = true;
      if (!this.checkIfPasswordMatch()) {
        this.$toasted.error('Passordene er ikke like');
        this.hasBeenSubmitted = false;
        return;
      }
      const payload = {
        username: this.username,
        password: this.password
      }
      try {
        await this.$store.dispatch("userRegister", payload);
        this.$toasted.success('Du har blitt registert.')
        this.$router.push({name: "Home"});
      } catch (e) {
        this.$toasted.error('Noe gikk galt. Prøv igjen.');
        this.hasBeenSubmitted = false;
      }
    },
    checkIfPasswordMatch() {
      return this.password === this.passwordRepeat
    }
  }
}
</script>

<style lang="scss" scoped>

  .heading {
    width: 20vw;
    height: 5rem;
    margin-bottom: 1rem;
  }

  .register-form {
    flex: auto;
    display: flex;
    flex-direction: column;

    input {
      margin-top: 1rem;
      padding: .5rem .15rem;
      font-size: 1.4rem;
    }
  }
</style>
