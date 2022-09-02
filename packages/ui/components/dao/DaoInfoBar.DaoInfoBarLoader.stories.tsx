import { ComponentMeta, ComponentStory } from '@storybook/react'

import { Loader } from 'components/Loader'

import { DaoInfoBarLoader } from './DaoInfoBar'

export default {
  title: 'DAO DAO / packages / ui / components / dao / DaoInfoBarLoader',
  component: DaoInfoBarLoader,
} as ComponentMeta<typeof DaoInfoBarLoader>

const Template: ComponentStory<typeof DaoInfoBarLoader> = (args) => (
  <DaoInfoBarLoader {...args} />
)

export const Default = Template.bind({})
Default.args = {
  Loader,
}
