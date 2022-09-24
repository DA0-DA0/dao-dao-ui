import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { makeProps as makeNftCardProps } from './NftCard.stories'
import { NftStakingModal } from './NftStakingModal'

export default {
  title: 'DAO DAO / packages / ui / components / nft / NftStakingModal',
  component: NftStakingModal,
} as ComponentMeta<typeof NftStakingModal>

const Template: ComponentStory<typeof NftStakingModal> = (args) => {
  const [selected, setSelected] = useState<string[]>([])

  return (
    <NftStakingModal
      {...args}
      onDeselectAll={() => setSelected([])}
      onNftClick={(nft) => {
        const key = args.getIdForNft(nft)
        setSelected((current) =>
          current.includes(key)
            ? current.filter((a) => a !== key)
            : [...current, key]
        )
      }}
      onSelectAll={() =>
        setSelected(args.nfts?.map((nft) => args.getIdForNft(nft)) ?? [])
      }
      selectedIds={selected}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  nfts: [
    makeNftCardProps(),
    makeNftCardProps(),
    makeNftCardProps(),
    makeNftCardProps(),
    makeNftCardProps(),
  ],
  collection: {
    name: 'BadDog',
    total: 99,
  },
  onStake: () => alert('stake'),
  getIdForNft: (nft) => `${nft.collectionAddress}:${nft.tokenId}`,
}
Default.parameters = {
  design: {
    type: 'figma',
    url: '',
  },
}
