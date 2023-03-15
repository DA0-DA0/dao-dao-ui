import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import {
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'

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
  onRemove: () => alert('remove'),
  errors: {},
  options: {
    onInstantiate: async () => alert('instantiate'),
    instantiating: false,
    AddressInput,
  },
}
