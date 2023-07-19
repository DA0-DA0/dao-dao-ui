import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { CHAIN_ID } from '@dao-dao/storybook'
import { makeAppContextDecorator } from '@dao-dao/storybook/decorators'

import { LinkWrapper } from '../LinkWrapper'
import { DappNavigation, DappNavigationProps } from './DappNavigation'

export default {
  title:
    'DAO DAO / packages / stateless / components / layout / DappNavigation',
  component: DappNavigation,
  decorators: [makeAppContextDecorator(true)],
  excludeStories: ['DefaultArgs'],
} as ComponentMeta<typeof DappNavigation>

const Template: ComponentStory<typeof DappNavigation> = (args) => {
  const [compact, setCompact] = useState(false)

  return <DappNavigation {...args} compact={compact} setCompact={setCompact} />
}

// Used in `makeDappLayoutDecorator` to provide a default layout for the page
// stories. Ensure this has all props.
export const DefaultArgs: DappNavigationProps = {
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
        chainId: CHAIN_ID,
        coreAddress: 'core1',
        name: 'Core 1',
        imageUrl: '/placeholders/1.svg',
      },
      {
        chainId: CHAIN_ID,
        coreAddress: 'raw',
        name: 'Raw',
        imageUrl: '/placeholders/2.svg',
        subdaos: [
          {
            chainId: CHAIN_ID,
            coreAddress: 'payroll',
            name: 'Payroll',
            imageUrl: '/placeholders/3.svg',
          },
          {
            chainId: CHAIN_ID,
            coreAddress: 'pool',
            name: 'Pool distribution',
            imageUrl: '/placeholders/4.svg',
            subdaos: [
              {
                chainId: CHAIN_ID,
                coreAddress: 'native',
                name: 'Native tokens',
                imageUrl: '/placeholders/1.svg',
              },
            ],
          },
        ],
      },
      {
        chainId: CHAIN_ID,
        coreAddress: 'core2',
        name: 'Core 2',
        imageUrl: '/placeholders/3.svg',
      },
      {
        chainId: CHAIN_ID,
        coreAddress: 'raw',
        name: 'Raw',
        imageUrl: '/placeholders/2.svg',
        subdaos: [
          {
            chainId: CHAIN_ID,
            coreAddress: 'payroll',
            name: 'Payroll',
            imageUrl: '/placeholders/3.svg',
          },
          {
            chainId: CHAIN_ID,
            coreAddress: 'pool',
            name: 'Pool distribution super duper long name',
            imageUrl: '/placeholders/4.svg',
            subdaos: [
              {
                chainId: CHAIN_ID,
                coreAddress: 'native',
                name: 'Native tokens',
                imageUrl: '/placeholders/1.svg',
              },
            ],
          },
        ],
      },
      {
        chainId: CHAIN_ID,
        coreAddress: 'core5',
        name: 'Core 5',
        imageUrl: '/placeholders/5.svg',
      },
      {
        chainId: CHAIN_ID,
        coreAddress: 'raw',
        name: 'Raw',
        imageUrl: '/placeholders/2.svg',
        subdaos: [
          {
            chainId: CHAIN_ID,
            coreAddress: 'payroll',
            name: 'Payroll',
            imageUrl: '/placeholders/3.svg',
          },
          {
            chainId: CHAIN_ID,
            coreAddress: 'pool',
            name: 'Pool distribution',
            imageUrl: '/placeholders/4.svg',
            subdaos: [
              {
                chainId: CHAIN_ID,
                coreAddress: 'native',
                name: 'Native tokens',
                imageUrl: '/placeholders/1.svg',
              },
            ],
          },
        ],
      },
      {
        chainId: CHAIN_ID,
        coreAddress: 'core4',
        name: 'Core 4',
        imageUrl: '/placeholders/4.svg',
      },
      {
        chainId: CHAIN_ID,
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
