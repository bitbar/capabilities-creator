<template>
    <div id="propertiesSetter" class="form">
        <div class="tag">
            <span>BETA</span>
        </div>
        <h1 class="form-header">Capabilities<br>creator</h1>

        <div class="form-toggle">
            <span class="form-label">{{ title }}</span>
            <label class="switch-toggle">
                <input type="checkbox" v-model="appiumView"/>
                <span class="slider round"></span>
            </label>
        </div>
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
            <drop-down v-model="capability.version"
                       :options="setOptions('versions', true)"
                       :disabled="!capability.browserName"></drop-down>
            <label class="form-label">Browser version</label>
        </div>
        <div class="form-field">
            <drop-down v-model="capability.resolution"
                       :options="setOptions('resolutions')"
                       :disabled="!capability.platform"></drop-down>
            <label class="form-label">Resolution</label>
        </div>
        <div class="form-field">
            <input type="text" id="key" class="form-input" v-model="capability.apiKey"/>
            <label for="key" class="form-label">API key</label>
        </div>
        <div class="form-field checkbox-field">
            <input type="checkbox" id="optional" class="form-checkbox" v-model="capability.optional"/>
            <label for="optional" class="form-label">Optional capabilities</label>
        </div>
        <div v-if="capability.optional" class="form-field">
            <input type="text" class="form-input" id="name" v-model="capability.bitbarProject"/>
            <label for="name" class="form-label">Project name</label>
        </div>
        <div v-if="capability.optional" class="form-field">
            <input type="text" class="form-input" id="testRunName" v-model="capability.bitbarTestRun"/>
            <label for="testRunName" class="form-label">Test run name</label>
        </div>
        <div v-if="capability.optional" class="form-field">
            <input type="number" class="form-input num-input" id="testTimeout" v-model="capability.bitbarTestTimeout"
                   min="0" oninput="this.value = Math.abs(this.value)"/>
            <label for="testTimeout" class="form-label">Test timeout (in seconds; 600 by default)</label>
        </div>
        <div v-if="capability.optional" class="form-field">
            <input type="number" class="form-input num-input" id="multiSessionWait" v-model="capability.bitbarMultiSessionWait"
                   min="0" max="60" oninput="this.value = Math.abs(this.value)"/>
            <label for="multiSessionWait" class="form-label">
                Multisession wait (in seconds; max 60)
            </label>
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
                appiumView: false,
                capability: {
                    platform: null,
                    browserName: null,
                    version: null,
                    bitbarProject: null,
                    bitbarTestRun: null,
                    bitbarTestTimeout: null,
                    bitbarMultiSessionWait: null,
                    resolution: null,
                    optional: false,
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
                handler() {
                    this.createCapabilities();
                    this.$emit("capability", this.createCapabilities());
                    if(!this.capability.optional) {
                        this.clearOptionalCaps()
                    }
                    if(this.capability.bitbarTestTimeout === 0) {
                        this.capability.bitbarTestTimeout = null
                    }
                    if(this.capability.bitbarTestTimeout) {
                        this.capability.bitbarTestTimeout = Math.round(this.capability.bitbarTestTimeout)
                    }
                    if(this.capability.bitbarMultiSessionWait === 0) {
                        this.capability.bitbarMultiSessionWait = null
                    }
                    if(this.capability.bitbarMultiSessionWait) {
                        this.capability.bitbarMultiSessionWait = Math.round(this.capability.bitbarMultiSessionWait);
                        if(this.capability.bitbarMultiSessionWait > 60) {
                            this.capability.bitbarMultiSessionWait = 60
                        }
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
                let url = 'https://cloud.bitbar.com/api/v2/devices/desktop-browser-capabilities';

                if(window.location.href.split('?')[1] === btoa('staging.bitbar.com'))
                    url = 'https://staging.bitbar.com/api/v2/devices/desktop-browser-capabilities';

                fetch(url)
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
                if(this.capability.version) cap.push(i18n('CAPABILITY_VERSION', undefined,
                    {x: this.capability.version}, {language: this.language}));
                if(this.capability.resolution) cap.push(i18n('CAPABILITY_RESOLUTION', undefined,
                    {x: this.capability.resolution}, {language: this.language}));
                if(this.capability.apiKey) cap.push(i18n('CAPABILITY_API_KEY', undefined,
                    {x: this.capability.apiKey}, {language: this.language}));
                if(!this.capability.apiKey)
                    cap.push(i18n('CAPABILITY_API_KEY_UNDEFINED', undefined,
                        {x: this.capability.apiKey}, {language: this.language}));
                if(this.capability.bitbarProject) cap.push(i18n('CAPABILITY_BITBAR_PROJECT', undefined,
                    {x: this.capability.bitbarProject}, {language: this.language}));
                if(this.capability.bitbarTestRun) cap.push(i18n('CAPABILITY_BITBAR_TEST_RUN', undefined,
                    {x: this.capability.bitbarTestRun}, {language: this.language}));
                if(this.capability.optional && this.capability.bitbarTestTimeout) cap.push(i18n('CAPABILITY_BITBAR_TEST_TIMEOUT', undefined,
                    {x: this.capability.bitbarTestTimeout}, {language: this.language}));
                if(this.capability.optional && this.capability.bitbarMultiSessionWait) cap.push(i18n('CAPABILITY_BITBAR_MULTI_SESSION_WAIT', undefined,
                    {x: this.capability.bitbarMultiSessionWait}, {language: this.language}));
                return i18n('WRAPPER', undefined, {x: cap.join("\n")}, {language: this.language})
            },
            onCreateData(e) {
                let propsSetter = document.getElementById('propertiesSetter');
                propsSetter.classList.remove('visible');
                e.stopPropagation();
            },
            clearOptionalCaps() {
                this.capability.bitbarProject = null;
                this.capability.bitbarTestRun = null;
                this.capability.bitbarTestTimeout = null;
                this.capability.bitbarMultiSessionWait = null
            }
        },
        computed: {
            title: function() {
                if (this.appiumVue) {
                    return 'Appium';
                }
                else {
                    return 'Desktop';
                }
            }
        }
    }
</script>

<style scoped>

</style>
