import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeReactHookFormDecorator } from '@dao-dao/storybook'

import { ProfileDisplay } from '../../../../../components'
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
  data: {},
  isCreating: true,
  options: {
    currentMembers: ['member1', 'member2'],
    ProfileDisplay: ProfileDisplay,
  },
}
