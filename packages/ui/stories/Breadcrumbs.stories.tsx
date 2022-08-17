import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Breadcrumbs } from 'components/Breadcrumbs'

export default {
  title: 'DAO DAO UI / Breadcrumbs',
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>

const Template: ComponentStory<typeof Breadcrumbs> = (args) => (
  <Breadcrumbs {...args} />
)

export const Default = Template.bind({})
Default.args = {
  crumbs: null, // TODO: Fill in default value.
}
