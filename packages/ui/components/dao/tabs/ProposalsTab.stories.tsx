import { ComponentMeta, ComponentStory } from '@storybook/react'

import { useDaoInfoContext } from '@dao-dao/common'
import { DaoPageWrapperDecorator } from '@dao-dao/storybook/decorators'

import { ProposalList, ProposalListProps } from '../../proposal'
import * as ProposalListStories from '../../proposal/ProposalList.stories'
import { ProposalsTab } from './ProposalsTab'

export default {
  title: 'DAO DAO / packages / ui / components / dao / tabs / ProposalsTab',
  component: ProposalsTab,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof ProposalsTab>

const Template: ComponentStory<typeof ProposalsTab> = (args) => (
  <ProposalsTab {...args} daoInfo={useDaoInfoContext()} />
)

export const Default = Template.bind({})
Default.args = {
  isMember: false,
  proposalDeposit: {
    amount: 70,
    tokenDecimals: 6,
    tokenSymbol: 'DOG',
    refundOnFailure: true,
  },
  proposalList: (
    <ProposalList
      {...(ProposalListStories.Default.args as ProposalListProps)}
    />
  ),
}

export const None = Template.bind({})
None.args = {
  ...Default.args,
  proposalList: (
    <ProposalList {...(ProposalListStories.None.args as ProposalListProps)} />
  ),
}
