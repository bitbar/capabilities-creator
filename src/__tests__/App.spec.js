import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import App from '../App.vue'
import PropSetter from '../PropertiesSetter.vue'
import CodeEditor from '../CodeEditor.vue'

void describe('CodeEditor.vue', () => {
    const wrapper = shallowMount(App)

    test('has a root element with id creatorContent', () => {
        expect(wrapper.is('#creatorContent')).to.equal(true)
    })

    test('render a props-setter component', () => {
        expect(wrapper.contains(PropSetter)).to.equal(true)
    })

    test('render a code-editor component', () => {
        expect(wrapper.contains(CodeEditor)).to.equal(true)
    })
})