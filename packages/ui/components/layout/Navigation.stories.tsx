import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useState } from 'react'

import { Navigation, NavigationProps } from './Navigation'

export default {
  title: 'DAO DAO / packages / ui / components / layout / Navigation',
  component: Navigation,
  excludeStories: ['DefaultArgs'],
} as ComponentMeta<typeof Navigation>

const Template: ComponentStory<typeof Navigation> = (args) => {
  const [compact, setCompact] = useState(false)

  return <Navigation {...args} compact={compact} setCompact={setCompact} />
}

// Used in `makeAppLayoutDecorator` to provide a default layout for the page
// stories. Ensure this has all props.
export const DefaultArgs: NavigationProps = {
  inboxCount: 5,
  setCommandModalVisible: () => alert('command!'),
  version: '2.0',
  tokenPrices: [
    {
      label: 'JUNO',
      price: 6.332,
      priceDenom: 'USDC',
      change: -22.34,
    },
    {
      label: 'DAO',
      price: 22.9986,
      priceDenom: 'USDC',
      change: 22.34,
    },
  ],
  pinnedDaos: [
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
      coreAddress: 'animals',
      name: 'Animals',
      imageUrl: '/placeholders/5.svg',
    },
  ],
  compact: false,
  setCompact: (compact) => alert(`compact! ${compact}`),
  responsiveMenuEnabled: true,
}

export const Default = Template.bind({})
Default.args = DefaultArgs

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=3%3A6661',
  },
}
