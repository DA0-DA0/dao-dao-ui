import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { EntityDisplay } from '@dao-dao/stateful'
import { LazyNftCardInfo } from '@dao-dao/types'
import { getNftKey } from '@dao-dao/utils'

import { NftCard, NftCardProps } from './NftCard'

export default {
  title: 'DAO DAO / packages / stateless / components / nft / NftCard',
  component: NftCard,
  excludeStories: ['makeProps', 'makeLazyInfo'],
} as ComponentMeta<typeof NftCard>

const Template: ComponentStory<typeof NftCard> = (args) => {
  const [checked, setChecked] = useState(false)

  return (
    <div className="max-w-xs">
      <NftCard
        {...args}
        checkbox={
          // If provided, override onClick handler to update controlled state.
          args.checkbox && {
            checked,
            onClick: () => {
              setChecked((c) => !c)
              args.checkbox?.onClick()
            },
          }
        }
      />
    </div>
  )
}

let id = 0
export const makeProps = (): NftCardProps => {
  id++

  return {
    key: getNftKey('stargaze-1', 'starsCollectionAddress', `${id}`),
    collectionAddress: 'starsCollectionAddress',
    collectionName: 'French Bulldog',
    tokenId: `${id}`,
    imageUrl: '/dog_nft.png',
    owner: 'junoOwnerAddress',
    name: `${id}`,
    description: `Description of NFT #${id}`,
    highestOffer: {
      // Random price between 0 and 10000 with up to 6 decimals.
      amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
    },
    externalLink: {
      href: '/dog_nft.png',
      name: 'Stargaze',
    },
    chainId: 'stargaze-1',
    EntityDisplay,
  }
}

export const makeLazyInfo = (): LazyNftCardInfo => {
  id++

  return {
    key: getNftKey('stargaze-1', 'starsCollectionAddress', `${id}`),
    chainId: 'stargaze-1',
    collectionAddress: 'starsCollectionAddress',
    tokenId: `${id}`,
  }
}

export const Default = Template.bind({})
Default.args = makeProps()
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=126%3A15467',
  },
}

export const Checkable = Template.bind({})
Checkable.args = {
  ...makeProps(),
  checkbox: {
    checked: false,
    onClick: () => {},
  },
}
Checkable.parameters = Default.parameters
