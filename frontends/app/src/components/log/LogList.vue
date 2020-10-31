<template>
    <div class="border-container">
        <p class="heading">
            Liste over loggføringer 
        </p>
        <div class="logitem" v-for="(log, index) in previousLogs" :key="index" @click="openLog(index)">
            <p class="date">Dato: {{ log.date }}</p>
            <p class="title">{{ log.title }}</p>
        </div>
    </div>
</template>
<script>
export default {
    name: "LogList",
    data() {
        return {
            previousLogs: [
                {
                    date: new Date(),
                    title: 'Log title 1'
                },
                {
                    date: new Date(),
                    title: 'Log title 2, Log title 2'
                },
                {
                    date: new Date(),
                    title: 'Log title 3'
                },
            ]
        }
    },
    methods: {
        openLog(index) {
            this.$router.push({name: 'ViewLog', params: {log: this.previousLogs[index]}});
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