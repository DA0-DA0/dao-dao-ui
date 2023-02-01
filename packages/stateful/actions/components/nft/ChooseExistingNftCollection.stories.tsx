import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  makeActionsProviderDecorator,
  makeDaoInfo,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'
import { ActionContextType } from '@dao-dao/types'

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
    existingCollections: [
      {
        address: 'junoNftCollection1',
        name: 'Collection 1',
      },
      {
        address: 'junoNftCollection2',
        name: 'Collection 2',
      },
      {
        address: 'junoNftCollection3',
        name: 'Collection 3',
      },
      {
        address: 'junoNftCollection4',
        name: 'Collection 4',
      },
      {
        address: 'junoNftCollection5',
        name: 'Collection 5',
      },
      {
        address: 'junoNftCollection6',
        name: 'Collection 6',
      },
      {
        address: 'junoNftCollection7',
        name: 'Collection 7',
      },
    ],
  },
}
