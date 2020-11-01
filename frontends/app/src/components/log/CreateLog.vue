<template>
    <div>
        <div class="border-container create-log">
            <input type="text" class="title" v-model="title" placeholder="Tittel">
            <textarea name="description" v-model="description" cols="30" rows="10" placeholder="Beskriv hendelsen" class="description"></textarea>
            
            <div class="add-items-container">
            
                <Datetime 
                    type="datetime" 
                    v-model="date"
                    placeholder="Velg dato og tidspunkt"
                    zone="Europe/Oslo"
                    :phrases="datePicker.buttons"
                    input-style="flex: 1; padding: 1rem; margin-right: 1.5rem;"
                ></Datetime>

                <div class="add-items-button">
                    Velg sted
                </div>

            </div>
            
            <div class="add-items-container">
                <label for="addFiles" class="add-items-button">Legg til filer</label>
                <input type="file" id="addFiles" style="display: none;" @change="addFiles" multiple >
                    
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
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css';
import { Settings } from 'luxon';
import {fileService} from '@/main.js';

Settings.defaultLocale = 'nb-NO'

export default {
    name: "CreateLog",
    components: {Datetime},
    data() {
        return {
            title: '',
            description: '',
            files: [],
            questionair: null,
            date: null,
            hasBeenSubmitted: false,
            datePicker: {
                buttons: {ok: 'Velg', cancel: 'Avbryt'},
            },
            uploadingFiles: false
        }
    },

    methods: {
        async addFiles(e) {
            const files = e.target.files || e.dataTransfer.files;
            if (files.length > 0) {
                await this.uploadFiles(files)
            }
        },
        async uploadFiles(files) {
            this.uploadingFiles = true;
            try {
                const uploadedFiles = await fileService.uploadFiles(files);
                // for each file get aws link to post the file 
                // on complete add the filelink to the fileobject {name, url, fileType} 
                // push fileobject to files array
                // set is uploading files false
            } catch (e) {
                this.$toasted.error('Noe gikk galt med filopplastingen. Prøv igjen.')

            }
        },
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
            this.date = null;
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
        margin-bottom: 1rem;
       

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