import {
  Add,
  Analytics,
  Calculate,
  ColorLens,
  Remove,
} from '@mui/icons-material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Button } from '../buttons'
import { FilterableItemPopup } from './FilterableItemPopup'

export default {
  title: 'DAO DAO / packages / ui / components / popup / FilterableItemPopup',
  component: FilterableItemPopup,
} as ComponentMeta<typeof FilterableItemPopup>

const Template: ComponentStory<typeof FilterableItemPopup> = (args) => (
  <FilterableItemPopup {...args} />
)

export const Default = Template.bind({})
Default.args = {
  Trigger: ({ open, ...props }) => (
    <Button pressed={open} variant="secondary" {...props}>
      Click me!
    </Button>
  ),
  items: [
    {
      key: 0,
      Icon: Add,
      label: 'Add',
      description: '2 + 2',
    },
    {
      key: 1,
      Icon: Remove,
      label: 'Subtract',
      description: '2 - -2',
    },
    {
      key: 2,
      Icon: Calculate,
      label: 'Equals',
      description: '4?',
    },
    {
      key: 3,
      Icon: Analytics,
      label: 'Math!',
      description: 'what',
    },
    {
      key: 4,
      Icon: ColorLens,
      label: 'Color',
      description: 'idk',
    },
  ],
  filterableItemKeys: ['label', 'description'],
  onSelect: ({ label }) => alert(label),
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=986%3A45783',
  },
}
