import { shallowMount } from '@vue/test-utils'
import HomePage from '../../src/components/HomePage.vue'

describe('HomePage.vue', () => {
  it('renders', () => {
    const wrapper = shallowMount(HomePage)
    expect(wrapper.text()).toContain('SPMS')
  })
})
