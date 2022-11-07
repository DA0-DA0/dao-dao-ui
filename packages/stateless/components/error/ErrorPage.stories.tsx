import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ErrorPage } from './ErrorPage'

export default {
  title: 'DAO DAO / packages / stateless / components / error / ErrorPage',
  component: ErrorPage,
} as ComponentMeta<typeof ErrorPage>

const Template: ComponentStory<typeof ErrorPage> = (args) => (
  <ErrorPage {...args} />
)

export const Default = Template.bind({})
Default.args = {
  title: 'Unknown error',
  children: 'Content',
}
