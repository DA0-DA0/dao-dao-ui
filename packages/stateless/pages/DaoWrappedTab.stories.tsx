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
  DiscordNotifierConfigureModal,
  DiscordNotifierConfigureModalProps,
  ProfileMemberCard,
  ProfileMemberCardProps,
} from '../components'
import { Default as DaoSplashHeaderStory } from '../components/dao/DaoSplashHeader.stories'
import { Default as DiscordNotifierConfigureModalStory } from '../components/modals/DiscordNotifierConfigureModal.stories'
import { Default as ProfileMemberCardStory } from '../components/profile/ProfileMemberCard.stories'
import { DaoWrappedTab } from './DaoWrappedTab'

export default {
  title: 'DAO DAO / packages / stateless / pages / DaoWrappedTab',
  component: DaoWrappedTab,
  decorators: [
    // Direct ancestor of rendered story.
    DaoPageWrapperDecorator,
    makeSdaLayoutDecorator(),
  ],
} as ComponentMeta<typeof DaoWrappedTab>

const Template: ComponentStory<typeof DaoWrappedTab> = (args) => (
  <DaoWrappedTab {...args} />
)

export const Default = Template.bind({})
Default.args = {
  tab: {
    id: DaoTabId.Home,
    label: 'Home',
    Component: () => (
      <DaoSplashHeader
        {...(DaoSplashHeaderStory.args as DaoSplashHeaderProps)}
      />
    ),
    Icon: HomeRounded,
  },
  rightSidebarContent: (
    <ProfileMemberCard
      {...(ProfileMemberCardStory.args as ProfileMemberCardProps)}
    />
  ),
  DiscordNotifierConfigureModal: () => (
    <DiscordNotifierConfigureModal
      {...(DiscordNotifierConfigureModalStory.args as DiscordNotifierConfigureModalProps)}
    />
  ),
  SuspenseLoader,
  showDiscordNotifierConfigureModal: true,
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
