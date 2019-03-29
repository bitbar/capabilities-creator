import Vue from 'vue'
import App from './App.vue'
// import PropertiesSetter from './PropertiesSetter.vue'
// import CodeEditor from './CodeEditor.vue'
import samples from './sample/samples'
import '../src/styles/style.scss'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import i18n from 'roddeh-i18n'
i18n.translator.add(samples);

require('finka');
//
// Vue.component('props-setter', PropertiesSetter);
// Vue.component('code-editor', CodeEditor);
Vue.component('font-awesome-icon', FontAwesomeIcon);
new Vue({
    el: '#app',
    render: h => h(App)
});
