<template>
    <div id="propertiesSetter" class="form">
        <h1 class="form-header">Capabilities creator</h1>
        <div class="form-field">
            <drop-down v-model="capability.platform"
                       :options="platforms"></drop-down>
            <label class="form-label">Platform</label>
        </div>
        <div class="form-field">
            <drop-down v-model="capability.browserName"
                       :options="setOptions('browsers')"
                       :disabled="!capability.platform"></drop-down>
            <label class="form-label">Browser</label>
        </div>
        <div v-if="capability.browserName" class="form-field">
            <drop-down v-model="capability.browserVersion"
                       :options="setOptions('versions', true)"
                       :disabled="!capability.browserName"></drop-down>
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
            <input type="text" class="form-input" id="name" v-model="capability.bitbarProject"/>
            <label for="name" class="form-label">Project name</label>
        </div>
        <div class="form-field">
            <drop-down v-model="capability.resolution"
                       :options="setOptions('resolutions')"
                       :disabled="!capability.platform"></drop-down>
            <label class="form-label">Resolution</label>
        </div>
        <button class="btn create-btn-mob" @click="onCreateData">
            <i class="fas fa-2x fa-plus"></i>
        </button>
    </div>
</template>

<script>
    import DropDown from './Dropdown.vue'
    import i18n from 'roddeh-i18n'

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
                platforms: []
            }
        },
        created() {
            this.fetchData();
            this.$emit("capability", this.createCapabilities())
        },
        watch: {
            capability: {
                handler(newVal, oldVal) {
                    this.createCapabilities();
                    this.$emit("capability", this.createCapabilities());
                    if(!this.capability.useApiKey) {
                        this.capability.apiKey = null
                    }
                },
                deep: true
            },
            language(){
                this.createCapabilities();
                this.$emit("capability", this.createCapabilities())
            }
        },
        methods: {
            fetchData() {
                let that = this;
                fetch('https://staging.bitbar.com/api/v2/devices/desktop-browser-capabilities')
                    .then(function(response) {
                        return response.json()
                    }).then(function (data) {
                    that.platforms = data.platforms
                })
            },
            setOptions(key, deep=false) {
                if(deep) {
                    let browsers = this.setOptions('browsers');
                    let idx = browsers.lookFor({value: this.capability.browserName});
                    if(idx >= 0) {
                        return browsers[idx][key]
                    }
                } else {
                    let idx = this.platforms.lookFor({value: this.capability.platform});
                    if(idx >= 0) {
                        return this.platforms[idx][key]
                    }
                }
            },
            createCapabilities() {
                let cap = [];
                if(this.capability.platform) cap.push(i18n('CAPABILITY_PLATFORM', undefined,
                    {x: this.capability.platform}, {language: this.language}));
                if(this.capability.browserName) {
                    cap.push(i18n('CAPABILITY_BROWSER_NAME', undefined,
                        {x: this.capability.browserName}, {language: this.language}));
                    this.setOptions('versions', true)
                }
                if(this.capability.browserVersion) cap.push(i18n('CAPABILITY_BROWSER_VERSION', undefined,
                    {x: this.capability.browserVersion}, {language: this.language}));
                if(this.capability.apiKey && this.capability.useApiKey) cap.push(i18n('CAPABILITY_API_KEY', undefined,
                    {x: this.capability.apiKey}, {language: this.language}));
                if(this.capability.bitbarProject) cap.push(i18n('CAPABILITY_BITBAR_PROJECT', undefined,
                    {x: this.capability.bitbarProject}, {language: this.language}));
                if(this.capability.resolution) cap.push(i18n('CAPABILITY_RESOLUTION', undefined,
                    {x: this.capability.resolution}, {language: this.language}));
                return i18n('WRAPPER', undefined, {x: cap.join("\n")}, {language: this.language})
            },
            onCreateData(e) {
                let propsSetter = document.getElementById('propertiesSetter');
                propsSetter.classList.remove('visible');
                e.stopPropagation();
            }
        }
    }
</script>

<style scoped>

</style>