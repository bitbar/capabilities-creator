<template>
    <div id="propertiesSetter">
        <h1>Capabilities creator</h1>
        <div>
            <p>Platform</p>
            <drop-down v-model="capability.platform" :options="options.platform"></drop-down>
        </div>
        <div>
            <p>Browser</p>
            <drop-down v-model="capability.browserName" :options="options.browsers"></drop-down>
        </div>
        <div v-if="capability.browserName">
            <p>Browser version</p>
            <drop-down v-model="capability.browserVersion" :options="browserVersions()"></drop-down>
        </div>
        <div>
            <p>
                <input type="checkbox" id="apiKey" v-model="capability.useApiKey"/>
                <label for="apiKey">Use API key</label>
            </p>
        </div>
        <div v-if="capability.useApiKey">
            <p>API key</p>
            <input type="text" v-model="capability.apiKey"/>
        </div>
        <div>
            <p>Resolution</p>
            <drop-down v-model="capability.resolution" :options="options.resolution"></drop-down>
        </div>
        <div>
            <p>Project name</p>
            <input type="text" v-model="capability.bitbarProject"/>
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