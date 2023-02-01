import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import {
  makeActionsProviderDecorator,
  makeDaoInfo,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'
import { ActionContextType } from '@dao-dao/types'

import { InstantiateNftCollection } from './InstantiateNftCollection'
import { MintNftData } from './types'

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / nft / InstantiateNftCollection',
  component: InstantiateNftCollection,
  decorators: [
    makeReactHookFormDecorator<MintNftData>({
      contractChosen: false,
      mintMsg: {
        owner: '',
        token_id: '',
      },
      metadata: {
        name: '',
        description: '',
        includeExtra: false,
        extra: '',
      },
    }),
    makeActionsProviderDecorator({
      address: 'junoWalletAddress',
      chainId: 'juno-1',
      bech32Prefix: 'juno',
      context: {
        type: ActionContextType.Dao,
        info: makeDaoInfo(),
      },
    }),
  ],
} as ComponentMeta<typeof InstantiateNftCollection>

const Template: ComponentStory<typeof InstantiateNftCollection> = (args) => (
  <div className="max-w-xl">
    <InstantiateNftCollection {...args} />
  </div>
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
    onInstantiate: async () => alert('instantiate'),
    instantiating: false,
    AddressInput,
  },
}
