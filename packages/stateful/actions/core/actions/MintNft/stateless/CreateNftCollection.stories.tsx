import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  CHAIN_ID,
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'

import { CreateNftCollectionAction } from '../../../../../components/nft/CreateNftCollectionAction'
import { MintNftData } from '../types'
import { CreateNftCollection } from './CreateNftCollection'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / nfts / MintNft / stateless / CreateNftCollection',
  component: CreateNftCollection,
  decorators: [
    makeReactHookFormDecorator<MintNftData>({
      chainId: CHAIN_ID,
      contractChosen: false,
      mintMsg: {
        owner: '',
        token_id: '',
      },
      metadata: {
        name: '',
        description: '',
      },
    }),
    makeDaoProvidersDecorator(makeDaoInfo()),
  ],
} as ComponentMeta<typeof CreateNftCollection>

const Template: ComponentStory<typeof CreateNftCollection> = (args) => (
  <div className="max-w-xl">
    <CreateNftCollection {...args} />
  </div>
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
    onInstantiate: async () => alert('instantiate'),
    instantiating: false,
    CreateNftCollectionAction,
  },
}
