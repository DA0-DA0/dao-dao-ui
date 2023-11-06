import { ComponentMeta, ComponentStory } from '@storybook/react'

import { WrapprPDF } from './WrapprPDF'

export default {
  title:
    'DAO DAO / packages / stateful / widgets / widgets / Wrappr / components / WrapprPDF',
  component: WrapprPDF,
} as ComponentMeta<typeof WrapprPDF>

const Template: ComponentStory<typeof WrapprPDF> = (args) => (
  <WrapprPDF {...args} />
)

const now = new Date()

export const Default = Template.bind({})
Default.args = {
  wrappr: {
    entity: '',
    jurisdiction: '',
    id: '1',
    title: 'This is a post',
    content: '## Hello!\n\nI am a post.',
    image: 'ipfs://',
    created: now,
    pastVersions: [],
    initiallyCreated: now,
  },
}
