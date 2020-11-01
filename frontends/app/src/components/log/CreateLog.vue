<template>
    <div>
        <div class="border-container create-log">
            <input type="text" class="title" v-model="title" placeholder="Tittel">
            <textarea name="description" v-model="description" cols="30" rows="10" placeholder="Beskriv hendelsen" class="description"></textarea>
            
            <div class="add-items-container">
                <div class="add-items-button">
                    Legg til en fil
                </div>
                <div class="add-items-button">
                    Spørreskjema
                </div>
            </div>

            <button class="btn-main save-log" @click="saveLog" :disabled="hasBeenSubmitted">
                Lagre
            </button>

        </div>
    </div>
</template>
<script>
export default {
    name: "CreateLog",
    data() {
        return {
            title: '',
            description: '',
            files: [],
            questionair: null,
            date: new Date(),
            hasBeenSubmitted: false
        }
    },

    methods: {
        async saveLog() {
            this.hasBeenSubmitted = true;
            const payload = {
                title: this.title,
                description: this.description,
                files: this.files,
                date: this.date
            }
            try {
                this.$store.dispatch("saveLog", payload);
                this.$toasted.success("Logføring lagret");
                this.resetForm();
            } catch (err) {
                this.$toasted.error('Noe gikk galt. Prøv igjen.');
            }
        },

        resetForm() {
            this.title = '';
            this.description = '';
            this.questionair = null;
            this.date = new Date();
            this.hasBeenSubmitted = false
        },
    }
}
</script>
<style lang="scss" scoped>
    .create-log {
        padding-top: 2rem;
        padding-bottom: 2rem;
        display: flex;
        margin-bottom: 2rem;
    }
    .title {
        width: 75%;
        margin-bottom: 1rem;
        padding: 1rem;
    }

    .description {
        width: 75%;
        margin-bottom: 1rem;
        padding: 1rem;
    }

    .add-items-container {
        width: 75%;
        display: flex;
        flex-direction: row;
       

        .add-items-button {
            flex: 1;
            border: 1px solid grey;
            padding: 1rem;
            cursor: pointer;
        
            &:first-child {
                margin-right: 1.5rem;
            }
        }
    }

    .save-log {
        width: 30%;
    }



</style>