import { HomeRounded } from '@mui/icons-material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SuspenseLoader } from '@dao-dao/stateful'
import {
  DaoPageWrapperDecorator,
  makeSdaLayoutDecorator,
} from '@dao-dao/storybook/decorators'
import { DaoSplashHeaderProps, DaoTabId } from '@dao-dao/types'

import {
  DaoSplashHeader,
  ProfileMemberCard,
  ProfileMemberCardProps,
} from '../components'
import { Default as DaoSplashHeaderStory } from '../components/dao/DaoSplashHeader.stories'
import { Default as ProfileMemberCardStory } from '../components/profile/ProfileMemberCard.stories'
import { DaoSdaWrappedTab } from './DaoSdaWrappedTab'

export default {
  title: 'DAO DAO / packages / stateless / pages / DaoSdaWrappedTab',
  component: DaoSdaWrappedTab,
  decorators: [
    // Direct ancestor of rendered story.
    DaoPageWrapperDecorator,
    makeSdaLayoutDecorator(),
  ],
} as ComponentMeta<typeof DaoSdaWrappedTab>

const Template: ComponentStory<typeof DaoSdaWrappedTab> = (args) => (
  <DaoSdaWrappedTab {...args} />
)

export const Default = Template.bind({})
Default.args = {
  allTabs: [
    {
      id: DaoTabId.Home,
      label: 'Home',
      Component: () => (
        <DaoSplashHeader
          {...(DaoSplashHeaderStory.args as DaoSplashHeaderProps)}
        />
      ),
      Icon: HomeRounded,
    },
  ],
  tabId: DaoTabId.Home,
  rightSidebarContent: (
    <ProfileMemberCard
      {...(ProfileMemberCardStory.args as ProfileMemberCardProps)}
    />
  ),
  SuspenseLoader,
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=317%3A28615',
  },
  nextRouter: {
    asPath: '/core1',
  },
}
