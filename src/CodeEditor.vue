<template>
    <div>
        <textarea>
            some code
        </textarea>
        <lang-switch></lang-switch>
        <button>Copy to clipboard</button>
    </div>
</template>

<script>
    import LangSwitch from './LangSwitch.vue'
    export default {
        name: "CodeEditor",
        components: {
            'lang-switch': LangSwitch
        }
    }
</script>

<style scoped>

</style>