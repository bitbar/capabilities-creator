<template>
    <div>
        <textarea>
            some code
        </textarea>
        <div>
            <select v-model="currentLang">
                <option disabled value="">Select a language</option>
                <option v-for="lang in languages" :value="lang.value">{{ lang.name }}</option>
            </select>
        </div>
        <button>Copy to clipboard</button>
    </div>
</template>

<script>
    export default {
        name: "CodeEditor",
        data () {
            return {
                languages: [
                    { name: 'Java', value: 'java' },
                    { name: 'Python', value: 'python' },
                    { name: 'Ruby', value: 'ruby' },
                    { name: 'Perl', value: 'perl' }
                ],
                currentLang: ''
            }
        }
    }
</script>

<style scoped>

</style>