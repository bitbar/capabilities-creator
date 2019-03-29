import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import App from '../App.vue'

describe('App.vue', () => {

    const vue = createLocalVue()

    const wrapper = mount(App, { vue })

    test('has a root element with id creatorContent', () => {
        expect(wrapper.is('#creatorContent')).to.equal(true)
    })

    test('render a props-setter component', () => {
        expect(wrapper.contains('props-setter')).to.equal(true)
    })

    test('render a code-editor component', () => {
        expect(wrapper.contains('code-editor')).to.equal(true)
    })
})