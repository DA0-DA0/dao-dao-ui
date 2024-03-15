import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeReactHookFormDecorator } from '@dao-dao/storybook'

import {
  MigrateMigalooV4TokenFactoryComponent,
  MigrateMigalooV4TokenFactoryData,
} from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / voting-module-adapter / adapters / DaoVotingTokenStaked / actions / MigrateMigalooV4TokenFactory',
  component: MigrateMigalooV4TokenFactoryComponent,
  decorators: [makeReactHookFormDecorator<MigrateMigalooV4TokenFactoryData>()],
} as ComponentMeta<typeof MigrateMigalooV4TokenFactoryComponent>

const Template: ComponentStory<typeof MigrateMigalooV4TokenFactoryComponent> = (
  args
) => <MigrateMigalooV4TokenFactoryComponent {...args} />

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
}
