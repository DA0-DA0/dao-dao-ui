import { ComponentMeta, ComponentStory } from '@storybook/react'

import { CommandModalContextViewLoader } from './CommandModalContextView'

export default {
  title:
    'DAO DAO / packages / ui / components / CommandModal / CommandModalContextViewLoader',
  component: CommandModalContextViewLoader,
} as ComponentMeta<typeof CommandModalContextViewLoader>

const Template: ComponentStory<typeof CommandModalContextViewLoader> = (
  _args
) => <CommandModalContextViewLoader />

export const Default = Template.bind({})
Default.args = {}
