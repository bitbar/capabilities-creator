<template>
    <div id="propertiesSetter" class="form">
        <h1 class="form-header">Capabilities creator</h1>
        <div class="form-field">
            <drop-down v-model="capability.platform" :options="options.platform"></drop-down>
            <label class="form-label">Platform</label>
        </div>
        <div class="form-field">
            <drop-down v-model="capability.browserName" :options="options.browsers"></drop-down>
            <label class="form-label">Browser</label>
        </div>
        <div v-if="capability.browserName" class="form-field">
            <drop-down v-model="capability.browserVersion" :options="browserVersions()"></drop-down>
            <label class="form-label">Browser version</label>
        </div>
        <div class="form-field checkbox-field">
            <input type="checkbox" id="apiKey" class="form-checkbox" v-model="capability.useApiKey"/>
            <label for="apiKey" class="form-label">use API key</label>
        </div>
        <div v-if="capability.useApiKey" class="form-field">
            <input type="text" id="key" class="form-input" v-model="capability.apiKey"/>
            <label for="key" class="form-label">API key</label>
        </div>
        <div class="form-field">
            <drop-down v-model="capability.resolution" :options="options.resolution"></drop-down>
            <label class="form-label">Resolution</label>
        </div>
        <div class="form-field">
            <input type="text" class="form-input" id="name" v-model="capability.bitbarProject"/>
            <label for="name" class="form-label">Project name</label>
        </div>
    </div>
</template>

<script>
    import DropDown from './Dropdown.vue'
    export default {
        name: "PropertiesSetter",
        components: {
            'drop-down': DropDown
        },
        props: ['language'],

        data () {
            return {
                capability: {
                    platform: null,
                    browserName: null,
                    browserVersion: null,
                    bitbarProject: null,
                    resolution: null,
                    useApiKey: false,
                    apiKey: null
                },
                options: {
                    platform: [
                        {name: 'Windows', value: 'windows'},
                        {name: 'Linux', value: 'linux'},
                        {name: 'OSX', value: 'osx'}
                    ],
                    browsers: [
                        {name: 'Chrome', value: 'chrome', versions: [10, 20, 30]},
                        {name: 'Firefox', value: 'firefox', versions: [40, 50, 60]},
                        {name: 'Edge', value: 'edge', versions: [70, 80, 90]},
                        {name: 'Internet Explorer', value: 'internet_explorer', versions: [100, 3, 6]},
                        {name: 'Safari', value: 'safari', versions: [175, 5, 7]}
                    ],
                    resolution: [
                        {name: '1280x800', value: '1280x800'}
                    ],
                }
            }
        },

        created() {
            this.$emit("capability", this.createCapabilities())
        },

        watch: {
            capability: {
                handler(newVal, oldVal) {
                    this.createCapabilities();
                    this.$emit("capability", this.createCapabilities())
                },
                deep: true
            },
            language(){
                this.createCapabilities();
                this.$emit("capability", this.createCapabilities())
            }
        },

        methods: {
            browserVersions() {
                let idx = this.options.browsers.lookFor({value: this.capability.browserName});
                if(idx >=0) {
                    return this.options.browsers[idx].versions
                }
            },
            createCapabilities() {
                let cap = [];
                if(this.capability.platform) cap.push(i18n('CAPABILITY_PLATFORM', undefined,
                    {x: this.capability.platform}, {language: this.language}));
                if(this.capability.browserName) {
                    cap.push(i18n('CAPABILITY_BROWSER_NAME', undefined,
                        {x: this.capability.browserName}, {language: this.language}));
                    this.browserVersions()
                }
                if(this.capability.browserVersion) cap.push(i18n('CAPABILITY_BROWSER_VERSION', undefined,
                    {x: this.capability.browserVersion}, {language: this.language}));
                if(this.capability.bitbarProject) cap.push(i18n('CAPABILITY_BITBAR_PROJECT', undefined,
                    {x: this.capability.bitbarProject}, {language: this.language}));
                if(this.capability.resolution) cap.push(i18n('CAPABILITY_RESOLUTION', undefined,
                    {x: this.capability.resolution}, {language: this.language}));
                if(this.capability.apiKey) cap.push(i18n('CAPABILITY_API_KEY', undefined,
                    {x: this.capability.apiKey}, {language: this.language}));

                let codeSample = i18n('WRAPPER', undefined, {x: cap.join("\n")}, {language: this.language});
                return codeSample;
            }
        }
    }
</script>

<style scoped>

</style>