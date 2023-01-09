import { ComponentMeta, ComponentStory } from '@storybook/react'

import { DaoInfoBarLoader } from './DaoInfoBar'

export default {
  title: 'DAO DAO / packages / stateless / components / dao / DaoInfoBarLoader',
  component: DaoInfoBarLoader,
} as ComponentMeta<typeof DaoInfoBarLoader>

const Template: ComponentStory<typeof DaoInfoBarLoader> = (_args) => (
  <DaoInfoBarLoader />
)

export const Default = Template.bind({})
Default.args = {}
