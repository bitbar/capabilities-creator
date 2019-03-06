<template>
    <select v-model="internalValue">
        <option value="1">some value 1</option>
        <option value="2">some value 2</option>
        <option value="3">some value 3</option>
    </select>
</template>

<script>
    export default {
        name: "Dropdown",
        props:["value"],
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