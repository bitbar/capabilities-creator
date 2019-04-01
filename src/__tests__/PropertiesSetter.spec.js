import { expect } from 'chai'
import { mount, createLocalVue } from '@vue/test-utils'
import PropertiesSetter from '../PropertiesSetter.vue'
import Dropdown from '../Dropdown.vue'

void describe('PropertiesSetter.vue', () => {
    const vue = createLocalVue()
    const wrapper = mount(PropertiesSetter, { vue })

    test('has an id propertiesSetter', () => {
        expect(wrapper.is('#propertiesSetter')).to.equal(true)
    })
    test('contains select elements', () => {
        const select = wrapper.find('select')
        expect(select.is(Dropdown)).to.equal(true)
    })
    test('select element refresh v-model', () => {
        const options = wrapper.find('select').findAll('option')
        options.at(1).setSelected()
    })
    // test('after checkbox was clicked additional field is showing', () => {
    //     const apiKeyCheckbox = wrapper.find('#apiKey')
    //     apiKeyCheckbox.setChecked()
    //     expect(wrapper.find('#apiKeyWrapper').isVisible()).to.equal(true)
    // })
})
