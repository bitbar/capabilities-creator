<template>
    <div class="full-width center-content" id="creatorContent">
        <button class="nav-btn-mob" @click="onMenuToggle">
            <i class="fas fa-2x fa-pencil-alt"></i>
        </button>
        <div class="creator-nav">
            <div class="tag">
                <span>BETA</span>
            </div>
            <button class="form-header__close-btn" @click="onMenuToggle">
                <i class="fa fa-2x fa-times"></i>
            </button>
            <h1 class="form-header">Capabilities<br>creator</h1>
             <div class="form-toggle">
                <label class="switch-toggle">
                    <input type="checkbox" v-model="appiumView" @click="onChangeTitle"/>
                    <span class="slider round" id="toggle">
                        <span class="slider__item">Desktop</span>
                        <span class="slider__item">Appium</span>
                    </span>
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
        components: {
            'code-editor': CodeEditor,
            'props-setter': PropertiesSetter,
            'desktop-props-setter': Desktop,
            'appium-props-setter': Appium
        },
        mounted() {
            let a = document.getElementById('toggle');
            a.setAttribute("data-title", "Desktop");

        },
        methods: {
            changeLanguage(lang) {
                this.language = lang
            },
            setCapabilities(val) {
                this.capabilities = val
            },
            onMenuToggle(e) {
                e.stopPropagation();
                let propsSetter = document.querySelector('.creator-nav');
                propsSetter.classList.toggle('visible');
            },
            onChangeTitle() {
                let toggleEl = document.getElementById('toggle');
                if (this.appiumView) {
                    toggleEl.setAttribute("data-title", "Desktop");
                }
                else {
                    toggleEl.setAttribute("data-title", "Appium");
                }
            }
        },
        computed: {
        }
    }
</script>
