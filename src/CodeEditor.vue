<template>
    <div id="codeEditor">
        <nav id="codeEditorNav">
            <ul>
                <li :class="['editor-nav-tab', { 'active': sampleEditor }]" @click="onChangeTab()">Capabilities</li>
                <li v-if="!mode" :class="['editor-nav-tab', { 'active': !sampleEditor }]" @click="onChangeTab()">Full sample</li>
            </ul>
        </nav>

        <codemirror v-if="sampleEditor" v-model="capabilities" :options="cmOptions" />
        <codemirror v-else v-model="script" :options="cmOptions" />
        <div :class="['alert-box', { 'hidden': !isCopied }]" id="alert">
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
            <button v-show="sampleEditor" class="btn btn-copy" @click="copyToClipboard" :data-clipboard-text="capabilities">
                <i class="far fa-copy"></i>
                <span class="btn-title">Copy to clipboard</span>
            </button>
            <button v-show="!mode" class="btn btn-download" @click="downloadZipFile">
                <i class="fas fa-download"></i>
                <span class="btn-title">Download full sample</span>
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
    import i18n from 'roddeh-i18n'

    export default {
        name: "CodeEditor",
        props: ['capabilities', 'mode'],
        components: {
            codemirror, ClipboardJS
        },
        data () {
            return {
                languages: [
                    { name: 'Java', value: 'java'},
                    { name: 'Python', value: 'python'},
                    { name: 'Ruby', value: 'ruby'},
                    { name: 'NodeJS', value: 'nodeJs'},
                    // { name: 'C#', value: 'C#'},
                    // { name: 'PHP', value: 'php'}
                ],
                currentLang: 'java',
                cmOptions: {
                    tabSize: 4,
                    mode: 'text/x-java',
                    theme: 'dracula',
                    lineNumbers: true,
                    line: true,
                },
                isCopied: false,
                extension: 'java',
                script: '',
                sampleEditor: true
            }
        },
        updated() {

            fetch(i18n("SOURCE", undefined, undefined, {language: this.currentLang}))
                .then(function(response) {
                    return response.text();
                }).then((response) => {
                this.script = this.setCapabilities(response);
                return response;
            });
        },
        watch: {
            currentLang(lang) {
                this.$emit("currentLang", lang);
                this.setMode(lang);
            }
        },
        methods: {
            setCapabilities(caps) {
                let reg = new RegExp(i18n('REGEXP', undefined, undefined, {language: this.currentLang}));
                let match = caps.match(reg);
                let str = "";
                let file;
                this.capabilities.split("\n").forEach(function(line, index, arr) {
                    if (index === arr.length - 1 && line === "") { return; }
                    str = str.concat(match[1] + line + '\n');
                });
                file = caps.replace(match[2], str);
                return file;
            },
            copyToClipboard() {
                this.isCopied = true;
                new ClipboardJS('.btn-copy');
                setTimeout(() => {
                    this.isCopied = false
                }, 2000)
            },
            setMode(lang){
                let mode;
                switch (lang) {
                    case 'java':
                        mode = 'text/x-java';
                        this.extension = 'java';
                        break;
                    case 'python':
                        mode = 'text/x-python';
                        this.extension = 'py';
                        break;
                    case 'ruby':
                        mode = 'text/x-ruby';
                        this.extension = 'rb';
                        break;
                    case 'C#':
                        mode = 'text/x-csharp';
                        this.extension = 'cs';
                        break;
                    case 'php':
                        mode = 'text/x-php';
                        this.extension = 'php';
                        break;
                    case 'nodeJs':
                        mode = 'text/javascript';
                        this.extension = 'js';
                        break;
                }
                this.cmOptions.mode = mode;
            },
            fetchAdditionalFile(source) {
                let sample = fetch(i18n(source, undefined, undefined, {language: this.currentLang}))
                    .then(function(response) {
                        return response.text();
                    }).then(function(response) {
                        return response;
                    });
                return sample;
            },
            downloadZipFile() {
                let that = this;
                fetch(i18n('SOURCE', undefined, undefined, {language: that.currentLang}))
                    .then(function(response) {
                        return response.text();
                    })
                    .then(function(response) {
                        let file;
                        let additionalFile = {};
                        let folder;
                        file = that.setCapabilities(response);
                        let zip = new JSZip();
                        folder = zip.folder(that.currentLang + "_sample");

                        switch (that.currentLang) {
                            case 'java':
                                additionalFile.name = 'pom.';
                                additionalFile.source = 'SOURCE_XML';
                                additionalFile.extension = 'xml';
                                break;
                            case 'nodeJs':
                                additionalFile.name = ['package-lock.', 'package.'];
                                additionalFile.source = ['SOURCE_1', 'SOURCE_2'];
                                additionalFile.extension = 'json';
                                break;
                            case 'ruby':
                                additionalFile.name = 'Gemfile';
                                additionalFile.source = 'SOURCE_GEMFILE';
                                additionalFile.extension = '';
                                break;
                        }

                        if (that.currentLang === 'python') {
                            folder.file(that.currentLang+"_sample."+ that.extension, file);
                        }
                        else if (that.currentLang === 'nodeJs') {
                            additionalFile.file1 = that.fetchAdditionalFile(additionalFile.source[0]);
                            additionalFile.file2 = that.fetchAdditionalFile(additionalFile.source[1]);
                            folder.file(that.currentLang+"_sample."+that.extension, file).file(
                                additionalFile.name[0] + additionalFile.extension, additionalFile.file1).file(
                                additionalFile.name[1] + additionalFile.extension, additionalFile.file2);
                        }
                        else if (that.currentLang === 'java') {
                            additionalFile.file = that.fetchAdditionalFile(additionalFile.source);
                            folder.file(additionalFile.name + additionalFile.extension, additionalFile.file);
                            folder.folder("src")
                                .folder("test")
                                .folder("java")
                                .folder("com")
                                .folder("bitbar")
                                .folder("selenium")
                                .file('BitbarSelenium.' + that.extension, file)
                        }
                        else {
                            additionalFile.file = that.fetchAdditionalFile(additionalFile.source);
                            folder
                                .file(that.currentLang+"_sample."+that.extension, file)
                                .file(additionalFile.name + additionalFile.extension, additionalFile.file);
                        }



                        zip.generateAsync({type: "blob"}).then((content) => {
                            FileSaver.saveAs(content, that.currentLang + "Sample.zip");
                        });
                    });

            },
            onChangeTab() {
                this.sampleEditor = !this.sampleEditor;
            }
        }
    }
</script>

<style scoped>

</style>
