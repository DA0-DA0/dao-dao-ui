import { ComponentMeta, ComponentStory } from '@storybook/react'

import { useDaoInfoContext } from '@dao-dao/common'

import {
  ProfileHomeCard,
  ProfileHomeCardProps,
} from 'components/profile/ProfileHomeCard'
import { DaoPageWrapperDecorator, makeAppLayoutDecorator } from 'decorators'
import { Inbox } from 'pages/Inbox'
import { Default as NavigationStory } from 'stories/components/layout/Navigation.stories'
import { Default as ProfileHomeCardStory } from 'stories/components/profile/ProfileHomeCard.stories'
import { makeProps as makeProposalLineProps } from 'stories/components/proposal/ProposalLine/ProposalLine.stories'

export default {
  title: 'DAO DAO UI V2 / pages / Inbox',
  component: Inbox,
  decorators: [
    makeAppLayoutDecorator({
      rightSidebar: (
        <ProfileHomeCard
          {...(ProfileHomeCardStory.args as ProfileHomeCardProps)}
        />
      ),
    }),
    DaoPageWrapperDecorator,
  ],
} as ComponentMeta<typeof Inbox>

const Template: ComponentStory<typeof Inbox> = (args) => {
  const { proposalModules } = useDaoInfoContext()

  return <Inbox {...args} proposalModules={proposalModules} />
}

export const Default = Template.bind({})
Default.args = {
  daosWithProposals: NavigationStory.args!.pinnedDaos!.map((dao) => ({
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
}
