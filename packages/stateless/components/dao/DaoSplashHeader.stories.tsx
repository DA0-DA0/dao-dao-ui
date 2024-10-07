import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoPageWrapperDecorator } from '@dao-dao/storybook'

import { useDao } from '../../contexts'
import { ButtonLink } from '../buttons'
import { LinkWrapper } from '../LinkWrapper'
import { DaoSplashHeader } from './DaoSplashHeader'

export default {
  title: 'DAO DAO / packages / stateless / components / dao / DaoSplashHeader',
  component: DaoSplashHeader,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof DaoSplashHeader>

const Template: ComponentStory<typeof DaoSplashHeader> = (args) => (
  <DaoSplashHeader {...args} dao={useDao()} />
)

export const Default = Template.bind({})
Default.args = {
  follow: {
    following: false,
    onFollow: () => alert('follow'),
    updatingFollowing: false,
  },
  ButtonLink,
  LinkWrapper,
}
