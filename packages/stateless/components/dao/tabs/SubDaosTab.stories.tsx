import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { DaoPageWrapperDecorator } from '@dao-dao/storybook/decorators'
import { useDaoInfoContext } from '@dao-dao/stateless'

import { DaoCard } from '../DaoCard'
import { makeProps as makeDaoCardProps } from '../DaoCard.stories'
import { SubDaosTab } from './SubDaosTab'

export default {
  title: 'DAO DAO / packages / stateless / components / dao / tabs / SubDaosTab',
  component: SubDaosTab,
  decorators: [DaoPageWrapperDecorator],
} as ComponentMeta<typeof SubDaosTab>

const Template: ComponentStory<typeof SubDaosTab> = (args) => {
  const [pinned, setPinned] = useState<string[]>([])

  return (
    <SubDaosTab
      {...args}
      DaoCard={(props) => (
        <DaoCard
          {...props}
          onPin={() =>
            setPinned((current) =>
              current.includes(props.coreAddress)
                ? current.filter((a) => a !== props.coreAddress)
                : [...current, props.coreAddress]
            )
          }
          pinned={pinned.includes(props.coreAddress)}
        />
      )}
      daoInfo={useDaoInfoContext()}
    />
  )
}

export const Default = Template.bind({})
Default.args = {
  isMember: true,
  subDaos: {
    loading: false,
    data: [
      makeDaoCardProps(),
      makeDaoCardProps(),
      makeDaoCardProps(),
      makeDaoCardProps(),
      makeDaoCardProps(),
    ],
  },
  createSubDaoHref: '#',
  upgradeToV2Href: '#',
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  subDaos: { loading: true },
}
