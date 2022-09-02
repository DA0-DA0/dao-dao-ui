import { ComponentMeta, ComponentStory } from '@storybook/react'

import { useDaoInfoContext } from '@dao-dao/common'
import { DaoPageWrapperDecorator } from '@dao-dao/storybook/decorators'

import { makeProps as makeDaoCardProps } from '../DaoCard.stories'
import { SubDaosTab } from './SubDaosTab'

export default {
  title: 'DAO DAO / packages / ui / components / dao / tabs / SubDaosTab',
  component: SubDaosTab,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof SubDaosTab>

const Template: ComponentStory<typeof SubDaosTab> = (args) => (
  <SubDaosTab {...args} daoInfo={useDaoInfoContext()} />
)

export const Default = Template.bind({})
Default.args = {
  isMember: true,
  subdaos: [
    makeDaoCardProps(),
    makeDaoCardProps(),
    makeDaoCardProps(),
    makeDaoCardProps(),
    makeDaoCardProps(),
  ],
}
