import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { makeAppLayoutContextDecorator } from '@dao-dao/storybook/decorators'

import { LinkWrapper } from '../LinkWrapper'
import { Navigation, NavigationProps } from './Navigation'

export default {
  title: 'DAO DAO / packages / stateless / components / layout / Navigation',
  component: Navigation,
  decorators: [makeAppLayoutContextDecorator(true)],
  excludeStories: ['DefaultArgs'],
} as ComponentMeta<typeof Navigation>

const Template: ComponentStory<typeof Navigation> = (args) => {
  const [compact, setCompact] = useState(false)

  return <Navigation {...args} compact={compact} setCompact={setCompact} />
}

// Used in `makeAppLayoutDecorator` to provide a default layout for the page
// stories. Ensure this has all props.
export const DefaultArgs: NavigationProps = {
  walletConnected: true,
  inboxCount: {
    loading: false,
    data: 5,
  },
  setCommandModalVisible: () => alert('command!'),
  version: '2.0',
  followingDaos: {
    loading: false,
    data: [
      {
        coreAddress: 'core1',
        name: 'Core 1',
        imageUrl: '/placeholders/1.svg',
      },
      {
        coreAddress: 'raw',
        name: 'Raw',
        imageUrl: '/placeholders/2.svg',
        subdaos: [
          {
            coreAddress: 'payroll',
            name: 'Payroll',
            imageUrl: '/placeholders/3.svg',
          },
          {
            coreAddress: 'pool',
            name: 'Pool distribution',
            imageUrl: '/placeholders/4.svg',
            subdaos: [
              {
                coreAddress: 'native',
                name: 'Native tokens',
                imageUrl: '/placeholders/1.svg',
              },
            ],
          },
        ],
      },
      {
        coreAddress: 'core2',
        name: 'Core 2',
        imageUrl: '/placeholders/3.svg',
      },
      {
        coreAddress: 'raw',
        name: 'Raw',
        imageUrl: '/placeholders/2.svg',
        subdaos: [
          {
            coreAddress: 'payroll',
            name: 'Payroll',
            imageUrl: '/placeholders/3.svg',
          },
          {
            coreAddress: 'pool',
            name: 'Pool distribution super duper long name',
            imageUrl: '/placeholders/4.svg',
            subdaos: [
              {
                coreAddress: 'native',
                name: 'Native tokens',
                imageUrl: '/placeholders/1.svg',
              },
            ],
          },
        ],
      },
      {
        coreAddress: 'core5',
        name: 'Core 5',
        imageUrl: '/placeholders/5.svg',
      },
      {
        coreAddress: 'raw',
        name: 'Raw',
        imageUrl: '/placeholders/2.svg',
        subdaos: [
          {
            coreAddress: 'payroll',
            name: 'Payroll',
            imageUrl: '/placeholders/3.svg',
          },
          {
            coreAddress: 'pool',
            name: 'Pool distribution',
            imageUrl: '/placeholders/4.svg',
            subdaos: [
              {
                coreAddress: 'native',
                name: 'Native tokens',
                imageUrl: '/placeholders/1.svg',
              },
            ],
          },
        ],
      },
      {
        coreAddress: 'core4',
        name: 'Core 4',
        imageUrl: '/placeholders/4.svg',
      },
      {
        coreAddress: 'animals',
        name: 'Animals',
        imageUrl: '/placeholders/5.svg',
      },
    ],
  },
  compact: false,
  setCompact: (compact) => alert(`compact! ${compact}`),
  mountedInBrowser: true,
  LinkWrapper,
}

export const Default = Template.bind({})
Default.args = DefaultArgs
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=3%3A6661',
  },
}

export const Loading = Template.bind({})
Loading.args = {
  ...DefaultArgs,
  inboxCount: { loading: true },
  tokenPrices: { loading: true },
  followingDaos: { loading: true },
}
Loading.parameters = Default.parameters
