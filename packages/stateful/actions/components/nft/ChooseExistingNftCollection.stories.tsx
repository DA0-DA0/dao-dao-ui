import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  makeActionsProviderDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'
import { ActionOptionsContextType, ContractVersion } from '@dao-dao/types'

import { MintNftData } from '.'
import { ChooseExistingNftCollection } from './ChooseExistingNftCollection'

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / nft / ChooseExistingNftCollection',
  component: ChooseExistingNftCollection,

  decorators: [
    makeReactHookFormDecorator<MintNftData>({
      contractChosen: false,
      collectionAddress: undefined,
      mintMsg: {
        owner: '',
        token_id: '',
      },
      metadata: {
        name: '',
        description: '',
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
} as ComponentMeta<typeof ChooseExistingNftCollection>

const Template: ComponentStory<typeof ChooseExistingNftCollection> = (args) => (
  <div className="max-w-xl">
    <ChooseExistingNftCollection {...args} />
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
    chooseLoading: false,
    onChooseExistingContract: async () => alert('choose'),
  },
}
