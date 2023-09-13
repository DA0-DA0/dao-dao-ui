import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  CHAIN_ID,
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'

import { Trans } from '../Trans'
import {
  InstantiateNftCollectionAction,
  InstantiateNftCollectionData,
} from './InstantiateNftCollectionAction'

export default {
  title:
    'DAO DAO / packages / stateful / components / nft / InstantiateNftCollectionAction',
  component: InstantiateNftCollectionAction,
  decorators: [
    makeReactHookFormDecorator<InstantiateNftCollectionData>({
      chainId: CHAIN_ID,
      name: '',
      symbol: '',
      collectionInfo: {
        type: 'vending',
        description: '',
        explicitContent: false,
        image: '',
        royalties: 5,
      },
    }),
    makeDaoProvidersDecorator(makeDaoInfo()),
  ],
} as ComponentMeta<typeof InstantiateNftCollectionAction>

const Template: ComponentStory<typeof InstantiateNftCollectionAction> = (
  args
) => (
  <div className="max-w-xl">
    <InstantiateNftCollectionAction {...args} />
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
    Trans,
  },
}
