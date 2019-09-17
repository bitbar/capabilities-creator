<template>
    <div class="appiumProps">
        <div class="form-field">
            <drop-down v-model="capability.osType"
                    :options="osTypes">
            </drop-down>
            <label class="form-label">OS type</label>
        </div>
        <div class="form-field">
            <drop-down v-model="capability.device"
                    :options="devicesList">
            </drop-down>
            <label class="form-label">Devices list</label>
        </div>
        <div class="form-field">
            <span class="form-label form-field__helper-text">you can get your API_KEY from cloud UI under My Account</span>
            <input type="text" id="userApiKey" class="form-input" v-model="capability.apiKey"/>
            <label for="userApiKey" class="form-label">User Api key*</label>
        </div>
        <div class="form-field">
            <span class="form-label form-field__helper-text">full path to your application under test</span>
            <input type="text" id="mobApp" class="form-input" v-model="capability.appPath"/>
            <label for="mobApp" class="form-label">Mobile application</label>
        </div>
        <div class="form-field">
            <input type="text" id="appPackage" class="form-input" v-model="capability.appPackage"
                placeholder="com.bitbar.sample"/>
            <label for="appPackage" class="form-label">Mobile application package</label>
        </div>
        <div v-if="capability.osType == 'iOS'" class="form-field">
            <input type="text" id="appBundleId" class="form-input" v-model="capability.bundleID"
                placeholder="com.bitbar.testdroid.BitbarIOSSample"/>
            <label for="appBundleId" class="form-label">Bundle ID</label>
        </div>
        <div v-if="capability.osType == 'iOS'" class="form-field">
            <span class="form-label form-field__helper-text">used automation framework name</span>
            <input type="text" id="automationName" class="form-input" v-model="capability.automationName"/>
            <label for="automationName" class="form-label">
                Automation name
            </label>
        </div>
        <div v-if="capability.osType == 'Android'" class="form-field">
            <span class="form-label form-field__helper-text">the main activity of your app</span>
            <input type="text" id="appActivity" class="form-input" v-model="capability.appActivity"
                placeholder="com.bitbar.sample.BitbarSampleApplicationActivity"/>
            <label for="appActivity" class="form-label">Mobile application activity</label>
        </div>
        <div class="form-field">
            <input type="text" id="appiumUrl" class="form-input" v-model="capability.appiumBrokerUrl"/>
            <label for="appiumUrl" class="form-label">Appium broker URL</label>
        </div>
        <div class="form-field">
            <span class="form-label form-field__helper-text">your local directory for screenshots</span>
            <input type="text" id="screenshot" class="form-input" v-model="capability.screenshotDir"/>
            <label for="screenshot" class="form-label">Local screenshot directory</label>
        </div>
        <div class="form-field">
            <input type="text" id="projectName" class="form-input" v-model="capability.projectName"/>
            <label for="projectName" class="form-label">Project name</label>
        </div>
        <div class="form-field">
            <input type="text" id="runName" class="form-input" v-model="capability.testRunName"/>
            <label for="runName" class="form-label">Test run name</label>
        </div>
    </div>
</template>

<script>
    import DropDown from './Dropdown.vue'

    export default {
        name: "AppiumProps",
        components: {
            'drop-down': DropDown
        },
        props: ['language'],
        data () {
            return {
                osTypes: ['Android', 'iOS'],
                capability: {
                    osType: null,
                    devices: null,
                    apiKey: null,
                    appPath: null,
                    appPackage: null,
                    bundleID: null,
                    automationName: null,
                    appActivity: null,
                    appiumBrokerUrl: null,
                    screenshotDir: null,
                    projectName: null,
                    testRunName: null
                }
            }
        },
        created() {
            this.$emit("capability", this.createCapabilities())
        },
        computed: {
            devicesList: function() {
                if(this.capability.osType == 'Android') {
                    return ['pixel 3a', 'pixel 1', 'xiaomi A2'];
                }
                else {
                    return ['iPhone 5s', 'iPhone X'];
                }
            }
        },
        watch: {
            capability: {
                handler() {
                    this.createCapabilities();
                    this.$emit("capability", this.createCapabilities());
                },
                deep: true
            },
            language() {
                this.createCapabilities();
                this.$emit("capability", this.createCapabilities())
            }
        },
        methods: {
            fetchApiKey() {
                let that = this;
                let url = 'https://staging.bitbar.com/api/v2/users/32976629';

                fetch(url)
                    .then(function(response) {
                        return response.json()
                    }).then(function (data) {
                        that.apiKey = data.apiKey
                })
            },
            createCapabilities() {
                let cap = [];
                if(this.capability.osType) cap.push(i18n('CAPABILITY_OS_TYPE', undefined,
                    {x: this.capability.osType}, {language: this.language}));
                if(this.capability.device) cap.push(i18n('CAPABILITY_DEVICE', undefined,
                    {x: this.capability.device}, {language: this.language}));
                if(this.capability.apiKey) cap.push(i18n('CAPABILITY_USER_API_KEY', undefined,
                    {x: this.capability.apiKey}, {language: this.language}));
                if(this.capability.appPath) cap.push(i18n('CAPABILITY_APP_PATH', undefined,
                    {x: this.capability.appPath}, {language: this.language}));
                if(this.capability.appPackage) cap.push(i18n('CAPABILITY_APP_PACKAGE', undefined,
                    {x: this.capability.appPackage}, {language: this.language}));
                if(this.capability.bundleID) cap.push(i18n('CAPABILITY_BUNDLE_ID', undefined,
                    {x: this.capability.bundleID}, {language: this.language}));
                if(this.capability.automationName) cap.push(i18n('CAPABILITY_AUTOMATION_NAME', undefined,
                    {x: 'XCUITest' + this.capability.automationName}, {language: this.language}));
                if(this.capability.appActivity) cap.push(i18n('CAPABILITY_APP_ACTIVITY', undefined,
                    {x: this.capability.appActivity}, {language: this.language}));
                if(this.capability.appiumBrokerUrl) cap.push(i18n('CAPABILITY_APPIUM_BROKER_URL', undefined,
                    {x: 'https://appium.bitbar.com/wd/hub/' + this.capability.appiumBrokerUrl}, {language: this.language}));
                if(this.capability.screenshotDir) cap.push(i18n('CAPABILITY_SCREENSHOT_DIR', undefined,
                    {x: this.capability.screenshotDir}, {language: this.language}));
                if(this.capability.projectName) cap.push(i18n('CAPABILITY_PROJECT_NAME', undefined,
                    {x: this.capability.projectName}, {language: this.language}));
                if(this.capability.testRunName) cap.push(i18n('CAPABILITY_TEST_RUN_NAME', undefined,
                    {x: this.capability.testRunName}, {language: this.language}));

                return i18n('WRAPPER', undefined, {x: cap.join("\n")}, {language: this.language});

            }
        }
    }
</script>

<style scoped>

</style>