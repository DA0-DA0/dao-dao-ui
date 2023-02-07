import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  DaoPageWrapperDecorator,
  makeActionsProviderDecorator,
  makeDaoInfo,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'
import { ActionOptionsContextType } from '@dao-dao/types'

import { AddressInput } from '../../components'
import { UpgradeV1ToV2Component } from './UpgradeV1ToV2'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / UpgradeV1ToV2',
  component: UpgradeV1ToV2Component,
  decorators: [
    makeReactHookFormDecorator({
      subDaos: ['junoSubDao1', 'junoSubDao2', 'junoSubDao3'],
    }),
    makeActionsProviderDecorator({
      address: 'junoWalletAddress',
      chainId: 'juno-1',
      bech32Prefix: 'juno',
      context: {
        type: ActionOptionsContextType.Dao,
        info: makeDaoInfo(),
      },
    }),
    DaoPageWrapperDecorator,
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
  onRemove: () => alert('remove'),
  errors: {},
  options: {
    AddressInput,
  },
}
