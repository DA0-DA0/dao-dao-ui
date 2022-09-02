import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { NftCard, NftCardProps } from './NftCard'

export default {
  title: 'DAO DAO / packages / ui / components / nft / NftCard',
  component: NftCard,
  excludeStories: ['makeProps'],
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
    address: `starsAddress${id}`,
    createdBy: 'stars2afd31svj2f0z',
    imageUrl: '/dog_nft.png',
    name: `French Bulldog ${id}`,
    floorPrice: {
      // Random price between 0 and 10000 with up to 6 decimals.
      amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
      denom: 'STARS',
    },
    externalLink: {
      href: '/dog_nft.png',
      name: 'Stargaze',
    },
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
