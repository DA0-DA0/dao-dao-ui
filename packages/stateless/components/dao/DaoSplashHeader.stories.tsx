import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoPageWrapperDecorator } from '@dao-dao/storybook'

import { useDaoInfoContext } from '../../hooks'
import { LinkWrapper } from '../LinkWrapper'
import { DaoInfoBar, DaoInfoBarProps } from './DaoInfoBar'
import { Default as DaoInfoBarStory } from './DaoInfoBar.DaoInfoBar.stories'
import { DaoSplashHeader } from './DaoSplashHeader'

export default {
  title: 'DAO DAO / packages / stateless / components / dao / DaoSplashHeader',
  component: DaoSplashHeader,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof DaoSplashHeader>

const Template: ComponentStory<typeof DaoSplashHeader> = (args) => (
  <DaoSplashHeader {...args} daoInfo={useDaoInfoContext()} />
)

export const Default = Template.bind({})
Default.args = {
  follow: {
    following: false,
    onFollow: () => alert('follow'),
    updatingFollowing: false,
  },
  DaoInfoBar: () => (
    <DaoInfoBar {...(DaoInfoBarStory.args as DaoInfoBarProps)} />
  ),
  LinkWrapper,
}
