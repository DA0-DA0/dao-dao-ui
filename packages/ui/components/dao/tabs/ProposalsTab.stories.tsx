import { ComponentMeta, ComponentStory } from '@storybook/react'

import { useDaoInfoContext } from '@dao-dao/common'
import { DaoPageWrapperDecorator } from '@dao-dao/storybook/decorators'

import { ProposalList, ProposalListProps } from '../../proposal'
import { Default as ProposalListStory } from '../../proposal/ProposalList.stories'
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
    <ProposalList {...(ProposalListStory.args as ProposalListProps)} />
  ),
}
