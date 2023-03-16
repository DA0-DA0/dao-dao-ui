import { Add, ExpandCircleDownOutlined, Remove } from '@mui/icons-material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ButtonLink } from '../buttons/ButtonLink'
import { DepositEmoji } from '../emoji'
import { ButtonPopup } from './ButtonPopup'

export default {
  title: 'DAO DAO / packages / stateless / components / popup / ButtonPopup',
  component: ButtonPopup,
} as ComponentMeta<typeof ButtonPopup>

const Template: ComponentStory<typeof ButtonPopup> = (args) => (
  <ButtonPopup {...args} />
)

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
  sections: [
    {
      label: 'Section 1',
      buttons: [
        {
          Icon: Add,
          label: 'Button 1',
          onClick: () => alert('button1'),
        },
        {
          Icon: DepositEmoji,
          label: 'Button 2',
          onClick: () => alert('button2'),
        },
      ],
    },
    {
      label: 'Section 2',
      buttons: [
        {
          Icon: Remove,
          label: 'Button 3',
          onClick: () => alert('button3'),
        },
      ],
    },
  ],
  popupClassName: 'w-[12rem]',
  ButtonLink,
}
Default.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/ZnQ4SMv8UUgKDZsR5YjVGH/DAO-DAO-2.0?node-id=2747%3A53658',
  },
}
