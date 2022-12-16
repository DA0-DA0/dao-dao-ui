import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeProps as makeNftCardProps } from '@dao-dao/stateless/components/NftCard.stories'
import {
  ReactHookFormDecorator,
  makeActionsProviderDecorator,
} from '@dao-dao/storybook'
import { ActionOptionsContextType, ContractVersion } from '@dao-dao/types'

import { BurnNft } from './BurnNft'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / nft / BurnNft',
  component: BurnNft,
  decorators: [
    ReactHookFormDecorator,
    makeActionsProviderDecorator({
      address: 'junoWalletAddress',
      chainId: 'juno-1',
      bech32Prefix: 'juno',
      context: {
        type: ActionOptionsContextType.Dao,
        coreVersion: ContractVersion.V2Alpha,
      },
    }),
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
  onRemove: () => alert('remove'),
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
  },
}
