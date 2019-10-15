<template>
    <div class="appiumProps">
        <div class="form-field">
            <drop-down v-model="osType"
                    :options="osTypes">
            </drop-down>
            <label class="form-label">OS type</label>
        </div>
        <div class="form-field">
            <drop-down v-model="capability.device"
                    :options="devicesByOSType" optionKey="displayName">
            </drop-down>
            <label class="form-label">Device</label>
        </div>
        <div class="form-field">
            <span class="form-label form-field__helper-text">you can get your API_KEY from cloud UI under My Account</span>
            <input type="text" id="userApiKey" class="form-input" v-model="capability.apiKey"/>
            <label for="userApiKey" class="form-label">API key</label>
        </div>
        <div class="form-field">
            <span class="form-label form-field__helper-text">full path to your application under test</span>
            <input type="text" id="mobApp" class="form-input" v-model="capability.bitbar_app"/>
            <label for="mobApp" class="form-label">Application</label>
        </div>
        <div v-if="osType == 'ANDROID'" class="form-field">
            <input type="text" id="appPackage" class="form-input" v-model="capability.androidAppPackage"
                placeholder="com.bitbar.sample"/>
            <label for="appPackage" class="form-label">Application package</label>
        </div>
        <div v-if="osType == 'ANDROID'" class="form-field">
            <span class="form-label form-field__helper-text">the main activity of your app</span>
            <input type="text" id="appActivity" class="form-input" v-model="capability.androidAppActivity"
                   placeholder="com.bitbar.sample.BitbarSampleApplicationActivity"/>
            <label for="appActivity" class="form-label">Application activity</label>
        </div>
        <div v-if="osType == 'iOS'" class="form-field">
            <input type="text" id="appBundleId" class="form-input" v-model="capability.iosApp"
                placeholder="com.bitbar.testdroid.BitbarIOSSample"/>
            <label for="appBundleId" class="form-label">Bundle ID</label>
        </div>
        <div v-if="osType == 'ANDROID'" class="form-field">
            <drop-down id="targetAndroid" v-model="capability.bitbar_target"
                        :options="androidTestTarget">
            </drop-down>
            <label for="targetAndroid" class="form-label">
                Target test type
            </label>
        </div>
        <div v-if="osType == 'ANDROID'" class="form-field">
            <drop-down id="automationName" v-model="capability.androidAutomationName"
                       :options="automationNames">
            </drop-down>
            <label for="automationName" class="form-label">
                Automation name
            </label>
        </div>
        <div v-if="osType == 'iOS'" class="form-field">
            <drop-down id="targetIos" v-model="capability.bitbar_target"
                       :options="iosTestTarget">
            </drop-down>
            <label for="targetIos" class="form-label">
                Target test type
            </label>
        </div>
        <div class="form-field checkbox-field">
            <input type="checkbox" id="optional" class="form-checkbox" v-model="capability.optional"/>
            <label for="optional" class="form-label">Optional capabilities</label>
        </div>
        <div v-if="capability.optional" class="form-field">
            <input type="text" id="projectName" class="form-input" v-model="capability.bitbar_project"/>
            <label for="projectName" class="form-label">Project name</label>
        </div>
        <div v-if="capability.optional" class="form-field">
            <input type="text" id="runName" class="form-input" v-model="capability.bitbar_testrun"/>
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
                osTypes: ['ANDROID', 'iOS'],
                osType: null,
                devices: [],
                devicesByOSType: [],
                androidTestTarget: ['android', 'selendroid', 'chrome'],
                iosTestTarget: ['ios', 'safari'],
                automationNames: ['Appium', 'Selendroid'],
                capability: {
                    apiKey: null,
                    device: null,
                    bitbar_app: null,
                    bitbar_project: null,
                    bitbar_testrun: null,
                    bitbar_target: null,
                    optional: false,
                    androidAppPackage: null,
                    androidAppActivity: null,
                    androidAutomationName: null,
                    iosApp: null,
                    iosDeviceName: 'iPhone device'
                }
            }
        },
        created() {
            this.fetchAllDevices();
            this.addCapabilities();
        },
        watch: {
            capability: {
                handler() {
                    this.resetCapabilities();
                },
                deep: true
            },
            language() {
                this.resetCapabilities();
            },
            osType: {
                handler() {
                    this.cleanCapabilities();
                    this.fetchDevices();
                    this.createCapabilities();
                    this.resetCapabilities();
                }
            }
        },
        methods: {
            fetchAllDevices() {
                let that = this;
                let url = 'https://staging.bitbar.com/api/v2/devices?offset=0&limit=50' +
                    '&sort=displayName_a&labelIds%5B%5D=41100480';

                fetch(url)
                    .then(function(response) {
                        return response.json()
                    }).then(function (data) {
                    data.data.forEach(d => {
                        that.devices.push(d);
                    })
                })

            },
            fetchDevices() {
                let that = this;
                that.devicesByOSType = [];
                that.devices.forEach(d => {
                    let os = that.osType.toUpperCase()
                    if(d.osType === os) {
                        that.devicesByOSType.push(d);
                    }
                })
            },
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
                if(this.capability.apiKey)
                    if(this.language === 'ruby')
                        cap.push(i18n('CAPABILITY_API_KEY_APPIUM', undefined,
                            {x: this.capability.apiKey}, {language: this.language}));
                    else
                        cap.push(i18n('CAPABILITY_API_KEY', undefined,
                            {x: this.capability.apiKey}, {language: this.language}));

                if(!this.capability.apiKey)
                    if(this.language === 'ruby')
                        cap.push(i18n('CAPABILITY_API_KEY_UNDEFINED_APPIUM', undefined,
                            {x: this.capability.apiKey}, {language: this.language}));
                    else
                        cap.push(i18n('CAPABILITY_API_KEY_UNDEFINED', undefined,
                            {x: this.capability.apiKey}, {language: this.language}));




                if(this.devicesByOSType && this.capability.device) cap.push(i18n('CAPABILITY_BITBAR_DEVICE', undefined,
                    {x: this.capability.device.displayName}, {language: this.language}));
                if(this.capability.bitbar_app) cap.push(i18n('CAPABILITY_BITBAR_APP', undefined,
                    {x: this.capability.bitbar_app}, {language: this.language}));



                if(this.capability.bitbar_target)
                    cap.push(i18n('CAPABILITY_BITBAR_TARGET', undefined, {x: this.capability.bitbar_target},
                        {language: this.language}))
                else
                    if(this.osType === 'ANDROID')
                        cap.push(i18n('CAPABILITY_BITBAR_TARGET', undefined, {x: this.androidTestTarget[0]},
                            {language: this.language}))
                    else if (this.osType === 'iOS')
                        cap.push(i18n('CAPABILITY_BITBAR_TARGET', undefined, {x: this.iosTestTarget[0]},
                            {language: this.language}))

                if(this.capability.bitbar_project)
                    if(this.language === 'ruby')
                        cap.push(i18n('CAPABILITY_BITBAR_PROJECT_APPIUM', undefined,
                            {x: this.capability.bitbar_project}, {language: this.language}));
                    else
                        cap.push(i18n('CAPABILITY_BITBAR_PROJECT', undefined,
                            {x: this.capability.bitbar_project}, {language: this.language}));
                if(this.capability.bitbar_testrun)
                    if(this.language === 'ruby')
                        cap.push(i18n('CAPABILITY_BITBAR_TEST_RUN_APPIUM', undefined,
                            {x: this.capability.bitbar_testrun}, {language: this.language}));
                    else
                        cap.push(i18n('CAPABILITY_BITBAR_TEST_RUN', undefined,
                            {x: this.capability.bitbar_testrun}, {language: this.language}));

                if (this.osType === 'ANDROID'){
                    cap.push(i18n('CAPABILITY_PLATFORM_NAME', undefined, {x: 'Android'}, {language: this.language}));
                    cap.push(i18n('CAPABILITY_DEVICE_NAME', undefined, {x: 'Android Phone'}, {language: this.language}));
                    if(this.capability.androidAppPackage) {
                        cap.push(i18n('CAPABILITY_APP_PACKAGE', undefined, {x: this.capability.androidAppPackage},
                            {language: this.language}));
                    }
                    if(this.capability.androidAppActivity) {
                        cap.push(i18n('CAPABILITY_APP_ACTIVITY', undefined, {x: this.capability.androidAppActivity},
                            {language: this.language}));
                    }
                    if(this.capability.androidAutomationName)
                        cap.push(i18n('CAPABILITY_AUTOMATION_NAME', undefined, {x: this.capability.androidAutomationName},
                            {language: this.language}));
                }
                else if (this.osType === 'iOS'){
                    cap.push(i18n('CAPABILITY_PLATFORM_NAME', undefined, {x: 'iOS'}, {language: this.language}));
                    cap.push(i18n('CAPABILITY_DEVICE_NAME', undefined, {x: 'iPhone device'}, {language: this.language}));
                    cap.push(i18n('CAPABILITY_AUTOMATION_NAME', undefined, {x: 'XCUITest'}, {language: this.language}));
                    if(this.capability.iosApp) {
                        cap.push(i18n('CAPABILITY_APP', undefined, {x: this.capability.iosApp}, {language: this.language}));
                    }
                }

                if (this.language === 'ruby') {
                    return i18n('WRAPPER_APPIUM', undefined, {x: cap.join("\n")}, {language: this.language});
                } else {
                    return i18n('WRAPPER', undefined, {x: cap.join("\n")}, {language: this.language});
                }

            },
            addCapabilities(){
                let caps = this.createCapabilities();
                let str = caps + "\n" + i18n('APPIUM_BROKER_URL', undefined, undefined, { language: this.language })
                this.$emit("capability", str);
            },

            resetCapabilities() {
                this.addCapabilities();
            },
            cleanCapabilities() {
                for(let key in this.capability) {

                    if(typeof this.capability[key] === 'boolean') {
                        this.capability[key] = false
                    }
                    else {
                        this.capability[key] = null
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>