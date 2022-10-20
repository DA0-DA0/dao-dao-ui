import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { makeProps as makeNftCardProps } from './NftCard.stories'
import { NftSelectionModal } from './NftSelectionModal'

export default {
  title: 'DAO DAO / packages / ui / components / nft / NftSelectionModal',
  component: NftSelectionModal,
} as ComponentMeta<typeof NftSelectionModal>

const Template: ComponentStory<typeof NftSelectionModal> = (args) => {
  const [selected, setSelected] = useState<string[]>([])

  return (
    <NftSelectionModal
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
        !args.nfts?.loading &&
        setSelected(args.nfts.data.map((nft) => args.getIdForNft(nft)) ?? [])
      }
      selectedIds={selected}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  nfts: {
    loading: false,
    data: [
      makeNftCardProps(),
      makeNftCardProps(),
      makeNftCardProps(),
      makeNftCardProps(),
      makeNftCardProps(),
    ],
  },
  onAction: () => alert('action'),
  getIdForNft: (nft) => `${nft.collection.address}:${nft.tokenId}`,
  header: {
    title: 'Stake NFTs',
    subtitle: 'Select the NFTs you want to stake from the {{name}} collection.',
  },
  actionLabel: 'Stake',
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  nfts: {
    loading: true,
  },
}
