import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  CHAIN_ID,
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'

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
}
