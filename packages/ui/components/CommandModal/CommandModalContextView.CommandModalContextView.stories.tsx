import { Add, Inbox } from '@mui/icons-material'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CommandModalContextView } from './CommandModalContextView'

export default {
  title:
    'DAO DAO / packages / ui / components / CommandModal / CommandModalContextView',
  component: CommandModalContextView,
} as ComponentMeta<typeof CommandModalContextView>

const Template: ComponentStory<typeof CommandModalContextView> = (args) => (
  <CommandModalContextView {...args} />
)

export const Default = Template.bind({})
Default.args = {
  sections: [
    {
      name: 'App Navigation',
      onChoose: () => alert('test'),
      items: [
        {
          name: 'Create a DAO',
          Icon: Add,
        },
        {
          name: 'View inbox',
          Icon: Inbox,
        },
      ],
    },
    {
      name: 'DAOs',
      onChoose: () => alert('dao!'),
      items: [
        {
          name: 'DAO 1',
          imageUrl: '/placeholders/1.svg',
        },
        {
          name: 'DAO 2',
          imageUrl: '/placeholders/2.svg',
        },
        {
          name: 'DAO 3',
          imageUrl: '/placeholders/3.svg',
        },
        {
          name: 'DAO 4',
          imageUrl: '/placeholders/4.svg',
        },
        {
          name: 'DAO 5',
          imageUrl: '/placeholders/5.svg',
        },
      ],
    },
  ],
}
