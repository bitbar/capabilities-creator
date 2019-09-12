<template>
    <div class="appiumProps">
        <div class="form-field">
            <drop-down v-model="capability.osType"
                    :options="osTypes">
            </drop-down>
            <label class="form-label">OS type</label>
        </div>
        <div class="form-field">
            <drop-down v-model="capability.dev">
            </drop-down>
            <label class="form-label">Devices list</label>
        </div>
        <div class="form-field">
            <input type="text" id="userApiKey" class="form-input" v-model="capability.apiKey"/>
            <label for="userApiKey" class="form-label">User Api key*</label>
        </div>
        <div class="form-field">
            <input type="text" id="mobApp" class="form-input"
                   placeholder="full path to your application under test" v-model="capability.appPath"/>
            <label for="mobApp" class="form-label">Mobile application</label>
        </div>
        <div class="form-field">
            <input type="text" id="appPackage" class="form-input" v-model="capability.appPackage"/>
            <label for="appPackage" class="form-label">Mobile application package</label>
        </div>
        <!-- iOS only -->
        <div class="form-field">
            <input type="text" id="appBundleId" class="form-input" v-model="capability.bundleID"/>
            <label for="appBundleId" class="form-label">Bundle ID</label>
        </div>
        <!-- iOS only -->
        <div class="form-field">
            <input type="text" id="automationName" class="form-input" v-model="capability.automationName"/>
            <label for="automationName" class="form-label">Automation name</label>
        </div>
        <!-- Android only -->
        <div class="form-field">
            <input type="text" id="appActivity" class="form-input" v-model="capability.appActivity"/>
            <label for="appActivity" class="form-label">Mobile application activity</label>
        </div>
        <div class="form-field">
            <input type="text" id="appiumUrl" class="form-input" v-model="capability.appiumBrokerUrl"/>
            <label for="appiumUrl" class="form-label">Appium broker URL</label>
        </div>
        <div class="form-field">
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



        <div>*you can get your API_KEY from cloud UI under My Account</div>
    </div>
</template>

<script>
    import DropDown from './Dropdown.vue'

    export default {
        name: "AppiumProps.vue",
        components: {
            'drop-down': DropDown
        },
        data () {
            return {
                osTypes: ['android', 'iOS'],
                capability: {
                    osType: null,
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
        }
    }
</script>

<style scoped>

</style>