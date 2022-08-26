import { ComponentMeta, ComponentStory } from '@storybook/react'

import { FeaturedCard } from 'components/featured/FeaturedCard'

export default {
  title: 'DAO DAO UI V2 / components / featured / FeaturedCard',
  component: FeaturedCard,
} as ComponentMeta<typeof FeaturedCard>

const Template: ComponentStory<typeof FeaturedCard> = (args) => (
  <div className="max-w-xs">
    <FeaturedCard {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  name: 'DAO DAO',
  description: 'A DAO that builds DAOs.',
  href: 'https://daodao.zone/dao/juno10h0hc64jv006rr8qy0zhlu4jsxct8qwa0vtaleayh0ujz0zynf2s2r7v8q',
  TVL: 1234567,
  image:
    'https://bafkreiefe4icv32rsn5l43p776d5rd4yk6expmiita5jt5tqqugc65mbua.ipfs.cf-ipfs.com',
}
