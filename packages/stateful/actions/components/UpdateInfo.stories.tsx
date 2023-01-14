import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  ReactHookFormDecorator,
  makeActionsProviderDecorator,
  makeDaoInfo,
} from '@dao-dao/storybook'
import { ActionOptionsContextType } from '@dao-dao/types'

import { UpdateInfoComponent } from './UpdateInfo'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / UpdateInfo',
  component: UpdateInfoComponent,
  decorators: [
    ReactHookFormDecorator,
    makeActionsProviderDecorator({
      address: 'junoWalletAddress',
      chainId: 'juno-1',
      bech32Prefix: 'juno',
      context: {
        type: ActionOptionsContextType.Dao,
        info: makeDaoInfo(),
      },
    }),
  ],
} as ComponentMeta<typeof UpdateInfoComponent>

const Template: ComponentStory<typeof UpdateInfoComponent> = (args) => (
  <UpdateInfoComponent {...args} />
)

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {
    name: '',
    description: '',
    automatically_add_cw20s: true,
    automatically_add_cw721s: true,
  },
  isCreating: true,
  onRemove: () => alert('remove'),
  errors: {},
}
