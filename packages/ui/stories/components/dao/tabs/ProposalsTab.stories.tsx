import { ComponentMeta, ComponentStory } from '@storybook/react'

import { useDaoInfoContext } from '@dao-dao/common'

import { ProposalsTab } from 'components/dao/tabs/ProposalsTab'
import {
  ProposalList,
  ProposalListProps,
} from 'components/proposal/ProposalList'
import { DaoPageWrapperDecorator } from 'decorators'
import { Default as ProposalListStory } from 'stories/components/proposal/ProposalList.stories'

export default {
  title: 'DAO DAO V2 / components / dao / tabs / ProposalsTab',
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
    <ProposalList {...(ProposalListStory.args as ProposalListProps)} />
  ),
}
