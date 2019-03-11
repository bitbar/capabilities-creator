<template>
    <div id="codeEditor">
        <div>
            <select v-model="currentLang">
                <option v-for="lang in languages" :value="lang.value">{{ lang.name }}</option>
            </select>
        </div>
        <codemirror v-model="capabilities" :options="cmOptions"/>
        <div class="buttons">
            <button class="btn-copy" @click="copyToClipboard" :data-clipboard-text="capabilities">
                Copy code</button>
        </div>
    </div>
</template>

<script>
    import { codemirror } from 'vue-codemirror'
    import javascript from './../node_modules/codemirror/mode/javascript/javascript'
    import php from './../node_modules/codemirror/mode/php/php'
    import python from './../node_modules/codemirror/mode/python/python'
    import ruby from './../node_modules/codemirror/mode/ruby/ruby'
    import clike from './../node_modules/codemirror/mode/clike/clike'
    import ClipboardJS from './../node_modules/clipboard'

    export default {
        name: "CodeEditor",
        props: ['capabilities'],
        components: {
            codemirror, ClipboardJS
        },
        data () {
            return {
                languages: [
                    { name: 'Java', value: 'java' },
                    { name: 'Python', value: 'python' },
                    { name: 'Ruby', value: 'ruby' },
                    { name: 'NodeJS', value: 'nodeJs' },
                    { name: 'C#', value: 'C#' },
                    { name: 'PHP', value: 'php' }
                ],
                currentLang: 'java',
                cmOptions: {
                    tabSize: 4,
                    mode: 'text/x-java',
                    theme: 'mdn-like',
                    lineNumbers: true,
                    line: true,
                }
            }
        },
        watch: {
            currentLang(lang) {
                this.$emit("currentLang", lang);
                this.setMode(lang);
            }
        },
        methods: {
            copyToClipboard() {
                new ClipboardJS('.btn-copy');
            },
            setMode(lang){
                let mode;
                switch (lang) {
                    case 'java':
                        mode = 'text/x-java';
                        break;
                    case 'python':
                        mode = 'text/x-python';
                        break;
                    case 'ruby':
                        mode = 'text/x-ruby';
                        break;
                    case 'C#':
                        mode = 'text/x-csharp';
                        break;
                    case 'php':
                        mode = 'text/x-php';
                        break;
                    case 'nodeJs':
                        mode = 'text/javascript';
                        break;
                }
                this.cmOptions.mode = mode;
            }
        }
    }
</script>

<style scoped>

</style>