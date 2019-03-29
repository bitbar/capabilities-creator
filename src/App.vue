<template>
    <div class="full-width center-content" id="creatorContent">
        <props-setter class="creator-nav" @capability="setCapabilities" :language="language"></props-setter>
        <code-editor class="creator-editor" @currentLang="changeLanguage" :capabilities="capabilities"></code-editor>
    </div>
</template>

<script>
    import CodeEditor from './CodeEditor.vue'
    import PropertiesSetter from './PropertiesSetter.vue'

    export default {
        data() {
            return {
                language: 'java',
                capabilities: null
            }
        },
        components: {
            'code-editor': CodeEditor,
            'props-setter': PropertiesSetter
        },
        methods: {
            changeLanguage(lang) {
                this.language = lang
            },
            setCapabilities(val) {
                this.capabilities = val
            }
        }
    }
</script>
