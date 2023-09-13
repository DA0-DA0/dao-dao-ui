import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  CHAIN_ID,
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'

import { Trans } from '../../../../../components/Trans'
import { MintNftData } from '../types'
import { InstantiateNftCollection } from './InstantiateNftCollection'

export default {
  title:
    'DAO DAO / packages / stateful / actions / core / nfts / MintNft / stateless / InstantiateNftCollection',
  component: InstantiateNftCollection,
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
  errors: {},
  options: {
    onInstantiate: async () => alert('instantiate'),
    instantiating: false,
    Trans,
  },
}
