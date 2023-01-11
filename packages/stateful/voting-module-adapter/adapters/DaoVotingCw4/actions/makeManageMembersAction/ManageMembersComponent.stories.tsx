import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import { makeReactHookFormDecorator } from '@dao-dao/storybook'

import {
  ManageMembersComponent,
  ManageMembersData,
} from './ManageMembersComponent'

export default {
  title:
    'DAO DAO / packages / stateful / voting-module-adapter / adapters / DaoVotingCw4 / actions / makeManageMembersAction / ManageMembersComponent',
  component: ManageMembersComponent,
  decorators: [
    makeReactHookFormDecorator<ManageMembersData>({
      toAdd: [],
      toRemove: [],
    }),
  ],
} as ComponentMeta<typeof ManageMembersComponent>

const Template: ComponentStory<typeof ManageMembersComponent> = (args) => (
  <ManageMembersComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {
    toAdd: [],
    toRemove: [],
  },
  isCreating: true,
  onRemove: () => alert('remove'),
  errors: {},
  options: {
    currentMembers: ['member1', 'member2'],
    AddressInput,
  },
}
