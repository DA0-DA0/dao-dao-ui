import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Tooltip } from 'components/Tooltip'

export default {
  title: 'DAO DAO UI / Tooltip',
  component: Tooltip,
} as ComponentMeta<typeof Tooltip>

const Template: ComponentStory<typeof Tooltip> = (args) => <Tooltip {...args} />

export const Default = Template.bind({})
Default.args = {
  label: 'This is a tooltip.',
  // eslint-disable-next-line i18next/no-literal-string
  children: <p>Hover over me.</p>,
}
