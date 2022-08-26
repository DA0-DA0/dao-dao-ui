import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PinnedProposalLine } from 'components/proposal/PinnedProposalLine'

export default {
  title: 'DAO DAO UI / components / proposal / PinnedProposalLine',
  component: PinnedProposalLine,
} as ComponentMeta<typeof PinnedProposalLine>

const Template: ComponentStory<typeof PinnedProposalLine> = (args) => (
  <PinnedProposalLine {...args} />
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
