import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeDappLayoutDecorator } from '@dao-dao/storybook/decorators'

import {
  LinkWrapper,
  ProfileHomeCard,
  ProfileHomeCardProps,
  ProposalLine,
} from '../components'
import { DefaultArgs as NavigationStoryArgs } from '../components/layout/DappNavigation.stories'
import { Default as ProfileHomeCardStory } from '../components/profile/ProfileHomeCard.stories'
import { makeProps as makeProposalLineProps } from '../components/proposal/ProposalLine.ProposalLine.stories'
import { Inbox } from './Inbox'

export default {
  title: 'DAO DAO / packages / stateless / pages / Inbox',
  component: Inbox,
  decorators: [makeDappLayoutDecorator()],
} as ComponentMeta<typeof Inbox>

const Template: ComponentStory<typeof Inbox> = (args) => <Inbox {...args} />

export const Default = Template.bind({})
Default.args = {
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
            }
          }),
        })),
    itemCount: 42,
    refresh: () => {},
  },
  rightSidebarContent: (
    <ProfileHomeCard {...(ProfileHomeCardStory.args as ProfileHomeCardProps)} />
  ),
  LinkWrapper,
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=308%3A29063',
  },
  nextRouter: {
    asPath: '/inbox',
  },
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  state: {
    loading: true,
    refreshing: false,
    daosWithItems: [],
    itemCount: 0,
    refresh: () => {},
  },
}

export const NothingOpen = Template.bind({})
NothingOpen.args = {
  ...Default.args,
  state: {
    loading: false,
    refreshing: false,
    daosWithItems: [],
    itemCount: 0,
    refresh: () => {},
  },
}

export const NothingFollowed = Template.bind({})
NothingFollowed.args = {
  ...Default.args,
  state: {
    loading: false,
    refreshing: false,
    daosWithItems: [],
    itemCount: 0,
    refresh: () => {},
  },
}
