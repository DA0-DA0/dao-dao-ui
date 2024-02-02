import { ComponentMeta, ComponentStory } from '@storybook/react'

import { InboxMainItemRenderer } from '@dao-dao/stateful'
import { CHAIN_ID } from '@dao-dao/storybook'
import { makeDappLayoutDecorator } from '@dao-dao/storybook/decorators'
import { InboxItemType } from '@dao-dao/types'

import { Inbox } from './Inbox'

export default {
  title: 'DAO DAO / packages / stateless / pages / Inbox',
  component: Inbox,
  decorators: [makeDappLayoutDecorator()],
} as ComponentMeta<typeof Inbox>

const Template: ComponentStory<typeof Inbox> = (args) => <Inbox {...args} />

export const Default = Template.bind({})
Default.args = {
  state: {
    loading: false,
    refreshing: false,
    items: [...Array(Math.floor(Math.random() * 3) + 1)].map((_, index) => {
      // Random time in the last 3 days.
      const secondsRemaining = Math.floor(Math.random() * 3 * 24 * 60 * 60)

      return {
        id: `${index}`,
        timestamp: new Date(Date.now() - secondsRemaining * 1000).toISOString(),
        chainId: CHAIN_ID,
        type: InboxItemType.JoinedDao,
        data: {
          chainId: CHAIN_ID,
          dao: 'junoDaoCoreAddress',
          name: 'A DAO',
          imageUrl: undefined,
        },
      }
    }),
    refresh: () => {},
  },
  InboxMainItemRenderer,
  connected: true,
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=308%3A29063',
  },
  nextRouter: {
    asPath: '/notifications',
  },
}

export const Loading = Template.bind({})
Loading.args = {
  ...Default.args,
  state: {
    loading: true,
    refreshing: false,
    items: [],
    refresh: () => {},
  },
}

export const NothingOpen = Template.bind({})
NothingOpen.args = {
  ...Default.args,
  state: {
    loading: false,
    refreshing: false,
    items: [],
    refresh: () => {},
  },
}

export const NothingFollowed = Template.bind({})
NothingFollowed.args = {
  ...Default.args,
  state: {
    loading: false,
    refreshing: false,
    items: [],
    refresh: () => {},
  },
}
