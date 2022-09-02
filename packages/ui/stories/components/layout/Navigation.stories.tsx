import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Navigation, NavigationProps } from 'components/layout/Navigation'

export default {
  title: 'DAO DAO V2 / components / layout / Navigation',
  component: Navigation,
  excludeStories: ['DefaultArgs'],
} as ComponentMeta<typeof Navigation>

const Template: ComponentStory<typeof Navigation> = (args) => (
  <div className="max-w-xs">
    <Navigation {...args} />
  </div>
)

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
      name: 'Core 1',
      imageUrl: '/placeholders/1.svg',
    },
    {
      name: 'Raw',
      imageUrl: '/placeholders/2.svg',
      subdaos: [
        {
          name: 'Payroll',
          imageUrl: '/placeholders/3.svg',
        },
        {
          name: 'Pool distribution',
          imageUrl: '/placeholders/4.svg',
          subdaos: [
            {
              name: 'Native tokens',
              imageUrl: '/placeholders/1.svg',
            },
          ],
        },
      ],
    },
    {
      name: 'Raw',
      imageUrl: '/placeholders/2.svg',
      subdaos: [
        {
          name: 'Payroll',
          imageUrl: '/placeholders/3.svg',
        },
        {
          name: 'Pool distribution',
          imageUrl: '/placeholders/4.svg',
          subdaos: [
            {
              name: 'Native tokens',
              imageUrl: '/placeholders/1.svg',
            },
          ],
        },
      ],
    },
    {
      name: 'Raw',
      imageUrl: '/placeholders/2.svg',
      subdaos: [
        {
          name: 'Payroll',
          imageUrl: '/placeholders/3.svg',
        },
        {
          name: 'Pool distribution',
          imageUrl: '/placeholders/4.svg',
          subdaos: [
            {
              name: 'Native tokens',
              imageUrl: '/placeholders/1.svg',
            },
          ],
        },
      ],
    },
    {
      name: 'Animals',
      imageUrl: '/placeholders/5.svg',
    },
  ],
}

export const Default = Template.bind({})
Default.args = DefaultArgs

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=3%3A6661',
  },
}
