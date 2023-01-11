import { ComponentMeta, ComponentStory } from '@storybook/react'

import { AddressInput } from '@dao-dao/stateless'
import { makeProps as makeNftInfoProps } from '@dao-dao/stateless/components/NftCard.stories'
import {
  makeActionsProviderDecorator,
  makeReactHookFormDecorator,
} from '@dao-dao/storybook'
import { ActionOptionsContextType, ContractVersion } from '@dao-dao/types'

import { MintNft } from './MintNft'
import { MintNftData } from './types'

export default {
  title: 'DAO DAO / packages / stateful / actions / components / nft / MintNft',
  component: MintNft,
  decorators: [
    makeReactHookFormDecorator<MintNftData>({
      contractChosen: true,
      collectionAddress: 'junoNftCollection',
      mintMsg: {
        owner: '',
        token_id: '',
      },
    }),
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
} as ComponentMeta<typeof MintNft>

const Template: ComponentStory<typeof MintNft> = (args) => (
  <div className="max-w-xl">
    <MintNft {...args} />
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
    nftInfo: makeNftInfoProps(),
    AddressInput,
  },
}
