import { ComponentMeta, ComponentStory } from '@storybook/react'

import { SegmentedControls } from 'components/SegmentedControls'

export default {
  title: 'DAO DAO UI V2 / SegmentedControls',
  component: SegmentedControls,
} as ComponentMeta<typeof SegmentedControls>

const Template: ComponentStory<typeof SegmentedControls> = (args) => (
  <SegmentedControls {...args} />
)

const doNothing = () => null

export const Default = Template.bind({})
Default.args = {
  tabs: [
    {
      name: 'Proposals',
      onClick: doNothing,
    },
    {
      name: 'Treasury & NFTs',
      onClick: doNothing,
      selected: true,
    },
    {
      name: 'SubDAOs',
      onClick: doNothing,
    },
    {
      name: 'Members',
      onClick: doNothing,
    },
  ],
}

Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=77%3A9785',
  },
}
