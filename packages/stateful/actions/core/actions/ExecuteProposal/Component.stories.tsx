import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import {
  AddressInput,
  DaoProviders,
  ProposalLine,
  ProposalList,
} from '../../../../components'
import { ExecuteProposalComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / dao_governance / ExecuteProposal',
  component: ExecuteProposalComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof ExecuteProposalComponent>

const Template: ComponentStory<typeof ExecuteProposalComponent> = (args) => (
  <ExecuteProposalComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  errors: {},
  options: {
    selectedDaoInfo: { loading: true, errored: false },
    AddressInput,
    ProposalLine,
    ProposalList,
    DaoProviders,
  },
}
