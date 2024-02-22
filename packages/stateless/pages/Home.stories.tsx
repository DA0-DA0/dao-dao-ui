import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalLine } from '@dao-dao/stateful'
import { makeDappLayoutDecorator } from '@dao-dao/storybook/decorators'

import { DaoCard, LinkWrapper } from '../components'
import { FeaturedDaos as FeaturedDaosScrollerStory } from '../components/HorizontalScroller.stories'
import { DefaultArgs as NavigationStoryArgs } from '../components/layout/DappNavigation.stories'
import { makeProps as makeProposalLineProps } from '../components/proposal/ProposalLine.stories'
import { Home } from './Home'

export default {
  title: 'DAO DAO / packages / stateless / pages / Home',
  component: Home,
} as ComponentMeta<typeof Home>

const Template: ComponentStory<typeof Home> = (args) => <Home {...args} />

export const Connected = Template.bind({})
Connected.args = {
  featuredDaosProps: {
    items: FeaturedDaosScrollerStory.args!.items!,
    Component: (props) => (
      <DaoCard
        {...props}
        LinkWrapper={LinkWrapper}
        follow={{
          following: true,
          updatingFollowing: false,
          onFollow: () => alert('follow ' + props.coreAddress),
        }}
      />
    ),
  },
  connected: true,
  followingDaosProps: {
    followingDaos: FeaturedDaosScrollerStory.args!.items!,
    DaoCard: (props) => (
      <DaoCard
        {...props}
        LinkWrapper={LinkWrapper}
        follow={{
          following: true,
          updatingFollowing: false,
          onFollow: () => alert('follow ' + props.coreAddress),
        }}
      />
    ),
    openSearch: () => alert('search'),
  },
  feedProps: {
    state: {
      loading: false,
      refreshing: false,
      daosWithItems: NavigationStoryArgs.followingDaos.loading
        ? []
        : NavigationStoryArgs.followingDaos.data.map((dao) => ({
            dao,
            // Generate between 1 and 3 proposals.
            items: [...Array(Math.floor(Math.random() * 3) + 1)].map(() => {
              // Random time in the next 3 days.
              const secondsRemaining = Math.floor(
                Math.random() * 3 * 24 * 60 * 60
              )

              return {
                Renderer: ProposalLine,
                props: makeProposalLineProps(secondsRemaining),
                pending: true,
              }
            }),
          })),
      pendingItemCount: 42,
      totalItemCount: 100,
      refresh: () => {},
    },
    LinkWrapper,
  },
}
Connected.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=272%3A64674',
  },
  nextRouter: {
    asPath: '/',
  },
}
Connected.decorators = [makeDappLayoutDecorator()]

export const Disconnected = Template.bind({})
Disconnected.args = {
  ...Connected.args,
  connected: false,
}
Disconnected.parameters = {
  ...Connected.parameters,
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=272%3A64768',
  },
}
Disconnected.decorators = [
  makeDappLayoutDecorator({
    navigationProps: {
      walletConnected: false,
    },
  }),
]
