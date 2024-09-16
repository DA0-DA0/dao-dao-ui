import { ComponentMeta, ComponentStory } from '@storybook/react'

import {
  CHAIN_ID,
  makeDaoInfo,
  makeDaoProvidersDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'

import {
  CreateNftCollectionAction,
  CreateNftCollectionActionData,
} from './CreateNftCollectionAction'

export default {
  title:
    'DAO DAO / packages / stateful / components / nft / CreateNftCollectionAction',
  component: CreateNftCollectionAction,
  decorators: [
    makeReactHookFormDecorator<CreateNftCollectionActionData>({
      chainId: CHAIN_ID,
      name: '',
      symbol: '',
    }),
    makeDaoProvidersDecorator(makeDaoInfo()),
  ],
} as ComponentMeta<typeof CreateNftCollectionAction>

const Template: ComponentStory<typeof CreateNftCollectionAction> = (args) => (
  <div className="max-w-xl">
    <CreateNftCollectionAction {...args} />
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
