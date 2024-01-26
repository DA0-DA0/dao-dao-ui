import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { EntityDisplay, ProposalLine } from '../../../../components'
import { NeutronOverruleSubDaoProposalComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / dao_governance / NeutronOverruleSubDaoProposal',
  component: NeutronOverruleSubDaoProposalComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof NeutronOverruleSubDaoProposalComponent>

const Template: ComponentStory<
  typeof NeutronOverruleSubDaoProposalComponent
> = (args) => <NeutronOverruleSubDaoProposalComponent {...args} />

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  errors: {},
  options: {
    daoProposalModules: { loading: false, data: [] },
    EntityDisplay,
    ProposalLine,
  },
}
