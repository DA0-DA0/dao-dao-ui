import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Logo } from 'components/Logo'
import { ProposalLineLoader } from 'components/proposal/ProposalLine'

export default {
  title: 'DAO DAO UI / components / proposal / ProposalLineLoader',
  component: ProposalLineLoader,
} as ComponentMeta<typeof ProposalLineLoader>

const Template: ComponentStory<typeof ProposalLineLoader> = (args) => (
  <ProposalLineLoader {...args} />
)

export const Default = Template.bind({})
Default.args = {
  Logo,
}
