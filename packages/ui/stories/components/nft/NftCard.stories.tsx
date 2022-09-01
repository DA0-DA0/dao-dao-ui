import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NftCard, NftCardProps } from 'components/nft/NftCard'

export default {
  title: 'DAO DAO UI V2 / components / nft / NftCard',
  component: NftCard,
  excludeStories: ['makeProps'],
} as ComponentMeta<typeof NftCard>

const Template: ComponentStory<typeof NftCard> = (args) => (
  <div className="max-w-xs">
    <NftCard {...args} />
  </div>
)

let id = 0
export const makeProps = (): NftCardProps => ({
  createdBy: 'stars2afd31svj2f0z',
  imageUrl: '/dog_nft.png',
  name: `French Bulldog ${++id}`,
  floorPrice: {
    // Random price between 0 and 10000 with up to 6 decimals.
    amount: Math.floor(Math.random() * (10000 * 1e6) + 1e6) / 1e6,
    denom: 'STARS',
  },
  href: '/dog_nft.png',
  hrefDestinationName: 'Stargaze',
})

export const Default = Template.bind({})
Default.args = makeProps()

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=126%3A15467',
  },
}
