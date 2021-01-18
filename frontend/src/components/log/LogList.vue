<template>
    <div class="border-container">
        <p class="heading">
            Liste over loggføringer 
        </p>
        <div class="logitem" v-for="(log, index) in previousLogs" :key="index" @click="openLog(log)">
            <p class="date">Dato: {{ new Date(log.date).toLocaleDateString() }}</p>
            <p class="title">{{ log.title }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: "LogList",
    mounted() {
        if (this.previousLogs.length == 0) {
            this.$store.dispatch('getAllLogs');
        }
    },
    computed: {
        previousLogs() {
            return this.$store.state.logs
        }
    },
    methods: {
        async openLog(log) {
            await this.$store.dispatch('setViewingLog', log);
            this.$router.push({name: 'ViewLog', params: {id: log.id}});
        }
    }
}
</script>
<style lang="scss" scoped>
    .heading {
        color: grey;
    }
    .logitem {
        display: flex;
        flex-direction: row;
        border: 1px solid grey;
        width: 75%;
        margin-bottom: 1rem;

        p {
            margin-right: 2rem;
            margin-left: 2rem;
        }
    }
</style>