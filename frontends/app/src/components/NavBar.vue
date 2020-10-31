<template>
    <div class="navbar">
        <Settings v-if="mainPage"></Settings>
        <div v-else @click="goBack">GoBack</div>
    </div>
</template>

<script>
import Settings from "@/components/Settings.vue";

export default {
    name: "NavBar",
    components: {Settings},
    computed: {
        mainPage() {
            return this.$route.name == "Home";
        }
    },
    methods: {
        goBack() {
          this.$router.push({name: "Home"});
      }
    }
}
</script>

<style lang="scss" scoped>
    .navbar {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 1rem;
    }
</style>
    