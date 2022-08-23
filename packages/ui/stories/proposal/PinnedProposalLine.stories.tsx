import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PinnedProposalLine } from 'components/proposal/PinnedProposalLine'

export default {
  title: 'DAO DAO UI / proposal / PinnedProposalLine',
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
      contractName: 'crates.io:cw-proposal-single',
      address: 'junoghijkluvw',
      prefix: 'A',
    },
    {
      contractName: 'crates.io:cw-proposal-multiple',
      address: 'junomnopqrstu',
      prefix: 'B',
    },
  ],
  proposalId: 'B3',
  proposalViewUrl: '#',
}

// TODO: Fix story.
