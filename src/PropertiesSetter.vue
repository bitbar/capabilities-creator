<template>
    <div id="propertiesSetter">
        <h1>Capabilities creator</h1>
        <div>
            <p>Device</p>
            <data-select></data-select>
        </div>
        <div>
            <p>OS</p>
            <data-select></data-select>
        </div>
        <div>
            <p>Screen resolution</p>
            <data-select></data-select>
        </div>
        <div>
            <p>
                <input type="checkbox" />
                <label>user API key</label>
            </p>
        </div>
        <div>
            <p>
                <input type="checkbox" />
                <label>basic sample</label>
            </p>
        </div>
        <div>
            <p>Project name</p>
            <app-input></app-input>
        </div>
        <div>
            <p>Test run name</p>
            <app-input></app-input>
        </div>
    </div>
</template>

<script>
    import Input from './Input.vue'
    import Select from './DataSelect.vue'
    export default {
        name: "PropertiesSetter",
        components: {
            'app-input': Input,
            'data-select': Select
        }
    }
</script>

<style scoped>

</style>