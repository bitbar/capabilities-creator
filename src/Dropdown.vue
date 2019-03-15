<template>
    <select v-model="internalValue" class="select-field">
        <option v-for="option in options" :value="option.value?option.value:option" class="option-field">{{option.name?option.name:option}}</option>
    </select>
</template>

<script>
    export default {
        name: "Dropdown",
        props:["value", "options"],
        data() {
            return {
                internalValue: this.value
            }
        },
        watch: {
            internalValue(val) {
                this.$emit("input", val)
            }
        }
    }
</script>

<style scoped>

</style>