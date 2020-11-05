<template>
    <div class="navbar">
        <Settings v-if="mainPage"></Settings>
        <div v-else @click="goBack">
            <svg style="width:4rem;height:4rem" viewBox="0 0 24 24">
                <path fill="currentColor" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z" />
            </svg>
        </div>
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
          this.$router.back();
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
    