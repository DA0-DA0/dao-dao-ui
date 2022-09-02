import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalNotFound } from './ProposalNotFound'

export default {
  title:
    'DAO DAO / packages / ui / components / not_found / ProposalNotFound',
  component: ProposalNotFound,
} as ComponentMeta<typeof ProposalNotFound>

const Template: ComponentStory<typeof ProposalNotFound> = (args) => (
  <ProposalNotFound {...args} />
)

export const Default = Template.bind({})
Default.args = {
  homeHref: '#',
}
Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
