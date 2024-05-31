import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoCardProps } from '@dao-dao/types'

import { DaoCard } from './dao'
import { makeDaoCardProps } from './dao/DaoCard.stories'
import { HorizontalScroller } from './HorizontalScroller'

export default {
  title: 'DAO DAO / packages / stateless / components / HorizontalScroller',
  component: HorizontalScroller,
} as ComponentMeta<typeof HorizontalScroller>

const Template: ComponentStory<typeof HorizontalScroller<DaoCardProps>> = (
  args
) => <HorizontalScroller {...args} />

export const FeaturedDaos = Template.bind({})
FeaturedDaos.args = {
  Component: DaoCard,
  items: {
    loading: false,
    data: [
      makeDaoCardProps(),
      {
        ...makeDaoCardProps(),
        info: {
          ...makeDaoCardProps().info,
          name: 'DAO DAO',
          created: new Date('August 11, 2022 16:20:00').getTime(),
        },
      },
      makeDaoCardProps(),
      {
        ...makeDaoCardProps(),
        info: {
          ...makeDaoCardProps().info,
          name: 'DAO DAO',
          created: Date.now(),
        },
      },
      {
        ...makeDaoCardProps(),
        info: {
          ...makeDaoCardProps().info,
          name: 'A different DAO',
          created: new Date('August 11, 2022 16:20:00').getTime(),
        },
      },
      makeDaoCardProps(),
      makeDaoCardProps(),
      makeDaoCardProps(),
    ],
  },
}

export const Loading = Template.bind({})
Loading.args = {
  Component: DaoCard,
  items: {
    loading: true,
  },
}
