import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeProps as makeNftCardProps } from '@dao-dao/stateless/components/NftCard.stories'
import {
  ReactHookFormDecorator,
  makeDaoInfo,
  makeDaoProvidersDecorator,
} from '@dao-dao/storybook'

import { BurnNft } from './BurnNft'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / nft / BurnNft',
  component: BurnNft,
  decorators: [
    ReactHookFormDecorator,
    makeDaoProvidersDecorator(makeDaoInfo()),
  ],
} as ComponentMeta<typeof BurnNft>

const Template: ComponentStory<typeof BurnNft> = (args) => (
  <div className="max-w-6xl">
    <BurnNft {...args} />
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
    nftInfo: {
      loading: false,
      errored: false,
      data: selected,
    },
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
  },
}
