import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ReactHookFormDecorator } from '@dao-dao/storybook'

import { VetoOrEarlyExecuteDaoProposalComponent } from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / dao_governance / VetoOrEarlyExecuteDaoProposal',
  component: VetoOrEarlyExecuteDaoProposalComponent,
  decorators: [ReactHookFormDecorator],
} as ComponentMeta<typeof VetoOrEarlyExecuteDaoProposalComponent>

const Template: ComponentStory<
  typeof VetoOrEarlyExecuteDaoProposalComponent
> = (args) => <VetoOrEarlyExecuteDaoProposalComponent {...args} />

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  errors: {},
  options: {},
}
