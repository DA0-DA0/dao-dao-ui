import { ComponentMeta, ComponentStory } from '@storybook/react'

import { useDaoInfoContext } from '@dao-dao/common'

import { ProposalLineProps } from 'components'
import { ProfileHomeDisconnectedCard } from 'components/profile/ProfileHomeDisconnectedCard'
import { DaoPageWrapperDecorator, makeAppLayoutDecorator } from 'decorators'
import { Inbox } from 'pages/Inbox'
import { Default as NavigationStory } from 'stories/components/layout/Navigation.stories'
import { Default as ProposalLineStory } from 'stories/components/proposal/ProposalLine/ProposalLine.stories'

export default {
  title: 'DAO DAO UI V2 / pages / Inbox',
  component: Inbox,
  decorators: [
    makeAppLayoutDecorator({
      rightSidebar: <ProfileHomeDisconnectedCard />,
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
    proposals: [
      {
        // Random seconds remaining.
        secondsRemaining: Math.floor(Math.random() * 1000000),
        // Random time in the past.
        created: new Date(
          new Date().getTime() - Math.floor(Math.random() * 1000000) * 1000
        ),
        props: ProposalLineStory.args as ProposalLineProps,
      },
    ],
  })),
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=308%3A29063',
  },
}
