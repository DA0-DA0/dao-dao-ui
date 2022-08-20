import { ComponentMeta, ComponentStory } from '@storybook/react'

import { NftCard } from 'components/nft/NftCard'

export default {
  title: 'DAO DAO UI V2 / nft / NftCard',
  component: NftCard,
} as ComponentMeta<typeof NftCard>

const Template: ComponentStory<typeof NftCard> = (args) => <NftCard {...args} />

export const Default = Template.bind({})
Default.args = {}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=126%3A15467',
  },
}
