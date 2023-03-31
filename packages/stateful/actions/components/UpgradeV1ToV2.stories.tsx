import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'

import { AddressInput } from '../../components'
import { UpgradeV1ToV2Component } from './UpgradeV1ToV2'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / UpgradeV1ToV2',
  component: UpgradeV1ToV2Component,
  decorators: [
    makeReactHookFormDecorator({
      subDaos: ['junoSubDao1', 'junoSubDao2', 'junoSubDao3'],
    }),
    makeDaoProvidersDecorator(makeDaoInfo()),
  ],
} as ComponentMeta<typeof UpgradeV1ToV2Component>

const Template: ComponentStory<typeof UpgradeV1ToV2Component> = (args) => (
  <UpgradeV1ToV2Component {...args} />
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
    AddressInput,
  },
}
