import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import {
  makeLazyInfo as makeLazyNftInfo,
  makeProps as makeNftCardProps,
} from '@dao-dao/stateless/components/nft/NftCard.stories'
import {
  ReactHookFormDecorator,
  makeDaoInfo,
  makeDaoProvidersDecorator,
} from '@dao-dao/storybook'

import { NftSelectionModal } from '../../../../components'
import { TransferNftComponent } from './Component'

export default {
  title: 'DAO DAO / packages / stateful / actions / core / nfts / TransferNft',
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
        makeLazyNftInfo(),
        makeLazyNftInfo(),
        makeLazyNftInfo(),
        makeLazyNftInfo(),
      ],
    },
    AddressInput,
    NftSelectionModal,
  },
}
