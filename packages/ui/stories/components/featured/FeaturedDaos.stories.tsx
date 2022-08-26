import { ComponentMeta, ComponentStory } from '@storybook/react'

import { FeaturedDao, FeaturedDaos } from 'components/featured/FeaturedDaos'

export default {
  title: 'DAO DAO UI V2 / components / featured / FeaturedDaos',
  component: FeaturedDaos,
} as ComponentMeta<typeof FeaturedDaos>

const Template: ComponentStory<typeof FeaturedDaos> = (args) => (
  <FeaturedDaos {...args} />
)

const featuredDao: FeaturedDao = {
  name: 'DAO DAO',
  description: 'A DAO that builds DAOs.',
  href: 'https://daodao.zone/dao/juno10h0hc64jv006rr8qy0zhlu4jsxct8qwa0vtaleayh0ujz0zynf2s2r7v8q',
  TVL: 1234567,
  image:
    'https://bafkreiefe4icv32rsn5l43p776d5rd4yk6expmiita5jt5tqqugc65mbua.ipfs.cf-ipfs.com',
}

export const Default = Template.bind({})
Default.args = {
  featuredDaos: [
    featuredDao,
    featuredDao,
    featuredDao,
    featuredDao,
    featuredDao,
    featuredDao,
    featuredDao,
    featuredDao,
    featuredDao,
  ],
}
