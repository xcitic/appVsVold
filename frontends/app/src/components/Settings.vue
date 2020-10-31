<template>
    <div class="settings">
        <div v-if="!isSettingsOpen" >
            <svg @click="toggleSettingsBar" xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" class="settingsIcon"><g><path d="M0,0h24v24H0V0z" fill="none"/><path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/></g></svg>
        </div>
        <div v-else class="settingsDropDown">
            <div class="settingsbar__heading">
                <svg @click="toggleSettingsBar" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="settingsIcon"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                <div class="settingsbar__heading--text">Innstillinger</div>
            </div>

            <div class="settingsbar__list">
                <div class="settingsbar__section">
                    <span class="icon"></span>
                    <p class="text">Min konto</p>
                </div>
                <div class="settingsbar__section">
                    <span class="icon"></span>
                    <p class="text">Varsler</p>
                </div>
                <div class="settingsbar__section">
                    <span class="icon"></span>
                    <p class="text">Hjelp</p>
                </div>
                 <div class="settingsbar__section">
                    <span class="icon"></span>
                    <p class="text">Språk</p>
                </div>
                 <div class="settingsbar__section" @click="logout">
                    <span class="icon"></span>
                    <p class="text">Logg ut</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import SettingsIcon from '@/assets/settings-black-48dp.svg';
export default {
    name: "Settings",
    components: {SettingsIcon},
    data() {
        return {
            isSettingsOpen: false
        }
    },
    methods: {
        toggleSettingsBar() {
            this.isSettingsOpen = !this.isSettingsOpen;
        },
        async logout() {
            await this.$store.dispatch("userLogout");
            this.$router.push({name: "Login"})
        }
    }
}
</script>

<style lang="scss">
    .settings {
        height: 4rem;
    }

    .settingsIcon {
        fill: black;
        width: 4rem;
        height: 4rem;
    }
    .settingsDropDown {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        margin-bottom: 1rem;
        position: absolute;
        z-index: 20;
        width: 50vw;
        height: auto;
        border: 1px solid grey;
        background-color: white;
    }

    .settingsbar__heading {
        align-self: flex-start;
        display: flex;
        flex-direction: row;

        &--text {
            margin-left: 3rem;
            align-self: center;
            justify-self: center;
            font-weight: 500;
            font-size: 2rem;
        }
    }

    .settingsbar__list {
        display: flex;
        flex-direction: column;
        .settingsbar__section {
                border: 1px solid grey;
                margin: 1rem;

                .text {
                    font-weight: 600;
                }
        }
    }

    
</style>