import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import CodeEditor from '../CodeEditor.vue'

void describe('CodeEditor.vue', () => {

    const wrapper = shallowMount(CodeEditor)

    test('"copy" modal window is hidden', () => {

        expect(wrapper.find('.alert-box').is('.hidden')).to.equal(true)
    })

    test('copy-button was clicked', () => {
        const copyBtn = wrapper.find('.btn-copy')

        expect(copyBtn.exists()).to.equal(true)

        copyBtn.trigger('click')

        expect(wrapper.find('.alert-box').classes('.hidden')).to.equal(false)
    })

    test('download button was clicked', () => {
        const downloadBtn = wrapper.find('.btn-download')

        expect(downloadBtn.exists()).to.equal(true)

        downloadBtn.trigger('click')
    })
})
