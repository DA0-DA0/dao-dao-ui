import { ExpandCircleDownOutlined } from '@mui/icons-material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Popup } from './Popup'

export default {
  title: 'DAO DAO / packages / stateless / components / popup / Popup',
  component: Popup,
} as ComponentMeta<typeof Popup>

const Template: ComponentStory<typeof Popup> = (args) => <Popup {...args} />

export const Default = Template.bind({})
Default.args = {
  trigger: {
    type: 'icon_button',
    props: {
      Icon: ExpandCircleDownOutlined,
      className: '!text-icon-secondary',
      variant: 'ghost',
    },
  },
  position: 'right',
  children: (
    <>
      <p className="p-6">This is content!</p>
      <p className="border-t border-border-secondary p-6">And some more.</p>
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
