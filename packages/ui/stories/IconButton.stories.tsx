import { PlusIcon } from '@heroicons/react/outline'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { IconButton } from 'components/IconButton'

export default {
  title: 'DAO DAO UI / IconButton',
  component: IconButton,
} as ComponentMeta<typeof IconButton>

const Template: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
)

export const Default = Template.bind({})
Default.args = {
  variant: 'primary',
  icon: <PlusIcon className="w-full h-full" />,
}
