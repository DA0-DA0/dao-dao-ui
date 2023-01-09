import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  makeActionsProviderDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'
import { ActionOptionsContextType, ContractVersion } from '@dao-dao/types'

import { ProfileDisplay } from '../../../components'
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
        type: ActionOptionsContextType.Dao,
        coreVersion: ContractVersion.V2Alpha,
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
    ProfileDisplay,
  },
}
