import { ExpandCircleDownOutlined } from '@mui/icons-material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { IconButton } from '../IconButton'
import { Popup } from './Popup'

export default {
  title: 'DAO DAO / packages / ui / components / popup / Popup',
  component: Popup,
} as ComponentMeta<typeof Popup>

const Template: ComponentStory<typeof Popup> = (args) => <Popup {...args} />

export const Default = Template.bind({})
Default.args = {
  Trigger: ({ open, ...props }) => (
    <IconButton
      Icon={ExpandCircleDownOutlined}
      className="!text-icon-secondary"
      focused={open}
      variant="ghost"
      {...props}
    />
  ),
  position: 'right',
  children: (
    <>
      <p className="p-6">This is content!</p>
      <p className="p-6 border-t border-border-secondary">And some more.</p>
    </>
  ),
  popupClassName: 'w-[12rem]',
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=2747%3A53658',
  },
}
