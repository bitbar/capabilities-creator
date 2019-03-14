<template>
    <div id="codeEditor">
        <codemirror v-model="capabilities" :options="cmOptions" />
        <div class="alert-box hidden">
            <span class="alert-text">Code was copied to clipboard</span>
        </div>
        <div class="lang-container">
            <select v-model="currentLang" class="lang-select">
                <option v-for="lang in languages" :value="lang.value">

                    <span>{{ lang.icon }} &nbsp;{{ lang.name }}</span>
                </option>
            </select>
        </div>
        <div class="editor-buttons">
            <button class="btn btn-copy" @click="copyToClipboard" :data-clipboard-text="capabilities">
                <i class="far fa-copy"></i>
            </button>
            <button class="btn btn-download" @click="downloadZipFile">
                <i class="fas fa-download"></i>
            </button>
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
    import JSZip from 'jszip';
    import FileSaver from 'file-saver';
    export default {
        name: "CodeEditor",
        props: ['capabilities'],
        components: {
            codemirror, ClipboardJS
        },
        data () {
            return {
                languages: [
                    { name: 'Java', value: 'java', icon: ''},
                    { name: 'Python', value: 'python', icon: '' },
                    { name: 'Ruby', value: 'ruby'},
                    { name: 'NodeJS', value: 'nodeJs', icon: '' },
                    { name: 'C#', value: 'C#'},
                    { name: 'PHP', value: 'php', icon: '' }
                ],
                currentLang: 'java',
                cmOptions: {
                    tabSize: 4,
                    mode: 'text/x-java',
                    theme: 'dracula',
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
                let alertBox = document.querySelector('.alert-box');
                alertBox.classList.remove('hidden');
                setTimeout(() => {
                    alertBox.classList.add('hidden');
                }, 2000)
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
            },
            downloadZipFile() {
                let zip = new JSZip();
                zip.file(this.currentLang+"_test.txt", i18n('SAMPLE_TEST',undefined, {x: this.capabilities}, {language: this.currentLang}));
                zip.generateAsync({type: "blob"}).then((content) => {
                    FileSaver.saveAs(content, "download.zip");
                });
            }
        }
    }
</script>

<style scoped>

</style>