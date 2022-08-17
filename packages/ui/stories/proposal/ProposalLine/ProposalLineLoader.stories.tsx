import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalLineLoader } from 'components/proposal/ProposalLine'

export default {
  title: 'DAO DAO UI / proposal / ProposalLineLoader',
  component: ProposalLineLoader,
} as ComponentMeta<typeof ProposalLineLoader>

const Template: ComponentStory<typeof ProposalLineLoader> = (args) => (
  <ProposalLineLoader {...args} />
)

export const Default = Template.bind({})
Default.args = {
  Logo: null, // TODO: Fill in default value.
}
