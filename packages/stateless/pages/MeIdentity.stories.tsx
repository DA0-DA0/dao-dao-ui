import { ComponentMeta, ComponentStory } from '@storybook/react'

import { MeIdentity } from './MeIdentity'

export default {
  title: 'DAO DAO / packages / stateless / pages / MeIdentity',
  component: MeIdentity,
} as ComponentMeta<typeof MeIdentity>

const Template: ComponentStory<typeof MeIdentity> = (args) => (
  <MeIdentity {...args} />
)

export const Default = Template.bind({})
Default.args = {}
