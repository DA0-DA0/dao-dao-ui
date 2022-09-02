import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Footer } from './Footer'

export default {
  title: 'DAO DAO / packages / ui / components / Footer',
  component: Footer,
} as ComponentMeta<typeof Footer>

const Template: ComponentStory<typeof Footer> = (_args) => <Footer />

export const Default = Template.bind({})
Default.args = {}
Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
