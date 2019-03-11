<template>
    <div class="full-width center-content">
        <props-setter @capability="setCapabilities" :language="language"></props-setter>
        <code-editor @currentLang="changeLanguage" :capabilities="capabilities"></code-editor>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                language: 'java',
                capabilities: null
            }
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
