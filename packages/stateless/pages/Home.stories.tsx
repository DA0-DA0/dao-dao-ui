import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoCard } from '@dao-dao/stateful'
import { makeDappLayoutDecorator } from '@dao-dao/storybook/decorators'

import { FeaturedDaos as FeaturedDaosScrollerStory } from '../components/HorizontalScroller.stories'
import { Home } from './Home'

export default {
  title: 'DAO DAO / packages / stateless / pages / Home',
  component: Home,
} as ComponentMeta<typeof Home>

const Template: ComponentStory<typeof Home> = (args) => <Home {...args} />

export const Default = Template.bind({})
Default.args = {
  stats: {
    daos: 1234,
    proposals: 5678,
    votes: 90123,
    uniqueVoters: 4567,
    chains: 10,
    tvl: 1234567890,
  },
  featuredDaosProps: {
    items: FeaturedDaosScrollerStory.args!.items!,
    Component: DaoCard,
  },
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=272%3A64768',
  },
  nextRouter: {
    asPath: '/',
  },
}
Default.decorators = [
  makeDappLayoutDecorator({
    navigationProps: {
      walletConnected: false,
    },
  }),
]
