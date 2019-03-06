<template>
    <div id="propertiesSetter">
        <h1>Capabilities creator</h1>
        <div>
            <p>Device</p>
            <drop-down v-model="capability.device"></drop-down>
        </div>
        <div>
            <p>OS</p>
            <drop-down v-model="capability.osType"></drop-down>
        </div>
        <div>
            <p>Screen resolution</p>
            <drop-down v-model="capability.screenRes"></drop-down>
        </div>
        <div>
            <p>
                <input type="checkbox" id="apiKey" v-model="capability.useApiKey"/>
                <label for="apiKey">user API key</label>
            </p>
        </div>
        <div>
            <p>
                <input type="checkbox" id="basicSample" v-model="capability.basicSample"/>
                <label for="basicSample">basic sample</label>
            </p>
        </div>
        <div>
            <p>Project name</p>
            <input type="text" v-model="capability.projectName"/>
        </div>
        <div>
            <p>Test run name</p>
            <input type="text" v-model="capability.testRunName"/>
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
        data () {
            return {
                capability: {
                     device: '',
                     osType: null,
                     screenRes: '',
                     useApiKey: false,
                     basicSample: false,
                     projectName: '',
                     testRunName: ''
                 },
                lang: '',
                capabilityCode: ''
            }
        }
    }
</script>

<style scoped>

</style>