import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { makeLazyInfo as makeNftCardProps } from '@dao-dao/stateless/components/nft/NftCard.stories'

import { NftSelectionModal } from './NftSelectionModal'

export default {
  title: 'DAO DAO / packages / stateful / components / nft / NftSelectionModal',
  component: NftSelectionModal,
} as ComponentMeta<typeof NftSelectionModal>

const Template: ComponentStory<typeof NftSelectionModal> = (args) => {
  const [selected, setSelected] = useState<string[]>([])

  return (
    <NftSelectionModal
      {...args}
      onDeselectAll={() => setSelected([])}
      onNftClick={({ key }) =>
        setSelected((current) =>
          current.includes(key)
            ? current.filter((a) => a !== key)
            : [...current, key]
        )
      }
      onSelectAll={() =>
        !args.nfts?.loading &&
        !args.nfts?.errored &&
        setSelected(args.nfts.data.map((nft) => nft.key) ?? [])
      }
      selectedKeys={selected}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  nfts: {
    loading: false,
    errored: false,
    data: [
      makeNftCardProps(),
      makeNftCardProps(),
      makeNftCardProps(),
      makeNftCardProps(),
      makeNftCardProps(),
    ],
  },
  action: {
    loading: false,
    label: 'Stake',
    onClick: () => alert('action'),
  },
  header: {
    title: 'Stake NFTs',
    subtitle: 'Select the NFTs you want to stake from the NFT collection.',
  },
  visible: true,
}

export const Empty = Template.bind({})
Empty.args = {
  ...Default.args,
  nfts: {
    loading: false,
    errored: false,
    data: [],
  },
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  nfts: {
    loading: true,
    errored: false,
  },
}

export const Errored = Template.bind({})
Errored.args = {
  ...Default.args,
  nfts: {
    loading: false,
    errored: true,
    error: new Error(
      'Request rejected and some other info that takes up a lot of space.'
    ),
  },
}
