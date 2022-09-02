import { ComponentMeta, ComponentStory } from '@storybook/react'

import { makeAppLayoutDecorator } from '@dao-dao/storybook/decorators'

import { DefaultArgs as NavigationStoryArgs } from 'components/layout/Navigation.stories'
import {
  ProfileHomeCard,
  ProfileHomeCardProps,
} from 'components/profile/ProfileHomeCard'
import { Default as ProfileHomeCardStory } from 'components/profile/ProfileHomeCard.stories'
import { makeProps as makeProposalLineProps } from 'components/proposal/ProposalLine.ProposalLine.stories'

import { Inbox } from './Inbox'

export default {
  title: 'DAO DAO / packages / ui / pages / Inbox',
  component: Inbox,
  decorators: [
    makeAppLayoutDecorator({
      rightSidebar: (
        <ProfileHomeCard
          {...(ProfileHomeCardStory.args as ProfileHomeCardProps)}
        />
      ),
    }),
  ],
} as ComponentMeta<typeof Inbox>

const Template: ComponentStory<typeof Inbox> = (args) => <Inbox {...args} />

export const Default = Template.bind({})
Default.args = {
  daosWithProposals: NavigationStoryArgs.pinnedDaos.map((dao) => ({
    dao,
    // Generate between 1 and 3 proposals.
    proposals: [...Array(Math.floor(Math.random() * 3) + 1)].map(() => {
      // Random time in the next 3 days.
      const secondsRemaining = Math.floor(Math.random() * 3 * 24 * 60 * 60)

      return {
        secondsRemaining,
        // Random time in the past 3 days.
        created: new Date(
          Date.now() - Math.floor(Math.random() * 3 * 24 * 60 * 60)
        ),
        props: makeProposalLineProps(secondsRemaining),
      }
    }),
  })),
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
