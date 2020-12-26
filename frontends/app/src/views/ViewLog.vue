<template>
    <div>
        <NavBar />
        <div class="border-container create-log" v-if="!isLoading">
            <input type="text" class="title" v-model="log.title" placeholder="Tittel" disabled>
            <textarea name="description" v-model="log.description" cols="30" rows="10" placeholder="Beskriv hendelsen" class="description" disabled></textarea>
            <textarea name="description" v-model="comment" cols="30" rows="10" placeholder="legg til en kommentar til loggføringen" class="description"></textarea>
            <div class="viewlog__footer">
                <div class="files">
                    <p>Filer:</p>
                    <p class="uploadedFile" v-for="(file, index) in log.files" :key="index" @click="downloadFile(file.id, file.name)">{{`File ${index+1}: ${file.name}`}}</p>
                    
                </div>
                <div class="btn-main save-log" @click="saveComment" :disabled="hasBeenSubmitted">
                    Lagre
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import {fileService} from '@/main.js';

export default {
    name: "ViewLog",
    components: {NavBar},
    data() {
        return {
            comment: '',
            hasBeenSubmitted: false,
            isLoading: true
        }
    },
    async mounted() {
        if (!this.log) {
            await this.$store.dispatch('getOneLog', this.$route.params.id);
        }
        this.isLoading = false;
    },
    computed: {
        log() {
            return this.$store.state.viewingLog;
        }
    },
    methods: {
        async saveComment() {
            this.hasBeenSubmitted = true;
            console.log(this.comment);
            this.hasBeenSubmitted = false;
        },
        async downloadFile(fileId, fileName) {
            try { 
                const fileUrl = await fileService.getFileFromAWS(this.log.id, fileId);
                const tag = document.createElement("a");
                tag.style.display = "none";
                document.body.appendChild(tag);
                tag.style.display = "none";
                tag.href = fileUrl;
                tag.download = fileName;
                tag.click();

            } catch (e) {
                this.$toasted.error("Klarte ikke å laste ned filen. Prøv igjen");
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .viewlog__footer {
        margin-left: 25%;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: flex-start;
        
        .files {
            flex: 0 0 30%;
            border: 1px solid grey;
            display: flex;
            flex-direction: column;

        }

        .uploadedFile {
            cursor: pointer;
        }

        .btn-main {
        }

    }
    
</style>