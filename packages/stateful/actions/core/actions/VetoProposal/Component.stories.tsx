import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import {
  AddressInput,
  EntityDisplay,
  ProposalLine,
} from '../../../../components'
import { VetoProposalComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / dao_governance / VetoProposal',
  component: VetoProposalComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof VetoProposalComponent>

const Template: ComponentStory<typeof VetoProposalComponent> = (args) => (
  <VetoProposalComponent {...args} />
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
    daoVetoableProposals: { loading: true, errored: false },
    AddressInput,
    EntityDisplay,
    ProposalLine,
  },
}
