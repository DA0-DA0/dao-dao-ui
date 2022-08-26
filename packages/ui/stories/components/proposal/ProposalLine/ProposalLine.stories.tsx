import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalLine } from 'components/proposal/ProposalLine'

export default {
  title: 'DAO DAO UI / components / proposal / ProposalLine',
  component: ProposalLine,
  decorators: [],
} as ComponentMeta<typeof ProposalLine>

const Template: ComponentStory<typeof ProposalLine> = (args) => (
  <ProposalLine {...args} />
)

export const Default = Template.bind({})
Default.args = {
  coreAddress: 'junoabcdefxyz',
  proposalModules: [
    {
      contractName: 'crates.io:cw-govmod-single',
      address: 'junoghijkluvw',
      prefix: 'A',
    },
    {
      contractName: 'crates.io:cw-govmod-single',
      address: 'junomnopqrstu',
      prefix: 'B',
    },
  ],
  proposalId: 'B3',
  proposalViewUrl: '#',
}
