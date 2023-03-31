import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import { makeProps as makeNftCardProps } from '@dao-dao/stateless/components/NftCard.stories'
import {
  ReactHookFormDecorator,
  makeDaoInfo,
  makeDaoProvidersDecorator,
} from '@dao-dao/storybook'

import { TransferNftComponent } from './TransferNft'

export default {
  title:
    'DAO DAO / packages / stateful / actions / components / nft / TransferNft',
  component: TransferNftComponent,
  decorators: [
    ReactHookFormDecorator,
    makeDaoProvidersDecorator(makeDaoInfo()),
  ],
} as ComponentMeta<typeof TransferNftComponent>

const Template: ComponentStory<typeof TransferNftComponent> = (args) => (
  <div className="max-w-6xl">
    <TransferNftComponent {...args} />
  </div>
)

const selected = makeNftCardProps()

export const Default = Template.bind({})
Default.args = {
  fieldNamePrefix: '',
  allActionsWithData: [],
  index: 0,
  data: {},
  isCreating: true,
  errors: {},
  options: {
    nftInfo: selected,
    options: {
      loading: false,
      errored: false,
      data: [
        selected,
        makeNftCardProps(),
        makeNftCardProps(),
        makeNftCardProps(),
        makeNftCardProps(),
      ],
    },
    AddressInput,
  },
}
