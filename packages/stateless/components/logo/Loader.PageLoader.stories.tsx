import { ComponentMeta, ComponentStory } from '@storybook/react'

import { PageLoader } from './Loader'

export default {
  title: 'DAO DAO / packages / stateless / components / PageLoader',
  component: PageLoader,
} as ComponentMeta<typeof PageLoader>

const Template: ComponentStory<typeof PageLoader> = (args) => (
  <PageLoader {...args} />
)

export const Default = Template.bind({})
Default.args = {}
