import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Loader } from 'components/Loader'
import { ProposalLineLoader } from 'components/proposal/ProposalLine'

export default {
  title: 'DAO DAO V2 / components / proposal / ProposalLineLoader',
  component: ProposalLineLoader,
} as ComponentMeta<typeof ProposalLineLoader>

const Template: ComponentStory<typeof ProposalLineLoader> = (args) => (
  <ProposalLineLoader {...args} />
)

export const Default = Template.bind({})
Default.args = {
  Loader,
}
