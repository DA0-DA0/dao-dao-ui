import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeReactHookFormDecorator } from '@dao-dao/storybook'

import {
  MigrateToOsmosisTokenFactoryIssuerComponent,
  MigrateToOsmosisTokenFactoryIssuerData,
} from './Component'

export default {
  title:
    'DAO DAO / packages / stateful / voting-module-adapter / adapters / DaoVotingTokenStaked / actions / MigrateToOsmosisTokenFactoryIssuer',
  component: MigrateToOsmosisTokenFactoryIssuerComponent,
  decorators: [
    makeReactHookFormDecorator<MigrateToOsmosisTokenFactoryIssuerData>(),
  ],
} as ComponentMeta<typeof MigrateToOsmosisTokenFactoryIssuerComponent>

const Template: ComponentStory<
  typeof MigrateToOsmosisTokenFactoryIssuerComponent
> = (args) => <MigrateToOsmosisTokenFactoryIssuerComponent {...args} />

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
}
