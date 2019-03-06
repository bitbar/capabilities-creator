import Vue from 'vue'
import App from './App.vue'
import '../src/styles/app.scss'
import PropertiesSetter from './PropertiesSetter.vue'
import CodeEditor from './CodeEditor.vue'

Vue.component('props-setter', PropertiesSetter);
Vue.component('code-editor', CodeEditor);

new Vue({
    el: '#app',
    render: h => h(App)
});
