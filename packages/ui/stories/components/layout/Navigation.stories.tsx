import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Navigation, NavigationProps } from 'components/layout/Navigation'

export default {
  title: 'DAO DAO UI V2 / components / layout / Navigation',
  component: Navigation,
} as ComponentMeta<typeof Navigation>

const Template: ComponentStory<typeof Navigation> = (args) => (
  <div className="max-w-xs">
    <Navigation {...args} />
  </div>
)

// Used in `makeAppLayoutDecorator` to provide a default layout for the page
// stories. Ensure this has all props.
const DefaultArgs: NavigationProps = {
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
}

export const Default = Template.bind({})
Default.args = DefaultArgs

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=3%3A6661',
  },
}
