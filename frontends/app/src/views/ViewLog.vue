<template>
    <div>
        <NavBar />
        <div class="border-container create-log">
            <input type="text" class="title" v-model="log.title" placeholder="Tittel" disabled>
            <textarea name="description" v-model="log.description" cols="30" rows="10" placeholder="Beskriv hendelsen" class="description" disabled></textarea>
            <textarea name="description" v-model="comment" cols="30" rows="10" placeholder="legg til en kommentar til loggføringen" class="description"></textarea>
            <div class="viewlog__footer">
                <div class="files">
                    <p>Filer:</p>
                    <p class="uploadedFile" v-for="(file, index) in log.files" :key="index" @click="downloadFile(file.id)">{{`File ${index+1}: ${file.name}`}}</p>
                    
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
    props: {
        log: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            comment: '',
            hasBeenSubmitted: false
        }
    },
    methods: {
        async saveComment() {
            this.hasBeenSubmitted = true;
            console.log(this.comment);
            this.hasBeenSubmitted = false;
        },
        async downloadFile(file) {
            try { 
                const downloadedFile = await fileService.getFileFromAWS(this.log.id, file.id);
                console.log(downloadedFile);
                const tag = document.createElement("a");
                // tag.style.display = "none";
                document.body.appendChild(tag);
                tag.style.display = "none";
                const blob = new Blob([downloadedFile.file], {type: downloadedFile.type});
                const url = window.URL.createObjectURL(blob);
                tag.href = url;
                tag.download = "name.pdf";
                tag.click();

                setTimeout(() => {
                  window.URL.revokeObjectURL(tag.href);
                  document.body.removeChild(tag);
                }, 500);


                // const reader = new FileReader();
                // reader.readAsDataURL(blob);

                // reader.onload = () => {
                //     tag.href = reader.result;
                //     tag.click()
                // }
                

            } catch (e) {
                this.$toasted.error("Klarte ikke å laste ned filen. Prøv igjen");
            }
            // get file by filename
            // send request to backend
            // backend checks if the file belongs to the user asking for it
            // if yes the file gets sent to the frontend
            // turn the byte array into a file and trigger browser download
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
