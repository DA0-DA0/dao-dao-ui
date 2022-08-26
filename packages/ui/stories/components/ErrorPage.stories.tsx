import { ComponentMeta, ComponentStory } from '@storybook/react'

import { ErrorPage } from 'components/ErrorPage'

export default {
  title: 'DAO DAO UI / components / ErrorPage',
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
