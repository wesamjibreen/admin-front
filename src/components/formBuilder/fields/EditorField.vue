<template>
    <div class="content">
        <CKEditor
                v-model="input"
                :editor="ClassicEditor"
                :config="config"
        ></CKEditor>
    </div>
</template>
<style>
    .ck-editor__editable {
        min-height: 250px;
    }
</style>
<script>
    import {ref} from 'vue'
    import CKE from '@ckeditor/ckeditor5-vue'
    import input from "../mixins/input"
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic'

    const CKEditor = CKE.component
    const editorData = ref(`<h2>Your HTML Content</h2>`)
    const config = {
        fontFamily: {
            options: ['"Montserrat"', 'sans-serif', "Roboto", 'sans-serif'],
        },
    };
    export default {
        mixins: [input],
        data() {
            return {
                ClassicEditor
            }
        },
        components: {
            CKEditor
        }
    }
</script>

