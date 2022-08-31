import { ComponentMeta, ComponentStory } from '@storybook/react'

import { useDaoInfoContext } from '@dao-dao/common'

import { SubDaosTab } from 'components/dao/tabs/SubDaosTab'
import { DaoPageWrapperDecorator } from 'decorators'
import { makeProps as makeDaoCardProps } from 'stories/components/dao/DaoCard.stories'

export default {
  title: 'DAO DAO UI V2 / components / dao / tabs / SubDaosTab',
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
