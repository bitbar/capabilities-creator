<template>
    <div class="full-width center-content" id="creatorContent">
        <button class="nav-btn-mob" @click="onShowNav">
            <i class="fas fa-2x fa-pencil-alt"></i>
        </button>
        <div class="creator-nav">
            <div class="tag">
                <span>BETA</span>
            </div>
            <h1 class="form-header">Capabilities<br>creator</h1>

            <div class="form-toggle">
                <span class="switch-toggle__title">{{ title }}</span>
                <label class="switch-toggle">
                    <input type="checkbox" v-model="appiumView"/>
                    <span class="slider round"></span>
                </label>
            </div>
            <appium-props-setter v-if="appiumView"  @capability="setCapabilities" :language="language"></appium-props-setter>
            <desktop-props-setter v-else @capability="setCapabilities" :language="language"></desktop-props-setter>
        </div>
        <code-editor class="creator-editor" @currentLang="changeLanguage" :capabilities="capabilities"
            :mode="appiumView"></code-editor>
    </div>
</template>

<script>
    import CodeEditor from './CodeEditor.vue'
    import PropertiesSetter from './PropertiesSetter.vue'
    import Desktop from './DesktopProps.vue'
    import Appium from './AppiumProps.vue'

    export default {
        data() {
            return {
                language: 'java',
                capabilities: null,
                appiumView: false
            }
        },
        watch: {
            appiumView() {
               console.log('changed');
            }
        },
        components: {
            'code-editor': CodeEditor,
            'props-setter': PropertiesSetter,
            'desktop-props-setter': Desktop,
            'appium-props-setter': Appium
        },
        methods: {
            changeLanguage(lang) {
                this.language = lang
            },
            setCapabilities(val) {
                this.capabilities = val
                console.log('caps',val)
            },
            onShowNav(e) {
                let propsSetter = document.getElementById('propertiesSetter');
                propsSetter.classList.add('visible');
                e.stopPropagation();
            }
        },
        computed: {
            title: function() {
                if (this.appiumView) {
                    return 'Appium';
                }
                else {
                    return 'Desktop';
                }
            }
        }
    }
</script>
