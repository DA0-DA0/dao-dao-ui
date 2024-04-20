import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ProposalLine } from '@dao-dao/stateful'
import { makeDappLayoutDecorator } from '@dao-dao/storybook/decorators'

import { DaoCard } from '../dao/DaoCard'
import { FeaturedDaos as FeaturedDaosScrollerStory } from '../HorizontalScroller.stories'
import { DefaultArgs as NavigationStoryArgs } from '../layout/DappNavigation.stories'
import { LinkWrapper } from '../LinkWrapper'
import { makeProps as makeProposalLineProps } from '../proposal/ProposalLine.stories'
import { ProfileDaos } from './ProfileDaos'

export default {
  title: 'DAO DAO / packages / stateless / components / profile / ProfileDaos',
  component: ProfileDaos,
} as ComponentMeta<typeof ProfileDaos>

const Template: ComponentStory<typeof ProfileDaos> = (args) => (
  <ProfileDaos {...args} />
)

export const Default = Template.bind({})
Default.args = {
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
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=272%3A64674',
  },
  nextRouter: {
    asPath: '/',
  },
}
Default.decorators = [makeDappLayoutDecorator()]
